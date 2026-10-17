<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

class PublicProductController extends Controller
{
    public function slugs(): JsonResponse
    {
        return response()->json(['products' => Product::where('status', 'published')->orderBy('id')->get(['slug', 'updated_at'])]);
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $filters = $request->validate([
            'q' => ['nullable', 'string', 'max:100'],
            'audience' => ['nullable', Rule::in(['men', 'women', 'kids'])],
            'construction' => ['nullable', Rule::in(['knit', 'woven', 'fully-fashioned-knitwear'])],
            'type' => ['nullable', 'string', 'max:80'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);
        $query = Product::query()->where('status', 'published')->latest();
        if (isset($filters['audience'])) {
            $query->where('audience', $filters['audience']);
        }
        if (isset($filters['construction'])) {
            $query->where('construction', $filters['construction']);
        }
        if (isset($filters['type'])) {
            $query->where('type', $filters['type']);
        }
        if (isset($filters['q'])) {
            $search = $filters['q'];
            $query->where(fn ($builder) => $builder->where('name', 'like', "%$search%")
                ->orWhere('code', 'like', "%$search%")
                ->orWhere('type', 'like', "%$search%"));
        }

        return ProductResource::collection($query->paginate(12))->additional([
            'types' => Product::where('status', 'published')->distinct()->orderBy('type')->pluck('type'),
            'live_count' => Product::where('status', 'published')->count(),
        ]);
    }

    public function show(string $slug): ProductResource
    {
        return new ProductResource(Product::where('slug', $slug)->where('status', 'published')->firstOrFail());
    }
}
