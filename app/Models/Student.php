<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'no_mykid',
        'tarikh_lahir',
        'jantina',
        'kelas',
        'tahun',
        'kategori_oku',
        'catatan_perubatan',
        'nama_penjaga',
        'telefon_penjaga',
        'hubungan_penjaga',
        'alamat',
        'status',
        'foto',
    ];

    protected $casts = [
        'tarikh_lahir' => 'date',
    ];

    /**
     * Scope untuk murid aktif sahaja.
     */
    public function scopeAktif($query)
    {
        return $query->where('status', 'Aktif');
    }

    /**
     * Scope untuk filter mengikut tahun.
     */
    public function scopeTahun($query, $tahun)
    {
        return $query->where('tahun', $tahun);
    }

    /**
     * Scope untuk filter mengikut kategori OKU.
     */
    public function scopeKategori($query, $kategori)
    {
        return $query->where('kategori_oku', $kategori);
    }

    /**
     * Get umur murid.
     */
    public function getUmurAttribute()
    {
        return $this->tarikh_lahir ? $this->tarikh_lahir->age : null;
    }
}
