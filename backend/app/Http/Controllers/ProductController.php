<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImages;
use Illuminate\Support\Facades\Date;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    //
    public function newProduct(Request $request)
    {
        DB::beginTransaction();
        
        try {
            $prod = new Product();
            $prod->tbl_nav_menu_id = EncDecHelper::encDecId($request->encNavMenuId, 'decrypt');
            $prod->tbl_n_sub_menu_1_id = EncDecHelper::encDecId($request->encSubMenu1Id, 'decrypt');
            $prod->tbl_n_sub_menu_2_id = EncDecHelper::encDecId($request->encSubMenu2Id, 'decrypt');
            $prod->prod_name = $request->prodName;
            $prod->prod_desc = $request->prodDesc;
            $prod->show_status = $request->display;
            $prod->add_date = Date::now()->toDateString();
            $prod->add_time = Date::now()->toTimeString();
            $prod->flag = 'show';
            $prod->save();

            if ($request->hasFile('prodImgs')) {
                foreach ($request->file('prodImgs') as $image) {
                    $prodImg = new ProductImages();
                    $prodImg->tbl_prod_id = $prod->tbl_prod_id;

                    $imgPath = $image->storeAs('uploads', $image->getClientOriginalName(), 'public');

                    $prodImg->prod_img_path = $imgPath;
                    $prodImg->add_date = Date::now()->toDateString();
                    $prodImg->add_time = Date::now()->toTimeString();
                    $prodImg->flag = 'show';
                    $prodImg->save();
                }
            }

            DB::commit();
            return response()->json(['message' => 'Product added successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Product creation failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateProduct(Request $request)
    {
        DB::beginTransaction();
        
        try {
            $prodId = EncDecHelper::encDecId($request->encProdId,'decrypt');
            $prod = Product::find($prodId);
            $prod->tbl_nav_menu_id = EncDecHelper::encDecId($request->encNavMenuId, 'decrypt');
            $prod->tbl_n_sub_menu_1_id = EncDecHelper::encDecId($request->encSubMenu1Id, 'decrypt');
            $prod->tbl_n_sub_menu_2_id = EncDecHelper::encDecId($request->encSubMenu2Id, 'decrypt');
            $prod->prod_name = $request->prodName;
            $prod->prod_desc = $request->prodDesc;
            $prod->show_status = $request->display;
            $prod->updated_date = Date::now()->toDateString();
            $prod->updated_time = Date::now()->toTimeString();
            $prod->save();

            if ($request->hasFile('prodImgs')) {
                ProductImages::where('tbl_prod_id',$prodId)->delete();
                foreach ($request->file('prodImgs') as $image) {
                    $prodImg = new ProductImages();
                    $prodImg->tbl_prod_id = $prodId;

                    $imgPath = $image->storeAs('uploads', $image->getClientOriginalName(), 'public');

                    $prodImg->prod_img_path = $imgPath;
                    $prodImg->add_date = Date::now()->toDateString();
                    $prodImg->add_time = Date::now()->toTimeString();
                    $prodImg->flag = 'show';
                    $prodImg->save();
                }
            }

            DB::commit();
            return response()->json(['message' => 'Product updated successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Product creation failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteProduct($id)
    {
        $prodId = EncDecHelper::encDecId($id,'decrypt');
        $prod = Product::find($prodId);
        $prod->deleted_date = Date::now()->toDateString();
        $prod->deleted_time = Date::now()->toTimeString();
        $prod->flag = 'deleted';
        $prod->save();
        ProductImages::where('tbl_prod_id',$prodId)->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200); 
    }
}
