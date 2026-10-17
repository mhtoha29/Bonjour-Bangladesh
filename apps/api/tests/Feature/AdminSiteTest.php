<?php

namespace Tests\Feature;

use App\Models\User;
use Database\Seeders\PublicSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminSiteTest extends TestCase
{
    use RefreshDatabase;

    public function test_homepage_copy_is_editable_and_visible_in_public_api(): void
    {
        $this->seed(PublicSiteSeeder::class);
        $token = $this->loginOwner();

        $this->withToken($token)->patchJson('/api/v1/admin/site', [
            'seo' => ['title' => 'New search title', 'description' => 'A precise sourcing description for buyers.'],
            'hero' => [
                'eyebrow' => 'BONJOUR BANGLADESH · SINCE 2010',
                'title' => 'A new approved headline',
                'description' => 'A new approved supporting paragraph for international apparel buyers.',
                'primaryAction' => ['label' => 'Explore Products', 'href' => '/products/'],
            ],
        ])->assertOk();

        $this->getJson('/api/v1/site')->assertJsonPath('data.hero.title', 'A new approved headline')
            ->assertJsonPath('data.seo.title', 'New search title');
    }

    public function test_mobile_hero_upload_is_optimized_and_does_not_replace_desktop(): void
    {
        Storage::fake('public');
        $this->seed(PublicSiteSeeder::class);
        $token = $this->loginOwner();

        $this->withToken($token)->post('/api/v1/admin/site/hero-image', [
            'image' => UploadedFile::fake()->image('mobile.jpg', 900, 1600),
            'alt' => 'Apparel development studio',
            'variant' => 'mobile',
        ])->assertOk()->assertJsonPath('site.hero.mobileMedia.alt', 'Apparel development studio');

        $this->getJson('/api/v1/site')->assertJsonPath('data.hero.media', null)
            ->assertJsonPath('data.hero.mobileMedia.alt', 'Apparel development studio');
    }

    private function loginOwner(): string
    {
        User::factory()->create(['email' => 'owner@example.com', 'role' => 'owner', 'password' => 'SecurePassword123']);

        return $this->postJson('/api/v1/admin/login', ['email' => 'owner@example.com', 'password' => 'SecurePassword123'])
            ->assertOk()->json('token');
    }
}
