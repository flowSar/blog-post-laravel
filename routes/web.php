<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $user = [
        'name' => 'brahim'
    ];
    return Inertia::render('welcome', ['user' => $user]);
})->name('home');


Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');


// posts
Route::get('/posts', [PostController::class, 'index'])->name('posts');

// login
Route::get('/login', [AuthController::class, 'create'])->name('login');
Route::post('/login', [AuthController::class, 'store'])->name('login.store');


//register
Route::get('/register', [SessionController::class, 'create'])->name('register');
Route::post('/register', [SessionController::class, 'store'])->name('register.store');
