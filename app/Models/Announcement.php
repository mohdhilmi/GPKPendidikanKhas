<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'tajuk',
        'kandungan',
        'kategori',
        'keutamaan',
        'lampiran_path',
        'lampiran_nama',
        'is_pinned',
        'is_active',
        'tarikh_mula',
        'tarikh_tamat',
        'created_by',
    ];

    protected $casts = [
        'is_pinned' => 'boolean',
        'is_active' => 'boolean',
        'tarikh_mula' => 'date',
        'tarikh_tamat' => 'date',
    ];

    /**
     * Get user yang buat pengumuman ini.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Scope untuk pengumuman aktif sahaja.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true)
            ->where(function ($q) {
                $q->whereNull('tarikh_tamat')
                    ->orWhere('tarikh_tamat', '>=', now());
            });
    }

    /**
     * Scope untuk pengumuman pinned.
     */
    public function scopePinned($query)
    {
        return $query->where('is_pinned', true);
    }

    /**
     * Scope untuk filter mengikut kategori.
     */
    public function scopeKategori($query, $kategori)
    {
        return $query->where('kategori', $kategori);
    }
}
