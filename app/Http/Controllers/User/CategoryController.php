<?php

namespace App\Http\Controllers\User;

use Carbon\Carbon;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        // Retrieving categories

        $categories = Category::where('restaurant_id', $id)->latest()->get();

        if(is_null($categories->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No category found'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Categories retrieved successfully!',
            'data' => $categories
        ];

        return response()->json($response, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // store categories into db

        $validate = $this->validation($request);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error',
                'data' => $validate->errors(),
            ], 422);
        }

        // check unique
        $categories = Category::where('restaurant_id', $request->user()->restaurant->id)
                                ->where('name', $request->name)
                                ->get();

        if(!is_null($categories->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'The category already exists.',
            ], 422);
        }

        $category = Category::create([
            'restaurant_id' => $request->user()->restaurant->id,
            'name' => $request->name,
        ]);

        $response = [
            'status' => 'success',
            'message' => 'Category was created successfully!',
            'data' => $category
        ];

        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // get specific category
        $category = Category::find($id);

        if(is_null($category)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Item is not found.'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Item is retrieved successfully!',
            'data' => $category,
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // update category

        $validate = $this->validation($request);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error',
                'data' => $validate->errors(),
            ], 422);
        }

        // check unique
        $categories = Category::where('restaurant_id', $request->user()->restaurant->id)
                                ->where('name', $request->name)
                                ->get();

        if(count($categories) >= 2) {
            return response()->json([
                'status' => 'failed',
                'message' => 'The category already exists.',
            ], 422);
        }

        // check the restaurant is valid to modify the category
        $category = Category::where('id', $id)
                    ->where('restaurant_id', auth()->user()->restaurant->id)
                    ->first();


        if(is_null($category)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No category found'
            ], 409);
        }

        $updatedCategory = [
            'name' => $request->name,
            'updated_at' => Carbon::now()
        ];

        $category->update($updatedCategory);

        $response = [
            'status' => 'success',
            'message' => 'Category is updated successfully!',
            'data' => $category
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // destroy the category
        $category = Category::find($id);


        if(is_null($category)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Category not found'
            ], 200);
        }

        Category::destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Category is deleted successfully.'
        ], 200);
    }

    // private validation function
    private function validation($request) {
        return $validate = Validator::make($request->all(), [
            'name' => 'required|min:4|max:100'
        ]);

    }
}
