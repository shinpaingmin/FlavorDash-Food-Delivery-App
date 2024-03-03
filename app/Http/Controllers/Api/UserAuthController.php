<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{
    public function signup(Request $request) {
        // sign up validation
        $validate = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'email' => 'required|string|email:rfc,dns|max:100|unique:users,email',
            'password' => 'required|string|min:8|confirmed'
        ]);

        // if sign up fails
        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 422);    // 422 = validation failed
        }

        // if sign up success
        // User is created
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        // Store token and user in data array
        $data['token'] = $user->createToken($request->email)->accessToken;
        $data['user'] = $user;

        // response array
        $response = [
            'status' => 'success',
            'message' => 'User is created successfully.',
            'data' => $data,
        ];

        // response with json obj
        return response()->json($response, 201); // 201 = created successfully
    }

    public function login(Request $request) {
        // login validation
        $validate = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 422);
        }

        // Check email exists
        $user = User::where('email', $request->email)->first();

        // Check password
        if(!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid credentials',
            ], 401);    // 401 = invalid credentials
        }

        // if login success
        $data['token'] = $user->createToken($request->email)->accessToken;
        $data['user'] = $user;

        $response = [
            'status' => 'success',
            'message' => 'User is logged in successfully.',
            'data' => $data,
        ];

        return response()->json($response, 200); // 200 = request success
    }

    public function logout(Request $request) {
        // delete tokens associated with logged in user
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User is logged out successfully.'
        ], 200); // 200 = request success
    }
}
