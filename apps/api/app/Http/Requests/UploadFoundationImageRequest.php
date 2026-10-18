<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadFoundationImageRequest extends FormRequest
{
    public function authorize(): bool
    {
        return in_array($this->user()?->role, ['owner', 'manager', 'editor'], true);
    }

    public function rules(): array
    {
        return [
            'image' => ['required', 'image', 'mimes:jpg,jpeg,png,webp', 'max:10240', 'dimensions:max_width=5000,max_height=5000'],
            'alt' => ['required', 'string', 'max:190'],
            'caption' => ['nullable', 'string', 'max:190'],
        ];
    }
}
