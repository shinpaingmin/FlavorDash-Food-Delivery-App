<?php

namespace App\Http\Controllers\User;

use Carbon\Carbon;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $stores = Restaurant::with('restaurant_township', 'restaurant_type')
                            ->withCount('reviews')
                            ->withAvg('reviews', 'rating_star')
                            ->whereHas('restaurant_township', function($query) use($request) {
                                $query->where('township', 'like', '%' . $request->searchTownship . '%');
                            });

        if(!empty($request->sortBy)) {
            if($request->sortBy === "newest") {
                $stores->latest();
            } elseif ($request->sortBy === "cheapest") {
                $stores->where('pricing', '$');
            }
        }

        if(!empty($request->filterByCuisine)) {
            if($request->filterByCuisine !== "all") {

                $stores->whereHas('restaurant_type', function($query) use ($request) {
                    $query->where('type', $request->filterByCuisine);
                });
            }
        }

        if(!empty($request->filterByDietary)) {

            $stores->whereHas('dietary', function($query) use ($request) {
                $query->where('name', $request->filterByDietary);
            });

        }

        if(!empty($request->filterByPrice)) {

            $stores->where('pricing', $request->filterByPrice);

        }

        // if($request->has('filterByRating')) {

        //     $rating = (int) $request->filterByRating;
        //     $stores->where('reviews.', $request->filterByPrice);

        // }

        if(!empty($request->filterBySearch)) {

            $stores->where(function($query) use($request) {
                $query->orWhere('name', 'like', '%' . $request->filterBySearch . '%')
                ->whereHas('menu_items', function($subquery) use($request) {
                    $subquery->orWhere('name', 'like', '%' . $request->filterBySearch . '%');
                });
            });

            // $stores->where('name', 'like', '%' . $request->filterBySearch . '%');
            // ->whereHas('menu_items', function($query) use ($request) {
            //     $query->orWhere('name', 'like', '%' . $request->filterBySearch . '%');
            // });
        }

        $stores = $stores->get();

        if(is_null($stores->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No stores found!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Stores retrieved successfully!',
            'data' => $stores
        ];

        return response()->json($response, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // creating new restaurants
        $validate = $this->validation($request);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error'
            ], 422);
        }

        $store = Restaurant::create($request->all());

        $response = [
            'status' => 'success',
            'message' => 'Restaurant is added successfully!',
            'data' => $store
        ];

        return response()->json($response, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        // Display specific store
        $store = Restaurant::find($id);

        if(is_null($store)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No store found'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'One store retrieved successfully!',
            'data' => $store
        ];

        return response()->json($response, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        // Update store details
        $validate = $this->validation($request, $id);

        if($validate->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Validation Error'
            ], 422);
        }

        $store = Restaurant::find($id);

        if(is_null($store)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No such store found'
            ], 200);
        }

        $data = $request->all();
        $data['updated_at'] = Carbon::now();

        $store->update($data);

        $response = [
            'status' => 'success',
            'message' => 'Store is updated successfully!',
            'data' => $store
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        // destroy store
        $store = Restaurant::find($id);

        if(is_null($store)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Not found'
            ], 200);
        }

        Restaurant::destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Store is deleted successfully!',
        ], 200);
    }

    // search function by name
    public function search($name) {
        $stores = Restaurant::where('name', 'like', '%' . $name . '%')->latest()->get();

        if(is_null($stores->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No store found'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Stores retrieved successfully!',
            'data' => $stores
        ];

        return response()->json($response, 200);
    }

    /* private functions */
    // validation function
    private function validation($request, $id=null) {
        return $validate = Validator::make($request->all(), [
            'user_id' => 'required|integer',
            'name' => 'required|string|unique:restaurants,name,' . $id,
            'address' => 'required|string|unique:restaurants,address' . $id,
            'phone' => 'required|string|unique:restaurants,phone' . $id,
            'starting_price' => 'required|integer',
            'ending_price' => 'required|integer',
            'image' => [File::image()->max(1024)]
        ]);
    }
}
