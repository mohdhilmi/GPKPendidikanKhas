@extends('layouts.app')

@section('title', 'Profil Murid - ' . $student->nama)

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-person-circle me-2"></i>Profil Murid</h4>
    <div>
        <a href="{{ route('students.edit', $student) }}" class="btn btn-warning">
            <i class="bi bi-pencil me-1"></i>Edit
        </a>
        <a href="{{ route('students.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Kembali
        </a>
    </div>
</div>

<div class="row">
    <!-- Profil Ringkas -->
    <div class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm text-center">
            <div class="card-body py-4">
                @if($student->foto)
                    <img src="{{ asset($student->foto) }}" class="rounded-circle mb-3" width="120" height="120" style="object-fit: cover;">
                @else
                    <div class="rounded-circle bg-primary bg-opacity-10 mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 120px; height: 120px;">
                        <i class="bi bi-person-fill text-primary" style="font-size: 3rem;"></i>
                    </div>
                @endif
                <h5 class="mb-1">{{ $student->nama }}</h5>
                <p class="text-muted mb-2">{{ $student->no_mykid }}</p>
                @if($student->status == 'Aktif')
                    <span class="badge bg-success fs-6">Aktif</span>
                @elseif($student->status == 'Tidak Aktif')
                    <span class="badge bg-warning text-dark fs-6">Tidak Aktif</span>
                @else
                    <span class="badge bg-danger fs-6">Berhenti</span>
                @endif
            </div>
        </div>
    </div>

    <!-- Maklumat Lengkap -->
    <div class="col-md-8 mb-4">
        <!-- Maklumat Peribadi -->
        <div class="card border-0 shadow-sm mb-3">
            <div class="card-header bg-white">
                <h6 class="mb-0"><i class="bi bi-person text-primary me-2"></i>Maklumat Peribadi</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <small class="text-muted">Tarikh Lahir</small>
                        <p class="mb-0 fw-medium">{{ $student->tarikh_lahir->format('d/m/Y') }} ({{ $student->umur }} tahun)</p>
                    </div>
                    <div class="col-md-6 mb-2">
                        <small class="text-muted">Jantina</small>
                        <p class="mb-0 fw-medium">{{ $student->jantina }}</p>
                    </div>
                    <div class="col-md-6 mb-2">
                        <small class="text-muted">Kelas</small>
                        <p class="mb-0 fw-medium">{{ $student->kelas }}</p>
                    </div>
                    <div class="col-md-6 mb-2">
                        <small class="text-muted">Tahun</small>
                        <p class="mb-0 fw-medium">Tahun {{ $student->tahun }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Maklumat OKU -->
        <div class="card border-0 shadow-sm mb-3">
            <div class="card-header bg-white">
                <h6 class="mb-0"><i class="bi bi-heart-pulse text-danger me-2"></i>Maklumat OKU & Perubatan</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6 mb-2">
                        <small class="text-muted">Kategori OKU</small>
                        <p class="mb-0"><span class="badge bg-info text-dark">{{ $student->kategori_oku }}</span></p>
                    </div>
                    <div class="col-md-6 mb-2">
                        <small class="text-muted">Catatan Perubatan</small>
                        <p class="mb-0 fw-medium">{{ $student->catatan_perubatan ?: 'Tiada' }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Maklumat Penjaga -->
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white">
                <h6 class="mb-0"><i class="bi bi-person-badge text-success me-2"></i>Maklumat Penjaga</h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4 mb-2">
                        <small class="text-muted">Nama Penjaga</small>
                        <p class="mb-0 fw-medium">{{ $student->nama_penjaga }}</p>
                    </div>
                    <div class="col-md-4 mb-2">
                        <small class="text-muted">No. Telefon</small>
                        <p class="mb-0 fw-medium">{{ $student->telefon_penjaga }}</p>
                    </div>
                    <div class="col-md-4 mb-2">
                        <small class="text-muted">Hubungan</small>
                        <p class="mb-0 fw-medium">{{ $student->hubungan_penjaga ?: '-' }}</p>
                    </div>
                    <div class="col-12 mb-2">
                        <small class="text-muted">Alamat</small>
                        <p class="mb-0 fw-medium">{{ $student->alamat ?: 'Tiada' }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
