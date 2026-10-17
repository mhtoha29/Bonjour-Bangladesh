<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('code', 80)->nullable()->unique();
            $table->string('name');
            $table->string('audience', 12);
            $table->string('construction', 40);
            $table->string('type', 80);
            $table->text('description')->nullable();
            $table->json('details')->nullable();
            $table->string('image_path')->nullable();
            $table->string('image_alt')->nullable();
            $table->string('status', 20)->default('draft');
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->timestamps();
            $table->index(['status', 'audience', 'construction']);
            $table->index(['status', 'type']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
