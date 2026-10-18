<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\PublicSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FoundationTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_foundation_exposes_three_safe_gallery_slots(): void
    {
        $this->seed(PublicSiteSeeder::class);

        $this->getJson('/api/v1/foundation')
            ->assertOk()
            ->assertJsonPath('data.title', 'Hashmat Ali Foundation')
            ->assertJsonCount(3, 'data.gallery')
            ->assertJsonPath('data.gallery.0.media', null);
    }

    public function test_editor_can_upload_an_optimized_foundation_image(): void
    {
        Storage::fake('public');
        $this->seed(PublicSiteSeeder::class);
        $user = User::factory()->create(['role' => 'editor', 'password' => 'SecurePassword123']);
        $token = $this->postJson('/api/v1/admin/login', [
            'email' => $user->email,
            'password' => 'SecurePassword123',
        ])->assertOk()->json('token');

        $this->withToken($token)->post('/api/v1/admin/foundation/1', [
            'image' => UploadedFile::fake()->image('community.jpg', 1400, 1000),
            'alt' => 'Foundation volunteers supporting the community',
            'caption' => 'Community support activity',
        ])->assertOk()
            ->assertJsonPath('foundation.gallery.0.media.alt', 'Foundation volunteers supporting the community')
            ->assertJsonPath('foundation.gallery.0.caption', 'Community support activity');

        $this->getJson('/api/v1/foundation')
            ->assertOk()
            ->assertJsonPath('data.gallery.0.media.alt', 'Foundation volunteers supporting the community');
    }
}
