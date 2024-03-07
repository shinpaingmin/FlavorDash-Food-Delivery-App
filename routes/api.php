<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\User\MenuItemController;
use App\Http\Controllers\Auth\UserAuthController;

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

// Public routes of authentication
Route::controller(UserAuthController::class)->group(function() {
    Route::post('/signup', 'signup');
    Route::post('/login', 'login');
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

    Route::controller(MenuItemController::class)->group(function() {
        Route::post('/products', 'store');
        Route::post('/products/{id}', 'update');
        Route::delete('products/{id}', 'destroy');
    });
});

