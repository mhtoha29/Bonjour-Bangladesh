<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBlogPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'slug' => ['nullable', 'string', 'max:190', Rule::unique('blog_posts', 'slug')],
            'title' => ['required', 'string', 'min:5', 'max:190'],
            'category' => ['required', 'string', 'max:80'],
            'excerpt' => ['required', 'string', 'min:30', 'max:500'],
            'body' => ['required', 'string', 'min:200', 'max:60000'],
            'author_name' => ['required', 'string', 'max:120'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'featured' => ['sometimes', 'boolean'],
            'seo_title' => ['nullable', 'string', 'max:70'],
            'seo_description' => ['nullable', 'string', 'max:170'],
            'focus_keyword' => ['nullable', 'string', 'max:120'],
        ];
    }
}
