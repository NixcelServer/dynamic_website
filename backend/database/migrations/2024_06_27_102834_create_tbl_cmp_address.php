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
        Schema::create('tbl_cmp_address', function (Blueprint $table) {
            $table->id('tbl_cmp_address_id'); // Primary key
            $table->string('address_type', 45);
            $table->string('address_name', 100);
            $table->string('country', 100);
            $table->string('state', 100);
            $table->string('city_village')->nullable(); // Nullable if not always required
            $table->string('house_no', 100);
            $table->string('area', 100);
            $table->string('locality', 100);
            $table->string('pincode', 6);
            $table->string('show_status', 6);
            $table->date('add_date');
            $table->time('add_time');
            $table->date('updated_date')->nullable(); // Nullable if updates are not mandatory
            $table->time('updated_time')->nullable(); // Nullable if updates are not mandatory
            $table->date('deleted_date')->nullable(); // Nullable if updates are not mandatory
            $table->time('deleted_time')->nullable();
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
        Schema::dropIfExists('tbl_cmp_address');
    }
};
