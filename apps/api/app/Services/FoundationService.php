<?php

namespace App\Services;

use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\PageBlock;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FoundationService
{
    public function publicData(): array
    {
        $page = Page::published()
            ->with('blocks.mediaAsset')
            ->where('slug', 'hashmat-ali-foundation')
            ->firstOrFail();

        return $this->format($page);
    }

    public function adminData(): array
    {
        return $this->format($this->ensurePage()->load('blocks.mediaAsset'));
    }

    public function upload(int $slot, UploadedFile $image, string $alt, ?string $caption, ProductImageOptimizer $optimizer): array
    {
        abort_unless(in_array($slot, [1, 2, 3], true), 404);

        $page = $this->ensurePage();
        $block = $page->blocks()->firstOrCreate(
            ['type' => 'foundation_gallery', 'sort_order' => $slot],
            ['content' => ['slot' => $slot, 'caption' => '']],
        );
        $oldMedia = $block->mediaAsset;
        $path = $optimizer->store($image, 'foundation');
        [$width, $height] = getimagesize(Storage::disk('public')->path($path));
        $media = MediaAsset::create([
            'disk' => 'public',
            'path' => $path,
            'alt_text' => $alt,
            'width' => $width,
            'height' => $height,
            'status' => 'ready',
            'visibility' => 'public',
        ]);

        $block->update([
            'media_asset_id' => $media->id,
            'content' => ['slot' => $slot, 'caption' => $caption ?? ''],
        ]);

        if ($oldMedia) {
            Storage::disk($oldMedia->disk)->delete($oldMedia->path);
            $oldMedia->delete();
        }

        return $this->adminData();
    }

    private function ensurePage(): Page
    {
        $page = Page::firstOrCreate(
            ['slug' => 'hashmat-ali-foundation'],
            [
                'title' => 'Hashmat Ali Foundation',
                'status' => 'published',
                'seo_title' => 'Hashmat Ali Foundation | Bonjour Bangladesh',
                'seo_description' => 'The community support initiative of Bonjour Bangladesh, supporting disadvantaged people and people with disabilities.',
            ],
        );

        foreach ([1, 2, 3] as $slot) {
            $page->blocks()->firstOrCreate(
                ['type' => 'foundation_gallery', 'sort_order' => $slot],
                ['content' => ['slot' => $slot, 'caption' => '']],
            );
        }

        return $page;
    }

    private function format(Page $page): array
    {
        return [
            'title' => $page->title,
            'gallery' => $page->blocks
                ->where('type', 'foundation_gallery')
                ->sortBy('sort_order')
                ->values()
                ->map(fn (PageBlock $block): array => [
                    'slot' => (int) ($block->content['slot'] ?? $block->sort_order),
                    'caption' => (string) ($block->content['caption'] ?? ''),
                    'media' => $this->publicMedia($block->mediaAsset),
                ])->all(),
        ];
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
