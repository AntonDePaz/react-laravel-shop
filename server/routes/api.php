<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CartController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CheckoutController;
use App\Http\Controllers\API\FrontendController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::get('get_category', [FrontendController::class , 'category']);
Route::get('get_product/{slug}', [FrontendController::class , 'products']);
Route::get('get_product_detail/{category}/{product}', [FrontendController::class , 'getproduct']);

Route::post('add_cart', [CartController::class , 'add_cart']);
Route::get('cart', [CartController::class , 'cart']);
Route::put('cart_update_qty/{id}/{scope}', [CartController::class , 'update_qty']);
Route::delete('remove_cart/{id}', [CartController::class , 'delete_cart']);
Route::post('order', [CheckoutController::class , 'placeorder']);
Route::post('validate-order', [CheckoutController::class , 'validate_order']);



//admin only can access
Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function (){

    Route::get('checkAuthenticate' , function () {
        return response()->json([
                'status' => 200,
                'message' => 'You are In'
            ], 200);
    });

    //category
    Route::post('store-category', [CategoryController::class, 'store']);
    Route::get('view-category', [CategoryController::class, 'index']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'deleted']);
    Route::get('getallcategory', [CategoryController::class, 'getallcategory']);


    //products
    Route::post('store-product',[ ProductController::class , 'store']);
    Route::get('view-product',[ ProductController::class , 'index']);
    Route::get('edit-product/{id}', [ProductController::class, 'edit']);
    Route::post('update-product/{id}', [ProductController::class, 'update']);

    //orders
    Route::get('orders', [OrderController::class, 'index']);





});


//can do logout both user and admin
Route::middleware(['auth:sanctum'])->group(function (){
    Route::post('logout', [AuthController::class, 'logout']);
});



// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
