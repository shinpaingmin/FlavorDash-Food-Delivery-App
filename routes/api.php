<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\User\CategoryController;
use App\Http\Controllers\User\MenuItemController;
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
    Route::post('/signup', 'signup');
    Route::post('/login', 'login')->name('login');
});

// Email verification routes
Route::controller(VerificationController::class)->group(function() {
    Route::get('email/verify/{id}', 'verify')->name('verification.verify');

});

Route::post('/restaurant/signup', [AdminAuthController::class, 'store']);

// Restaurants routes for both public and private routes
Route::controller(RestaurantController::class)->group(function() {
    // Route::get('/restaurants/ordered', [RestaurantController::class, 'index']);
    Route::get('/restaurants/{search}', 'index');
});


// Restaurant type routes
Route::controller(RestaurantTypeController::class)->group(function() {
    Route::post('/restaurantType', 'store');
    Route::get('/restaurantTypes', 'index');
});

// Restaurant township routes
Route::controller(RestaurantTownshipController::class)->group(function() {
    Route::post('/restaurantTownship', 'store');
    Route::get('/restaurantTownships', 'index');
});



// Public routes of product
Route::middleware(['auth:api', 'scope:admin'])->group(function() {
    Route::controller(MenuItemController::class)->group(function() {
        Route::get('/products', 'index');
        Route::get('/products/{id}', 'show');
        Route::get('/products/search/{name}', 'search');
    });
});


// Protected routes of product and logout
Route::middleware(['auth:api', 'scope:user'])->group(function() {
    Route::post('/logout', [UserAuthController::class, 'logout']);

    Route::controller(VerificationController::class)->group(function() {
        Route::get('/email/check',  'check');
        Route::get('email/resend', 'resend')->name('verification.resend');
    });


    Route::controller(MenuItemController::class)->group(function() {
        Route::post('/products', 'store');
        Route::post('/products/{id}', 'update');
        Route::delete('products/{id}', 'destroy');
    });
});

// Routes for category CRUD
Route::controller(CategoryController::class)->group(function() {
    Route::get('/categories', 'index');
    Route::post('/category', 'store');
});
