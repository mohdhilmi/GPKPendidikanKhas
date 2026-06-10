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
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('tajuk');
            $table->text('penerangan')->nullable();
            $table->string('kategori')->comment('Contoh: Bahan Mengajar, Aktiviti, Lembaran Kerja, Video, Lain-lain');
            $table->string('mata_pelajaran')->nullable();
            $table->string('fail_path')->nullable()->comment('Path to uploaded file');
            $table->string('fail_nama')->nullable()->comment('Original filename');
            $table->string('fail_saiz')->nullable();
            $table->string('fail_jenis')->nullable()->comment('mime type');
            $table->string('pautan_luar')->nullable()->comment('External URL if any');
            $table->foreignId('uploaded_by')->constrained('users')->onDelete('cascade');
            $table->integer('muat_turun_count')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
