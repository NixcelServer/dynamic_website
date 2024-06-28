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
        Schema::create('tbl_prod_imgs', function (Blueprint $table) {
            $table->id('tbl_prod_img_id');
            $table->unsignedBigInteger('tbl_prod_id');
            $table->string('prod_img_path');
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->date('deleted_date')->nullable();
            $table->time('deleted_time')->nullable();
            $table->string('flag', 7)->nullable();

            // Foreign key constraint
            $table->foreign('tbl_prod_id')->references('tbl_prod_id')->on('tbl_prods')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_prod_imgs');
    }
};
