<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Models\PromoCode;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class VerificationController extends Controller
{
    // verify function
    public function verify($user_id, Request $request) {
        if(!$request->hasValidSignature()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid/Expired url provided.'
            ], 401);
        }

        $user = User::findOrFail($user_id);

        if(!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();

            PromoCode::create([
                'user_id' => $user->id,
                'promo_code' => 'FDnewbie' . uniqid(),
            ]);
        }

        return redirect()->to('http://localhost:3000/feed?status=emailVerified');
    }

    // resend function
    public function resend() {
        if(auth()->user()->hasVerifiedEmail()) {
            return response()->json([
                'message' => 'Email already verified.'
            ], 409);
        }

        auth()->user()->sendEmailVerificationNotification();

        return response()->json([
            'message' => 'Email verification link send to your email'
        ], 200);
    }

    // check if email verify or not
    public function check() {
        if(!auth()->user()->hasVerifiedEmail()) {
            return response()->json([
                'status' => 'not verified',
                'message' => 'Email is not verified.',

            ], 200);
        }

        return response()->json([
            'status' => 'verified',
            'message' => 'Email was verified',
        ], 200);
    }
}
