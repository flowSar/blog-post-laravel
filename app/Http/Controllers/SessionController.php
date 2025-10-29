<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SessionController extends Controller
{
    public function create()
    {
        return Inertia::render('auth/Login');
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'email' => ['required', 'email', 'max:255'],
            'password' => ['required', 'min:6', 'max:255'],
        ]);

        $user = Auth::attempt($attributes);

        if (! $user) {
            return back()->with('error', 'Login Failed these credentials does not match');
        }
        $request->session()->regenerate();
        return redirect()->route('home');
    }

    public function destroy()
    {
        Auth::logout();

        redirect()->route('login');
    }
}
