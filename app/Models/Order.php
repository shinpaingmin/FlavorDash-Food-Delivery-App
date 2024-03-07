<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'rider_id',
        'payment_id',
        'delivery_detail_id',
        'promo_code_id',
        'order_code',
        'order_status',
        'payment_status',
        'updated_at'
    ];
}
