<?php

namespace App\Http\Controllers;

use Storage;
use Carbon\Carbon;
use App\Models\AddOn;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Validator;

class AddOnController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        // Retrieving add ons

        $add_ons = AddOn::where('restaurant_id', $id)->latest()->get();

        if(is_null($add_ons->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No add-ons found'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Add-ons retrieved successfully!',
            'data' => $add_ons
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // store add-on into db

        $validate = $this->validation($request);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error',
                'data' => $validate->errors(),
            ], 422);
        }

        // check unique
        $add_ons = AddOn::where('restaurant_id', $request->user()->restaurant->id)
                                ->where('name', $request->name)
                                ->get();

        if(!is_null($add_ons->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'The add-on already exists.',
            ], 422);
        }

        $filename = uniqid() . $request->image->getClientOriginalName();
        $request->image->storeAs('public', $filename);

        $add_on = AddOn::create([
            'restaurant_id' => $request->user()->restaurant->id,
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'image' => $filename
        ]);

        $response = [
            'status' => 'success',
            'message' => 'Add-on was created successfully!',
            'data' => $add_on
        ];

        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // get specific add-on
        $add_on = AddOn::find($id);

        if(is_null($add_on)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Add-on is not found.'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Add-on is retrieved successfully!',
            'data' => $add_on,
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        // update add-on

        $validate = $this->validation($request, "update");

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error',
                'data' => $validate->errors(),
            ], 422);
        }

        // check unique
        $add_ons = AddOn::where('restaurant_id', $request->user()->restaurant->id)
                                ->where('name', $request->name)
                                ->get();

        if(count($add_ons) >= 2) {
            return response()->json([
                'status' => 'failed',
                'message' => 'The add-on already exists.',
            ], 422);
        }

        // check the restaurant is valid to modify the add-on
        $add_on = AddOn::where('id', $id)
                    ->where('restaurant_id', auth()->user()->restaurant->id)
                    ->first();


        if(is_null($add_on)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No add-on found'
            ], 409);
        }



        $updatedAddon = [
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'updated_at' => Carbon::now()
        ];

        if($request->image) {
            // delete old image
            Storage::delete('public/' . $add_on->image);

            // create new image
            $filename = uniqid() . $request->image->getClientOriginalName();
            $request->image->storeAs('public', $filename);

            // add to db data
            $updatedAddon['image'] = $filename;
        }

        $add_on->update($updatedAddon);

        $response = [
            'status' => 'success',
            'message' => 'Add-on is updated successfully!',
            'data' => $add_on
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // destroy the add-on
        $add_on = AddOn::find($id);


        if(is_null($add_on)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Add-on not found'
            ], 200);
        }

        Storage::delete('public/' . $add_on->image);
        AddOn::destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Add-on is deleted successfully.'
        ], 200);
    }

    // private validation function
    private function validation($request, $action="create") {
        $rules = [
            'name' => 'required|min:4|max:100',
            'price' => 'required|integer',
        ];
        if($request->quantity) {
            $rules['quantity'] = 'integer';
        }
        if($action === "update" && $request->image) {
            $rules['image'] = [File::image()->max(2048)];
        } else if($action === "create") {
            $rules['image'] = ['required', File::image()->max(2048)];
        }
        return $validate = Validator::make($request->all(), $rules);
    }
}
