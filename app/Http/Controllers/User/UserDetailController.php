<?php

namespace App\Http\Controllers\User;

use App\Models\UserDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UserDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieve data
        $user_details = UserDetail::where('user_id', auth()->user()->id)->first();

        if(is_null($user_details)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No data found',
            ], 200);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'User details retrieved successfully!',
            'data' => $user_details,
        ], 200);
    }

    // function for create and update
    public function createUpdate(Request $request) {
        $validation = Validator::make($request->all(), [
            'address' => 'required|string|min:5',
            'phone' => 'required|string|min:9|max:15'
        ]);

        if($validation->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validation->errors(),
            ], 422);
        }

        $existing_user_detail = UserDetail::where('user_id', auth()->user()->id)->first();

        if(is_null($existing_user_detail)) {
            $user_details = UserDetail::create([
                'user_id' => auth()->user()->id,
                'address' => $request->address,
                'phone' => $request->phone,
                'detailed_address' => $request->detailed_address,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Added User Detail Successfully!',
                'data' => $user_details
            ], 200);
        }

        $newData = [
            'user_id' => auth()->user()->id,
            'address' => $request->address,
            'phone' => $request->phone,
            'detailed_address' => $request->detailed_address,
        ];

        $existing_user_detail->update($newData);

        return response()->json([
            'status' => 'success',
            'message' => 'Updated user detail successfully!',
            'data' => $newData,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
}
