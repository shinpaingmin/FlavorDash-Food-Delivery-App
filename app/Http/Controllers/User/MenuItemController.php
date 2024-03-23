<?php

namespace App\Http\Controllers\User;

use Storage;
use Carbon\Carbon;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Validator;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id, Request $request)
    {

        $menu_items = MenuItem::select('menu_items.*', 'categories.name as category_name')
                                ->leftJoin('categories', 'menu_items.category_id', 'categories.id')
                                ->where('menu_items.restaurant_id', $id)
                                ->latest()
                                ->get();

        if($request->groupBy === 'categories') {
            $menu_items = $menu_items->groupBy('category_name');
        }

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
        // logger($request->user()->restaurant->id);
        // input validation
        $validate = $this->validation($request);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors(),
            ], 422);
        }


        $fileName = uniqid() . $request->image->getClientOriginalName();

        $request->image->storeAs('public', $fileName);

        $data = $this->resData($request);
        $data['image'] = $fileName;

        $menu_item = MenuItem::create($data);

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

        if(is_null($menu_item)) {
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

        $validate = $this->validation($request, "update");

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error!',
                'data' => $validate->errors()
            ], 422);
        }


        // check the restaurant is valid to modify the item
        $menu_item = MenuItem::where('id', $id)
                                ->where('restaurant_id', auth()->user()->restaurant->id)
                                ->first();


        if(is_null($menu_item)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No item found'
            ], 409);
        }

        $data = $this->resData($request);

        if($request->image) {
            // delete old image
            Storage::delete('public/' . $menu_item->image);

            // generate new image
            $fileName = uniqid() . $request->image->getClientOriginalName();

            $request->image->storeAs('public', $fileName);


            $data['image'] = $fileName;
        }

        $data['updated_at'] = Carbon::now();

        $menu_item->update($data);

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
        $menu_item = MenuItem::find($id);


        if(is_null($menu_item)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Item not found'
            ], 200);
        }

        Storage::delete('public/' . $menu_item->image);
        MenuItem::destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Item is deleted successfully.'
        ], 200);
    }

    // private validation function
    private function validation($request, $action="create") {
        $rules = [
            'category_id' => 'required',
            'name' => 'required|string',
            'normal_price' => 'required|integer',

        ];

        if($action === "create") {
            $rules['image'] = ['required', File::image()->max(2048)];
        } else if($action === "update" && $request->image) {
            $rules['image'] = [File::image()->max(2048)];
        }

        if($request->quantity) {
            $validate['quantity'] = 'integer';
        }

        if($request->discount_price) {
            $validate['discount_price'] = 'integer';
        }

        if($request->short_desc) {
            $validate['discount_price'] = 'string|min:4|max:200';
        }

        return $validate = Validator::make($request->all(), $rules);
    }

    // resData private function
    private function resData($request) {
        $data = [
            'restaurant_id' => $request->user()->restaurant->id,
            'category_id' => $request->category_id,
            'menu_size_id' => $request->menu_size_id,
            'name' => $request->name,
            'normal_price' => $request->normal_price,
            'discount_price' => $request->discount_price,
            'quantity' => $request->quantity,
            'short_desc' => $request->short_desc,
        ];

        return $data;
    }

}
