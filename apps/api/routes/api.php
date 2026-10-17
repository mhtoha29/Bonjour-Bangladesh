<?php

use App\Http\Controllers\Api\V1\AdminAuthController;
use App\Http\Controllers\Api\V1\AdminBlogController;
use App\Http\Controllers\Api\V1\AdminInquiryController;
use App\Http\Controllers\Api\V1\AdminProductController;
use App\Http\Controllers\Api\V1\AdminProfileController;
use App\Http\Controllers\Api\V1\AdminSiteController;
use App\Http\Controllers\Api\V1\AdminTeamController;
use App\Http\Controllers\Api\V1\InquiryController;
use App\Http\Controllers\Api\V1\PublicBlogController;
use App\Http\Controllers\Api\V1\PublicProductController;
use App\Http\Controllers\Api\V1\SiteController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (): void {
    Route::get('/site', SiteController::class);
    Route::get('/products', [PublicProductController::class, 'index']);
    Route::get('/products/slugs', [PublicProductController::class, 'slugs']);
    Route::get('/products/{slug}', [PublicProductController::class, 'show']);
    Route::get('/blog', [PublicBlogController::class, 'index']);
    Route::get('/blog/slugs', [PublicBlogController::class, 'slugs']);
    Route::get('/blog/{slug}', [PublicBlogController::class, 'show']);
    Route::post('/inquiries', [InquiryController::class, 'store'])->middleware('throttle:6,1');

    Route::prefix('admin')->group(function (): void {
        Route::post('/login', [AdminAuthController::class, 'login'])->middleware('throttle:5,1');
        Route::post('/forgot-password', [AdminAuthController::class, 'forgotPassword'])->middleware('throttle:5,1');
        Route::post('/reset-password', [AdminAuthController::class, 'resetPassword'])->middleware('throttle:5,1');

        Route::middleware('admin.token')->group(function (): void {
            Route::get('/me', [AdminAuthController::class, 'me']);
            Route::post('/logout', [AdminAuthController::class, 'logout']);
            Route::get('/inquiries', [AdminInquiryController::class, 'index']);
            Route::get('/inquiries/{inquiry}', [AdminInquiryController::class, 'show']);
            Route::patch('/inquiries/{inquiry}', [AdminInquiryController::class, 'update']);
            Route::get('/inquiries/{inquiry}/attachment', [AdminInquiryController::class, 'attachment']);
            Route::get('/team', [AdminTeamController::class, 'index']);
            Route::post('/team', [AdminTeamController::class, 'store']);
            Route::patch('/team/{user}', [AdminTeamController::class, 'update']);
            Route::post('/team/{user}/invite', [AdminTeamController::class, 'invite']);
            Route::post('/profile', [AdminProfileController::class, 'update']);
            Route::get('/products', [AdminProductController::class, 'index']);
            Route::post('/products', [AdminProductController::class, 'store']);
            Route::get('/products/{product}', [AdminProductController::class, 'show']);
            Route::patch('/products/{product}', [AdminProductController::class, 'update']);
            Route::post('/products/{product}/image', [AdminProductController::class, 'uploadImage']);
            Route::get('/blog', [AdminBlogController::class, 'index']);
            Route::post('/blog', [AdminBlogController::class, 'store']);
            Route::get('/blog/{post}', [AdminBlogController::class, 'show']);
            Route::patch('/blog/{post}', [AdminBlogController::class, 'update']);
            Route::post('/blog/{post}/cover', [AdminBlogController::class, 'uploadCover']);
            Route::get('/site', [AdminSiteController::class, 'show']);
            Route::patch('/site', [AdminSiteController::class, 'update']);
            Route::post('/site/hero-image', [AdminSiteController::class, 'uploadHeroImage']);
        });
    });
});
