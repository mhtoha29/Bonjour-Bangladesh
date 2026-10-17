<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<Product> */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        $name = fake()->unique()->words(3, true);

        return [
            'slug' => Str::slug($name),
            'code' => 'BB-'.fake()->unique()->numerify('#####'),
            'name' => ucfirst($name),
            'audience' => 'men',
            'construction' => 'woven',
            'type' => 'Shirt',
            'description' => fake()->sentence(),
            'status' => 'draft',
        ];
    }

    public function published(): static
    {
        return $this->state(fn (): array => ['status' => 'published']);
    }
}
