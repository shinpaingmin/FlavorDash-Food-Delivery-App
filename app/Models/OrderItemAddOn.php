<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItemAddOn extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_item_id',
        'add_on_id',
        'total_price',
        'total_quantity',
        'updated_at'
    ];
}
