<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use App\Models\Page;
use App\Models\PageBlock;
use App\Services\ProductImageOptimizer;
use App\Services\PublicSiteService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class AdminSiteController extends Controller
{
    public function show(PublicSiteService $site): JsonResponse
    {
        return response()->json(['site' => $site->home()]);
    }

    public function update(Request $request, PublicSiteService $site): JsonResponse
    {
        $this->authorizeEdit($request);
        $data = $request->validate([
            'seo.title' => ['required', 'string', 'max:190'],
            'seo.description' => ['required', 'string', 'max:300'],
            'hero.eyebrow' => ['required', 'string', 'max:100'],
            'hero.title' => ['required', 'string', 'max:190'],
            'hero.description' => ['required', 'string', 'max:500'],
            'hero.primaryAction.label' => ['required', 'string', 'max:60'],
            'hero.primaryAction.href' => ['required', 'string', 'max:190', 'starts_with:/'],
        ]);

        $page = Page::where('slug', 'home')->firstOrFail();
        $hero = $this->heroBlock($page);
        $content = $hero->content;
        foreach (['eyebrow', 'title', 'description', 'primaryAction'] as $key) {
            $content[$key] = $data['hero'][$key];
        }
        $hero->update(['content' => $content]);
        $page->update(['seo_title' => $data['seo']['title'], 'seo_description' => $data['seo']['description']]);

        return response()->json(['site' => $site->home()]);
    }

    public function uploadHeroImage(Request $request, ProductImageOptimizer $optimizer, PublicSiteService $site): JsonResponse
    {
        $this->authorizeEdit($request);
        $data = $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240', 'dimensions:max_width=4000,max_height=4000'],
            'alt' => ['required', 'string', 'max:190'],
            'variant' => ['required', Rule::in(['desktop', 'mobile'])],
        ]);
        $path = $optimizer->store($data['image'], 'hero');
        [$width, $height] = getimagesize(Storage::disk('public')->path($path));
        $media = MediaAsset::create([
            'disk' => 'public', 'path' => $path, 'alt_text' => $data['alt'],
            'width' => $width, 'height' => $height, 'status' => 'ready', 'visibility' => 'public',
        ]);
        $page = Page::where('slug', 'home')->firstOrFail();
        $hero = $this->heroBlock($page);
        if ($data['variant'] === 'desktop') {
            $hero->update(['media_asset_id' => $media->id]);
        } else {
            $content = $hero->content;
            $content['mobile_media_asset_id'] = $media->id;
            $hero->update(['content' => $content]);
        }

        return response()->json(['site' => $site->home()]);
    }

    private function heroBlock(Page $page): PageBlock
    {
        return $page->blocks()->where('type', 'hero')->firstOrFail();
    }

    private function authorizeEdit(Request $request): void
    {
        abort_unless(in_array($request->user()->role, ['owner', 'manager', 'editor'], true), 403);
    }
}
