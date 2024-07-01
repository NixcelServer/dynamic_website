<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\EncDecHelper;
use App\Models\User;
use Illuminate\Support\Facades\Session;



class AuthController extends Controller
{
    //
    public function login(Request $request)
    {
        // Validate the request
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        //enc the pass recived from the request
        $encPass = EncDecHelper::encryptData($request->password);

        // Find the single user
        $user = User::first();
        // return response()->json($user);

        // Check if the user exists, email matches, and password matches
        if (!$user || $user->u_email !== $request->email || strcmp($user->u_password, $encPass) !== 0) {
            return response()->json(['message' => 'Invalid login credentials'], 401);
        }
        

        // Store user data in session
        Session::put('user', $user);
        

        return response()->json(['message' => 'Login successful'], 200);
    }

    // Logout method
    public function logout()
    {
        // Clear the session data
        Session::forget('user');
        Session::flush();

        return response()->json(['message' => 'Logout successfull'], 200);
    }
}
