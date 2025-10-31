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
        $posts = Post::with('user')->orderBy('created_at', 'desc')->paginate(4);
        $posts = $posts->through(function ($post) {

            $post->liked = $post->likedBy() ? true : false;

            return $post;
        });

        // $posts = $posts->map(function ($post) {
        //     return [
        //         'id' => $post->id,
        //         'body' => $post->body,
        //         'like' => $post->like,
        //         'liked' => $post->likedBy() ? true : false,
        //         'user' => $post->user,
        //         'created_at' => $post->created_at,
        //         'updated_at' => $post->updated_at,
        //     ];
        // });

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

        $post = Post::with('user')->find($id);
        $comments = $post->commentsCollection()->with('user')->get();

        $post['liked'] = $post->likedBy() ? true : false;

        return Inertia::render('posts/Show', ['post' => $post, 'comments' => $comments]);
    }

    public function edit($id)
    {

        $post = Post::find($id);

        return Inertia::render('posts/Edit', ['post' => $post]);
    }

    public function update(Request $request, $id)
    {

        $attributes = $request->validate([
            'body' => ['required', 'min:3', 'max:100']
        ]);

        $post = Post::find($id);
        $post = $post->update([
            'body' => $attributes['body'],
            // 'updated_at' => Carbon::now(),
        ]);
        return redirect()->route('post.show', $id)->with('success', 'the post Updated successfully');
        // return back()->with('success', 'the post Updated successfully');
    }


    public function destroy($id)
    {

        $post = Post::find($id);
        $post->delete();
        return back()->with('sucess', 'the post deleted successfully');
    }
}
