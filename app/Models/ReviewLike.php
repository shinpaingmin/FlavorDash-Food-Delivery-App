<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReviewLike extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'review_id',
        'react_type',
        'updated_at'
    ];
}
