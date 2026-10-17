<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AdminSession;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password as PasswordRule;
use Throwable;

class AdminAuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $credentials = $request->validate(['email' => ['required', 'email'], 'password' => ['required', 'string']]);
        $user = User::where('email', Str::lower($credentials['email']))->first();
        if (! $user?->is_active || ! Hash::check($credentials['password'], $user->password)) {
            return response()->json(['message' => 'Invalid email or password.'], 422);
        }

        $token = Str::random(80);
        AdminSession::create(['user_id' => $user->id, 'token_hash' => hash('sha256', $token), 'expires_at' => now()->addHours(12)]);

        return response()->json(['token' => $token, 'user' => $this->presentUser($user)]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json(['user' => $this->presentUser($request->user())]);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->attributes->get('admin_session')->delete();

        return response()->json(['message' => 'Signed out.']);
    }

    public function forgotPassword(Request $request): JsonResponse
    {
        $email = Str::lower($request->validate(['email' => ['required', 'email']])['email']);
        if (User::where('email', $email)->where('is_active', true)->exists()) {
            try {
                Password::sendResetLink(['email' => $email]);
            } catch (Throwable $exception) {
                Log::warning('Admin password reset mail failed.');
            }
        }

        return response()->json(['message' => 'If this account exists, a reset link has been sent.']);
    }

    public function resetPassword(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'token' => ['required', 'string'],
            'password' => ['required', 'confirmed', PasswordRule::min(12)->letters()->numbers()],
        ]);
        $data['email'] = Str::lower($data['email']);
        $status = Password::reset($data, function (User $user, string $password): void {
            $user->forceFill(['password' => Hash::make($password), 'remember_token' => Str::random(60)])->save();
            AdminSession::where('user_id', $user->id)->delete();
            event(new PasswordReset($user));
        });

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password updated. You can sign in now.'])
            : response()->json(['message' => 'This reset link is invalid or expired.'], 422);
    }

    public function presentUser(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'is_active' => $user->is_active,
            'avatar_url' => $user->avatar_path ? url('/storage/'.$user->avatar_path) : null,
        ];
    }
}
