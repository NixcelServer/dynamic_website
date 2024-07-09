<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\NavbarMenu;
use Illuminate\Support\Facades\Date;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Storage;



class NavMenuController extends Controller
{
    public function getNavMenu()
    {
        $navmenus = NavbarMenu::where('flag','show')->get();
        foreach($navmenus as $navmenu)
        {
            $navmenu->encNavMenuId = EncDecHelper::encDecId($navmenu->tbl_nav_menu_id,'encrypt');
            unset($navmenu->tbl_nav_menu_id);
        }
        return response()->json($navmenus,200);
    }
    public function createNavMenu(Request $request)
    {
         // Validate the request
    $request->validate([
        'navbarName' => 'required|string|max:255',
        'navMenuDesc' => 'required|string', // Assuming CKEditor is used to input HTML content
        'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'bgImg' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

        // Create a new NavbarMenu instance
        $navMenu = new NavbarMenu;
        $navMenu->n_menu_name = $request->navbarName;
        $navMenu->n_menu_desc = $request->navMenuDesc; // Assuming n_menu_desc is a blob/text field

        // // Handle file upload for icon
        // if ($request->hasFile('icon')) {
        //     $iconPath = $request->file('icon')->store('uploads', 'public');
        //     $navMenu->n_menu_icon = $iconPath;
        // }

        // // Handle file upload for background image (bgImg)
        // if ($request->hasFile('bgImg')) {
        //     $bgImgPath = $request->file('bgImg')->store('uploads', 'public');
        //     $navMenu->n_menu_bg_img = $bgImgPath;
        // }

        // Handle file upload for icon
        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $iconPath = $icon->storeAs('Nav Menu', $icon->getClientOriginalName(), 'public');
            $navMenu->n_menu_icon = $iconPath;
        }

        // Handle file upload for background image (bgImg)
        if ($request->hasFile('bgImg')) {
            $bgImg = $request->file('bgImg');
            $bgImgPath = $bgImg->storeAs('Nav Menu', $bgImg->getClientOriginalName(), 'public');
            $navMenu->n_menu_bg_img = $bgImgPath;
        }

        $navMenu->show_status = $request->display;
        $navMenu->sequence_no = $request->sequenceNo;
        $navMenu->add_date = Date::now()->toDateString();
        $navMenu->add_time = Date::now()->toTimeString();
        $navMenu->flag = 'show';

        // Save the navbar menu item
        $navMenu->save();

        return response()->json(['message' => 'Navbar menu created successfully', 'navMenu' => $navMenu], 201);
    }

    public function updateNavMenu(Request $request)
    {
        $navMenu = NavbarMenu::find(EncDecHelper::encDecId($request->encNavMenuId,'decrypt'));
        $navMenu->n_menu_name = $request->navbarName;
        $navMenu->n_menu_desc = $request->navMenuDesc;

        if (!$navMenu) {
            return response()->json(['message' => 'Navbar menu not found'], 404);
        }

        // Handle file upload for icon
        // Handle file upload for icon
    if ($request->hasFile('icon')) {
        // if ($navMenu->n_menu_icon) {
        //     // Optionally, delete the old file from the storage
        //     Storage::disk('public')->delete($navMenu->n_menu_icon);
        // }
        $icon = $request->file('icon');
        $iconPath = $icon->storeAs('Nav Menu', $icon->getClientOriginalName(), 'public');
        $navMenu->n_menu_icon = $iconPath;
    }

       // Handle file upload for background image (bgImg)
    if ($request->hasFile('bgImg')) {
        // Set the flag of the old background image to 'deleted' if it exists
        // if ($navMenu->n_menu_bg_img) {
        //     // Optionally, delete the old file from the storage
        //     Storage::disk('public')->delete($navMenu->n_menu_bg_img);
        // }
        $bgImg = $request->file('bgImg');
        $bgImgPath = $bgImg->storeAs('Nav Menu', $bgImg->getClientOriginalName(), 'public');
        $navMenu->n_menu_bg_img = $bgImgPath;
    }

        $navMenu->show_status = $request->display;
        $navMenu->sequence_no = $request->sequenceNo;
        $navMenu->updated_date = Date::now()->toDateString();
        $navMenu->updated_time = Date::now()->toTimeString();
        $navMenu->flag = 'show';

        // Save the navbar menu item
        $navMenu->save();

        return response()->json(['message' => 'Navbar menu updated successfully', 'navMenu' => $navMenu], 201);

    }

    public function deleteNavMenu($id)
    {
       
        $navMenuId = EncDecHelper::encDecId($id, 'decrypt');
        $navMenu = NavbarMenu::find($navMenuId);

        if (!$navMenu) {
            return response()->json(['message' => 'Navbar menu not found'], 404);
        }

        // Delete associated files if they exist
        // if ($navMenu->n_menu_icon) {
        //     Storage::disk('public')->delete($navMenu->n_menu_icon);
        // }

        // if ($navMenu->n_menu_bg_img) {
        //     Storage::disk('public')->delete($navMenu->n_menu_bg_img);
        // }

        // Delete the navbar menu item
        $navMenu->deleted_date=Date::now()->toDateString();
        $navMenu->deleted_time=Date::now()->toTimeString();
        $navMenu->flag='deleted';
        $navMenu->save();

        return response()->json(['message' => 'Navbar menu deleted successfully'], 200);
    }
}    
