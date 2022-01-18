<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Category;
class Product extends Model
{
    use HasFactory;


    protected $table = 'products';

    protected $fillable = [
        'category_id',
        'slug',
        'name',
        'description',

        'meta_description',
        'meta_keyword',
        'meta_title',
        'image',

        'original_price',
        'brand',
        'quantity',
        'selling_price',
        'featured',
        'popular',
        'status',
    ];



    //join 2 table with foreign key

    protected $with = ['category'];

    public function category(){
        return $this->belongsTo(Category::class, 'category_id','id');
    }

}
