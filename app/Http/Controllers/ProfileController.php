<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function create()
    {
        $user = Auth::user();

        return Inertia::render('profile/Create', ['user' => $user]);
    }

    public function show(User $user)
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

        $profile = $user->profile;
        return Inertia::render('profile/Profile', ['posts' => $posts, 'user' => $user, 'profile' => $profile, 'owner' => $owner]);
    }

    public function edit(User $user)
    {
        return Inertia::render('profile/Edit');
    }



    public function store(Request $request, User $user)
    {

        $attribute = $request->validate([
            'bio' => ['required', 'min:3', 'max:200'],
            'location' => ['required', 'min:2', 'max:255'],
            'birth_date' => ['required', 'date'],
            'profile_img' => ['required', 'file'],
            'cover_img' => ['required', 'file'],
        ]);

        if ($request->hasFile('profile_img')) {
            $profileImgPath = $request->file('profile_img')->store('images', 'public');
            $attribute['profile_img_url'] = $profileImgPath;
        }
        if ($request->hasFile('cover_img  ')) {
            $coverImgPath = $request->file('cover_img')->store('images', 'public');
            $attribute['cover_img_url'] = $coverImgPath;
        }
        $attribute['name'] = $user->name;

        $profile = $user->profile()->create($attribute);
        if (! $profile) {
            return back()->with('error', 'creating profile failed try again');
        }


        return redirect()->route('posts')->with('success', 'creating profile succeed');
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => ['required', 'min:3'],
        ]);

        $profile = Auth::user()->profile;
        $profile->name = $request->name;
        $profile->location = $request->location;
        $profile->bio = $request->bio;



        if ($request->hasFile('profile_img')) {
            $profileImagePath = $request->file('profile_img')->store('images', 'public');
            $profile->profile_img_url = $profileImagePath;
        }
        if ($request->hasFile('cover_img')) {
            $coverImagePath = $request->file('cover_img')->store('images', 'public');
            $profile->cover_img_url = $coverImagePath;
        }

        $profile->save();


        return back()->with('success', 'updating profile succeed');
    }
}
