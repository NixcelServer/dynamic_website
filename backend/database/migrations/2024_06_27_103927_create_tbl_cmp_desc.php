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
        Schema::create('tbl_cmp_desc', function (Blueprint $table) {
            $table->id('tbl_cmp_desc_id'); // Primary key
            $table->unsignedBigInteger('tbl_cmp_dtls_id'); // Foreign key to the company details table
            $table->binary('cmp_desc'); // BLOB column for storing company description
            $table->string('show_status'); // Show status
            $table->date('add_date'); // Date added
            $table->time('add_time'); // Time added
            $table->date('updated_date')->nullable(); // Date updated, nullable
            $table->time('updated_time')->nullable(); // Time updated, nullable
            $table->date('deleted_date')->nullable(); // Date deleted, nullable
            $table->time('deleted_time')->nullable(); // Time deleted, nullable
            $table->string('flag', 45); // Flag
    
            // Foreign key constraint
            $table->foreign('tbl_cmp_dtls_id')
                  ->references('tbl_cmp_dtls_id')
                  ->on('mst_tbl_cmp_dtls')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('tbl_cmp_desc');
    }
};
