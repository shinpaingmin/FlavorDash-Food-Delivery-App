<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Models\PaymentDetail;
use App\Http\Controllers\Controller;

class PaymentDetailController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieving payment details
        $details = PaymentDetail::get();

        if(is_null($details->first())) {
            return response()->json([
                'status' => 'success',
                'message' => 'No data found'
            ], 200);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Retrieved successfully!',
            'data' => $details,
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
