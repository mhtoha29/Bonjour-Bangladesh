<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogPostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $words = str_word_count(strip_tags($this->body));

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => $this->title,
            'category' => $this->category,
            'excerpt' => $this->excerpt,
            'body' => $this->body,
            'author_name' => $this->author_name,
            'cover_image' => $this->cover_image_url ? [
                'src' => $this->cover_image_url,
                'alt' => $this->cover_image_alt ?: $this->title,
            ] : null,
            'status' => $this->status,
            'featured' => $this->featured,
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
            'focus_keyword' => $this->focus_keyword,
            'reading_time' => max(1, (int) ceil($words / 220)),
            'published_at' => $this->published_at?->toAtomString(),
            'updated_at' => $this->updated_at?->toAtomString(),
        ];
    }
}
