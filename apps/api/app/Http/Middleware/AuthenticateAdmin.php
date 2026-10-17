<?php

namespace App\Http\Middleware;

use App\Models\AdminSession;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        if (! $token) {
            abort(401);
        }

        $session = AdminSession::with('user')
            ->where('token_hash', hash('sha256', $token))
            ->where('expires_at', '>', now())
            ->first();

        if (! $session?->user?->is_active) {
            abort(401);
        }

        $request->setUserResolver(fn (?string $guard = null) => $session->user);
        $request->attributes->set('admin_session', $session);

        return $next($request);
    }
}
