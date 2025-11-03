<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Like;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function create(User $user)
    {
        // $user = User::findOrFail($id);

        $posts = Post::with('user')->where('user_id', $user->id)->get();
        $posts = $posts->map(function ($post) use ($user) {
            $post->can_delete = true;
            $post->liked = $user ??  $post->likedBy($user) ? true : false;
            $post->timeAgo = $post->created_at->diffForHumans();

            return $post;
        });
        // check of the auth is the owener of the profile
        $owner = Auth::user()?->is($user);
        $authUser = Auth::user();

        if ($authUser) {
            $followed  = Follow::where('follower_id', $authUser->id)->where('followed_id', $user->id)->get()->first();

            $user->followed_by_auth = $followed ? true : false;
        }


        return Inertia::render('profile/Profile', ['posts' => $posts, 'user' => $user, 'owner' => $owner]);
    }

    public function edit(User $user)
    {
        return Inertia::render('profile/Edit');
    }
}
