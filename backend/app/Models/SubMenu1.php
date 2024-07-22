<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubMenu1 extends Model
{
    use HasFactory;
    protected $table = 'tbl_n_sub_menu_1';
    protected $primaryKey = 'tbl_n_sub_menu_1_id';
    public $timestamps = false;

    // Define the belongsTo relationship
    public function navbarMenu()
    {
        return $this->belongsTo(NavbarMenu::class, 'tbl_nav_menu_id', 'tbl_nav_menu_id');
    }

    // Define the hasMany relationship with SubMenu2
    public function subMenus2()
    {
        return $this->hasMany(SubMenu2::class, 'tbl_n_sub_menu_1_id', 'tbl_n_sub_menu_1_id');
    }
}
