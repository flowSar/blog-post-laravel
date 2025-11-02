<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{

    public function store($id)
    {
        if (!Auth::user()) {
            return back();
        }
        // get the like for the post with id and the auth user
        $like = Like::where('user_id', Auth::user()->id)->where('post_id', $id)->first();
        if (! $like) {

            // create like 
            Auth::user()->likes()->create([
                'post_id' => $id
            ]);

            // update like count for the post
            $post = Post::findOrFail($id);
            Post::where('id', $id)->update([
                'like' => $post->like + 1,
            ]);
        }
        return back();
    }

    public function destroy($id)
    {
        if (!Auth::user()) {
            return back();
        }
        $like = Like::where('user_id', Auth::user()->id)->where('post_id', $id)->first();
        if ($like) {
            // delete like
            $like->delete();

            // update like count on post
            $post = Post::findOrFail($id);
            Post::where('id', $id)->update([
                'like' => $post->like - 1,
            ]);
            return back();
        }
        return back()->with('error', 'unliked failed');
    }
}
