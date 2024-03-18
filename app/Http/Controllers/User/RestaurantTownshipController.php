<?php

namespace App\Http\Controllers\User;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\RestaurantTownship;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class RestaurantTownshipController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieving all the restaurant townships
        $townships = RestaurantTownship::orderBy('township', 'asc')->get();

        if(is_null($townships->first())) {
            return response()->json([
                'status' => 'success',
                'message' => 'No township found!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Townships retrieved successfully!',
            'data' => $townships
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // creating new restaurant townships
        $validate = $this->validation($request);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error',
                'data' => $validate->errors(),
            ], 422);
        }

        $township = RestaurantTownship::create($request->all());

        $response = [
            'status' => 'success',
            'message' => 'Township is added successfully!',
            'data' => $township
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        // Display specific township
        $township = RestaurantTownship::find($id);

        if(is_null($township)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No township found'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Township retrieved successfully!',
            'data' => $township
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        // Update store details
        $validate = $this->validation($request, $id);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error'
            ], 422);
        }

        $township = RestaurantTownship::find($id);

        if(is_null($township)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No such township found'
            ], 200);
        }

        $data = $request->all();
        $data['updated_at'] = Carbon::now();

        $township->update($data);

        $response = [
            'status' => 'success',
            'message' => 'Township is updated successfully!',
            'data' => $township
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        // destroy township
        $township = RestaurantTownship::find($id);

        if(is_null($township)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Not found'
            ], 200);
        }

        RestaurantTownship::destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Township is deleted successfully!',
        ], 200);
    }

    // search function by township name
    public function search($name) {
        $townships = RestaurantTownship::where('township', 'like', '%' . $name . '%')->latest()->get();

        if(is_null($townships->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No township found'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Townships retrieved successfully!',
            'data' => $townships
        ];

        return response()->json($response, 200);
    }

    /* private functions */
    // validation function
    private function validation($request, $id=null) {
        return $validate = Validator::make($request->all(), [
            'township' => 'required|string|min:5|max:100|unique:restaurant_townships,township,' . $id,
        ]);
    }
}
