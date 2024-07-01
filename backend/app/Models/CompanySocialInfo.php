<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanySocialInfo extends Model
{
    use HasFactory;
    protected $table = 'tbl_csi';
    protected $primaryKey = 'tbl_csi_id';
    public $timestamps = false;
}
