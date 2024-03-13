<?php

namespace App\Http\Controllers\User;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\RestaurantType;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class RestaurantTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieving all the restaurant types
        $types = RestaurantType::orderBy('type', 'asc')->get();

        if(is_null($types->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No restaurant type found!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Restaurant types retrieved successfully!',
            'data' => $types
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // creating new restaurant type
        $validate = $this->validation($request);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error'
            ], 422);
        }

        $type = RestaurantType::create($request->all());

        $response = [
            'status' => 'success',
            'message' => 'Restaurant type is added successfully!',
            'data' => $type
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        // Display specific type
        $type = RestaurantType::find($id);

        if(is_null($type)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No restaurant type found'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Restaurant type retrieved successfully!',
            'data' => $type
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        // Update restaurant type
        $validate = $this->validation($request, $id);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error'
            ], 422);
        }

        $type = RestaurantType::find($id);

        if(is_null($type)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No such restaurant type found'
            ], 200);
        }

        $data = $request->all();
        $data['updated_at'] = Carbon::now();

        $type->update($data);

        $response = [
            'status' => 'success',
            'message' => 'Restaurant type is updated successfully!',
            'data' => $type
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        // destroy restaurant type
        $type = RestaurantType::find($id);

        if(is_null($type)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No restaurant type found'
            ], 200);
        }

        RestaurantType::destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Restaurant type is deleted successfully!',
        ], 200);
    }

    // search function by type name
    public function search($name) {
        $types = RestaurantType::where('type', 'like', '%' . $name . '%')->latest()->get();

        if(is_null($types->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No restaurant type found'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Restaurant types retrieved successfully!',
            'data' => $types
        ];

        return response()->json($response, 200);
    }

    /* private functions */
    // validation function
    private function validation($request, $id=null) {
        return $validate = Validator::make($request->all(), [
            'type' => 'required|string|min:5|max:100|unique:restaurant_types,type,' . $id,
        ]);
    }
}
