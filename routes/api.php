<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DietaryController;
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\User\CategoryController;
use App\Http\Controllers\User\MenuItemController;
use App\Http\Controllers\User\MenuSizeController;
use App\Http\Controllers\Auth\AdminAuthController;
use App\Http\Controllers\User\RestaurantController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\User\RestaurantTypeController;
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

// Restaurants routes for both public and private routes
Route::controller(RestaurantController::class)->group(function() {
    Route::get('restaurants', 'index');
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


// Routes for category CRUD
Route::controller(CategoryController::class)->group(function() {
    Route::get('categories', 'index');
    Route::post('category', 'store');
});

// Routes for menu item CRUD
Route::controller(MenuItemController::class)->group(function() {
    Route::get('products/restaurant/{id}', 'index');
    Route::get('product/{id}', 'show');
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
});


// Protected routes for normal user privileges
Route::middleware(['auth:api', 'scope:user'])->group(function() {
    Route::post('logout', [UserAuthController::class, 'logout']);

    Route::controller(VerificationController::class)->group(function() {
        Route::get('email/check',  'check');
        Route::get('email/resend', 'resend')->name('verification.resend');
    });


    // Route::controller(MenuItemController::class)->group(function() {
    //     Route::post('products', 'store');
    //     Route::post('products/{id}', 'update');
    //     Route::delete('products/{id}', 'destroy');
    // });
});


Route::post('menuSize', [MenuSizeController::class, 'store']);
Route::get('menuSizes', [MenuSizeController::class, 'index']);
