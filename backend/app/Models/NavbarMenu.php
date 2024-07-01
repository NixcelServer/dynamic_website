<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NavbarMenu extends Model
{
    use HasFactory;
    protected $table = 'mst_tbl_nav_menu';
    protected $primaryKey = 'tbl_nav_menu_id';
    public $timestamps = false;

    // Define the hasMany relationship
    public function subMenus()
    {
        return $this->hasMany(SubMenu1::class, 'tbl_nav_menu_id', 'tbl_nav_menu_id');
    }
}
