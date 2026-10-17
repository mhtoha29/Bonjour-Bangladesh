<?php

namespace App\Services;

use App\Models\MediaAsset;
use App\Models\NavigationItem;
use App\Models\Page;
use App\Models\SiteSetting;
use App\Models\TaxonomyTerm;
use Illuminate\Support\Facades\Storage;

class PublicSiteService
{
    public function home(): array
    {
        $page = Page::published()
            ->with('blocks.mediaAsset')
            ->where('slug', 'home')
            ->firstOrFail();

        $hero = $page->blocks->firstWhere('type', 'hero');
        abort_unless($hero, 404);

        $content = $hero->content;

        return [
            'siteName' => SiteSetting::find('site_name')?->value ?? 'Bonjour Bangladesh',
            'seo' => [
                'title' => $page->seo_title,
                'description' => $page->seo_description,
            ],
            'navigation' => NavigationItem::published()
                ->where('location', 'header')
                ->orderBy('sort_order')
                ->get(['label', 'href'])
                ->map(fn (NavigationItem $item): array => [
                    'label' => $item->label,
                    'href' => $item->href,
                ])->all(),
            'hero' => [
                'eyebrow' => $content['eyebrow'],
                'title' => $content['title'],
                'description' => $content['description'],
                'primaryAction' => $content['primaryAction'],
                'secondaryAction' => $content['secondaryAction'],
                'media' => $this->publicMedia($hero->mediaAsset),
                'mobileMedia' => $this->publicMedia(isset($content['mobile_media_asset_id']) ? MediaAsset::find($content['mobile_media_asset_id']) : null),
            ],
            'finder' => [
                'audiences' => $this->terms('audience'),
                'constructions' => $this->terms('construction'),
                'productTypes' => $this->terms('product_type'),
            ],
        ];
    }

    private function terms(string $kind): array
    {
        return TaxonomyTerm::published()
            ->where('kind', $kind)
            ->orderBy('sort_order')
            ->get(['slug', 'label'])
            ->map(fn (TaxonomyTerm $term): array => [
                'slug' => $term->slug,
                'label' => $term->label,
            ])->all();
    }

    private function publicMedia(?MediaAsset $asset): ?array
    {
        if (! $asset || $asset->status !== 'ready' || $asset->visibility !== 'public') {
            return null;
        }

        return [
            'url' => url(Storage::disk($asset->disk)->url($asset->path)),
            'alt' => $asset->alt_text ?? '',
            'width' => $asset->width,
            'height' => $asset->height,
        ];
    }
}
