<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductCatalogTest extends TestCase
{
    use RefreshDatabase;

    public function test_only_published_products_are_public_and_filters_are_paginated(): void
    {
        Product::factory()->published()->count(14)->create();
        Product::factory()->create(['audience' => 'women']);

        $this->getJson('/api/v1/products?audience=men')->assertOk()
            ->assertJsonCount(12, 'data')
            ->assertJsonPath('meta.total', 14)
            ->assertJsonPath('live_count', 14);
        $this->getJson('/api/v1/products?audience=women')->assertOk()->assertJsonCount(0, 'data');
    }

    public function test_admin_image_upload_creates_one_optimized_webp_and_preserves_product(): void
    {
        Storage::fake('public');
        $product = Product::factory()->create();
        $token = $this->loginAs('owner');

        $this->withToken($token)->post('/api/v1/admin/products/'.$product->id.'/image', [
            'image' => UploadedFile::fake()->image('shirt.jpg', 2400, 1800),
            'image_alt' => 'Woven shirt on mannequin',
        ])->assertOk()->assertJsonPath('data.image.alt', 'Woven shirt on mannequin');

        $product->refresh();
        $this->assertStringEndsWith('.webp', $product->image_path);
        Storage::disk('public')->assertExists($product->image_path);
        $this->assertSame(1800, getimagesizefromstring(Storage::disk('public')->get($product->image_path))[0]);
    }

    public function test_editor_cannot_publish_a_product(): void
    {
        $token = $this->loginAs('editor');

        $this->withToken($token)->postJson('/api/v1/admin/products', [
            'name' => 'Woven Oxford Shirt',
            'audience' => 'men',
            'construction' => 'woven',
            'type' => 'Shirt',
            'status' => 'published',
        ])->assertForbidden();
    }

    private function loginAs(string $role): string
    {
        $email = $role.'@example.com';
        User::factory()->create(['email' => $email, 'role' => $role, 'password' => 'SecurePassword123']);

        return $this->postJson('/api/v1/admin/login', ['email' => $email, 'password' => 'SecurePassword123'])
            ->assertOk()->json('token');
    }
}
