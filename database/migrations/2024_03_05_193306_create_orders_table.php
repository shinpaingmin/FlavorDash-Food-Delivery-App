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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('rider_id')->nullabe();
            $table->unsignedBigInteger('payment_id');
            $table->unsignedBigInteger('delivery_detail_id');
            $table->unsignedBigInteger('promo_code_id')->nullable();
            $table->string('order_code', 100)->unique();
            $table->enum('order_status', ['pending', 'success', 'reject'])->default('pending');
            $table->enum('payment_status', ['pending', 'success'])->default('pending');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('rider_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('payment_id')->references('id')->on('payment_details')->onDelete('cascade');
            $table->foreign('delivery_detail_id')->references('id')->on('delivery_details')->onDelete('cascade');
            $table->foreign('promo_code_id')->references('id')->on('promo_codes')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
