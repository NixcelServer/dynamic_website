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
        Schema::create('tbl_project_imgs', function (Blueprint $table) {
            $table->id('tbl_project_img_id'); // Auto Increment ID for project image
            $table->unsignedBigInteger('tbl_project_id'); // Foreign key referencing projects
            $table->string('project_img_path', 250); // Path to the project image
            $table->date('add_date'); // Date when the image was added
            $table->time('add_time'); // Time when the image was added
            $table->date('deleted_date')->nullable(); // Date when the image was deleted
            $table->time('deleted_time')->nullable(); // Time when the image was deleted
            $table->string('flag', 7)->default('show'); // Status flag

            // Assuming this is a foreign key:
            $table->foreign('tbl_project_id')->references('tbl_project_id')->on('tbl_projects');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_project_imgs');
    }
};
