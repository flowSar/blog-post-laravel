<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserFollowController extends Controller
{
    public function store(User $user)
    {
        $authUser = Auth::user();
        $follow = Follow::create([
            'follower_id' => $authUser->id,
            'followed_id' => $user->id
        ]);

        if (! $follow) {
            return back()->with('error', 'following failed');
        }

        $authUser->following_count = $authUser->following_count + 1;
        $authUser->save();
        $user->followers_count = $user->followers_count + 1;
        $user->save();

        return back()->with('success', 'following succeed');
    }

    public function destroy(User $user)
    {
        $authUser = Auth::user();

        $follow = Follow::where('follower_id', $authUser->id)->where('followed_id', $user->id)->first();

        if (! $follow) {
            return back()->with('error', 'unfollowing failed');
        }

        $follow->delete();

        $authUser->following_count = $authUser->following_count - 1;
        $authUser->save();
        $user->followers_count = $user->followers_count - 1;
        $user->save();

        return back()->with('success', 'unfollowing succeed');
    }


    public function following(User $user)
    {
        // $following = $user->following()->with('user')->get();
        $followingUsers = User::whereIn('id', $user->following()->pluck('followed_id'))->get();

        // dd($followingUsers);

        // dd($following);

        $followers = $user->followers()->with('user')->get();

        return Inertia::render('profile/FollowersPage', ['followers' => $followers, 'followingUsers' => $followingUsers, 'activeTab' => 'following']);
    }

    public function followers(User $user)
    {
        $followingUsers = User::whereIn('id', $user->following()->pluck('followed_id'))->get();

        $followers = $user->followers()->with('user')->get();

        return Inertia::render('profile/FollowersPage', ['followers' => $followers, 'followingUsers' => $followingUsers, 'activeTab' => 'followers']);
    }
}
