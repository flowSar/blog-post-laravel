<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserFollowController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // $posts = DB::select("select * from posts where user_id=?", [1]);
    // dd($posts);



    // $posts = Post::with('user.profile')->get();
    // return response()->json($posts);
    return redirect()->route('posts');
})->name('home');


Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');
Route::get('/profile/register', function () {
    dd('profile/register');
});

//profile 
Route::get('/profile/{user:name}', [ProfileController::class, 'show'])->name('profile.show');
Route::get('/profile/{user:name}/edit', [ProfileController::class, 'edit'])->name('profile.edit');
// Route::post('/profile/{user:name}', [ProfileController::class, 'store'])->name('profile.store');
Route::put('/profile/{user:name}', [ProfileController::class, 'update'])->name('profile.update');
Route::get('/register/profile', [ProfileController::class, 'create'])->name('profile.create');
Route::post('/register/profile/{user:name}', [ProfileController::class, 'store'])->name('profile.store');



// posts
Route::get('/posts', [PostController::class, 'index'])->name('posts');
Route::get('/posts/{id}', [PostController::class, 'show'])->name('post.show');
Route::post('/posts', [PostController::class, 'store'])->name('post.store')->middleware('auth');
Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('post.edit')->middleware('auth');
Route::post('/posts/{post}/delete', [PostController::class, 'destroy'])->name('post.delete')->middleware('auth')->can('delete', 'post');

Route::put('/posts/{post:id}', [PostController::class, 'update'])->name('post.update')->middleware('auth')->can('update', 'post');

// Route::get('/posts/{id}/comments', [CommentController::class, 'store']);

// login
Route::get('/login', [SessionController::class, 'create'])->name('login')->middleware('guest')->middleware('guest');
Route::post('/login', [SessionController::class, 'store'])->name('login.store')->middleware('guest');

Route::delete('/logout', [SessionController::class, 'destroy'])->name('logout')->middleware('auth');


//register
Route::get('/register', [AuthController::class, 'create'])->name('register')->middleware('guest');
Route::post('/register', [AuthController::class, 'store'])->name('register.store')->middleware('guest');



// like

Route::post('/like/{id}', [LikeController::class, 'store'])->name('like.store')->middleware('auth');
Route::delete('/like/{id}', [LikeController::class, 'destroy'])->name('like.destroy')->middleware('auth');

// comment
Route::post('/posts/{id}/comments', [CommentController::class, 'store'])->name('comments.store')->middleware('auth');


// dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dshboard')->middleware('auth')->middleware('admin');

// following

Route::post('/users/{user}/follow', [UserFollowController::class, 'store']);
Route::delete('/users/{user}/unfollow', [UserFollowController::class, 'destroy']);

Route::get('/profile/{user:name}/following', [UserFollowController::class, 'following']);

Route::get('/profile/{user:name}/followers', [UserFollowController::class, 'followers']);


Route::get('/test', function () {
    return Inertia::render('profile/FollowersPage');
});
