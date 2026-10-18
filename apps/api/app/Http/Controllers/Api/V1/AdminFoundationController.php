<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadFoundationImageRequest;
use App\Services\FoundationService;
use App\Services\ProductImageOptimizer;
use Illuminate\Http\JsonResponse;

class AdminFoundationController extends Controller
{
    public function show(FoundationService $foundation): JsonResponse
    {
        return response()->json(['foundation' => $foundation->adminData()]);
    }

    public function upload(
        UploadFoundationImageRequest $request,
        int $slot,
        FoundationService $foundation,
        ProductImageOptimizer $optimizer,
    ): JsonResponse {
        $data = $request->validated();

        return response()->json([
            'foundation' => $foundation->upload($slot, $data['image'], $data['alt'], $data['caption'] ?? null, $optimizer),
        ]);
    }
}
