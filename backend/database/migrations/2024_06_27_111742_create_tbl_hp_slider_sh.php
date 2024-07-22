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
        Schema::create('tbl_hp_slider_sh', function (Blueprint $table) {
            $table->id('tbl_hp_slider_sh_id'); // Primary key using big integer, auto-increment
            $table->unsignedBigInteger('tbl_hp_slider_img_id'); // Foreign key to tbl_hp_slider_imgs table
            $table->string('sub_heading', 250)->nullable(); // Sub heading for the slider
            $table->date('add_date')->nullable(); // Date added
            $table->time('add_time')->nullable(); // Time added
            $table->date('updated_date')->nullable(); // Date updated, nullable
            $table->time('updated_time')->nullable(); // Time updated, nullable
            $table->date('deleted_date')->nullable(); // Date updated, nullable
            $table->time('deleted_time')->nullable();
            $table->string('flag', 45); // Flag

            // Foreign key constraint for tbl_hp_slider_img_id
            $table->foreign('tbl_hp_slider_img_id')
                  ->references('tbl_hp_slider_img_id')
                  ->on('tbl_hp_slider_imgs')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tbl_hp_slider_sh');
    }
};

