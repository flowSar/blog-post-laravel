<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    /** @use HasFactory<\Database\Factories\PostFactory> */
    use HasFactory;

    protected $fillable = ['body', 'like', 'user_id', 'comments'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function likes()
    {
        return $this->hasMany(Like::class);
    }

    public function likedBy()
    {
        if (! Auth::user()) {
            return null;
        }
        return  Like::where('user_id', Auth::user()->id)->where('post_id', $this->id)->first();
    }

    public function commentsCollection()
    {
        return $this->hasMany(Comment::class);
    }
}
