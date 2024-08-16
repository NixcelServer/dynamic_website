<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectImages extends Model
{
    use HasFactory;

    protected $table = 'tbl_project_imgs';
    protected $primaryKey = 'tbl_project_img_id';
    public $timestamps = false;

    // Define the belongsTo relationship
    public function project()
    {
        return $this->belongsTo(Project::class, 'tbl_project_id', 'tbl_project_id');
    }
}
