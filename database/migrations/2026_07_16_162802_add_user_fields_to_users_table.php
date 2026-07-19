<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('nim')->nullable()->unique();
            $table->string('program_studi')->nullable();
            $table->string('avatar')->nullable();
            $table->enum('role', ['user', 'admin'])->default('user');
            $table->string('membership_status')->default('Active');
            $table->date('membership_expiry')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['nim', 'program_studi', 'avatar', 'role', 'membership_status', 'membership_expiry']);
        });
    }
};
