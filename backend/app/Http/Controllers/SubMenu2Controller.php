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
