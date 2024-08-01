<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NavMenuController;
use App\Http\Controllers\SubMenu1Controller;
use App\Http\Controllers\SubMenu2Controller;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;


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

Route::get('/get-navmenu',[NavMenuController::class,'getNavMenu']);

Route::get('/get-all-nav-menu',[NavMenuController::class,'getAllNavMenu']);

//sub menu 1
Route::get('/get-submenu1/{id}',[SubMenu1Controller::class,'getSubMenu1']);

Route::post('/new-sub-menu-1',[SubMenu1Controller::class,'createSubMenu1']);

Route::post('/update-sub-menu-1',[SubMenu1Controller::class,'updateSubMenu1']);

Route::delete('/sub-menu-1-delete/{id}',[SubMenu1Controller::class,'deleteSubMenu1']);

//sub menu 2

Route::get('/get-submenu2/{id}',[SubMenu2Controller::class,'getSubMenu2']);


Route::post('/new-sub-menu-2',[SubMenu2Controller::class,'createSubMenu2']);

Route::post('/update-sub-menu-2',[SubMenu2Controller::class,'updateSubMenu2']);

Route::delete('/sub-menu-2-delete/{id}',[SubMenu2Controller::class,'deleteSubMenu2']);

//company details
Route::get('/get-cmp-details',[CompanyController::class,'getCompanyDetails']);

Route::post('/company-details',[CompanyController::class,'storeCompanyDetails']);

Route::get('/get-cmp-address',[CompanyController::class,'getCompanyAddress']);

//company-address
Route::post('/company-address',[CompanyController::class,'addCompanyAddress']);

//update-company-address
Route::post('/update-company-address',[CompanyController::class,'updateCompanyAddress']);

//delete-company-address
Route::delete('/delete-company-address/{id}',[CompanyController::class,'deleteCompanyAddress']);

//Home Page Slider Images

Route::get('/get-hp-slider-imgs',[HomePageController::class,'getHPSliderImgs']);

Route::post('/add-hp-sliders-imgs',[HomePageController::class,'newHPSliderImgs']);

Route::post('/update-hp-slider-imgs',[HomePageController::class,'updateHPSliderImgs']);

Route::delete('/delete-hp-slider-imgs/{id}',[HomePageController::class,'deleteHPSliderImg']);

//about us 
Route::get('/get-about-us',[HomePageController::class,'getAboutUs']);

Route::post('/edit-about-us',[HomePageController::class,'editAboutUs']);

//product api's
Route::post('/new-product',[ProductController::class,'newProduct']);

//update product api
Route::post('/update-product',[ProductController::class,'updateProduct']);

Route::delete('/delete-product/{id}',[ProductController::class,'deleteProduct']);

//service api's
//get services
Route::get('/get-services',[ServiceController::class,'getServices']);
Route::get('/get-service-details',[ServiceController::class,'getServiceDetails']);

//service sub menu 1 content
Route::get('/get-service-sb1-content/{id}',[ServiceController::class,'getServiceSB1Content']);

Route::get('/get-service-sb2-content/{id}',[ServiceController::class,'getServiceSB2Content']);


//new service
Route::post('/new-service',[ServiceController::class,'newService']);

//update service
Route::post('/update-service',[ServiceController::class,'updateService']);

//delete service
Route::delete('/delete-service/{id}',[ServiceController::class,'deleteService']);
