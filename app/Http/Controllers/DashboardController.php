<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Resource;
use App\Models\Announcement;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Papar halaman dashboard.
     */
    public function index()
    {
        // Statistik murid
        $jumlahMurid = Student::count();
        $muridAktif = Student::aktif()->count();
        $muridLelaki = Student::where('jantina', 'Lelaki')->aktif()->count();
        $muridPerempuan = Student::where('jantina', 'Perempuan')->aktif()->count();

        // Statistik murid mengikut tahun
        $muridMengikutTahun = Student::aktif()
            ->selectRaw('tahun, COUNT(*) as jumlah')
            ->groupBy('tahun')
            ->orderBy('tahun')
            ->pluck('jumlah', 'tahun')
            ->toArray();

        // Statistik murid mengikut kategori OKU
        $muridMengikutKategori = Student::aktif()
            ->selectRaw('kategori_oku, COUNT(*) as jumlah')
            ->groupBy('kategori_oku')
            ->orderByDesc('jumlah')
            ->pluck('jumlah', 'kategori_oku')
            ->toArray();

        // Statistik resources
        $jumlahResources = Resource::count();
        $jumlahMuatTurun = Resource::sum('muat_turun_count');

        // Pengumuman terkini
        $pengumumanTerkini = Announcement::active()
            ->orderByDesc('is_pinned')
            ->orderByDesc('created_at')
            ->take(5)
            ->get();

        // Murid terbaru didaftarkan
        $muridTerbaru = Student::latest()
            ->take(5)
            ->get();

        return view('dashboard.index', compact(
            'jumlahMurid',
            'muridAktif',
            'muridLelaki',
            'muridPerempuan',
            'muridMengikutTahun',
            'muridMengikutKategori',
            'jumlahResources',
            'jumlahMuatTurun',
            'pengumumanTerkini',
            'muridTerbaru'
        ));
    }
}
