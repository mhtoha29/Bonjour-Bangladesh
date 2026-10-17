<?php

namespace Database\Factories;

use App\Models\MediaAsset;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<MediaAsset>
 */
class MediaAssetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'disk' => 'public',
            'path' => 'hero/'.fake()->uuid().'.webp',
            'alt_text' => 'Garment detail',
            'width' => 1600,
            'height' => 900,
            'status' => 'ready',
            'visibility' => 'public',
        ];
    }
}
