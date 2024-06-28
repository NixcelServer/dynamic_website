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
        Schema::create('tbl_n_sub_menu_1', function (Blueprint $table) {
            $table->id('tbl_n_sub_menu_1_id'); // Primary key using big integer, auto-increment
            $table->unsignedBigInteger('tbl_nav_menu_id'); // Foreign key to tbl_nav_menu table
            $table->string('sub_menu_1_name', 255); // Sub menu 1 name
            $table->string('sub_menu_1_icon')->nullable(); // Sub menu 1 icon (nullable)
            $table->text('sub_menu_1_desc')->nullable(); // Sub menu 1 description (nullable)
            $table->string('show_status', 45); // Show status
            $table->integer('sequence_no')->nullable(); // Sequence number
            $table->date('add_date'); // Date added
            $table->time('add_time'); // Time added
            $table->date('updated_date')->nullable(); // Date updated, nullable
            $table->time('updated_time')->nullable(); // Time updated, nullable
            $table->date('deleted_date')->nullable(); // Date deleted, nullable
            $table->time('deleted_time')->nullable(); // Time deleted, nullable
            $table->string('flag', 45); // Flag

            // Foreign key constraint
            $table->foreign('tbl_nav_menu_id')
                  ->references('tbl_nav_menu_id')
                  ->on('mst_tbl_nav_menu')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tbl_n_sub_menu_1');
    }
};
