<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'tajuk',
        'penerangan',
        'kategori',
        'mata_pelajaran',
        'fail_path',
        'fail_nama',
        'fail_saiz',
        'fail_jenis',
        'pautan_luar',
        'uploaded_by',
        'muat_turun_count',
    ];

    /**
     * Get user yang upload resource ini.
     */
    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    /**
     * Scope untuk filter mengikut kategori.
     */
    public function scopeKategori($query, $kategori)
    {
        return $query->where('kategori', $kategori);
    }

    /**
     * Scope untuk filter mengikut mata pelajaran.
     */
    public function scopeMataPelajaran($query, $mataPelajaran)
    {
        return $query->where('mata_pelajaran', $mataPelajaran);
    }

    /**
     * Get formatted file size.
     */
    public function getFormattedSizeAttribute()
    {
        $bytes = (int) $this->fail_saiz;

        if ($bytes >= 1048576) {
            return number_format($bytes / 1048576, 2) . ' MB';
        } elseif ($bytes >= 1024) {
            return number_format($bytes / 1024, 2) . ' KB';
        }

        return $bytes . ' bytes';
    }
}
