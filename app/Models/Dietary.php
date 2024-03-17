<?php

namespace App\Models;

use App\Models\Restaurant;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Dietary extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'updated_at'
    ];

    public function restaurants() {
        return $this->hasMany(Restaurant::class);
    }
}
