<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RestaurantTownship extends Model
{
    use HasFactory;

    protected $fillable = [
        'restaurant_id',
        'township',
        'updated_at'
    ];
}
