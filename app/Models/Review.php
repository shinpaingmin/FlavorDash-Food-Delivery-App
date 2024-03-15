<?php

namespace App\Models;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'restaurant_id',
        'menu_item_id',
        'rating_star',
        'description',
        'updated_at'
    ];

    public function restaurant() {
        return $this->belongsTo(Restaurant::class);
    }
}
