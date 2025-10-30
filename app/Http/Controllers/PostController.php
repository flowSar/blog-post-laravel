<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{

    public function index()
    {
        $posts = Post::with('user')->orderBy('created_at', 'desc')->get();



        $posts = $posts->map(function ($post) {
            return [
                'id' => $post->id,
                'body' => $post->body,
                'like' => $post->like,
                'liked' => $post->likedBy() ? true : false,
                'user' => $post->user,
                'created_at' => $post->created_at,
                'updated_at' => $post->updated_at,
            ];
        });

        return Inertia::render('posts/Index', ['posts' => $posts]);
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'body' => ['required', 'min:3', 'max:100'],
        ]);

        $post = Auth::user()->posts()->create($attributes);
        if (! $post) {
            return back()->with('error', 'posting failed try again later');
        }

        return back()->with('success', 'post created successfully');
    }
}
