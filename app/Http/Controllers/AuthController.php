<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function create()
    {

        return Inertia::render('auth/Register');
    }

    public function store() {}
}
