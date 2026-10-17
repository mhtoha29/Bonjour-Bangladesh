<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table): void {
            $table->string('key')->primary();
            $table->text('value');
            $table->timestamps();
        });

        Schema::create('media_assets', function (Blueprint $table): void {
            $table->ulid('id')->primary();
            $table->string('disk');
            $table->string('path');
            $table->string('alt_text')->nullable();
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->string('status')->default('pending');
            $table->string('visibility')->default('private');
            $table->timestamps();
        });

        Schema::create('pages', function (Blueprint $table): void {
            $table->ulid('id')->primary();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('status')->default('draft')->index();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->timestamps();
        });

        Schema::create('page_blocks', function (Blueprint $table): void {
            $table->ulid('id')->primary();
            $table->foreignUlid('page_id')->constrained()->cascadeOnDelete();
            $table->foreignUlid('media_asset_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->json('content');
            $table->timestamps();
            $table->unique(['page_id', 'type', 'sort_order']);
        });

        Schema::create('navigation_items', function (Blueprint $table): void {
            $table->ulid('id')->primary();
            $table->string('location');
            $table->string('label');
            $table->string('href');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(false);
            $table->timestamps();
            $table->unique(['location', 'href']);
        });

        Schema::create('taxonomy_terms', function (Blueprint $table): void {
            $table->ulid('id')->primary();
            $table->string('kind');
            $table->string('slug');
            $table->string('label');
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->boolean('is_published')->default(false);
            $table->timestamps();
            $table->unique(['kind', 'slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('taxonomy_terms');
        Schema::dropIfExists('navigation_items');
        Schema::dropIfExists('page_blocks');
        Schema::dropIfExists('pages');
        Schema::dropIfExists('media_assets');
        Schema::dropIfExists('site_settings');
    }
};
