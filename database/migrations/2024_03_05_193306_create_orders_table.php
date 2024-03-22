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
            $table->unsignedBigInteger('restaurant_id');
            $table->unsignedBigInteger('rider_id')->nullabe();
            $table->unsignedBigInteger('payment_id');
            $table->unsignedBigInteger('promo_code_id')->nullable();
            $table->unsignedBigInteger('order_rejected_by_id')->nullable();
            $table->string('order_code', 100)->unique();
            $table->integer('delivery_fee');
            $table->enum('contactless_delivery', [0, 1])->default(0);   // 0 = no, 1 = yes
            $table->enum('order_status', ['pending', 'confirmed', 'success', 'reject'])->default('pending');    // confirmed = order accepted
            $table->enum('payment_status', ['pending', 'success'])->default('pending');
            $table->enum('rider_status', ['pending', 'confirmed', 'success'])->default('pending');  /* confirmed = rider accepted order to take,
                                                                                                        then assign rider_id above */
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onDelete('cascade');
            $table->foreign('rider_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('payment_id')->references('id')->on('payment_details')->onDelete('cascade');
            $table->foreign('promo_code_id')->references('id')->on('promo_codes')->onDelete('cascade');
            $table->foreign('order_rejected_by_id')->references('id')->on('users')->onDelete('cascade');
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
