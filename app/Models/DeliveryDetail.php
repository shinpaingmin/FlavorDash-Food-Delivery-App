<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'min_kilometer',
        'max_kilometer',
        'delivery_fee',
        'duration',
        'updated_at'
    ];
}
