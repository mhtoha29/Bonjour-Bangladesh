<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductImageOptimizer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class AdminProductController extends Controller
{
    public function index(): array
    {
        $products = Product::query()->latest()->paginate(20);

        return [
            'products' => [
                'data' => ProductResource::collection($products->items()),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'total' => $products->total(),
            ],
        ];
    }

    public function store(Request $request): ProductResource
    {
        $this->authorizeEdit($request);
        $data = $this->validated($request);
        $data['slug'] = Str::slug($data['slug'] ?? $data['name']);
        Validator::make(['slug' => $data['slug']], ['slug' => ['required', Rule::unique('products', 'slug')]])->validate();
        abort_if($data['status'] === 'published' && $request->user()->role === 'editor', 403);

        return new ProductResource(Product::create($data));
    }

    public function show(Product $product): ProductResource
    {
        return new ProductResource($product);
    }

    public function update(Request $request, Product $product): ProductResource
    {
        $this->authorizeEdit($request);
        $data = $this->validated($request, $product);
        if (isset($data['slug'])) {
            $data['slug'] = Str::slug($data['slug']);
            Validator::make(['slug' => $data['slug']], ['slug' => ['required', Rule::unique('products', 'slug')->ignore($product->id)]])->validate();
        }
        if (($data['status'] ?? $product->status) === 'published' && $request->user()->role === 'editor') {
            abort(403);
        }
        $product->update($data);

        return new ProductResource($product);
    }

    public function uploadImage(Request $request, Product $product, ProductImageOptimizer $optimizer): ProductResource
    {
        $this->authorizeEdit($request);
        $data = $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240', 'dimensions:max_width=4000,max_height=4000'],
            'image_alt' => ['nullable', 'string', 'max:190'],
        ]);
        $newPath = $optimizer->store($data['image']);
        $oldPath = $product->image_path;
        $product->update(['image_path' => $newPath, 'image_alt' => ($data['image_alt'] ?? null) ?: $product->name]);
        if ($oldPath) {
            Storage::disk('public')->delete($oldPath);
        }

        return new ProductResource($product);
    }

    private function authorizeEdit(Request $request): void
    {
        abort_unless(in_array($request->user()->role, ['owner', 'manager', 'editor'], true), 403);
    }

    private function validated(Request $request, ?Product $product = null): array
    {
        $required = $product ? 'sometimes' : 'required';

        return $request->validate([
            'slug' => ['nullable', 'string', 'max:190', Rule::unique('products', 'slug')->ignore($product?->id)],
            'code' => ['nullable', 'string', 'max:80', Rule::unique('products', 'code')->ignore($product?->id)],
            'name' => [$required, 'string', 'min:2', 'max:190'],
            'audience' => [$required, Rule::in(['men', 'women', 'kids'])],
            'construction' => [$required, Rule::in(['knit', 'woven', 'fully-fashioned-knitwear'])],
            'type' => [$required, 'string', 'max:80'],
            'description' => ['nullable', 'string', 'max:4000'],
            'details' => ['nullable', 'array', 'max:20'],
            'details.*' => ['nullable', 'string', 'max:300'],
            'status' => [$required, Rule::in(['draft', 'published'])],
            'seo_title' => ['nullable', 'string', 'max:190'],
            'seo_description' => ['nullable', 'string', 'max:300'],
        ]);
    }
}
