<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\OrderItems;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $fillable = [
        'address',
        'city',
        'email',
        'firstname',
        'lastname',
        'lastname',
        'phone',
        'state',
        'zipcode',
        'user_id',
        'payment_id',
        'payment_mode',
        'tracking_no',
        'status',
        'remark',
    ];


    public function orderitem(){
        return $this->hasMany(OrderItems::class, 'order_id','id');
    }


}
