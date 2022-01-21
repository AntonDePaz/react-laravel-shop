<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class CheckoutController extends Controller
{
    public function placeorder(Request $request){

        if(auth('sanctum')->check()){
                $validator = Validator::make($request->all(),[
                    "firstname" => 'required',
                    "lastname" => "required|max:191",
                    "phone" => 'required|max:11',
                    'email' => 'required|max:191',
                    'city' => 'required|max:191',
                    'state' => 'required|max:191',
                    'zipcode' => 'required|max:20',
                    'address' => 'required|max:191',
                ]);

                if($validator->fails()){
                    return  response()->json([
                        'status' => 422,
                        'errors' => $validator->messages()
                    ]);
                }else{

                    $user_id = auth('sanctum')->user()->id;
                    $order = new Order();
                    $order->user_id = $user_id;
                    $order->firstname = $request->firstname;
                    $order->lastname = $request->lastname;
                    $order->phone = $request->phone;
                    $order->email = $request->email;
                    $order->address = $request->address;
                    $order->city = $request->city;
                    $order->state = $request->state;
                    $order->zipcode = $request->zipcode;

                    $order->payment_mode = $request->payment_mode;
                    $order->payment_id = $request->payment_id;
                    $order->tracking_no = 'mayshop'.rand(1111,9999);
                    $order->save();

                    $cart = Cart::where('user_id', $user_id)->get();
                    //loop all product in cart belong to user then save to array
                    $cartitems = [];
                    foreach($cart as $item){
                        $cartitems[] = [
                            'product_id' => $item->product_id,
                            'qty' => $item->product_qty,
                            'price' => $item->product->selling_price
                        ];
                        //also minus the quantity of product stocks
                        $item->product->update([
                            'quantity' =>  $item->product->quantity - $item->product_qty
                        ]);
                    }
                    //save to ordersItem table of all product in cart table
                    $order->orderitem()->createMany($cartitems);

                    //delete all record in cart table belong to user
                    Cart::destroy($cart);


                    return  response()->json([
                        'status' => 200,
                        'message' =>'Order Place Successfully'
                    ]);

                }
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Login First to Add to Cart!'
            ]);
        }


    }

    public function validate_order(Request $request){
        if(auth('sanctum')->check()){
            $validator = Validator::make($request->all(),[
                "firstname" => 'required',
                "lastname" => "required|max:191",
                "phone" => 'required|max:11',
                'email' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:20',
                'address' => 'required|max:191',
            ]);

            if($validator->fails()){
                return  response()->json([
                    'status' => 422,
                    'errors' => $validator->messages()
                ]);
            }else{
                return  response()->json([
                    'status' => 200,
                    'message' => 'success'
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
