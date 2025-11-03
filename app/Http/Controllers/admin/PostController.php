<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        // u can use latest()
        $posts = Post::with('user')->orderBy('created_at', 'desc')->paginate(4);
        $posts = $posts->through(function ($post) {

            $post->liked = $post->likedBy() ? true : false;
            // admin can delete all posts
            $post->can_delete = true;

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

        // admin can delete
        $post->can_delete = true;

        $comments = $post->commentsCollection()->with('user')->get();

        $post['liked'] = $post->likedBy() ? true : false;

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
            'body' => ['required', 'min:3', 'max:100']
        ]);

        $post->update([
            'body' => $attributes['body'],
            // 'updated_at' => Carbon::now(),
        ]);
        return redirect()->route('post.show', $post->id)->with('success', 'the post Updated successfully');
        // return back()->with('success', 'the post Updated successfully');
    }


    public function destroy($id)
    {

        $post = Post::findOrFail($id);
        $post->delete();
        return redirect()->route('posts')->with('success', 'the post deleted successfully');
    }
}
