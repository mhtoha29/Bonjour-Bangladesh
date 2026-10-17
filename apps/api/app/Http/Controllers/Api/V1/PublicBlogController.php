<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\PublicBlogIndexRequest;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PublicBlogController extends Controller
{
    public function index(PublicBlogIndexRequest $request): AnonymousResourceCollection
    {
        $filters = $request->validated();
        $query = BlogPost::published()->orderByDesc('featured')->orderByDesc('published_at');

        if (isset($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        return BlogPostResource::collection($query->paginate(9))->additional([
            'categories' => BlogPost::published()->distinct()->orderBy('category')->pluck('category'),
        ]);
    }

    public function slugs(): JsonResponse
    {
        return response()->json(['posts' => BlogPost::published()->orderBy('id')->get(['slug', 'updated_at'])]);
    }

    public function show(string $slug): BlogPostResource
    {
        return new BlogPostResource(BlogPost::published()->where('slug', $slug)->firstOrFail());
    }
}
