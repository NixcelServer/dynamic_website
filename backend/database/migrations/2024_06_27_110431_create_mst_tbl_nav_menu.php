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
        Schema::create('mst_tbl_nav_menu', function (Blueprint $table) {
            $table->id('tbl_nav_menu_id'); // Primary key
            $table->string('n_menu_name', 255); // Menu name
            $table->string('n_menu_icon')->nullable(); // Menu icon (nullable)
            $table->binary('nav_menu_desc')->nullable(); // BLOB column for menu description (nullable)
            $table->string('show_status', 45); // Show status
            $table->integer('sequence_no')->nullable(); // Sequence number
            $table->string('nav_menu_bg_img')->nullable(); // Background image for menu (nullable)
            $table->date('add_date'); // Date added
            $table->time('add_time'); // Time added
            $table->date('updated_date')->nullable(); // Date updated, nullable
            $table->time('updated_time')->nullable(); // Time updated, nullable
            $table->date('deleted_date')->nullable(); // Date deleted, nullable
            $table->time('deleted_time')->nullable(); // Time deleted, nullable
            $table->string('flag', 45); // Flag
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('mst_tbl_nav_menu');
    }
};
