<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PageBlock extends Model
{
    use HasUlids;

    protected $fillable = [
        'page_id', 'media_asset_id', 'type', 'sort_order', 'content',
    ];

    protected function casts(): array
    {
        return ['content' => 'array'];
    }

    public function mediaAsset(): BelongsTo
    {
        return $this->belongsTo(MediaAsset::class);
    }
}
