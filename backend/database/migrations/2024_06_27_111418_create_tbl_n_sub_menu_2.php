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
        Schema::create('tbl_n_sub_menu_2', function (Blueprint $table) {
            $table->id('tbl_n_sub_menu_2_id'); // Primary key using big integer, auto-increment
            $table->unsignedBigInteger('tbl_n_sub_menu_1_id'); // Foreign key to tbl_n_sub_menu_1 table
            $table->string('sub_menu_2_name', 255); // Sub menu 2 name
            $table->binary('sub_menu_2_desc')->nullable(); // Sub menu 2 description (nullable)
            $table->string('show_status', 45); // Show status
            $table->integer('sequence_no')->nullable(); // Sequence number
            $table->string('link')->nullable();
            $table->date('add_date'); // Date added
            $table->time('add_time'); // Time added
            $table->date('updated_date')->nullable(); // Date updated, nullable
            $table->time('updated_time')->nullable(); // Time updated, nullable
            $table->date('deleted_date')->nullable(); // Date deleted, nullable
            $table->time('deleted_time')->nullable(); // Time deleted, nullable
            $table->string('flag', 45); // Flag

            // Foreign key constraint
            $table->foreign('tbl_n_sub_menu_1_id')
                  ->references('tbl_n_sub_menu_1_id')
                  ->on('tbl_n_sub_menu_1')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tbl_n_sub_menu_2');
    }
};
