<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AdminSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class AdminProfileController extends Controller
{
    public function update(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name' => ['sometimes', 'string', 'min:2', 'max:120'],
            'avatar' => ['sometimes', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'current_password' => ['required_with:password', 'string'],
            'password' => ['sometimes', 'confirmed', Password::min(12)->letters()->numbers()],
        ]);
        $user = $request->user();
        if (isset($data['password'])) {
            if (! Hash::check($data['current_password'], $user->password)) {
                return response()->json(['message' => 'Current password is incorrect.'], 422);
            }
            $user->password = $data['password'];
            AdminSession::where('user_id', $user->id)->where('id', '!=', $request->attributes->get('admin_session')->id)->delete();
        }
        if (isset($data['name'])) {
            $user->name = $data['name'];
        }
        if ($request->hasFile('avatar')) {
            $old = $user->avatar_path;
            $user->avatar_path = $request->file('avatar')->store('avatars', 'public');
            if ($old) {
                Storage::disk('public')->delete($old);
            }
        }
        $user->save();

        return response()->json(['user' => (new AdminAuthController)->presentUser($user)]);
    }
}
