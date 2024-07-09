<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HomePageSliderImage;
use App\Models\HPSliderImageSubHeading;
use App\Models\CompanyDescription;
use App\Models\CompanyDescriptionImages;
use Illuminate\Support\Facades\Date;
use App\Helpers\EncDecHelper;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;


class HomePageController extends Controller
{
    //
    public function newHPSliderImgs(Request $request)
    {
        $hpSliderImg = new HomePageSliderImage();
        $bgImg = $request->file('bgImg');
        $bgImgPath = $bgImg->storeAs('uploads', $bgImg->getClientOriginalName(), 'public');
        $hpSliderImg->slider_img_path = $bgImgPath;
        $hpSliderImg->heading = $request->heading;
        $hpSliderImg->add_date = Date::now()->toDateString();
        $hpSliderImg->add_time = Date::now()->toTimeString();
        $hpSliderImg->flag='show';
        $hpSliderImg->save();

        // Iterate through the array of subheadings and save each one
        foreach ($request->subheadings as $subheadingText) {
            $subheading = new HPSliderImageSubHeading();
            $subheading->tbl_hp_slider_img_id = $hpSliderImg->tbl_hp_slider_img_id;
            $subheading->sub_heading = $subheadingText;
            $subheading->add_date = Date::now()->toDateString();
            $subheading->add_time = Date::now()->toTimeString();
            $subheading->flag='show';
            $subheading->save();
        }
        return response()->json(['message' => 'Home Page Slider Image successfully'], 200); 
        
    }

    public function updateHPSliderImgs(Request $request)
    {
        $decHPSliderImgId = EncDecHelper::encDecId($request->encHPSliderImgId,'decrypt');
        $hpSliderImg = HomePageSliderImage::find($decHPSliderImgId);
        $bgImg = $request->file('bgImg');
        $bgImgPath = $bgImg->storeAs('uploads', $bgImg->getClientOriginalName(), 'public');
        $hpSliderImg->slider_img_path = $bgImgPath;
        $hpSliderImg->heading = $request->heading;
        $hpSliderImg->updated_date = Date::now()->toDateString();
        $hpSliderImg->updated_time = Date::now()->toTimeString();
        $hpSliderImg->flag='show';
        $hpSliderImg->save();

        HPSliderImageSubHeading::where('tbl_hp_slider_img_id', $decHPSliderImgId)->delete();

        if($request->subheadings){
            // Iterate through the array of subheadings and save each one
        foreach ($request->subheadings as $subheadingText) {
            $subheading = new HPSliderImageSubHeading();
            $subheading->tbl_hp_slider_img_id = $hpSliderImg->tbl_hp_slider_img_id;
            $subheading->sub_heading = $subheadingText;
            $subheading->updated_date = Date::now()->toDateString();
            $subheading->updated_time = Date::now()->toTimeString();
            $subheading->flag='show';
            $subheading->save();
        }
        }
        return response()->json(['message' => 'Home Page Slider Image updated successfully'], 200); 
        
    }

    public function deleteHPSliderImg($id)
    {
        $decHPSliderImgId = EncDecHelper::encDecId($id,'decrypt');
        $hpSliderImg = HomePageSliderImage::find($decHPSliderImgId);
        $hpSliderImg->deleted_date = Date::now()->toDateString();
        $hpSliderImg->deleted_time = Date::now()->toTimeString();
        $hpSliderImg->flag='deleted';
        $hpSliderImg->save(); 
        HPSliderImageSubHeading::where('tbl_hp_slider_img_id', $decHPSliderImgId)->delete();
        return response()->json(['message' => 'Home Page Slider Image deleted successfully'], 200); 

    }

    public function editAboutUs(Request $request)
    {
        // DB::beginTransaction();

        try {
            $aboutUs = CompanyDescription::first();
            if (!$aboutUs) {
                $aboutUs = new CompanyDescription();
                $aboutUs->add_date = Date::now()->toDateString();
                $aboutUs->add_time = Date::now()->toTimeString();
                $aboutUs->flag = 'show';
                $aboutUs->save();
            }
            $aboutUs->cmp_desc = $request->companyDesc;
            $aboutUs->show_status = $request->display;
            $aboutUs->updated_date = Date::now()->toDateString();
            $aboutUs->updated_time = Date::now()->toTimeString();
            $aboutUs->save();

            // Debugging: Check if the record exists in the database
            if (!CompanyDescription::find($aboutUs->tbl_cmp_desc_id)) {
                throw new \Exception('The referenced tbl_cmp_desc_id does not exist.');
            }
            
            if ($request->hasFile('imgs')) {
                foreach ($request->file('imgs') as $image) {
                    $descImg = new CompanyDescriptionImages();
                    $descImg->tbl_cmp_desc_id = $aboutUs->tbl_cmp_desc_id;

                    $imgPath = $image->storeAs('uploads', $image->getClientOriginalName(), 'public');

                    $descImg->cmp_desc_img_path = $imgPath;
                    $descImg->add_date = Date::now()->toDateString();
                    $descImg->add_time = Date::now()->toTimeString();
                    $descImg->flag = 'show';
                    $descImg->save();
                }
            }

            // DB::commit();
            return response()->json(['message' => 'About Us section updated successfully'], 200);
        } catch (\Exception $e) {
            // DB::rollBack();
            return response()->json(['message' => 'Failed to update About Us section', 'error' => $e->getMessage()], 500);
        }
    }
}
