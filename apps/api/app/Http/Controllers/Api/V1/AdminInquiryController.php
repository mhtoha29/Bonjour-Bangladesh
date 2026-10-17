<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminInquiryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'status' => ['nullable', Rule::in(['new', 'contacted', 'qualified', 'closed'])],
            'search' => ['nullable', 'string', 'max:100'],
        ]);
        $query = Inquiry::query()->latest();
        if (isset($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        if (isset($filters['search'])) {
            $search = $filters['search'];
            $query->where(fn ($builder) => $builder->where('name', 'like', "%$search%")
                ->orWhere('email', 'like', "%$search%")
                ->orWhere('company', 'like', "%$search%"));
        }

        return response()->json([
            'inquiries' => $query->paginate(20),
            'new_count' => Inquiry::where('status', 'new')->count(),
        ]);
    }

    public function show(Inquiry $inquiry): JsonResponse
    {
        return response()->json(['inquiry' => $inquiry]);
    }

    public function update(Request $request, Inquiry $inquiry): JsonResponse
    {
        abort_unless(in_array($request->user()->role, ['owner', 'manager'], true), 403);
        $data = $request->validate(['status' => ['required', Rule::in(['new', 'contacted', 'qualified', 'closed'])]]);
        $inquiry->update($data);

        return response()->json(['inquiry' => $inquiry]);
    }

    public function attachment(Inquiry $inquiry): StreamedResponse
    {
        abort_unless($inquiry->attachment_path && Storage::disk('local')->exists($inquiry->attachment_path), 404);

        return Storage::disk('local')->download($inquiry->attachment_path, $inquiry->attachment_name);
    }
}
