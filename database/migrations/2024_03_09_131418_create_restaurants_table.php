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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('restaurant_type_id');
            $table->unsignedBigInteger('restaurant_township_id');
            $table->string('name', 150)->unique();
            $table->longText('address')->unique();
            $table->float('lat', 6, 4)->unique()->nullable(); // need rounded data
            $table->float('long', 6, 4)->unique()->nullable(); // need rounded data
            $table->string('phone', 15)->unique();
            $table->enum('pricing', ['$', '$$', '$$$']);
            $table->time('opening_time');       // 20:00:00
            $table->time('closing_time');
            $table->integer('from_day');    // 0 = Sunday, 1 = Monday, ...
            $table->integer('to_day');
            $table->string('image')->unique()->nullable();
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('restaurant_type_id')->references('id')->on('restaurant_types')->onDelete('cascade');
            $table->foreign('restaurant_township_id')->references('id')->on('restaurant_townships')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
