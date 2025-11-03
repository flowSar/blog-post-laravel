<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function create($id)
    {
        $user = User::findOrFail($id);
        $posts = Post::with('user')->where('user_id', $user->id)->get();
        $posts = $posts->map(function ($post) use ($user) {
            $post->can_delete = true;
            $post->liked = $user ??  $post->likedBy($user) ? true : false;

            return $post;
        });
        // check of the auth is the owener of the profile
        $owner = Auth::user()?->is($user);

        return Inertia::render('profile/Profile', ['posts' => $posts, 'user' => $user, 'owner' => $owner]);
    }

    public function edit($id)
    {
        return Inertia::render('profile/Edit');
    }
}
