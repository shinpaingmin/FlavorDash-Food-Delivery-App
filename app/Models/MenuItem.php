<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id',
        'category_id',
        'menu_size_id',
        'name',
        'price',
        'quantity',
        'image',
        'updated_at'
    ];
}
