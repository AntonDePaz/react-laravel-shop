<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function add_cart(Request $request){


        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;

            $productcheck = Product::where('id',$product_id)->first();
            if($productcheck){
                if(Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists()){
                    return response()->json([
                        'status' => 409,
                        'message' => $productcheck->name.' Already in Cart this Item'
                    ]);
                }else{
                     $cart = new Cart();
                    $cart->user_id = $user_id;
                    $cart->product_id = $product_id;
                    $cart->product_qty = $product_qty;
                    $cart->save();
                    return response()->json([
                        'status' => 200,
                        'message' => 'Successfully Added to Cart'
                    ]);
                }

            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Product Not Found'
                ]);
            }
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Login First to Add to Cart!'
            ]);
        }
    }


    public function cart(){

        if(auth('sanctum')->check()){

            $user_id = auth('sanctum')->user()->id;
            $cartItems = Cart::where('user_id',$user_id)->get();

            return response()->json([
                'status' => 200,
                'cart' => $cartItems
            ]);

        }else{
            return response()->json([
                    'status' => 401,
                    'message' => 'Login First to Add to Cart!'
                ]);
        }

    }

    public function update_qty($id,$scope){

        if(auth('sanctum')->check()){

            $user_id = auth('sanctum')->user()->id;
            $cart = Cart::where('id',$id)->where('user_id',$user_id)->first();
            $stat = '';
            if($scope == 'inc'){
                $cart->product_qty += 1;
                $stat = 'Increment';
            }else if($scope == 'dec'){
                $cart->product_qty -= 1;
                $stat = 'Increment';
            }
            $cart->update();

            return response()->json([
                'status' => 200,
                'message' => $stat.' Item Successfully.'
            ]);

        }else{
            return response()->json([
                    'status' => 401,
                    'message' => 'Login First to Add to Cart!'
                ]);
        }
    }


    public function delete_cart($id){

        if(auth('sanctum')->check()){
            $user_id = auth('sanctum')->user()->id;

            $cart = Cart::find($id);
          //  $cart = Cart::where('id',$id)->where('user_id',$user_id)->first();
            if($cart){
                $cart->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Cart Successfully Removed'
                ]);
            }else{
                return response()->json([
                    'status' => 404,
                    'message' => 'Cant Find Category Item!'
                ]);
            }

        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Login First to Add to Cart!'
            ]);
        }

    }
}
