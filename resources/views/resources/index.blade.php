@extends('layouts.app')

@section('title', 'Koleksi Bahan Bantu Mengajar')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-folder-fill me-2"></i>Koleksi Bahan Bantu Mengajar</h4>
    <a href="{{ route('resources.create') }}" class="btn btn-primary">
        <i class="bi bi-cloud-upload me-1"></i>Muat Naik Bahan
    </a>
</div>

<!-- Filter & Search -->
<div class="card border-0 shadow-sm mb-4">
    <div class="card-body">
        <form method="GET" action="{{ route('resources.index') }}">
            <div class="row g-3">
                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-search"></i></span>
                        <input type="text" class="form-control" name="carian" 
                               value="{{ request('carian') }}" placeholder="Cari tajuk atau penerangan...">
                    </div>
                </div>
                <div class="col-md-3">
                    <select name="kategori" class="form-select">
                        <option value="">Semua Kategori</option>
                        @foreach($kategoriList as $kat)
                            <option value="{{ $kat }}" {{ request('kategori') == $kat ? 'selected' : '' }}>{{ $kat }}</option>
                        @endforeach
                    </select>
                </div>
                <div class="col-md-3">
                    <select name="mata_pelajaran" class="form-select">
                        <option value="">Semua Mata Pelajaran</option>
                        @foreach($mataPelajaranList as $mp)
                            <option value="{{ $mp }}" {{ request('mata_pelajaran') == $mp ? 'selected' : '' }}>{{ $mp }}</option>
                        @endforeach
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

<!-- Resources Grid -->
<div class="row">
    @forelse($resources as $resource)
        <div class="col-md-6 col-lg-4 mb-4">
            <div class="card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex align-items-start mb-2">
                        <div class="flex-shrink-0">
                            @if($resource->fail_jenis && str_contains($resource->fail_jenis, 'pdf'))
                                <div class="bg-danger bg-opacity-10 rounded-3 p-2">
                                    <i class="bi bi-file-pdf text-danger fs-4"></i>
                                </div>
                            @elseif($resource->fail_jenis && str_contains($resource->fail_jenis, 'image'))
                                <div class="bg-success bg-opacity-10 rounded-3 p-2">
                                    <i class="bi bi-file-image text-success fs-4"></i>
                                </div>
                            @elseif($resource->fail_jenis && (str_contains($resource->fail_jenis, 'word') || str_contains($resource->fail_jenis, 'document')))
                                <div class="bg-primary bg-opacity-10 rounded-3 p-2">
                                    <i class="bi bi-file-word text-primary fs-4"></i>
                                </div>
                            @elseif($resource->pautan_luar)
                                <div class="bg-info bg-opacity-10 rounded-3 p-2">
                                    <i class="bi bi-link-45deg text-info fs-4"></i>
                                </div>
                            @else
                                <div class="bg-secondary bg-opacity-10 rounded-3 p-2">
                                    <i class="bi bi-file-earmark text-secondary fs-4"></i>
                                </div>
                            @endif
                        </div>
                        <div class="flex-grow-1 ms-3">
                            <h6 class="mb-1">{{ $resource->tajuk }}</h6>
                            <span class="badge bg-primary bg-opacity-10 text-primary">{{ $resource->kategori }}</span>
                            @if($resource->mata_pelajaran)
                                <span class="badge bg-success bg-opacity-10 text-success">{{ $resource->mata_pelajaran }}</span>
                            @endif
                        </div>
                    </div>

                    @if($resource->penerangan)
                        <p class="text-muted small mb-2">{{ Str::limit($resource->penerangan, 80) }}</p>
                    @endif

                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <small class="text-muted">
                            <i class="bi bi-download me-1"></i>{{ $resource->muat_turun_count }} muat turun
                        </small>
                        <small class="text-muted">
                            {{ $resource->created_at->diffForHumans() }}
                        </small>
                    </div>
                </div>
                <div class="card-footer bg-white border-0 pt-0">
                    <div class="d-flex gap-1">
                        @if($resource->fail_path)
                            <a href="{{ route('resources.download', $resource) }}" class="btn btn-sm btn-success flex-grow-1">
                                <i class="bi bi-download me-1"></i>Muat Turun
                            </a>
                        @endif
                        @if($resource->pautan_luar)
                            <a href="{{ $resource->pautan_luar }}" target="_blank" class="btn btn-sm btn-info flex-grow-1">
                                <i class="bi bi-box-arrow-up-right me-1"></i>Buka
                            </a>
                        @endif
                        <a href="{{ route('resources.edit', $resource) }}" class="btn btn-sm btn-outline-warning">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <form action="{{ route('resources.destroy', $resource) }}" method="POST" 
                              onsubmit="return confirm('Padam bahan ini?')">
                            @csrf
                            @method('DELETE')
                            <button type="submit" class="btn btn-sm btn-outline-danger">
                                <i class="bi bi-trash"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    @empty
        <div class="col-12">
            <div class="card border-0 shadow-sm">
                <div class="card-body text-center py-5 text-muted">
                    <i class="bi bi-folder2-open fs-1 d-block mb-2"></i>
                    Tiada bahan dijumpai. Klik "Muat Naik Bahan" untuk menambah.
                </div>
            </div>
        </div>
    @endforelse
</div>

@if($resources->hasPages())
    <div class="d-flex justify-content-center mt-4">
        {{ $resources->links() }}
    </div>
@endif
@endsection
