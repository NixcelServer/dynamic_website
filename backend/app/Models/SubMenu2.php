<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubMenu2 extends Model
{
    use HasFactory;
    protected $table = 'tbl_n_sub_menu_2';
    protected $primaryKey = 'tbl_n_sub_menu_2_id';
    public $timestamps = false;

    // Define the belongsTo relationship
    public function subMenu1()
    {
        return $this->belongsTo(SubMenu1::class, 'tbl_n_sub_menu_1_id', 'tbl_n_sub_menu_1_id');
    }
}
