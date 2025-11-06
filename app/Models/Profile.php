<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    /** @use HasFactory<\Database\Factories\ProfileFactory> */
    use HasFactory;

    protected $fillable = ['name', 'bio', 'location', 'birth_date', 'cover_img_url', 'profile_img_url'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
