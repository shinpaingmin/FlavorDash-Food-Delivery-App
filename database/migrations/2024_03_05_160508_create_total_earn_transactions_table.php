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
        Schema::create('total_earn_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('total_earn_id');
            $table->float('transactions', 10, 2)->default(0);
            $table->float('total_remainings', 10, 2)->default(0);
            $table->timestamps();

            $table->foreign('total_earn_id')->references('id')->on('total_earns')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('total_earn_transactions');
    }
};
