<?php

namespace App\Http\Controllers\User;

use App\Models\Cart;
use App\Models\Order;
use App\Models\MenuItem;
use App\Models\OrderItem;
use App\Models\PromoCode;
use App\Models\UserDetail;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // retrieving all the orders
        $townships = RestaurantTownship::latest()->get();

        if(is_null($townships->first())) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No township found!',
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Townships retrieved successfully!',
            'data' => $townships
        ];

        return response()->json($response, 200);
    }

    // function for displaying order items for restaurants
    // public function restaurantOrderItems($id) {
    //     Order::select('orders.*', 'users.name as user_name', 'payment_details.type as payment')
    //             ->
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // creating new restaurant townships
        // tasks
        /*
            1.validation - no user details
            2.set expired to promo code if used
            3.decrease quantity
            4.delete cart
        */

        // Validate user details
        $user_details = UserDetail::where('user_id', auth()->user()->id)->first();

        if(is_null($user_details) || is_null($user_details->address) || is_null($user_details->phone)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'User details are required!',
            ], 422);
        }

        // Find cart and cart_items
        $cart = Cart::with('cart_items')->where('user_id', auth()->user()->id)->first();

        if(is_null($cart)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No cart items found',
            ], 422);
        }

        // Create order
        $res_order = [
            'user_id' => auth()->user()->id,
            'restaurant_id' => $cart->restaurant_id,
            'payment_id' => $request->payment_id,
            'order_code' => 'FDOrder' . date('Y-m-d') . uniqid(),
            'delivery_fee' => $request->delivery_fee,
            'contactless_delivery' => $request->contactless_delivery ? "1" : "0",
        ];

        if($request->promo_code_id) {
            $res_order['promo_code_id'] = $request->promo_code_id;
        }

        $order = Order::create($res_order);

        // Loop cart_items into order_items table
        $cart_items = $cart->cart_items;

        foreach ($cart_items as $item) {
            $order_items = OrderItem::create([
                'order_id' => $order->id,
                'menu_item_id' => $item->menu_item_id,
                'total_price' => $item->total_price,
                'total_quantity' => $item->total_quantity,
                'instruction' => $item->instruction,
                'if_unavailable' => $item->if_unavailable,
            ]);

            // Find menu item to decrease quantity of the product
            $menu_item = MenuItem::find($item->menu_item_id);

            if(!is_null($menu_item->quantity)) {
                $updated_quantity = $menu_item->quantity - $item->total_quantity;
                $menu_item->update([
                    'quantity' => $updated_quantity
                ]);
            }
        }

        // Destroy cart
        Cart::destroy($cart->id);

        // Set expired to used promo code
        if($request->promo_code_id) {
            $PromoCode = PromoCode::find($request->promo_code_id);
            $PromoCode->update([
                'status' => 'expired',
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Order placed successfully!',

        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        // Display specific township
        $township = RestaurantTownship::find($id);

        if(is_null($township)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No township found'
            ], 200);
        }

        $response = [
            'status' => 'success',
            'message' => 'Township retrieved successfully!',
            'data' => $township
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

        $township = RestaurantTownship::find($id);

        if(is_null($township)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No such township found'
            ], 200);
        }

        $data = $request->all();
        $data['updated_at'] = Carbon::now();

        $township->update($data);

        $response = [
            'status' => 'success',
            'message' => 'Township is updated successfully!',
            'data' => $township
        ];

        return response()->json($response, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        // destroy township
        $township = RestaurantTownship::find($id);

        if(is_null($township)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Not found'
            ], 200);
        }

        RestaurantTownship::destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Township is deleted successfully!',
        ], 200);
    }

    /* private functions */
    // validation function
    private function validation($request, $id=null) {
        return $validate = Validator::make($request->all(), [
            'restaurant_id' => 'required|integer',
            'township' => 'required|string|unique:restaurant_townships,township,' . $id,
        ]);
    }
}
