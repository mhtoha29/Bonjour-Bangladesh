<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Mail\Message;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;
use Throwable;

class InquiryController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'source' => ['required', Rule::in(['contact', 'popup', 'quote'])],
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:190'],
            'company' => ['nullable', 'string', 'max:190'],
            'phone' => ['nullable', 'string', 'max:40'],
            'message' => ['required', 'string', 'min:8', 'max:4000'],
            'details' => ['nullable', 'array', 'max:20'],
            'details.*' => ['nullable', 'string', 'max:300'],
            'attachment' => ['nullable', 'file', 'mimes:pdf,doc,docx,jpg,jpeg,png,webp', 'max:10240'],
            'website' => ['nullable', 'max:0'],
        ]);

        if ($request->filled('website')) {
            return response()->json(['message' => 'Thank you. Your inquiry has been received.'], 201);
        }

        unset($validated['website'], $validated['attachment']);
        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $validated['attachment_path'] = $file->store('inquiries', 'local');
            $validated['attachment_name'] = $file->getClientOriginalName();
        }

        $inquiry = Inquiry::create($validated);
        $recipient = (string) config('inquiries.recipient');
        $detailLines = collect($inquiry->details ?? [])->map(fn ($value, $key) => "$key: $value")->implode("\n");
        $body = "New Bonjour Bangladesh inquiry #{$inquiry->id}\n\n"
            ."Source: {$inquiry->source}\nName: {$inquiry->name}\nEmail: {$inquiry->email}\n"
            ."Company: {$inquiry->company}\nPhone: {$inquiry->phone}\n\n"
            ."Message:\n{$inquiry->message}\n\n{$detailLines}\n\n"
            .'Open the admin dashboard to review the lead'.($inquiry->attachment_path ? ' and its private attachment.' : '.');

        try {
            Mail::raw($body, function (Message $mail) use ($inquiry, $recipient): void {
                $mail->to($recipient)->replyTo($inquiry->email, preg_replace('/[\r\n]+/', ' ', $inquiry->name))->subject("New Bonjour inquiry #{$inquiry->id}");
            });
            $inquiry->update(['email_status' => 'sent']);
        } catch (Throwable $exception) {
            $inquiry->update(['email_status' => 'failed']);
            Log::warning('Inquiry notification could not be handed to the mail transport.', ['inquiry_id' => $inquiry->id]);
        }

        return response()->json(['message' => 'Thank you. Your inquiry has been received.', 'reference' => $inquiry->id], 201);
    }
}
