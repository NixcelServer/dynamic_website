<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $table = 'tbl_projects';
    protected $primaryKey = 'tbl_project_id';
    public $timestamps = false;

    public function images()
     {
         return $this->hasMany(ProjectImages::class, 'tbl_project_id', 'tbl_project_id');
     }
}
