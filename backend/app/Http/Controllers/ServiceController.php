<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use App\Models\ServiceImages;
use Illuminate\Support\Facades\Date;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ServiceController extends Controller
{
    //
    public function newService(Request $request)
    {
        DB::beginTransaction();
        
        try {
            $service = new Service();
            $service->tbl_nav_menu_id = EncDecHelper::encDecId($request->encNavMenuId, 'decrypt');
            if($request->encSubMenu1Id){
                $service->tbl_n_sub_menu_1_id = EncDecHelper::encDecId($request->encSubMenu1Id, 'decrypt');
            }
            if($request->encSubMenu2Id){
                $service->tbl_n_sub_menu_2_id = EncDecHelper::encDecId($request->encSubMenu2Id, 'decrypt');
            }
            $service->service_name = $request->serviceName;
            $service->service_desc = $request->serviceDesc;
            $service->show_status = $request->display;
            $service->add_date = Date::now()->toDateString();
            $service->add_time = Date::now()->toTimeString();
            $service->flag = 'show';
            $service->save();

            if ($request->hasFile('serviceImgs')) {
                foreach ($request->file('serviceImgs') as $image) {
                    $serviceImg = new ServiceImages();
                    $serviceImg->tbl_service_id = $service->tbl_service_id;

                    $imgPath = $image->storeAs('uploads', $image->getClientOriginalName(), 'public');

                    $serviceImg->service_img_path = $imgPath;
                    $serviceImg->add_date = Date::now()->toDateString();
                    $serviceImg->add_time = Date::now()->toTimeString();
                    $serviceImg->flag = 'show';
                    $serviceImg->save();
                }
            }

            DB::commit();
            return response()->json(['message' => 'Service added successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Service creation failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function updateService(Request $request)
    {
        DB::beginTransaction();
        
        try {
            $serviceId = EncDecHelper::encDecId($request->encServiceId,'decrypt');
            $service = Service::find($serviceId);
            $service->tbl_nav_menu_id = EncDecHelper::encDecId($request->encNavMenuId, 'decrypt');
            if($request->encSubMenu1Id){
                $service->tbl_n_sub_menu_1_id = EncDecHelper::encDecId($request->encSubMenu1Id, 'decrypt');
            }
            if($request->encSubMenu2Id){
                $service->tbl_n_sub_menu_2_id = EncDecHelper::encDecId($request->encSubMenu2Id, 'decrypt');
            }
            // 
            $service->service_name = $request->serviceName;
            $service->service_desc = $request->serviceDesc;
            $service->show_status = $request->display;
            $service->add_date = Date::now()->toDateString();
            $service->add_time = Date::now()->toTimeString();
            $service->flag = 'show';
            $service->save();

            if ($request->hasFile('serviceImgs')) {
                ServiceImages::where('tbl_service_id',$serviceId)->delete();
                foreach ($request->file('serviceImgs') as $image) {
                    $serviceImg = new ServiceImages();
                    $serviceImg->tbl_service_id = $service->tbl_service_id;

                    $imgPath = $image->storeAs('uploads', $image->getClientOriginalName(), 'public');

                    $serviceImg->service_img_path = $imgPath;
                    $serviceImg->add_date = Date::now()->toDateString();
                    $serviceImg->add_time = Date::now()->toTimeString();
                    $serviceImg->flag = 'show';
                    $serviceImg->save();
                }
            }

            DB::commit();
            return response()->json(['message' => 'Service updated successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Service updation failed', 'error' => $e->getMessage()], 500);
        }
    }

    public function deleteService($id)
    {
        $serviceId = EncDecHelper::encDecId($id,'decrypt');
        $service = Service::find($serviceId);
        $service->deleted_date = Date::now()->toDateString();
        $service->deleted_time = Date::now()->toTimeString();
        $service->flag = 'deleted';
        $service->save();
        ServiceImages::where('tbl_service_id',$serviceId)->delete();
        return response()->json(['message' => 'Service deleted successfully'], 200); 
    }
}
