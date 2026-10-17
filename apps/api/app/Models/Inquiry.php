<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['source', 'name', 'email', 'company', 'phone', 'message', 'details', 'attachment_path', 'attachment_name', 'status', 'email_status'])]
class Inquiry extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return ['details' => 'array'];
    }
}
