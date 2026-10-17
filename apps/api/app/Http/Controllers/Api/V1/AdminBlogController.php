<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogPostRequest;
use App\Http\Requests\UpdateBlogPostRequest;
use App\Http\Requests\UploadBlogCoverRequest;
use App\Http\Resources\BlogPostResource;
use App\Models\BlogPost;
use App\Services\ProductImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AdminBlogController extends Controller
{
    public function index(): array
    {
        $posts = BlogPost::query()->latest()->paginate(15);

        return [
            'posts' => [
                'data' => BlogPostResource::collection($posts->items()),
                'current_page' => $posts->currentPage(),
                'last_page' => $posts->lastPage(),
                'total' => $posts->total(),
            ],
        ];
    }

    public function store(StoreBlogPostRequest $request): BlogPostResource
    {
        $this->authorizeEdit($request);
        $data = $request->validated();
        $data['slug'] = Str::slug(($data['slug'] ?? null) ?: $data['title']);
        Validator::make(['slug' => $data['slug']], ['slug' => ['required', Rule::unique('blog_posts', 'slug')]])->validate();
        $this->authorizePublish($request, $data['status']);
        $data['published_at'] = $data['status'] === 'published' ? now() : null;

        return new BlogPostResource(BlogPost::create($data));
    }

    public function show(BlogPost $post): BlogPostResource
    {
        return new BlogPostResource($post);
    }

    public function update(UpdateBlogPostRequest $request, BlogPost $post): BlogPostResource
    {
        $this->authorizeEdit($request);
        $data = $request->validated();
        if (array_key_exists('slug', $data)) {
            $data['slug'] = Str::slug($data['slug'] ?: ($data['title'] ?? $post->title));
            Validator::make(['slug' => $data['slug']], ['slug' => ['required', Rule::unique('blog_posts', 'slug')->ignore($post->id)]])->validate();
        }
        $status = $data['status'] ?? $post->status;
        $this->authorizePublish($request, $status);
        if ($status === 'published' && ! $post->published_at) {
            $data['published_at'] = now();
        } elseif ($status === 'draft') {
            $data['published_at'] = null;
        }
        $post->update($data);

        return new BlogPostResource($post->refresh());
    }

    public function uploadCover(UploadBlogCoverRequest $request, BlogPost $post, ProductImageOptimizer $optimizer): BlogPostResource
    {
        $this->authorizeEdit($request);
        $data = $request->validated();
        $newPath = $optimizer->store($data['image'], 'blog');
        $oldPath = $post->cover_image_path;
        $post->update(['cover_image_path' => $newPath, 'cover_image_alt' => $data['image_alt']]);

        if ($oldPath && ! str_starts_with($oldPath, '/')) {
            Storage::disk('public')->delete($oldPath);
        }

        return new BlogPostResource($post->refresh());
    }

    private function authorizeEdit(Request $request): void
    {
        abort_unless(in_array($request->user()->role, ['owner', 'manager', 'editor'], true), 403);
    }

    private function authorizePublish(Request $request, string $status): void
    {
        if ($status === 'published') {
            abort_unless(in_array($request->user()->role, ['owner', 'manager'], true), 403);
        }
    }
}
