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
        Schema::create('mst_tbl_user', function (Blueprint $table) {
            $table->id('tbl_user_id'); // Primary key with auto-increment
            $table->string('u_name', 100);
            $table->string('u_email', 100);
            $table->string('u_mobile', 15);
            $table->string('u_password', 30);
            $table->string('u_status', 25);
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
        Schema::dropIfExists('mst_tbl_user');
    }
};
