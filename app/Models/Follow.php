<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    /** @use HasFactory<\Database\Factories\FollowerFactory> */

    protected $table = 'followers';
    use HasFactory;
    protected $fillable = ['follower_id', 'followed_id'];
}
