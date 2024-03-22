<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartAddOn extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id',
        'add_on_id',
        'total_price',
        'total_quantity',
        'updated_at'
    ];
}
