<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Services\PublicSiteService;
use Illuminate\Http\JsonResponse;

class SiteController extends Controller
{
    public function __invoke(PublicSiteService $site): JsonResponse
    {
        return response()->json(['data' => $site->home()]);
    }
}
