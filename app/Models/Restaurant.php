<?php

namespace App\Models;

use App\Models\Review;
use App\Models\Dietary;
use App\Models\MenuItem;
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
        'dietary_id',
        'name',
        'address',
        'phone',
        'pricing',  // $, $$, $$$
        'opening_time', // 20:00:00
        'closing_time',
        'from_day', // 0, 1, 2, 3, ...
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

    public function menu_items() {
        return $this->hasMany(MenuItem::class);
    }

    public function dietary() {
        return $this->belongsTo(Dietary::class);
    }
}
