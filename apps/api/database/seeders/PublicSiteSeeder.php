<?php

namespace Database\Seeders;

use App\Models\NavigationItem;
use App\Models\Page;
use App\Models\PageBlock;
use App\Models\SiteSetting;
use App\Models\TaxonomyTerm;
use Illuminate\Database\Seeder;

class PublicSiteSeeder extends Seeder
{
    public function run(): void
    {
        SiteSetting::firstOrCreate(
            ['key' => 'site_name'],
            ['value' => 'Bonjour Bangladesh'],
        );

        $page = Page::firstOrCreate(
            ['slug' => 'home'],
            [
                'title' => 'Home',
                'status' => 'published',
                'seo_title' => 'Garment Buying House in Bangladesh | Bonjour Bangladesh',
                'seo_description' => 'Explore apparel sourcing for men, women and kids through selected manufacturing partners in Bangladesh.',
            ],
        );

        $hero = PageBlock::firstOrCreate(
            ['page_id' => $page->id, 'type' => 'hero', 'sort_order' => 0],
            [
                'content' => [
                    'eyebrow' => 'BONJOUR BANGLADESH · SINCE 2010',
                    'title' => 'Your Trusted Garment Buying House & Sourcing Partner in Bangladesh',
                    'description' => 'From product development and sourcing to quality follow-up and shipment coordination, we help international buyers move with confidence.',
                    'primaryAction' => ['label' => 'Explore Products', 'href' => '/products/'],
                    'secondaryAction' => ['label' => 'Send Your Tech Pack', 'href' => '/request-a-quote/'],
                ],
            ],
        );

        if (! $hero->wasRecentlyCreated) {
            $content = $hero->content;
            $upgrades = [
                'eyebrow' => ['APPAREL SOURCING FROM BANGLADESH · SINCE 2010', 'BONJOUR BANGLADESH · SINCE 2010'],
                'title' => ['The right quality. The right time. The right commitment.', 'Your Trusted Garment Buying House & Sourcing Partner in Bangladesh'],
                'description' => ['Explore product possibilities. Share your brief. We coordinate the next steps with selected manufacturing partners.', 'From product development and sourcing to quality follow-up and shipment coordination, we help international buyers move with confidence.'],
            ];
            foreach ($upgrades as $key => [$previous, $replacement]) {
                if (($content[$key] ?? null) === $previous) {
                    $content[$key] = $replacement;
                }
            }
            if (($content['title'] ?? null) === 'Apparel sourcing from Bangladesh, with clarity at every stage.') {
                $content['title'] = 'Your Trusted Garment Buying House & Sourcing Partner in Bangladesh';
            }
            if ($content !== $hero->content) {
                $hero->update(['content' => $content]);
            }
        }

        foreach ([
            ['Products', '/products/'],
            ['Capabilities', '/capabilities/'],
            ['Quality & Compliance', '/quality-compliance/'],
            ['About', '/about/'],
            ['Contact', '/contact/'],
        ] as $position => [$label, $href]) {
            $item = NavigationItem::firstOrCreate(
                ['location' => 'header', 'href' => $href],
                ['label' => $label, 'sort_order' => $position, 'is_published' => true],
            );
            if ($href === '/quality-compliance/' && $item->label === 'Quality & Responsibility') {
                $item->update(['label' => 'Quality & Compliance']);
            }
        }

        foreach ([
            'audience' => [
                ['men', 'Men'], ['women', 'Women'], ['kids', 'Kids'],
            ],
            'construction' => [
                ['knit', 'Knit'], ['woven', 'Woven'],
                ['fully-fashioned-knitwear', 'Fully Fashioned Knitwear'],
            ],
        ] as $kind => $terms) {
            foreach ($terms as $position => [$slug, $label]) {
                TaxonomyTerm::firstOrCreate(
                    ['kind' => $kind, 'slug' => $slug],
                    ['label' => $label, 'sort_order' => $position, 'is_published' => true],
                );
            }
        }
    }
}
