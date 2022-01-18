<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $req){

        $validator = Validator::make($req->all(),[
            'firstname' => 'required|max:191',
            'lastname' => 'required|max:191',
            'email' => 'required|max:191|email|unique:users,email',
            'password' => 'required|min:4',
            'confirm_password' => 'required_with:password|same:password|min:4'
        ]
        );

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'validation_errors' => $validator->messages(),
            ]);
        }else{

            $user = User::create([
                'firstname'=> $req->firstname,
                'lastname'=> $req->lastname,
                'email' =>  $req->email,
                'password' =>Hash::make($req->password),
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;


            return response()->json([
                'status' => 200,
                'firstname' => $user->firstname,
                'lastname' => $user->lastname,
                'token' => $token,
                'message' => 'Registered Successfully',
            ]);
        }

    }

    public function login(Request $req){

        $validator = Validator::make($req->all(),[

            'email' => 'required',
            'password' => 'required',
        ]
        );

        if($validator->fails()){
            return response()->json([
                'validation_errors' => $validator->messages(),
            ]);
        }else{

            $user = User::where('email', $req->email)->first();

            if (! $user || ! Hash::check($req->password, $user->password)) {

                return response()->json([
                    'status' => 401,
                    'message' => 'The provided credentials are incorrect.'
                ]);
            }else{

                if($user->role_as == 1){  // 1 = Admin
                    $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }else{
                    $token = $user->createToken($user->email.'_Token', [''])->plainTextToken;
                }
                return response()->json([
                    'status' => 200,
                    'firstname' => $user->firstname,
                    'lastname' => $user->lastname,
                    'role' => $user->role_as,
                    'token' => $token,
                    'message' => 'Logged In Successfully',
                ]);
        }

        }


    }

    public function logout(){

        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged Out Successfully',
        ]);

    }


}
