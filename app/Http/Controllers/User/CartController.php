<?php

namespace App\Http\Controllers\User;

use App\Models\Cart;
use App\Models\CartItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retreiving cart items
        $cart_items = Cart::with('cart_items.menu_item')
                            ->where('user_id', auth()->user()->id)
                            ->get();

        if(is_null($cart_items)) {
            return response()->json([
                'status' => 'success',
                'message' => 'No item found',
            ], 200);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Cart items retrieved successfully!',
            'data' => $cart_items,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // store the cart items and add on items
        $user_id = $request->user()->id;

        $cart = Cart::where('user_id', $user_id)->first();

        if(is_null($cart)) {
            $cart = Cart::create([
                'user_id' => $user_id,
                'restaurant_id' => $request->cart_item['restaurant_id'],
            ]);
        } elseif(!is_null($cart) && $cart->restaurant_id != $request->cart_item['restaurant_id']) {
            Cart::destroy($cart->id);
            $cart = Cart::create([
                'user_id' => $user_id,
                'restaurant_id' => $request->cart_item['restaurant_id'],
            ]);
        }

        $total_price = $request->cart_item['price'] * $request->cart_item['total_quantity'];

        $cart_item = CartItem::create([
            'cart_id' => $cart->id,
            'menu_item_id' => $request->cart_item['menu_item_id'],
            'total_price' => $total_price,
            'total_quantity' => $request->cart_item['total_quantity'],
            'instruction' => $request->cart_item['instruction'],
            'if_unavailable' => $request->cart_item['if_unavailable'],
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Item added successfully!',
            'data' => $cart_item,
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        // destroy cart item
        $item = CartItem::find($id);

        if(is_null($item)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'No such cart item found'
            ], 200);
        }

        CartItem::destroy($id);

        return response()->json([
            'status' => 'success',
            'message' => 'Cart item removed successfully',
        ], 200);
    }
}
