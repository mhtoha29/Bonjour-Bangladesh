<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'code' => $this->code,
            'name' => $this->name,
            'audience' => $this->audience,
            'construction' => $this->construction,
            'type' => $this->type,
            'description' => $this->description,
            'details' => (object) ($this->details ?? []),
            'image' => $this->image_url ? ['src' => $this->image_url, 'alt' => $this->image_alt ?: $this->name] : null,
            'status' => $this->status,
            'seo_title' => $this->seo_title,
            'seo_description' => $this->seo_description,
            'created_at' => $this->created_at,
        ];
    }
}
