<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyDescription extends Model
{
    use HasFactory;
    protected $table = 'tbl_cmp_desc';
    protected $primaryKey = 'tbl_cmp_desc_id';
    public $timestamps = false;

}
