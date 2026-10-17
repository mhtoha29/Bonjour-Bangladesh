<?php

namespace App\Http\Requests;

use App\Models\BlogPost;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBlogPostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        /** @var BlogPost|null $post */
        $post = $this->route('post');

        return [
            'slug' => ['sometimes', 'nullable', 'string', 'max:190', Rule::unique('blog_posts', 'slug')->ignore($post?->id)],
            'title' => ['sometimes', 'required', 'string', 'min:5', 'max:190'],
            'category' => ['sometimes', 'required', 'string', 'max:80'],
            'excerpt' => ['sometimes', 'required', 'string', 'min:30', 'max:500'],
            'body' => ['sometimes', 'required', 'string', 'min:200', 'max:60000'],
            'author_name' => ['sometimes', 'required', 'string', 'max:120'],
            'status' => ['sometimes', 'required', Rule::in(['draft', 'published'])],
            'featured' => ['sometimes', 'boolean'],
            'seo_title' => ['sometimes', 'nullable', 'string', 'max:70'],
            'seo_description' => ['sometimes', 'nullable', 'string', 'max:170'],
            'focus_keyword' => ['sometimes', 'nullable', 'string', 'max:120'],
        ];
    }
}
