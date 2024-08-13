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

    //web login products
    public function getProducts(){
        $products = Product::with(['images'=>function($query){
            $query->where('flag','show');
        }])->where('show_status','yes')->where('flag','show')->get();

        foreach ($products as $product){
            $product->encServiceId = EncDecHelper::encDecId($product->tbl_service_id,'encrypt');
            $product->encNavMenuId = EncDecHelper::encDecId($product->tbl_nav_menu_id,'encrypt');
            $product->encSubMenu1Id = EncDecHelper::encDecId($product->tbl_n_sub_menu_1_id,'encrypt');
            $product->encSubMenu2Id = EncDecHelper::encDecId($product->tbl_n_sub_menu_2_id,'encrypt');

            unset($product->tbl_service_id,$product->tbl_nav_menu_id,$product->tbl_n_sub_menu_1_id,$product->tbl_n_sub_menu_2_id);
        }

        return response()->json($products, 200);
    }

    //admin login products
    public function getProductDetails()
{
    $products = Product::with(['images' => function($query) {
        $query->where('flag', 'show');
    }])->where('flag', 'show')->get();

    foreach ($products as $product) {
        $product->encProdId = EncDecHelper::encDecId($product->tbl_prod_id, 'encrypt');
        $product->encNavMenuId = EncDecHelper::encDecId($product->tbl_nav_menu_id, 'encrypt');
        $product->encSubMenu1Id = EncDecHelper::encDecId($product->tbl_n_sub_menu_1_id, 'encrypt');
        $product->encSubMenu2Id = EncDecHelper::encDecId($product->tbl_n_sub_menu_2_id, 'encrypt');

        // Encrypt image IDs
        $product->images->transform(function($image) {
            $image->encImgId = EncDecHelper::encDecId($image->tbl_prod_img_id, 'encrypt');
            return $image;
        });

        unset($product->tbl_prod_id, $product->tbl_nav_menu_id, $product->tbl_n_sub_menu_1_id, $product->tbl_n_sub_menu_2_id);
    }

    return response()->json($products, 200);
}

    public function getSM1Content($id){
        $subMenu1Id = EncDecHelper::encDecId($id,'decrypt');

        $prods = Product::where('tbl_n_sub_menu_1_id', $subMenu1Id)
        ->where('show_status', 'yes')
        ->where('flag', 'show')
        ->with('images') // Eager load the images relationship
        ->get();
        
        $withSubMenu2 = [];
        $withoutSubMenu2 = [];

        foreach ($prods as $prod) {
            if (!empty($prod->tbl_n_sub_menu_2_id)) {
                $withSubMenu2[] = $prod;
            } else {
                $withoutSubMenu2[] = $prod;
            }
        }

        return response()->json([
            'withSubMenu2' => $withSubMenu2,
            'withoutSubMenu2' => $withoutSubMenu2,
        ]);
    }

    public function getSM2Content($id){
        $subMenu2Id = EncDecHelper::encDecId($id,'decrypt');

        $prods = Product::where('tbl_n_sub_menu_2_id', $subMenu2Id)
        ->where('show_status', 'yes')
        ->where('flag', 'show')
        ->with('images') // Eager load the images relationship
        ->get();
    

    

    return response()->json( $prods,200);
    }


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

            // Retrieve existing image IDs to keep
        $existingImgIds = $request->has('existingProdImgIds') ? json_decode($request->existingProdImgIds) : [];

        // Decrypt existing image IDs
        $decryptedImgIds = array_map(function($id) {
            return EncDecHelper::encDecId($id, 'decrypt');
        }, $existingImgIds);

        // Delete images that are not in the existing images list
        ProductImages::where('tbl_prod_id', $prodId)
            ->whereNotIn('tbl_prod_img_id', $decryptedImgIds)
            ->delete();

            if ($request->hasFile('prodImgs')) {
                // ProductImages::where('tbl_prod_id',$prodId)->delete();
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
