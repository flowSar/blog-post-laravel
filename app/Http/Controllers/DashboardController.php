<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        $users = User::with('profile')->get();
        $posts = Post::with('user')->get();

        return Inertia::render('dashboard/index', ['users' => $users, 'posts' => $posts]);
    }
}
