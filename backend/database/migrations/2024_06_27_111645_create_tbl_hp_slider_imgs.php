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
        Schema::create('tbl_hp_slider_imgs', function (Blueprint $table) {
            $table->id('tbl_hp_slider_img_id'); // Primary key using big integer, auto-increment
            $table->string('slider_img_path', 250); // Path to slider image
            $table->string('heading', 250)->nullable(); // Heading for the slider image
            $table->date('add_date')->nullable(); // Date added
            $table->time('add_time')->nullable(); // Time added
            $table->date('updated_date')->nullable(); // Date updated, nullable
            $table->time('updated_time')->nullable(); // Time updated, nullable
            $table->date('deleted_date')->nullable(); // Date deleted, nullable
            $table->time('deleted_time')->nullable(); // Time deleted, nullable
            $table->string('flag', 45); // Flag

            $table->timestamps(); // Laravel timestamps for created_at and updated_at fields
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tbl_hp_slider_imgs');
    }
};
