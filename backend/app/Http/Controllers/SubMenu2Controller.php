<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\EncDecHelper;
use App\Models\SubMenu2;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;

class SubMenu2Controller extends Controller
{
    //

    public function getSubMenu2($id)
    {
        // Decrypt the navigation menu ID using EncDecHelper (assuming it's a custom helper for encryption/decryption)
        $decryptedId = EncDecHelper::encDecId($id, 'decrypt');
        
        // Retrieve submenus from the SubMenu1 model where the tbl_nav_menu_id matches the decrypted ID and flag is 'show'
        $submenus = SubMenu2::where('tbl_n_sub_menu_1_id', $decryptedId)
                            ->where('flag', 'show')
                            ->get();
        
        // If no submenus are found, $submenus will be an empty collection ([])
        
        // Iterate through each submenu
        foreach($submenus as $submenu)
        {
            // Encrypt the submenu ID and set it to encSubMenu1Id
            $submenu->encSubMenu1Id = $id;
            
            // Set encNavMenuId to the original ID passed to the function
            $submenu->encSubMenu2Id = EncDecHelper::encDecId($submenu->tbl_n_sub_menu_2_id, 'encrypt');
            
            // Unset tbl_nav_menu_id and tbl_sub_menu_1_id from the response
            unset($submenu->tbl_n_sub_menu_1_id, $submenu->tbl_n_sub_menu_2_id);
        }
        
        // Return the submenus as a JSON response with HTTP status code 200
        return response()->json($submenus, 200);
    }


    public function createSubMenu2(Request $request)
    {
        $subMenu1Id = EncDecHelper::encDecID($request->encSubMenu1Id,'decrypt');
        $subMenu2 = new SubMenu2;
        $subMenu2->tbl_n_sub_menu_1_id = $subMenu1Id;
        $subMenu2->sub_menu_2_name = $request->subMenu2Name;
        $subMenu2->sub_menu_2_desc = $request->subMenu2Desc; // Assuming n_menu_desc is a blob/text field

        
        // Handle file upload for icon
        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $iconPath = $icon->storeAs('uploads', $icon->getClientOriginalName(), 'public');
            $subMenu2->sub_menu_2_icon = $iconPath;
        }

        $subMenu2->show_status = $request->display;
        $subMenu2->sequence_no = $request->sequenceNo;
        $subMenu2->add_date = Date::now()->toDateString();
        $subMenu2->add_time = Date::now()->toTimeString();
        $subMenu2->flag = 'show';

        // Save the navbar menu item
        $subMenu2->save();

        return response()->json(['message' => 'sub menu 2 created successfully', 'subMenu2' => $subMenu2], 201);
    }

    public function updateSubMenu2(Request $request)
    {
        $subMenu1Id = EncDecHelper::encDecID($request->encSubMenu1Id,'decrypt');
        $subMenu2 = SubMenu2::find(EncDecHelper::encDecId($request->encSubMenu2Id,'decrypt'));

        $subMenu2->tbl_n_sub_menu_1_id = $subMenu1Id;
        $subMenu2->sub_menu_2_name = $request->subMenu2Name;
        $subMenu2->sub_menu_2_desc = $request->subMenu2Desc; // Assuming n_menu_desc is a blob/text field

        // Handle file upload for icon
        if ($request->hasFile('icon')) {
            $icon = $request->file('icon');
            $iconPath = $icon->storeAs('uploads', $icon->getClientOriginalName(), 'public');
            $subMenu2->sub_menu_2_icon = $iconPath;
        }

        $subMenu2->show_status = $request->display;
        $subMenu2->sequence_no = $request->sequenceNo;
        $subMenu2->updated_date = Date::now()->toDateString();
        $subMenu2->updated_time = Date::now()->toTimeString();
        $subMenu2->flag = 'show';

        // Save the navbar menu item
        $subMenu2->save();

        return response()->json(['message' => 'sub menu 2 updated successfully', 'subMenu2' => $subMenu2], 200);
    }

    public function deleteSubMenu2($id)
    {
        $subMenu2Id = EncDecHelper::encDecId($id, 'decrypt');
        $subMenu2 = SubMenu2::find($subMenu2Id);

        if (!$subMenu2) {
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
        $subMenu2->deleted_date=Date::now()->toDateString();
        $subMenu2->deleted_time=Date::now()->toTimeString();
        $subMenu2->flag='deleted';
        $subMenu2->save();

        return response()->json(['message' => 'Sub menu 2 deleted successfully'], 200);
    }
}
