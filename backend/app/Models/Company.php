<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;
    protected $table = 'mst_tbl_cmp_dtls';
    protected $primaryKey = 'tbl_cmp_dtls_id';
    public $timestamps = false;

    // Define the hasMany relationship
    public function addresses()
    {
        return $this->hasMany(CompanyAddress::class, 'tbl_cmp_dtls_id', 'tbl_cmp_dtls_id');
    }
}
