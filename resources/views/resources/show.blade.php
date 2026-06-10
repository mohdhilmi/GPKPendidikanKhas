@extends('layouts.app')

@section('title', $resource->tajuk)

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-file-earmark-text me-2"></i>Maklumat Bahan</h4>
    <div>
        <a href="{{ route('resources.edit', $resource) }}" class="btn btn-warning">
            <i class="bi bi-pencil me-1"></i>Edit
        </a>
        <a href="{{ route('resources.index') }}" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Kembali
        </a>
    </div>
</div>

<div class="row">
    <div class="col-md-8">
        <div class="card border-0 shadow-sm">
            <div class="card-body">
                <h5 class="mb-3">{{ $resource->tajuk }}</h5>

                <div class="mb-3">
                    <span class="badge bg-primary">{{ $resource->kategori }}</span>
                    @if($resource->mata_pelajaran)
                        <span class="badge bg-success">{{ $resource->mata_pelajaran }}</span>
                    @endif
                </div>

                @if($resource->penerangan)
                    <div class="mb-4">
                        <h6 class="text-muted">Penerangan:</h6>
                        <p>{{ $resource->penerangan }}</p>
                    </div>
                @endif

                <div class="row text-muted small">
                    <div class="col-md-6 mb-2">
                        <i class="bi bi-person me-1"></i>Dimuat naik oleh: <strong>{{ $resource->uploader->name ?? 'N/A' }}</strong>
                    </div>
                    <div class="col-md-6 mb-2">
                        <i class="bi bi-calendar me-1"></i>Tarikh: <strong>{{ $resource->created_at->format('d/m/Y H:i') }}</strong>
                    </div>
                    <div class="col-md-6 mb-2">
                        <i class="bi bi-download me-1"></i>Muat turun: <strong>{{ $resource->muat_turun_count }} kali</strong>
                    </div>
                    @if($resource->fail_saiz)
                        <div class="col-md-6 mb-2">
                            <i class="bi bi-hdd me-1"></i>Saiz: <strong>{{ $resource->formatted_size }}</strong>
                        </div>
                    @endif
                </div>
            </div>
            <div class="card-footer bg-white">
                <div class="d-flex gap-2">
                    @if($resource->fail_path)
                        <a href="{{ route('resources.download', $resource) }}" class="btn btn-success">
                            <i class="bi bi-download me-1"></i>Muat Turun Fail
                        </a>
                    @endif
                    @if($resource->pautan_luar)
                        <a href="{{ $resource->pautan_luar }}" target="_blank" class="btn btn-info text-white">
                            <i class="bi bi-box-arrow-up-right me-1"></i>Buka Pautan
                        </a>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
