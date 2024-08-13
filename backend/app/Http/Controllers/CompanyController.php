<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\EncDecHelper;
use App\Models\Company;
use App\Models\CompanySocialInfo;
use App\Models\CompanyAddress;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    //

    public function getCompanyDetails()
{
    $company = Company::first();
    $socialInfo = CompanySocialInfo::first();
    

    if ($company && $socialInfo) {
        $response = [
            'company' => $company,
            'socialInfo' => $socialInfo
        ];
        return response()->json($response, 200);
    } else {
        return response()->json(['message' => 'Company details not found'], 404);
    }
}

    public function storeCompanyDetails(Request $request)
    {
        
        $cmp = Company::first();
        if (!$cmp) {
            // Create a new company if no entry exists
            $cmp = new Company();
            $cmp->save();
        }

        return $cmp;

        $cmp->c_name = $request -> companyName;
        $cmp->c_email_id = $request->email;
        $cmp->c_mobile_no = $request->mobile;
        if($request->altMobile){
            $cmp->c_alt_mobile_no = $request->altMobile; 
        }
        if($request->landline){
            $cmp->c_landline_no = $request->landline; 
        }
        if($request->altLandline){
            $cmp->c_alt_landline_no = $request->altLandline; 
        }
        $cmp->c_website = $request->website;
        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $logoPath = $logo->storeAs('Company', $logo->getClientOriginalName(), 'public');
            $cmp->c_logo_path = $logoPath;
        }
        $cmp->add_date = Date::now()->toDateString();
        $cmp->add_time = Date::now()->toTimeString();
        $cmp->flag='show';
        $cmp->save();

        $csi = CompanySocialInfo::first();
        if(!$csi){
            $csi = new CompanySocialInfo();
            $csi->tbl_cmp_dtls_id = $cmp->tbl_cmp_dtls_id;
            $csi->save();
        }
        $csi->tbl_cmp_dtls_id = $cmp->tbl_cmp_dtls_id;
        $csi->instagram_url = $request->instaURL;
        $csi->facebook_url = $request->fbURL;
        $csi->google_url = $request->googleURL;
        $csi->linkedin_url = $request->linkedinURL;
        $csi->add_date = Date::now()->toDateString();
        $csi->add_time = Date::now()->toTimeString();
        $csi->flag='show';
        $csi->save();
        return response()->json(['message' => 'company details inserted successfully', 'cmp' => $cmp], 201);

    }

    public function getCompanyAddress()
    {
        $cmpAddress = CompanyAddress::where('flag','show')->get();
        
        foreach ($cmpAddress as $item){
            $item->encCmpAddressId = EncDecHelper::encDecId($item->tbl_cmp_address_id,'encrypt');
            unset($item->tbl_cmp_address_id);
        }
        return response()->json($cmpAddress, 200);
    }

    public function addCompanyAddress(Request $request)
    {
        $cmpAddress = new CompanyAddress();
       // $cmpAddress->address_type = $request->addressType;
        $cmpAddress->address_name = $request->addressName;
        $cmpAddress->country = $request->country;
        $cmpAddress->state = $request->state;
        $cmpAddress->city_village = $request->city;
        $cmpAddress->house_no = $request->houseNo;
        $cmpAddress->area = $request->area;
        $cmpAddress->pincode = $request->pincode;
        $cmpAddress->show_status = $request->display;
        $cmpAddress->add_date = Date::now()->toDateString();
        $cmpAddress->add_time = Date::now()->toTimeString();
        $cmpAddress->flag = 'show';
        $cmpAddress->save();
        return response()->json(['message' => 'company address added successfully', 'cmpAddress' => $cmpAddress], 200);

    }

    public function updateCompanyAddress(Request $request)
    {
        $cmpAddress = CompanyAddress::find(EncDecHelper::encDecId($request->encCmpAddressId,'decrypt'));
        $cmpAddress->address_name = $request->addressName;
        $cmpAddress->country = $request->country;
        $cmpAddress->state = $request->state;
        $cmpAddress->city_village = $request->city;
        $cmpAddress->house_no = $request->houseNo;
        $cmpAddress->area = $request->area;
        $cmpAddress->pincode = $request->pincode;
        $cmpAddress->show_status = $request->display;
        $cmpAddress->updated_date = Date::now()->toDateString();
        $cmpAddress->updated_time = Date::now()->toTimeString();
        $cmpAddress->flag = 'show';
        $cmpAddress->save();
        return response()->json(['message' => 'company address updated successfully', 'cmpAddress' => $cmpAddress], 200); 
    }

    public function deleteCompanyAddress($id)
    {
        $cmpAddress = CompanyAddress::find(EncDecHelper::encDecId($id,'decrypt'));
        $cmpAddress->flag = 'deleted';
        $cmpAddress->deleted_date = Date::now()->toDateString();
        $cmpAddress->deleted_time = Date::now()->toTimeString();
        $cmpAddress->save();
        return response()->json(['message' => 'Company Address deleted successfully', 'cmpAddress' => $cmpAddress], 200); 

    }
}
