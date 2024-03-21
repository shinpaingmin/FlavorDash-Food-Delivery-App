<?php

namespace App\Http\Controllers\User;

use App\Models\MenuSize;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class MenuSizeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieving all the menu sizes
        $sizes = MenuSize::get();

        if(is_null($sizes->first())) {
            return response()->json([
                'status' => 'success',
                'message' => 'No menu size found'
            ], 200);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Retrieved all the menu sizes',
            'data' => $sizes,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // store menu sizes

        $validate = Validator::make($request->all(), [
            'size' => 'required|string',
        ]);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error',
                'data' => $validate->errors()
            ], 200);
        }

        $size = MenuSize::create($request->all());

        return response()->json([
            'status' => 'success',
            'message' => 'Added a new menu size',
            'data' => $size
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
}
