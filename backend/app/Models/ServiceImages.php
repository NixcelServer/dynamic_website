<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceImages extends Model
{
    use HasFactory;
    protected $table = 'tbl_service_imgs';
    protected $primaryKey = 'tbl_service_img_id';
    public $timestamps = false;

    // Define the belongsTo relationship
    public function service()
    {
        return $this->belongsTo(Service::class, 'tbl_service_id', 'tbl_service_id');
    }
}
