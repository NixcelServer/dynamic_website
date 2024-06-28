<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('tbl_cmp_desc_imgs', function (Blueprint $table) {
            $table->id('tbl_cmp_desc_img_id'); // Primary key (equivalent to increments + unsigned)
            $table->unsignedBigInteger('tbl_cmp_desc_id'); // Foreign key to tbl_cmp_desc table
            $table->string('cmp_desc_img_path', 250); // Path to company description image
            
            $table->date('add_date'); // Date added
            $table->time('add_time'); // Time added
            
            $table->date('deleted_date')->nullable(); // Date deleted, nullable
            $table->time('deleted_time')->nullable(); // Time deleted, nullable
            
            $table->string('flag', 45); // Flag
            
            // Foreign key constraint
            $table->foreign('tbl_cmp_desc_id')
                  ->references('tbl_cmp_desc_id')
                  ->on('tbl_cmp_desc')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tbl_cmp_desc_imgs');
    }
};
