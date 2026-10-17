<?php

namespace Tests\Feature;

use App\Models\Inquiry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InquiryAdminTest extends TestCase
{
    use RefreshDatabase;

    public function test_popup_inquiry_is_saved_and_submitted_to_mail_transport(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/inquiries', [
            'source' => 'popup',
            'name' => 'Buyer One',
            'email' => 'buyer@example.com',
            'company' => 'Example Apparel',
            'message' => 'We need woven shirts for our next collection.',
        ])->assertCreated()->assertJsonPath('reference', 1);

        $this->assertDatabaseHas('inquiries', ['email' => 'buyer@example.com', 'source' => 'popup', 'status' => 'new', 'email_status' => 'sent']);
    }

    public function test_contact_page_inquiry_is_saved_for_admin_follow_up(): void
    {
        Mail::fake();

        $this->postJson('/api/v1/inquiries', [
            'source' => 'contact',
            'name' => 'Buyer Contact',
            'email' => 'contact@example.com',
            'company' => 'Contact Apparel',
            'message' => 'We need support sourcing a knitwear collection.',
        ])->assertCreated();

        $this->assertDatabaseHas('inquiries', [
            'email' => 'contact@example.com',
            'source' => 'contact',
            'status' => 'new',
            'email_status' => 'sent',
        ]);
    }

    public function test_attachment_is_private_and_admin_can_download_it(): void
    {
        Storage::fake('local');
        Mail::fake();
        $this->postJson('/api/v1/inquiries', [
            'source' => 'quote',
            'name' => 'Buyer Two',
            'email' => 'buyer2@example.com',
            'message' => 'Please review our attached garment tech pack.',
            'attachment' => UploadedFile::fake()->create('techpack.pdf', 100, 'application/pdf'),
        ])->assertCreated();

        $inquiry = Inquiry::firstOrFail();
        Storage::disk('local')->assertExists($inquiry->attachment_path);
        $this->get('/api/v1/admin/inquiries/'.$inquiry->id.'/attachment')->assertUnauthorized();
        $token = $this->loginAs('owner');
        $this->withToken($token)->get('/api/v1/admin/inquiries/'.$inquiry->id.'/attachment')->assertOk();
    }

    public function test_role_checks_and_session_revocation(): void
    {
        $viewerToken = $this->loginAs('viewer');
        $this->withToken($viewerToken)->getJson('/api/v1/admin/team')->assertForbidden();
        $this->withToken($viewerToken)->getJson('/api/v1/admin/inquiries')->assertOk();
        $this->withToken($viewerToken)->postJson('/api/v1/admin/logout')->assertOk();
        $this->withToken($viewerToken)->getJson('/api/v1/admin/me')->assertUnauthorized();

        $ownerToken = $this->loginAs('owner');
        $this->withToken($ownerToken)->getJson('/api/v1/admin/team')->assertOk();
    }

    public function test_reset_password_invalidates_existing_admin_sessions(): void
    {
        $token = $this->loginAs('owner');
        $user = User::where('email', 'owner@example.com')->firstOrFail();
        $resetToken = Password::createToken($user);

        $this->postJson('/api/v1/admin/reset-password', [
            'email' => $user->email,
            'token' => $resetToken,
            'password' => 'NewSecurePassword123',
            'password_confirmation' => 'NewSecurePassword123',
        ])->assertOk();

        $this->assertTrue(Hash::check('NewSecurePassword123', $user->fresh()->password));
        $this->withToken($token)->getJson('/api/v1/admin/me')->assertUnauthorized();
    }

    public function test_owner_can_invite_and_control_team_access(): void
    {
        Notification::fake();
        $token = $this->loginAs('owner');

        $this->withToken($token)->postJson('/api/v1/admin/team', [
            'name' => 'Product Editor',
            'email' => 'EDITOR@EXAMPLE.COM',
            'role' => 'editor',
        ])->assertCreated()->assertJsonPath('user.email', 'editor@example.com');

        $member = User::where('email', 'editor@example.com')->firstOrFail();
        $this->withToken($token)->patchJson('/api/v1/admin/team/'.$member->id, [
            'role' => 'viewer',
            'is_active' => false,
        ])->assertOk()->assertJsonPath('user.role', 'viewer')->assertJsonPath('user.is_active', false);
    }

    private function loginAs(string $role): string
    {
        $email = $role.'@example.com';
        User::factory()->create(['email' => $email, 'role' => $role, 'password' => 'SecurePassword123']);

        return $this->postJson('/api/v1/admin/login', ['email' => $email, 'password' => 'SecurePassword123'])
            ->assertOk()->json('token');
    }
}
