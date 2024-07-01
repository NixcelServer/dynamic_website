<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyAddress extends Model
{
    use HasFactory;
    protected $table = 'tbl_cmp_address';
    protected $primaryKey = 'tbl_cmp_address_id';
    public $timestamps = false;

     // Define the belongsTo relationship
     public function company()
     {
         return $this->belongsTo(Company::class, 'tbl_cmp_dtls_id', 'tbl_cmp_dtls_id');
     }


}
