<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HPSliderImageSubHeading extends Model
{
    use HasFactory;
    protected $table = 'tbl_hp_slider_sh';
    protected $primaryKey = 'tbl_hp_slider_sh_id';
    public $timestamps = false;

    // Define the belongsTo relationship
    public function homePageSliderImage()
    {
        return $this->belongsTo(HomePageSliderImage::class, 'tbl_hp_slider_img_id', 'tbl_hp_slider_img_id');
    }
}
