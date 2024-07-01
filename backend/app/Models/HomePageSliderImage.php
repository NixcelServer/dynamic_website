<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomePageSliderImage extends Model
{
    use HasFactory;
    protected $table = 'tbl_hp_slider_imgs';
    protected $primaryKey = 'tbl_hp_slider_img_id';
    public $timestamps = false;

    // Define the hasMany relationship
    public function subHeadings()
    {
        return $this->hasMany(HPSliderImageSubHeading::class, 'tbl_hp_slider_img_id', 'tbl_hp_slider_img_id');
    }
}
