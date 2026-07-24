<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateFromQuery
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($token = $request->query('token')) {
            $request->headers->set('Authorization', 'Bearer ' . $token);
            $accessToken = PersonalAccessToken::findToken($token);
            if ($accessToken) {
                $user = $accessToken->tokenable;
                $request->setUserResolver(fn () => $user);
            }
        }

        return $next($request);
    }
}
