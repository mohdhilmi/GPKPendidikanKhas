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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('no_mykid')->unique();
            $table->date('tarikh_lahir');
            $table->enum('jantina', ['Lelaki', 'Perempuan']);
            $table->string('kelas');
            $table->integer('tahun')->comment('Tahun persekolahan: 1-6');
            $table->string('kategori_oku')->comment('Jenis ketidakupayaan');
            $table->text('catatan_perubatan')->nullable();
            $table->string('nama_penjaga');
            $table->string('telefon_penjaga');
            $table->string('hubungan_penjaga')->nullable();
            $table->text('alamat')->nullable();
            $table->enum('status', ['Aktif', 'Tidak Aktif', 'Berhenti'])->default('Aktif');
            $table->string('foto')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
