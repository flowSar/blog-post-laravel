<?php

namespace App\Http\Controllers;

use App\Models\Like;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{

    public function index()
    {
        // u can use latest()
        $posts = Post::with('user')->latest()->paginate(6);
        $posts = $posts->through(function ($post) {

            $post->timeAgo = $post->created_at->diffForHumans();

            if (Auth::user()) {
                $post->liked = $post->likedBy(Auth::user()) ? true : false;
            } else {
                $post->liked = false;
            }

            $user = Auth::user();

            $post->can_delete = $user?->can('delete', $post);

            return $post;
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

    public function show($id)
    {

        $post = Post::with('user')->findOrFail($id);
        $post->timeAgo = $post->created_at->diffForHumans();

        $user = Auth::user();

        $post->can_delete = $user?->can('delete', $post);


        $comments = $post->commentsCollection()->with('user')->latest()->get();
        if (Auth::user()) {
            $post->liked = $post->likedBy(Auth::user()) ? true : false;
        } else {
            $post->liked = false;
        }


        return Inertia::render('posts/Show', ['post' => $post, 'comments' => $comments]);
    }

    public function edit($id)
    {

        $post = Post::findOrFail($id);

        return Inertia::render('posts/Edit', ['post' => $post]);
    }

    public function update(Request $request, Post $post)
    {

        $attributes = $request->validate([
            'body' => ['required', 'min:3', 'max:200']
        ]);

        // $isPermitted = Auth::user()->can('update', $post);

        // if (!$isPermitted) {
        //     abort(403, 'Unuthorized');
        // }

        $post->update([
            'body' => $attributes['body'],
            // 'updated_at' => Carbon::now(),
        ]);
        return redirect()->route('post.show', $post->id)->with('success', 'the post Updated successfully');
        // return back()->with('success', 'the post Updated successfully');
    }


    public function destroy(Post $post)
    {
        // dd('delete', $id);
        // $post = Post::findOrFail($id);
        $post->delete();
        return redirect()->route('posts')->with('success', 'the post deleted successfully');
    }
}
