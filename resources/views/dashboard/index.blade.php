@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')
<!-- Welcome Banner -->
<div class="row mb-4">
    <div class="col-12">
        <div class="card bg-primary text-white">
            <div class="card-body py-4">
                <div class="d-flex align-items-center">
                    <div>
                        <h4 class="mb-1">Selamat Datang, {{ Auth::user()->name }}!</h4>
                        <p class="mb-0 opacity-75">Panel Pengurusan GPK Pendidikan Khas</p>
                    </div>
                    <div class="ms-auto d-none d-md-block">
                        <i class="bi bi-mortarboard-fill" style="font-size: 3rem; opacity: 0.5;"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Stats Cards -->
<div class="row mb-4">
    <div class="col-xl-3 col-md-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="bg-primary bg-opacity-10 rounded-3 p-3">
                            <i class="bi bi-people-fill text-primary fs-4"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h3 class="mb-0">{{ $muridAktif }}</h3>
                        <small class="text-muted">Murid Aktif</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="bg-success bg-opacity-10 rounded-3 p-3">
                            <i class="bi bi-gender-male text-success fs-4"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h3 class="mb-0">{{ $muridLelaki }}</h3>
                        <small class="text-muted">Murid Lelaki</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="bg-warning bg-opacity-10 rounded-3 p-3">
                            <i class="bi bi-gender-female text-warning fs-4"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h3 class="mb-0">{{ $muridPerempuan }}</h3>
                        <small class="text-muted">Murid Perempuan</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-xl-3 col-md-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <div class="bg-info bg-opacity-10 rounded-3 p-3">
                            <i class="bi bi-folder-fill text-info fs-4"></i>
                        </div>
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h3 class="mb-0">{{ $jumlahResources }}</h3>
                        <small class="text-muted">Bahan Bantu</small>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Charts Row -->
<div class="row mb-4">
    <!-- Murid Mengikut Tahun -->
    <div class="col-lg-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 py-3">
                <h6 class="mb-0"><i class="bi bi-bar-chart-fill text-primary me-2"></i>Murid Mengikut Tahun</h6>
            </div>
            <div class="card-body">
                @if(count($muridMengikutTahun) > 0)
                    @foreach($muridMengikutTahun as $tahun => $jumlah)
                        <div class="d-flex align-items-center mb-2">
                            <span class="me-3" style="min-width: 70px;">Tahun {{ $tahun }}</span>
                            <div class="progress flex-grow-1" style="height: 20px;">
                                <div class="progress-bar bg-primary" role="progressbar" 
                                     style="width: {{ $muridAktif > 0 ? ($jumlah / $muridAktif * 100) : 0 }}%">
                                    {{ $jumlah }}
                                </div>
                            </div>
                        </div>
                    @endforeach
                @else
                    <p class="text-muted text-center">Tiada data murid</p>
                @endif
            </div>
        </div>
    </div>

    <!-- Murid Mengikut Kategori OKU -->
    <div class="col-lg-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 py-3">
                <h6 class="mb-0"><i class="bi bi-pie-chart-fill text-success me-2"></i>Kategori OKU</h6>
            </div>
            <div class="card-body">
                @if(count($muridMengikutKategori) > 0)
                    <div class="table-responsive">
                        <table class="table table-sm">
                            <thead>
                                <tr>
                                    <th>Kategori</th>
                                    <th class="text-end">Bilangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($muridMengikutKategori as $kategori => $jumlah)
                                    <tr>
                                        <td>{{ $kategori }}</td>
                                        <td class="text-end">
                                            <span class="badge bg-primary">{{ $jumlah }}</span>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <p class="text-muted text-center">Tiada data murid</p>
                @endif
            </div>
        </div>
    </div>
</div>

<!-- Recent Activity Row -->
<div class="row">
    <!-- Pengumuman Terkini -->
    <div class="col-lg-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <h6 class="mb-0"><i class="bi bi-megaphone-fill text-warning me-2"></i>Pengumuman Terkini</h6>
                <a href="{{ route('announcements.index') }}" class="btn btn-sm btn-outline-primary">Lihat Semua</a>
            </div>
            <div class="card-body">
                @if($pengumumanTerkini->count() > 0)
                    @foreach($pengumumanTerkini as $pengumuman)
                        <div class="d-flex align-items-start mb-3 pb-3 {{ !$loop->last ? 'border-bottom' : '' }}">
                            <div class="flex-shrink-0">
                                @if($pengumuman->is_pinned)
                                    <span class="badge bg-danger"><i class="bi bi-pin-fill"></i></span>
                                @else
                                    <span class="badge bg-secondary"><i class="bi bi-info-circle"></i></span>
                                @endif
                            </div>
                            <div class="flex-grow-1 ms-2">
                                <h6 class="mb-1 fs-sm">{{ $pengumuman->tajuk }}</h6>
                                <small class="text-muted">
                                    {{ $pengumuman->kategori }} &bull; {{ $pengumuman->created_at->diffForHumans() }}
                                </small>
                            </div>
                        </div>
                    @endforeach
                @else
                    <p class="text-muted text-center">Tiada pengumuman</p>
                @endif
            </div>
        </div>
    </div>

    <!-- Murid Terbaru -->
    <div class="col-lg-6 mb-3">
        <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
                <h6 class="mb-0"><i class="bi bi-person-plus-fill text-info me-2"></i>Murid Terbaru Didaftarkan</h6>
                <a href="{{ route('students.index') }}" class="btn btn-sm btn-outline-primary">Lihat Semua</a>
            </div>
            <div class="card-body">
                @if($muridTerbaru->count() > 0)
                    <div class="table-responsive">
                        <table class="table table-sm table-hover">
                            <thead>
                                <tr>
                                    <th>Nama</th>
                                    <th>Kelas</th>
                                    <th>Kategori</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach($muridTerbaru as $murid)
                                    <tr>
                                        <td>{{ $murid->nama }}</td>
                                        <td>{{ $murid->kelas }}</td>
                                        <td><span class="badge bg-light text-dark">{{ $murid->kategori_oku }}</span></td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                @else
                    <p class="text-muted text-center">Tiada murid didaftarkan</p>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
