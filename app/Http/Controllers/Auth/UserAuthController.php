<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{
    public function signup(Request $request) {
        // signup validation
        $validate = $this->validation($request, 'signup');

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
            'password' => Hash::make($request->password),
            'role' => 'user'
        ]);

        // res data
        $response = $this->resData($user, $request, 'signup');

        // $user->sendEmailVerificationNotification(); // Although implemented queuing, it still delays process so temporarily commented

        // response with json obj
        return response()->json($response, 201); // 201 = created successfully
    }

    public function login(Request $request) {
        // login validation
        $validate = $this->validation($request);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 422);    // 422 = validation failed
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

        // res data
        $response = $this->resData($user, $request);

        return response()->json($response, 200); // 200 = request success
    }

    public function logout(Request $request) {
        // delete tokens associated with logged in user
        $user = $request->user();
        $user->tokens()->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User is logged out successfully.'
        ], 200); // 200 = request success
    }

    /* private functions */
    // validation function
    private function validation($request, $type='login') {
        // login/signup validation
        $rules = [
            'email' => 'required|string|email:rfc,dns|min:15|max:100',
            'password' => 'required|string|min:8|max:50',
        ];

        if($type === 'signup') {
            $rules['name'] = 'required|string|max:50';
            $rules['email'] = 'required|string|email:rfc,dns|max:100|unique:users,email';
            $rules['password'] = 'required|string|min:8|max:50|confirmed';
        }

        return $validate = Validator::make($request->all(), $rules);


    }

    // return response data fn
    private function resData($user, $request, $type='login') {
        // Store token and user in data array
        $data['token'] = $user->createToken($request->email, ["user"])->accessToken;
        $data['user'] = $user;

        // response array
        $response = [
            'status' => 'success',
            'message' => 'User is logged in successfully!',
            'data' => $data,
        ];

        if($type === 'signup') {
            $response['message'] = 'User is created successfully!';
        }

        return $response;
    }
}
