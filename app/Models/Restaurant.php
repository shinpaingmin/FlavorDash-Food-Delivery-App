<?php

namespace App\Models;

use App\Models\RestaurantTownship;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'restaurant_type_id',
        'restaurant_township_id',
        'name',
        'address',
        'lat',
        'long',
        'phone',
        'pricing',
        'opening_time',
        'closing_time',
        'from_day',
        'to_day',
        'image',
        'closed',
        'updated_at'
    ];

    public function township() {
        return $this->belongsTo(RestaurantTownship::class);
    }
}
