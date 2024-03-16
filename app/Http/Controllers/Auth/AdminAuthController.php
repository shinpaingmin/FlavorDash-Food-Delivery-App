<?php

namespace App\Http\Controllers\Auth;

use Storage;
use App\Models\User;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Mail\RegisteredRestaurant;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class AdminAuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Store a new registration for restaurant
        // logger($request->all());

        $validate = $this->validation($request);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error',
                'data' => $validate->errors()
            ], 422);
        }

        $userData = [
            'name' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'admin',
        ];

        $userId = User::create($userData)->id;

        // $fileName = uniqid() . $request->image->getClientOriginalName();

        // $image = $request->image->storeAs('public', $fileName);

        $storeData = [
            'user_id' => $userId,
            'restaurant_type_id' => $request->type,
            'restaurant_township_id' => $request->township,
            'name' => $request->storeName,
            'address' => $request->storeAddress,
            'lat' => $request->latitude,
            'long' => $request->longitude,
            'phone' => $request->storePhone,
            'pricing' => $request->pricing,
            'opening_time' => $request->opening_time,
            'closing_time' => $request->closing_time,
            'from_day' => $request->from_day,
            'to_day' => $request->to_day,
            // 'image' => $fileName,
        ];

        $store = Restaurant::create($storeData);

        // Mail::to($user)->send(new RegisteredRestaurant($store));

        return response()->json([
            'status' => 'success',
            'message' => 'New restaurant is created successfully!',
            'data' => $store,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    /* private functions */
    // validation function
    private function validation($request) {
        return $validate = Validator::make($request->all(), [
            'username' => 'required|string|min:5|max:50',
            'email' => 'required|string|email:rfc,dns|min:15|max:100|unique:users,email',
            'password' => ['required', 'string', Password::min(8)->mixedCase()->numbers()->symbols(), 'confirmed'],
            'storeName' => 'required|string|min:5|max:150|unique:restaurants,name',
            'storeAddress' => 'required|string|min:8|unique:restaurants,address',
            // 'latitude' => 'required|decimal:2,4|unique:restaurants,lat',
            // 'longitude' => 'required|decimal:2,4|unique:restaurants,long',
            'township' => 'required|integer',
            'storePhone' => 'required|string|min:9|max:15|unique:restaurants,phone',
            'type' => 'required|integer',
            'pricing' => 'required|string',
            'opening_time' => 'required',
            'closing_time' => 'required',
            'from_day' => 'required|integer',
            'to_day' => 'required|integer',
            // 'image' => ['required', File::image()->max(2048)]   // up to 2 MB
        ]);
    }
}
