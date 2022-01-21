<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Cart extends Model
{
    use HasFactory;
    protected $table = "carts";
    protected $fillable = [
        'user_id', 'product_id', 'product_qty'
    ];

    protected $with = ['user' , 'product'];

    public function user(){

        return $this->belongsTo(User::class, 'user_id', 'id');

    }

    public function product(){
        return $this->belongsTo(Product::class , 'product_id', 'id');
    }




}
