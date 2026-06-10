@extends('layouts.app')

@section('title', $announcement->tajuk)

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-megaphone me-2"></i>Pengumuman</h4>
    <div>
        <a href="{{ route('announcements.edit', $announcement) }}" class="btn btn-warning">
            <i class="bi bi-pencil me-1"></i>Edit
        </a>
        <a href="{{ route('announcements.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Kembali
        </a>
    </div>
</div>

<div class="row">
    <div class="col-lg-8">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <div class="mb-3">
                    @if($announcement->is_pinned)
                        <span class="badge bg-danger"><i class="bi bi-pin-fill me-1"></i>Disematkan</span>
                    @endif
                    <span class="badge bg-secondary">{{ $announcement->kategori }}</span>
                    @if($announcement->keutamaan == 'Tinggi')
                        <span class="badge bg-danger">Keutamaan Tinggi</span>
                    @elseif($announcement->keutamaan == 'Sederhana')
                        <span class="badge bg-warning text-dark">Sederhana</span>
                    @else
                        <span class="badge bg-info">Rendah</span>
                    @endif
                    @if(!$announcement->is_active)
                        <span class="badge bg-dark">Tidak Aktif</span>
                    @endif
                </div>

                <h4 class="mb-3">{{ $announcement->tajuk }}</h4>

                <div class="border-top border-bottom py-3 mb-3">
                    <div class="row text-muted small">
                        <div class="col-md-4">
                            <i class="bi bi-person me-1"></i>{{ $announcement->creator->name ?? 'N/A' }}
                        </div>
                        <div class="col-md-4">
                            <i class="bi bi-calendar me-1"></i>{{ $announcement->created_at->format('d/m/Y H:i') }}
                        </div>
                        @if($announcement->tarikh_tamat)
                            <div class="col-md-4">
                                <i class="bi bi-clock me-1"></i>Sah sehingga {{ $announcement->tarikh_tamat->format('d/m/Y') }}
                            </div>
                        @endif
                    </div>
                </div>

                <div class="mb-4" style="white-space: pre-wrap;">{{ $announcement->kandungan }}</div>

                @if($announcement->lampiran_path)
                    <div class="border-top pt-3">
                        <h6><i class="bi bi-paperclip me-1"></i>Lampiran:</h6>
                        <a href="{{ asset($announcement->lampiran_path) }}" class="btn btn-outline-primary btn-sm" target="_blank">
                            <i class="bi bi-download me-1"></i>{{ $announcement->lampiran_nama }}
                        </a>
                    </div>
                @endif
            </div>
        </div>
    </div>
</div>
@endsection
