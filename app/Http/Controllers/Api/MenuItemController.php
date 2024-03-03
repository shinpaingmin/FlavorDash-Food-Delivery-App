<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // get data by latest date
        $menu_items = MenuItem::latest()->get();

        if(is_null($menu_items->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No item found!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Items retrieved successfully!',
            'data' => $menu_items,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // input validation
        $validate = Validator::make($request->all(), [
            'name' => 'required|string',
            'price' => 'required|integer',
            'quantity' => 'required|integer',
        ]);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 422);
        }

        $menu_item = MenuItem::create([
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
        ]);

        $response = [
            'status' => 'success',
            'messsage' => 'New item is added successfully!',
            'data' => $menu_item
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $menu_item = MenuItem::find($id);

        if(is_null($product)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Item is not found.'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Item is retrieved successfully!',
            'data' => $menu_item,
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // field input validation
        $validate = Validator::make($request->all(), [
            'name' => 'required|string',
            'price' => 'required|integer',
            'quantity' => 'required|integer',
        ]);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
            ], 422);
        }

        // if success
        $menu_item = MenuItem::update([
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
        ]);

        $response = [
            'status' => 'success',
            'message' => 'Item is updated successfully!',
            'data' => $menu_item,
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        MenuItem::destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Item is deleted successfully.'
        ], 200);
    }
}