<?php

namespace App\Models;

use Database\Factories\BlogPostFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'slug', 'title', 'category', 'excerpt', 'body', 'author_name', 'cover_image_path',
    'cover_image_alt', 'status', 'featured', 'seo_title', 'seo_description',
    'focus_keyword', 'published_at',
])]
class BlogPost extends Model
{
    /** @use HasFactory<BlogPostFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'featured' => 'boolean',
            'published_at' => 'datetime',
        ];
    }

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published')
            ->whereNotNull('published_at')
            ->where('published_at', '<=', now());
    }

    protected function coverImageUrl(): Attribute
    {
        return Attribute::get(function (): ?string {
            if (! $this->cover_image_path) {
                return null;
            }

            return str_starts_with($this->cover_image_path, '/')
                ? $this->cover_image_path
                : url('/storage/'.$this->cover_image_path);
        });
    }
}
