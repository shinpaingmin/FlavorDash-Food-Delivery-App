<?php

namespace App\Models;

use App\Models\Review;
use App\Models\RestaurantType;
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
        'phone',
        'pricing',
        'opening_time',
        'closing_time',
        'from_day',
        'to_day',
        'image',
        'updated_at'
    ];

    public function restaurant_township() {
        return $this->belongsTo(RestaurantTownship::class);
    }

    public function restaurant_type() {
        return $this->belongsTo(RestaurantType::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }
}
