<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\EncDecHelper;
use App\Models\NavbarMenu;
use App\Models\SubMenu1;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;


class SubMenu1Controller extends Controller
{
    //

    public function getSubMenu1($id)
    {
        // Decrypt the navigation menu ID using EncDecHelper (assuming it's a custom helper for encryption/decryption)
        $decryptedId = EncDecHelper::encDecId($id, 'decrypt');
        
        // Retrieve submenus from the SubMenu1 model where the tbl_nav_menu_id matches the decrypted ID and flag is 'show'
        $submenus = SubMenu1::where('tbl_nav_menu_id', $decryptedId)
                            ->where('flag', 'show')
                            ->get();
        
        // If no submenus are found, $submenus will be an empty collection ([])
        
        // Iterate through each submenu
        foreach($submenus as $submenu)
        {
            // Encrypt the submenu ID and set it to encSubMenu1Id
            $submenu->encSubMenu1Id = EncDecHelper::encDecId($submenu->tbl_n_sub_menu_1_id, 'encrypt');
            
            // Set encNavMenuId to the original ID passed to the function
            $submenu->encNavMenuId = $id;
            
            // Unset tbl_nav_menu_id and tbl_sub_menu_1_id from the response
            unset($submenu->tbl_nav_menu_id, $submenu->tbl_n_sub_menu_1_id);
        }
        
        // Return the submenus as a JSON response with HTTP status code 200
        return response()->json($submenus, 200);
    }
    
    public function createSubMenu1(Request $request)
    {
        $navMenuId = EncDecHelper::encDecID($request->encNavMenuId,'decrypt');
        $navMenuName = NavbarMenu::where('tbl_nav_menu_id',$navMenuId)->value('n_menu_name');

        $subMenu1 = new SubMenu1;
        $subMenu1->tbl_nav_menu_id = $navMenuId;
        $subMenu1->sub_menu_1_name = $request->subMenu1Name;
        $subMenu1->sub_menu_1_desc = $request->subMenu1Desc; // Assuming n_menu_desc is a blob/text field

        
        // Handle file upload for icon
        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $iconPath = $icon->storeAs('Sub Menu 1', $icon->getClientOriginalName(), 'public');
            $subMenu1->sub_menu_1_icon = $iconPath;
        }

        $subMenu1->show_status = $request->display;
        $subMenu1->sequence_no = $request->sequenceNo;
        $subMenu1->link = '/web/'.$navMenuName.'/submenu1';
        $subMenu1->add_date = Date::now()->toDateString();
        $subMenu1->add_time = Date::now()->toTimeString();
        $subMenu1->flag = 'show';

        // Save the navbar menu item
        $subMenu1->save();

        return response()->json(['message' => 'sub menu 1 created successfully', 'subMenu1' => $subMenu1], 201);
    }

    public function updateSubMenu1(Request $request)
    {
        $navMenuId = EncDecHelper::encDecID($request->encNavMenuId,'decrypt');
        $navMenuName = NavbarMenu::where('tbl_nav_menu_id',$navMenuId)->value('n_menu_name');

        $subMenu1 = SubMenu1::find(EncDecHelper::encDecId($request->encSubMenu1Id,'decrypt'));

        $subMenu1->tbl_nav_menu_id = $navMenuId;
        $subMenu1->sub_menu_1_name = $request->subMenu1Name;
        $subMenu1->sub_menu_1_desc = $request->subMenu1Desc; // Assuming n_menu_desc is a blob/text field

        // Handle file upload for icon
        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $iconPath = $icon->storeAs('Sub Menu 1', $icon->getClientOriginalName(), 'public');
            $subMenu1->sub_menu_1_icon = $iconPath;
        }

        $subMenu1->show_status = $request->display;
        $subMenu1->sequence_no = $request->sequenceNo;
        $subMenu1->link = '/web/'.$navMenuName.'/submenu1';
        $subMenu1->updated_date = Date::now()->toDateString();
        $subMenu1->updated_time = Date::now()->toTimeString();
        $subMenu1->flag = 'show';

        // Save the navbar menu item
        $subMenu1->save();

        return response()->json(['message' => 'sub menu 1 updated successfully', 'subMenu1' => $subMenu1], 200);

    }

    public function deleteSubMenu1($id)
    {
        $subMenu1Id = EncDecHelper::encDecId($id, 'decrypt');
        $subMenu1 = SubMenu1::find($subMenu1Id);

        if (!$subMenu1) {
            return response()->json(['message' => 'Sub menu not found'], 404);
        }

        // Delete associated files if they exist
        // if ($navMenu->n_menu_icon) {
        //     Storage::disk('public')->delete($navMenu->n_menu_icon);
        // }

        // if ($navMenu->n_menu_bg_img) {
        //     Storage::disk('public')->delete($navMenu->n_menu_bg_img);
        // }

        // Delete the navbar menu item
        $subMenu1->deleted_date=Date::now()->toDateString();
        $subMenu1->deleted_time=Date::now()->toTimeString();
        $subMenu1->flag='deleted';
        $subMenu1->save();

        return response()->json(['message' => 'Sub menu 1 deleted successfully'], 200);
    }

}
