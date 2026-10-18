<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\FoundationService;
use Illuminate\Http\JsonResponse;

class FoundationController extends Controller
{
    public function __invoke(FoundationService $foundation): JsonResponse
    {
        return response()->json(['data' => $foundation->publicData()]);
    }
}
