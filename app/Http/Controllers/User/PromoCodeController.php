<?php

namespace App\Http\Controllers\User;

use App\Models\PromoCode;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PromoCodeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retreiving all promo codes related to users
        $promo = PromoCode::where('user_id', auth()->user()->id)->get();

        if(is_null($promo)) {
            return response()->json([
                'status' => 'success',
                'message' => 'No promo codes found',
            ], 200);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Retrieved promo codes successfully',
            'data' => $promo,
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
