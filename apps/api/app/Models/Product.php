<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['slug', 'code', 'name', 'audience', 'construction', 'type', 'description', 'details', 'image_path', 'image_alt', 'status', 'seo_title', 'seo_description'])]
class Product extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return ['details' => 'array'];
    }

    protected function imageUrl(): Attribute
    {
        return Attribute::get(fn (): ?string => $this->image_path ? url('/storage/'.$this->image_path) : null);
    }
}
