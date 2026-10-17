<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ProductImageOptimizer
{
    public function store(UploadedFile $file, string $directory = 'products'): string
    {
        if (! function_exists('imagewebp')) {
            throw ValidationException::withMessages(['image' => 'WebP image optimization is not available on this server.']);
        }

        $image = match ($file->getMimeType()) {
            'image/jpeg' => imagecreatefromjpeg($file->getRealPath()),
            'image/png' => imagecreatefrompng($file->getRealPath()),
            'image/webp' => imagecreatefromwebp($file->getRealPath()),
            default => false,
        };
        if (! $image) {
            throw ValidationException::withMessages(['image' => 'The image could not be processed.']);
        }

        try {
            $width = imagesx($image);
            $height = imagesy($image);
            $scale = min(1, 1800 / max($width, $height));
            $targetWidth = max(1, (int) round($width * $scale));
            $targetHeight = max(1, (int) round($height * $scale));
            $target = imagecreatetruecolor($targetWidth, $targetHeight);
            imagealphablending($target, false);
            imagesavealpha($target, true);
            imagecopyresampled($target, $image, 0, 0, 0, 0, $targetWidth, $targetHeight, $width, $height);
            ob_start();
            $encoded = imagewebp($target, null, 82);
            $bytes = ob_get_clean();
            imagedestroy($target);
            if (! $encoded || ! $bytes) {
                throw ValidationException::withMessages(['image' => 'The image could not be optimized.']);
            }
            $path = $directory.'/'.bin2hex(random_bytes(16)).'.webp';
            if (! Storage::disk('public')->put($path, $bytes)) {
                throw ValidationException::withMessages(['image' => 'The optimized image could not be saved.']);
            }

            return $path;
        } finally {
            imagedestroy($image);
        }
    }
}
