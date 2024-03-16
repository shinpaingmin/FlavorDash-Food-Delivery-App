<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuSize extends Model
{
    use HasFactory;

    protected $fillable = [
        'size',
        'updated_at'
    ];
}
