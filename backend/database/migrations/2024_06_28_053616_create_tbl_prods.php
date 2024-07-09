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
        Schema::create('tbl_prods', function (Blueprint $table) {
            $table->id('tbl_prod_id');
            $table->unsignedBigInteger('tbl_nav_menu_id');
            $table->unsignedBigInteger('tbl_n_sub_menu_1_id')->nullable();
            $table->unsignedBigInteger('tbl_n_sub_menu_2_id')->nullable();
            $table->string('prod_name', 100);
            $table->binary('prod_desc');
            $table->string('show_status');
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->date('updated_date')->nullable();
            $table->time('updated_time')->nullable();
            $table->date('deleted_date')->nullable();
            $table->time('deleted_time')->nullable();
            $table->string('flag', 7)->nullable();

            // Foreign key constraints
            $table->foreign('tbl_nav_menu_id')->references('tbl_nav_menu_id')->on('mst_tbl_nav_menu');
            $table->foreign('tbl_n_sub_menu_1_id')->references('tbl_n_sub_menu_1_id')->on('tbl_n_sub_menu_1');
            $table->foreign('tbl_n_sub_menu_2_id')->references('tbl_n_sub_menu_2_id')->on('tbl_n_sub_menu_2');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_prods');
    }
};
