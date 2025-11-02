<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    public function store(Request $request, $id)
    {

        $user = Auth::user();

        if (! $user) {
            return back()->with('error', 'user unauthorized');
        }
        $attributes = $request->validate([
            'body' => ['required', 'max:100']
        ]);

        $post = Post::findOrFail($id);

        $comment = $user->comments()->create([
            'body' => $attributes['body'],
            'post_id' => $id,
        ]);
        if (!$comment) {
            return back()->with('error', 'commenting failed');
        }
        $post = Post::findOrFail($id);

        $post->update([
            'comments' =>  $post->comments + 1,
        ]);

        return back()->with('success', 'comment success');
    }
}
