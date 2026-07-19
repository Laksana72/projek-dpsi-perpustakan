<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('author');
            $table->string('isbn')->unique();
            $table->foreignId('publisher_id')->nullable()->constrained()->nullOnDelete();
            $table->year('year')->nullable();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->text('description')->nullable();
            $table->string('cover')->nullable();
            $table->enum('status', ['Available', 'Borrowed', 'Reserved', 'Lost'])->default('Available');
            $table->integer('pages')->nullable();
            $table->string('language')->nullable();
            $table->string('edition')->nullable();
            $table->date('added_date')->nullable();
            $table->string('location')->nullable();
            $table->string('call_number')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
