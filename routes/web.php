<?php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');


// posts

Route::get('/posts', [PostController::class, 'index'])->name('posts');
