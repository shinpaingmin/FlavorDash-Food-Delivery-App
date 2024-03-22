<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use App\Models\FavoriteRestaurant;
use App\Http\Controllers\Controller;

class FavoriteRestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $id)
    {
        // add restaurant to fav list
        $existing_fav = FavoriteRestaurant::where('restaurant_id', $id)
                                            ->where('user_id', $request->user()->id)
                                            ->get();

        if(!is_null($existing_fav->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Restaurant already exists in your favorite list',
            ], 422);
        }

        $favRestaurant = FavoriteRestaurant::create([
            'restaurant_id' => $request->id,
            'user_id' => $request->user()->id,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Restaurant is added to your favorite list',
            'data' => $favRestaurant,
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
