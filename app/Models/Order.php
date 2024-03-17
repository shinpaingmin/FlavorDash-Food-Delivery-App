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
        'promo_code_id',
        'order_rejected_by_id',
        'order_code',
        'delivery_fee',
        'contactless_delivery',
        'order_status',
        'payment_status',
        'rider_status',
        'updated_at'
    ];
}
