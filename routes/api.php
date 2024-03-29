<?php


use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddOnController;
use App\Http\Controllers\PayPalController;
use App\Http\Controllers\DietaryController;
use App\Http\Controllers\User\CartController;
use App\Http\Controllers\User\OrderController;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\User\CategoryController;
use App\Http\Controllers\User\MenuItemController;
use App\Http\Controllers\User\MenuSizeController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\User\PromoCodeController;
use App\Http\Controllers\User\RestaurantController;
use App\Http\Controllers\User\UserDetailController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\User\PaymentDetailController;
use App\Http\Controllers\User\RestaurantTypeController;
use App\Http\Controllers\User\FavoriteRestaurantController;
use App\Http\Controllers\User\RestaurantTownshipController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes of user authentication
Route::controller(UserAuthController::class)->group(function() {
    Route::post('signup', 'signup');
    Route::post('login', 'login');
});

// Email verification routes
Route::controller(VerificationController::class)->group(function() {
    Route::get('email/verify/{id}', 'verify')->name('verification.verify');
});

// Sign up route for restaurant owners
Route::post('restaurant/signup', [AdminAuthController::class, 'store']);

// Restaurants routes for both public
Route::controller(RestaurantController::class)->group(function() {
    Route::get('restaurants', 'index');
    Route::get('restaurant/{id}', 'show');
});


// Restaurant type routes
Route::controller(RestaurantTypeController::class)->group(function() {
    Route::post('restaurantType', 'store');
    Route::get('restaurantTypes', 'index');
});

// Restaurant township routes
Route::controller(RestaurantTownshipController::class)->group(function() {
    Route::get('restaurantTownships', 'index');
    Route::post('restaurantTownship', 'store');
});

// dietaries
Route::controller(DietaryController::class)->group(function() {
    Route::get('dietaries', 'index');
    Route::post('dietary', 'store');
});


// Routes for menu item
Route::controller(MenuItemController::class)->group(function() {
    Route::get('products/restaurant/{id}', 'index');
    Route::get('product/{id}', 'show');
});

// Public routes for
Route::controller(AddOnController::class)->group(function() {
    Route::get('addons/restaurant/{id}', 'index');

});

// Protect routes for admin privileges
Route::middleware(['auth:api', 'scope:admin'])->group(function() {
    Route::post('admin/logout', [AdminAuthController::class, 'logout']);

    // get the logged in user's restaurant
    Route::get('admin/restaurant', [RestaurantController::class, 'adminRestaurant']);

    Route::controller(MenuItemController::class)->group(function() {
        Route::post('product', 'store');
        Route::post('product/{id}', 'update');
        Route::delete('product/{id}', 'destroy');
    });

    Route::controller(CategoryController::class)->group(function() {
        Route::get('categories/restaurant/{id}', 'index');
        Route::get('category/{id}', 'show');
        Route::post('category', 'store');
        Route::post('category/{id}', 'update');
        Route::delete('category/{id}', 'destroy');
    });

    Route::controller(AddOnController::class)->group(function() {
        Route::get('addon/{id}', 'show');
        Route::post('addon', 'store');
        Route::post('addon/{id}', 'update');
        Route::delete('addon/{id}', 'destroy');
    });

    // Order routes
    Route::controller(OrderController::class)->group(function() {
        Route::get('order/items/restaurant/{id}', 'restaurantOrderItems');
    });
});


// Protected routes for normal user privileges
Route::middleware(['auth:api', 'scope:user'])->group(function() {
    Route::post('logout', [UserAuthController::class, 'logout']);

    Route::controller(VerificationController::class)->group(function() {
        Route::get('email/check',  'check');
        Route::get('email/resend', 'resend')->name('verification.resend');
    });

    // favorite restaurants CRUD
    Route::controller(FavoriteRestaurantController::class)->group(function() {
        Route::post('favorite/restaurant/{id}', 'store');
    });

    // Cart routes
    Route::controller(CartController::class)->group(function() {
        Route::post('cart', 'store');
        Route::get('cart/items', 'index');
        Route::delete('cart/item/{id}', 'destroy');
    });

    Route::controller(PromoCodeController::class)->group(function() {
        Route::get('promo/codes', 'index');
    });

    Route::controller(UserDetailController::class)->group(function() {
        Route::get('user/details', 'index');
        Route::post('user/details', 'createUpdate');    // create if user details doesn't exist/update the existing details
    });

    // Paypal routes
    Route::controller(PayPalController::class)->group(function() {
        // Route::get('create-transaction', 'createTransaction')->name('createTransaction');
        Route::get('process-transaction', 'processTransaction')->name('processTransaction');
        Route::get('success-transaction', 'successTransaction')->name('successTransaction');
        Route::get('cancel-transaction', 'cancelTransaction')->name('cancelTransaction');
    });

    // Payment detail routes
    Route::controller(PaymentDetailController::class)->group(function() {
        Route::get('payment/details', 'index');
    });


    // Order routes
    Route::controller(OrderController::class)->group(function() {
        Route::post('order/items', 'store');
    });

    // Route::controller(MenuItemController::class)->group(function() {
    //     Route::post('products', 'store');
    //     Route::post('products/{id}', 'update');
    //     Route::delete('products/{id}', 'destroy');
    // });
});


Route::post('menuSize', [MenuSizeController::class, 'store']);
Route::get('menuSizes', [MenuSizeController::class, 'index']);
