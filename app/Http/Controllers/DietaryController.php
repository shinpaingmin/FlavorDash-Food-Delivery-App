<?php

namespace App\Http\Controllers;

use App\Models\Dietary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DietaryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieving all dietaries
        $dietaries = Dietary::orderBy('name', 'asc')->get();

        if(is_null($dietaries->first())) {
            return response()->json([
                'status' => 'success',
                'message' => 'No data found'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Retreived all dietaries',
            'data' => $dietaries,
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // create dietaries
        $validation = $this->validation($request);

        if($validation->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Errro!',
                'data' => $validation->errors(),
            ], 422);
        }

        $dietary = Dietary::create($request->all());

        $resposne = [
            'status' => 'success',
            'message' => 'New dietary created',
            'data' => $dietary,
        ];

        return response()->json($resposne, 200);
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

    // private validation function
    private function validation($request) {
        return $validation = Validator::make($request->all(), [
            'name' => 'required|min:4|max:100|unique:dietaries,name',
        ]);
    }
}
