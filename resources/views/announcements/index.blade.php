@extends('layouts.app')

@section('title', 'Portal Maklumat & Pengumuman')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-megaphone-fill me-2"></i>Portal Maklumat & Pengumuman</h4>
    <a href="{{ route('announcements.create') }}" class="btn btn-primary">
        <i class="bi bi-plus-circle me-1"></i>Tambah Pengumuman
    </a>
</div>

<!-- Filter & Search -->
<div class="card border-0 shadow-sm mb-4">
    <div class="card-body">
        <form method="GET" action="{{ route('announcements.index') }}">
            <div class="row g-3">
                <div class="col-md-5">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-search"></i></span>
                        <input type="text" class="form-control" name="carian" 
                               value="{{ request('carian') }}" placeholder="Cari tajuk atau kandungan...">
                    </div>
                </div>
                <div class="col-md-3">
                    <select name="kategori" class="form-select">
                        <option value="">Semua Kategori</option>
                        <option value="Pekeliling" {{ request('kategori') == 'Pekeliling' ? 'selected' : '' }}>Pekeliling</option>
                        <option value="Panduan" {{ request('kategori') == 'Panduan' ? 'selected' : '' }}>Panduan</option>
                        <option value="Maklumat Am" {{ request('kategori') == 'Maklumat Am' ? 'selected' : '' }}>Maklumat Am</option>
                        <option value="Notis" {{ request('kategori') == 'Notis' ? 'selected' : '' }}>Notis</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <select name="keutamaan" class="form-select">
                        <option value="">Semua Keutamaan</option>
                        <option value="Tinggi" {{ request('keutamaan') == 'Tinggi' ? 'selected' : '' }}>Tinggi</option>
                        <option value="Sederhana" {{ request('keutamaan') == 'Sederhana' ? 'selected' : '' }}>Sederhana</option>
                        <option value="Rendah" {{ request('keutamaan') == 'Rendah' ? 'selected' : '' }}>Rendah</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <button type="submit" class="btn btn-outline-primary w-100">
                        <i class="bi bi-funnel me-1"></i>Tapis
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>

<!-- Announcements List -->
<div class="row">
    @forelse($announcements as $announcement)
        <div class="col-12 mb-3">
            <div class="card border-0 shadow-sm {{ $announcement->is_pinned ? 'border-start border-4 border-danger' : '' }}">
                <div class="card-body">
                    <div class="d-flex align-items-start">
                        <div class="flex-shrink-0 me-3">
                            @if($announcement->keutamaan == 'Tinggi')
                                <div class="bg-danger bg-opacity-10 rounded-3 p-2">
                                    <i class="bi bi-exclamation-triangle-fill text-danger fs-4"></i>
                                </div>
                            @elseif($announcement->keutamaan == 'Sederhana')
                                <div class="bg-warning bg-opacity-10 rounded-3 p-2">
                                    <i class="bi bi-info-circle-fill text-warning fs-4"></i>
                                </div>
                            @else
                                <div class="bg-info bg-opacity-10 rounded-3 p-2">
                                    <i class="bi bi-chat-dots-fill text-info fs-4"></i>
                                </div>
                            @endif
                        </div>
                        <div class="flex-grow-1">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5 class="mb-1">
                                        @if($announcement->is_pinned)
                                            <i class="bi bi-pin-fill text-danger me-1" title="Disematkan"></i>
                                        @endif
                                        {{ $announcement->tajuk }}
                                    </h5>
                                    <div class="mb-2">
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
                                </div>
                                <div class="btn-group btn-group-sm">
                                    <a href="{{ route('announcements.show', $announcement) }}" class="btn btn-outline-info" title="Lihat">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                    <a href="{{ route('announcements.edit', $announcement) }}" class="btn btn-outline-warning" title="Edit">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form action="{{ route('announcements.destroy', $announcement) }}" method="POST" 
                                          onsubmit="return confirm('Padam pengumuman ini?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-outline-danger btn-sm" title="Padam">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <p class="text-muted mb-2">{{ Str::limit($announcement->kandungan, 150) }}</p>
                            <div class="d-flex align-items-center gap-3 small text-muted">
                                <span><i class="bi bi-person me-1"></i>{{ $announcement->creator->name ?? 'N/A' }}</span>
                                <span><i class="bi bi-calendar me-1"></i>{{ $announcement->created_at->format('d/m/Y') }}</span>
                                @if($announcement->lampiran_path)
                                    <span><i class="bi bi-paperclip me-1"></i>{{ $announcement->lampiran_nama }}</span>
                                @endif
                                @if($announcement->tarikh_tamat)
                                    <span><i class="bi bi-clock me-1"></i>Sah sehingga {{ $announcement->tarikh_tamat->format('d/m/Y') }}</span>
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    @empty
        <div class="col-12">
            <div class="card border-0 shadow-sm">
                <div class="card-body text-center py-5 text-muted">
                    <i class="bi bi-megaphone fs-1 d-block mb-2"></i>
                    Tiada pengumuman dijumpai.
                </div>
            </div>
        </div>
    @endforelse
</div>

@if($announcements->hasPages())
    <div class="d-flex justify-content-center mt-4">
        {{ $announcements->links() }}
    </div>
@endif
@endsection
