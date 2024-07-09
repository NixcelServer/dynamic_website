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
        Schema::create('tbl_csi', function (Blueprint $table) {
            $table->id('tbl_csi_id'); // Primary key
            $table->unsignedBigInteger('tbl_cmp_dtls_id'); // Foreign key to the company details table
            $table->text('instagram_url')->nullable(); // Nullable to allow empty URLs
            $table->text('facebook_url')->nullable(); // Nullable to allow empty URLs
            $table->text('google_url')->nullable(); // Nullable to allow empty URLs
            $table->text('linkedin_url')->nullable(); // Nullable to allow empty URLs
            $table->date('add_date')->nullable();
            $table->time('add_time')->nullable();
            $table->date('updated_date')->nullable(); // Nullable if updates are not mandatory
            $table->time('updated_time')->nullable(); // Nullable if updates are not mandatory
            $table->date('deleted_date')->nullable(); // Date deleted, nullable
            $table->time('deleted_time')->nullable(); // Time deleted, nullable
            $table->string('flag', 7)->default('show');
           
            // Foreign key constraint
            $table->foreign('tbl_cmp_dtls_id')->references('tbl_cmp_dtls_id')->on('mst_tbl_cmp_dtls')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_csi');
    }
};
