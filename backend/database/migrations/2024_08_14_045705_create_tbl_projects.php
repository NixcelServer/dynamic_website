<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_projects', function (Blueprint $table) {
            $table->id('tbl_project_id'); // Auto Increment ID
            $table->unsignedBigInteger('tbl_nav_menu_id')->nullable(); // Dropdown (Foreign key to tbl_nav_menu)
            $table->unsignedBigInteger('tbl_n_sub_menu_1_id')->nullable(); // Dropdown (Foreign key to tbl_sub_menu_1)
            $table->unsignedBigInteger('tbl_n_sub_menu_2_id')->nullable(); // Dropdown (Foreign key to tbl_sub_menu_2)
            $table->string('project_name', 200); // Textbox for project name
            $table->binary('project_desc'); // CKEditor for project description (Blob)
            $table->string('show_status');
            $table->date('add_date'); // Date when project was added
            $table->time('add_time'); // Time when project was added
            $table->date('updated_date')->nullable(); // Date when project was last updated
            $table->time('updated_time')->nullable(); // Time when project was last updated
            $table->date('deleted_date')->nullable(); // Date when project was last updated
            $table->time('deleted_time')->nullable(); // Time when project was last updated
            $table->string('flag', 7)->default('show'); // Status flag
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_projects');
    }
};
