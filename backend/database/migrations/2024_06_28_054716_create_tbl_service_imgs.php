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
        Schema::create('tbl_service_imgs', function (Blueprint $table) {
            $table->id('tbl_service_img_id');
            $table->unsignedBigInteger('tbl_service_id');
            $table->string('prod_img_path');
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->date('deleted_date')->nullable();
            $table->time('deleted_time')->nullable();
            $table->string('flag', 7)->nullable();

            // Foreign key constraint
            $table->foreign('tbl_service_id')->references('tbl_service_id')->on('tbl_services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_service_imgs');
    }
};
