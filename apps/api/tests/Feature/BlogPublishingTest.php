<?php

namespace Tests\Feature;

use App\Models\BlogPost;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class BlogPublishingTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_blog_only_returns_published_articles_with_pagination_metadata(): void
    {
        BlogPost::factory()->published()->count(10)->create();
        BlogPost::factory()->create(['title' => 'Private editorial draft']);

        $this->getJson('/api/v1/blog')
            ->assertOk()
            ->assertJsonCount(9, 'data')
            ->assertJsonPath('meta.total', 10)
            ->assertJsonMissing(['title' => 'Private editorial draft']);
    }

    public function test_owner_can_publish_an_article_and_it_becomes_public(): void
    {
        $token = $this->loginAs('owner');
        $payload = $this->articlePayload('published');

        $slug = $this->withToken($token)->postJson('/api/v1/admin/blog', $payload)
            ->assertCreated()
            ->assertJsonPath('data.status', 'published')
            ->json('data.slug');

        $this->getJson('/api/v1/blog/'.$slug)
            ->assertOk()
            ->assertJsonPath('data.seo_title', $payload['seo_title'])
            ->assertJsonPath('data.focus_keyword', $payload['focus_keyword']);
    }

    public function test_editor_can_save_a_draft_but_cannot_publish(): void
    {
        $token = $this->loginAs('editor');

        $this->withToken($token)->postJson('/api/v1/admin/blog', $this->articlePayload('draft'))
            ->assertCreated()
            ->assertJsonPath('data.status', 'draft');

        $this->withToken($token)->postJson('/api/v1/admin/blog', $this->articlePayload('published', 'A second editorial article'))
            ->assertForbidden();
    }

    public function test_cover_upload_is_converted_to_webp(): void
    {
        Storage::fake('public');
        $post = BlogPost::factory()->create();
        $token = $this->loginAs('manager');

        $this->withToken($token)->post('/api/v1/admin/blog/'.$post->id.'/cover', [
            'image' => UploadedFile::fake()->image('quality-control.jpg', 2400, 1600),
            'image_alt' => 'Quality inspection for an apparel shipment',
        ])->assertOk()->assertJsonPath('data.cover_image.alt', 'Quality inspection for an apparel shipment');

        $post->refresh();
        $this->assertStringEndsWith('.webp', $post->cover_image_path);
        Storage::disk('public')->assertExists($post->cover_image_path);
    }

    private function articlePayload(string $status, string $title = 'Choosing a Garment Buying House in Bangladesh'): array
    {
        return [
            'title' => $title,
            'category' => 'Sourcing guidance',
            'excerpt' => 'A practical buyer guide to evaluating apparel sourcing coordination, quality and compliance.',
            'body' => "## Start with the product brief\n\n".str_repeat('Buyers should compare capability, quality controls, communication and documented evidence before selecting a sourcing partner. ', 4),
            'author_name' => 'Bonjour Bangladesh Editorial Team',
            'status' => $status,
            'featured' => false,
            'seo_title' => 'How to Choose a Garment Buying House in Bangladesh',
            'seo_description' => 'A practical checklist for international buyers evaluating garment buying houses in Bangladesh.',
            'focus_keyword' => 'garment buying house in Bangladesh',
        ];
    }

    private function loginAs(string $role): string
    {
        $email = $role.'@example.com';
        User::factory()->create(['email' => $email, 'role' => $role, 'password' => 'SecurePassword123']);

        return $this->postJson('/api/v1/admin/login', ['email' => $email, 'password' => 'SecurePassword123'])
            ->assertOk()->json('token');
    }
}
