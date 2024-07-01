<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'tbl_prods';
    protected $primaryKey = 'tbl_prod_id';
    public $timestamps = false;

     // Define the hasMany relationship
     public function images()
     {
         return $this->hasMany(ProductImages::class, 'tbl_prod_id', 'tbl_prod_id');
     }
}
