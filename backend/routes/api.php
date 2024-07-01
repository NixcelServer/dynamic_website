<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NavMenuController;
use App\Http\Controllers\SubMenu1Controller;
use App\Http\Controllers\SubMenu2Controller;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login',[AuthController::class,'login']);

Route::get('/logout',[AuthController::class,'logout']);

Route::post('/new-nav-menu',[NavMenuController::class,'createNavMenu']);

Route::post('/update-nav-menu',[NavMenuController::class,'updateNavMenu']);

Route::delete('/nav-menu-delete/{id}', [NavMenuController::class, 'deleteNavMenu']);

//sub menu 1

Route::post('/new-sub-menu-1',[SubMenu1Controller::class,'createSubMenu1']);

Route::post('/update-sub-menu-1',[SubMenu1Controller::class,'updateSubMenu1']);

Route::delete('/sub-menu-1-delete/{id}',[SubMenu1Controller::class,'deleteSubMenu1']);

//sub menu 2

Route::post('/new-sub-menu-2',[SubMenu2Controller::class,'createSubMenu2']);