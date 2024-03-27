<?php

namespace App\Models;

use App\Models\MenuItem;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CartItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'cart_id',
        'menu_item_id',
        'total_price',
        'total_quantity',
        'instruction',
        'if_unavailable',
        'updated_at'
    ];

    public function menu_item() {
        return $this->belongsTo(MenuItem::class);
    }
}
