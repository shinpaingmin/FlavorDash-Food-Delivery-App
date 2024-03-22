<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderAddOn extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'add_on_id',
        'total_price',
        'total_quantity',
        'updated_at'
    ];
}
