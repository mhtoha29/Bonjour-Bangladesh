<?php

namespace Database\Factories;

use App\Models\BlogPost;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<BlogPost> */
class BlogPostFactory extends Factory
{
    protected $model = BlogPost::class;

    public function definition(): array
    {
        $title = fake()->unique()->sentence(7);

        return [
            'slug' => Str::slug($title),
            'title' => $title,
            'category' => 'Sourcing guidance',
            'excerpt' => fake()->paragraph(),
            'body' => "## A practical starting point\n\n".fake()->paragraphs(4, true),
            'status' => 'draft',
        ];
    }

    public function published(): static
    {
        return $this->state(fn (): array => ['status' => 'published', 'published_at' => now()]);
    }
}
