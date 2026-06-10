@extends('layouts.app')

@section('title', 'Edit Bahan - ' . $resource->tajuk)

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-pencil-square me-2"></i>Edit Bahan</h4>
    <a href="{{ route('resources.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-1"></i>Kembali
    </a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body">
        <form method="POST" action="{{ route('resources.update', $resource) }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="row">
                <div class="col-md-8 mb-3">
                    <label for="tajuk" class="form-label">Tajuk Bahan <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('tajuk') is-invalid @enderror" 
                           id="tajuk" name="tajuk" value="{{ old('tajuk', $resource->tajuk) }}" required>
                    @error('tajuk')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="kategori" class="form-label">Kategori <span class="text-danger">*</span></label>
                    <select class="form-select @error('kategori') is-invalid @enderror" id="kategori" name="kategori" required>
                        <option value="">-- Pilih Kategori --</option>
                        @foreach(['Bahan Mengajar', 'Lembaran Kerja', 'Aktiviti', 'Video', 'Modul', 'RPH', 'RPI', 'Lain-lain'] as $kat)
                            <option value="{{ $kat }}" {{ old('kategori', $resource->kategori) == $kat ? 'selected' : '' }}>{{ $kat }}</option>
                        @endforeach
                    </select>
                    @error('kategori')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="mata_pelajaran" class="form-label">Mata Pelajaran</label>
                    <select class="form-select @error('mata_pelajaran') is-invalid @enderror" id="mata_pelajaran" name="mata_pelajaran">
                        <option value="">-- Pilih (optional) --</option>
                        @foreach(['Bahasa Melayu', 'Bahasa Inggeris', 'Matematik', 'Sains', 'Pendidikan Islam', 'Pendidikan Moral', 'Pengurusan Diri', 'Kemahiran Manipulatif', 'Seni', 'Muzik', 'Pendidikan Jasmani', 'Lain-lain'] as $mp)
                            <option value="{{ $mp }}" {{ old('mata_pelajaran', $resource->mata_pelajaran) == $mp ? 'selected' : '' }}>{{ $mp }}</option>
                        @endforeach
                    </select>
                    @error('mata_pelajaran')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-6 mb-3">
                    <label for="pautan_luar" class="form-label">Pautan Luar (URL)</label>
                    <input type="url" class="form-control @error('pautan_luar') is-invalid @enderror" 
                           id="pautan_luar" name="pautan_luar" value="{{ old('pautan_luar', $resource->pautan_luar) }}">
                    @error('pautan_luar')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="mb-3">
                <label for="penerangan" class="form-label">Penerangan</label>
                <textarea class="form-control @error('penerangan') is-invalid @enderror" 
                          id="penerangan" name="penerangan" rows="3">{{ old('penerangan', $resource->penerangan) }}</textarea>
                @error('penerangan')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="fail" class="form-label">Muat Naik Fail Baru</label>
                @if($resource->fail_path)
                    <div class="mb-2">
                        <span class="badge bg-light text-dark">
                            <i class="bi bi-file-earmark me-1"></i>{{ $resource->fail_nama }}
                            ({{ $resource->formatted_size }})
                        </span>
                    </div>
                @endif
                <input type="file" class="form-control @error('fail') is-invalid @enderror" 
                       id="fail" name="fail">
                @error('fail')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
                <small class="text-muted">Biarkan kosong jika tidak mahu tukar fail. Maks 10MB.</small>
            </div>

            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                    <i class="bi bi-check-circle me-1"></i>Kemaskini
                </button>
                <a href="{{ route('resources.index') }}" class="btn btn-secondary">Batal</a>
            </div>
        </form>
    </div>
</div>
@endsection
