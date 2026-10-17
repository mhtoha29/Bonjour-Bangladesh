<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table): void {
            $table->string('role')->default('editor');
            $table->boolean('is_active')->default(true);
            $table->string('avatar_path')->nullable();
        });

        Schema::create('admin_sessions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('token_hash', 64)->unique();
            $table->timestamp('expires_at')->index();
            $table->timestamps();
        });

        Schema::create('inquiries', function (Blueprint $table): void {
            $table->id();
            $table->string('source', 24);
            $table->string('name');
            $table->string('email');
            $table->string('company')->nullable();
            $table->string('phone')->nullable();
            $table->text('message');
            $table->json('details')->nullable();
            $table->string('attachment_path')->nullable();
            $table->string('attachment_name')->nullable();
            $table->string('status', 24)->default('new')->index();
            $table->string('email_status', 24)->default('pending');
            $table->timestamps();
            $table->index(['created_at', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiries');
        Schema::dropIfExists('admin_sessions');
        Schema::table('users', function (Blueprint $table): void {
            $table->dropColumn(['role', 'is_active', 'avatar_path']);
        });
    }
};
