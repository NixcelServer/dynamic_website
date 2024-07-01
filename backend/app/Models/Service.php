<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;
    protected $table = 'tbl_services';
    protected $primaryKey = 'tbl_service_id';
    public $timestamps = false;

     // Define the hasMany relationship
     public function images()
     {
         return $this->hasMany(ServiceImages::class, 'tbl_service_id', 'tbl_service_id');
     }
}
