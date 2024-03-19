<?php

namespace App\Models;

use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id',
        'category_id',
        'menu_size_id',
        'name',
        'normal_price',
        'discount_price',   // optional
        'quantity', // optional
        'image',
        'updated_at'
    ];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }
}
