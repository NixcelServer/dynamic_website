<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyDescriptionImages extends Model
{
    use HasFactory;
    protected $table = 'tbl_cmp_desc_imgs';
    protected $primaryKey = 'tbl_cmp_desc_img_id';
    public $timestamps = false;
}
