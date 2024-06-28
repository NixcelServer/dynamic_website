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
        Schema::create('mst_tbl_cmp_dtls', function (Blueprint $table) {
            $table->id('tbl_cmp_dtls_id'); // Primary key with auto-increment
            $table->string('c_name', 255);
            $table->string('c_email_id', 100);
            $table->string('c_mobile_no', 15);
            $table->string('c_alt_mobile_no', 15);
            $table->string('c_landline_no', 15);
            $table->string('c_alt_landline_no', 15);
            $table->string('c_website', 100);
            $table->string('c_logo_path')->nullable(); // Nullable to allow empty logo path
            $table->date('add_date');
            $table->time('add_time');
            $table->date('updated_date')->nullable(); // Nullable if updates are not mandatory
            $table->time('updated_time')->nullable(); // Nullable if updates are not mandatory
            $table->string('flag', 45);
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mst_tbl_cmp_dtls');
    }
};
