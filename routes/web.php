<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SessionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {

    return Inertia::render('Index', ['user' => auth()->user()]);
})->name('home');


Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');


// posts
Route::get('/posts', [PostController::class, 'index'])->name('posts');
Route::get('/posts/{id}', [PostController::class, 'show'])->name('post.show');
Route::post('/posts', [PostController::class, 'store'])->name('post.store')->middleware('auth');
Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('post.edit')->middleware('auth');
Route::post('/posts/{id}/delete', [PostController::class, 'destroy'])
    ->name('post.delete')
    ->middleware('auth')
    ->can('delete', 'post');

Route::put('/posts/{post}', [PostController::class, 'update'])
    ->name('post.update')
    ->middleware('auth')->can('update', 'post');

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
