<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImages extends Model
{
    use HasFactory;
    protected $table = 'tbl_prod_imgs';
    protected $primaryKey = 'tbl_prod_img_id';
    public $timestamps = false;

    // Define the belongsTo relationship
    public function product()
    {
        return $this->belongsTo(Product::class, 'tbl_prod_id', 'tbl_prod_id');
    }
}
