<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\ProjectImages;
use Illuminate\Support\Facades\Date;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{

    //web projects
    public function getProjects(){
        $projects = Project::with(['images'=>function($query){
            $query->where('flag','show');
        }])->where('show_status','yes')->where('flag','show')->get();

        foreach ($projects as $project){
            $project->encServiceId = EncDecHelper::encDecId($project->tbl_service_id,'encrypt');
            $project->encNavMenuId = EncDecHelper::encDecId($project->tbl_nav_menu_id,'encrypt');
            $project->encSubMenu1Id = EncDecHelper::encDecId($project->tbl_n_sub_menu_1_id,'encrypt');
            $project->encSubMenu2Id = EncDecHelper::encDecId($project->tbl_n_sub_menu_2_id,'encrypt');

            unset($project->tbl_service_id,$project->tbl_nav_menu_id,$project->tbl_n_sub_menu_1_id,$project->tbl_n_sub_menu_2_id);
        }

        return response()->json($projects, 200);
    }

    //admin login projects

    public function getProjectDetails()
    {
        $projects = Project::with(['images' => function($query) {
            $query->where('flag', 'show');
        }])->where('flag', 'show')->get();
    
        foreach ($projects as $project) {
            $project->encProdId = EncDecHelper::encDecId($project->tbl_prod_id, 'encrypt');
            $project->encNavMenuId = EncDecHelper::encDecId($project->tbl_nav_menu_id, 'encrypt');
            $project->encSubMenu1Id = EncDecHelper::encDecId($project->tbl_n_sub_menu_1_id, 'encrypt');
            $project->encSubMenu2Id = EncDecHelper::encDecId($project->tbl_n_sub_menu_2_id, 'encrypt');
    
            // Encrypt image IDs
            $project->images->transform(function($image) {
                $image->encImgId = EncDecHelper::encDecId($image->tbl_prod_img_id, 'encrypt');
                return $image;
            });
    
            unset($project->tbl_prod_id, $project->tbl_nav_menu_id, $project->tbl_n_sub_menu_1_id, $project->tbl_n_sub_menu_2_id);
        }
    
        return response()->json($projects, 200);
    }

    public function newProject(Request $request)
    {
        DB::beginTransaction();
        
        try {
            $project = new Project();
            $project->tbl_nav_menu_id = EncDecHelper::encDecId($request->encNavMenuId, 'decrypt');
            $project->tbl_n_sub_menu_1_id = EncDecHelper::encDecId($request->encSubMenu1Id, 'decrypt');
            $project->tbl_n_sub_menu_2_id = EncDecHelper::encDecId($request->encSubMenu2Id, 'decrypt');
            $project->project_name = $request->projectName;
            $project->project_desc = $request->projectDesc;
            $project->show_status = $request->display;
            $project->add_date = Date::now()->toDateString();
            $project->add_time = Date::now()->toTimeString();
            $project->flag = 'show';
            $project->save();

            

            if ($request->hasFile('projectImgs')) {
                foreach ($request->file('projectImgs') as $image) {
                    $projectImg = new ProjectImages();
                    $projectImg->tbl_project_id = $project->tbl_project_id;

                    $imgPath = $image->storeAs('Projects', $image->getClientOriginalName(), 'public');

                    $projectImg->project_img_path = $imgPath;
                    $projectImg->add_date = Date::now()->toDateString();
                    $projectImg->add_time = Date::now()->toTimeString();
                    $projectImg->flag = 'show';
                    $projectImg->save();
                }
            }

            DB::commit();
            return response()->json(['message' => 'Project added successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Project creation failed', 'error' => $e->getMessage()], 500);
        }
    }


}
