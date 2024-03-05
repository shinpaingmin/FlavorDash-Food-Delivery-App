<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TotalEarnTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'total_earn_id',
        'transactions',
        'total_remainings',
        'updated_at'
    ];
}
