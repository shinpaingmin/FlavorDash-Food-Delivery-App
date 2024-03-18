<?php

namespace App\Http\Controllers\User;

use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retrieving categories
        $categories = Category::latest()->get();

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

        $category = Category::create($request->all());

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

    // private functions
    private function validation($request) {
        return $validate = Validator::make($request->all(), [
            'name' => 'required|min:4|max:100|unique:categories,name'
        ]);

    }
}
