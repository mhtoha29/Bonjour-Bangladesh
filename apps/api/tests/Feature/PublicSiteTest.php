<?php

namespace Tests\Feature;

use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\PageBlock;
use Database\Seeders\PublicSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PublicSiteTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_endpoint_exposes_editable_copy_and_no_fake_image(): void
    {
        $this->seed(PublicSiteSeeder::class);

        $this->getJson('/api/v1/site')
            ->assertOk()
            ->assertJsonPath('data.hero.title', 'Your Trusted Garment Buying House & Sourcing Partner in Bangladesh')
            ->assertJsonPath('data.seo.title', 'Garment Buying House in Bangladesh | Bonjour Bangladesh')
            ->assertJsonPath('data.hero.media', null)
            ->assertJsonCount(5, 'data.navigation')
            ->assertJsonCount(3, 'data.finder.audiences')
            ->assertJsonCount(3, 'data.finder.constructions');
    }

    public function test_unpublished_home_is_not_exposed(): void
    {
        $this->seed(PublicSiteSeeder::class);
        Page::where('slug', 'home')->update(['status' => 'draft']);

        $this->getJson('/api/v1/site')->assertNotFound();
    }

    public function test_reseeding_preserves_edited_hero_copy_and_uploaded_media_reference(): void
    {
        $this->seed(PublicSiteSeeder::class);
        $media = MediaAsset::factory()->create();
        $hero = PageBlock::where('type', 'hero')->firstOrFail();
        $copy = $hero->content;
        $copy['title'] = 'Client-approved sourcing headline';
        $hero->update(['content' => $copy, 'media_asset_id' => $media->id]);

        $this->seed(PublicSiteSeeder::class);

        $hero->refresh();
        $this->assertSame('Client-approved sourcing headline', $hero->content['title']);
        $this->assertSame($media->id, $hero->media_asset_id);
    }
}
