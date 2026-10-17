<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Throwable;

class AdminTeamController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $this->authorizeOwner($request);

        return response()->json(['users' => User::query()->select(['id', 'name', 'email', 'role', 'is_active', 'avatar_path', 'created_at'])->orderBy('name')->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $this->authorizeOwner($request);
        $request->merge(['email' => Str::lower((string) $request->input('email'))]);
        $data = $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:120'],
            'email' => ['required', 'email', 'max:190', 'unique:users,email'],
            'role' => ['required', Rule::in(['manager', 'editor', 'viewer'])],
        ]);
        $data['email'] = Str::lower($data['email']);
        $data['password'] = Str::random(80);
        $data['is_active'] = true;
        $user = User::create($data);
        $inviteStatus = $this->sendSetupLink($user);

        return response()->json([
            'user' => (new AdminAuthController)->presentUser($user),
            'invitation_status' => $inviteStatus === Password::RESET_LINK_SENT ? 'submitted' : 'pending',
        ], 201);
    }

    public function update(Request $request, User $user): JsonResponse
    {
        $this->authorizeOwner($request);
        abort_if($user->role === 'owner', 403);
        $data = $request->validate([
            'role' => ['sometimes', Rule::in(['manager', 'editor', 'viewer'])],
            'is_active' => ['sometimes', 'boolean'],
        ]);
        $user->update($data);
        if ($user->is_active === false) {
            $user->adminSessions()->delete();
        }

        return response()->json(['user' => (new AdminAuthController)->presentUser($user)]);
    }

    public function invite(Request $request, User $user): JsonResponse
    {
        $this->authorizeOwner($request);
        abort_if($user->role === 'owner' || ! $user->is_active, 403);
        $status = $this->sendSetupLink($user);

        return response()->json(['invitation_status' => $status === Password::RESET_LINK_SENT ? 'submitted' : 'pending']);
    }

    private function authorizeOwner(Request $request): void
    {
        abort_unless($request->user()->role === 'owner', 403);
    }

    private function sendSetupLink(User $user): string
    {
        try {
            return Password::sendResetLink(['email' => $user->email]);
        } catch (Throwable $exception) {
            Log::warning('Team account setup mail failed.', ['user_id' => $user->id]);

            return 'mail_unavailable';
        }
    }
}
