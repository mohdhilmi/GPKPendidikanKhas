@extends('layouts.app')

@section('title', 'Muat Naik Bahan Baru')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-cloud-upload me-2"></i>Muat Naik Bahan Baru</h4>
    <a href="{{ route('resources.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-1"></i>Kembali
    </a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body">
        <form method="POST" action="{{ route('resources.store') }}" enctype="multipart/form-data">
            @csrf

            <div class="row">
                <div class="col-md-8 mb-3">
                    <label for="tajuk" class="form-label">Tajuk Bahan <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('tajuk') is-invalid @enderror" 
                           id="tajuk" name="tajuk" value="{{ old('tajuk') }}" 
                           placeholder="Contoh: Lembaran Kerja Matematik Tahun 3" required>
                    @error('tajuk')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="kategori" class="form-label">Kategori <span class="text-danger">*</span></label>
                    <select class="form-select @error('kategori') is-invalid @enderror" id="kategori" name="kategori" required>
                        <option value="">-- Pilih Kategori --</option>
                        <option value="Bahan Mengajar" {{ old('kategori') == 'Bahan Mengajar' ? 'selected' : '' }}>Bahan Mengajar</option>
                        <option value="Lembaran Kerja" {{ old('kategori') == 'Lembaran Kerja' ? 'selected' : '' }}>Lembaran Kerja</option>
                        <option value="Aktiviti" {{ old('kategori') == 'Aktiviti' ? 'selected' : '' }}>Aktiviti</option>
                        <option value="Video" {{ old('kategori') == 'Video' ? 'selected' : '' }}>Video</option>
                        <option value="Modul" {{ old('kategori') == 'Modul' ? 'selected' : '' }}>Modul</option>
                        <option value="RPH" {{ old('kategori') == 'RPH' ? 'selected' : '' }}>RPH (Rancangan Pengajaran Harian)</option>
                        <option value="RPI" {{ old('kategori') == 'RPI' ? 'selected' : '' }}>RPI (Rancangan Pendidikan Individu)</option>
                        <option value="Lain-lain" {{ old('kategori') == 'Lain-lain' ? 'selected' : '' }}>Lain-lain</option>
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
                        <option value="Bahasa Melayu" {{ old('mata_pelajaran') == 'Bahasa Melayu' ? 'selected' : '' }}>Bahasa Melayu</option>
                        <option value="Bahasa Inggeris" {{ old('mata_pelajaran') == 'Bahasa Inggeris' ? 'selected' : '' }}>Bahasa Inggeris</option>
                        <option value="Matematik" {{ old('mata_pelajaran') == 'Matematik' ? 'selected' : '' }}>Matematik</option>
                        <option value="Sains" {{ old('mata_pelajaran') == 'Sains' ? 'selected' : '' }}>Sains</option>
                        <option value="Pendidikan Islam" {{ old('mata_pelajaran') == 'Pendidikan Islam' ? 'selected' : '' }}>Pendidikan Islam</option>
                        <option value="Pendidikan Moral" {{ old('mata_pelajaran') == 'Pendidikan Moral' ? 'selected' : '' }}>Pendidikan Moral</option>
                        <option value="Pengurusan Diri" {{ old('mata_pelajaran') == 'Pengurusan Diri' ? 'selected' : '' }}>Pengurusan Diri</option>
                        <option value="Kemahiran Manipulatif" {{ old('mata_pelajaran') == 'Kemahiran Manipulatif' ? 'selected' : '' }}>Kemahiran Manipulatif</option>
                        <option value="Seni" {{ old('mata_pelajaran') == 'Seni' ? 'selected' : '' }}>Seni</option>
                        <option value="Muzik" {{ old('mata_pelajaran') == 'Muzik' ? 'selected' : '' }}>Muzik</option>
                        <option value="Pendidikan Jasmani" {{ old('mata_pelajaran') == 'Pendidikan Jasmani' ? 'selected' : '' }}>Pendidikan Jasmani</option>
                        <option value="Lain-lain" {{ old('mata_pelajaran') == 'Lain-lain' ? 'selected' : '' }}>Lain-lain</option>
                    </select>
                    @error('mata_pelajaran')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-6 mb-3">
                    <label for="pautan_luar" class="form-label">Pautan Luar (URL)</label>
                    <input type="url" class="form-control @error('pautan_luar') is-invalid @enderror" 
                           id="pautan_luar" name="pautan_luar" value="{{ old('pautan_luar') }}" 
                           placeholder="https://youtube.com/...">
                    @error('pautan_luar')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                    <small class="text-muted">Untuk video YouTube atau pautan lain</small>
                </div>
            </div>

            <div class="mb-3">
                <label for="penerangan" class="form-label">Penerangan</label>
                <textarea class="form-control @error('penerangan') is-invalid @enderror" 
                          id="penerangan" name="penerangan" rows="3" 
                          placeholder="Terangkan secara ringkas tentang bahan ini...">{{ old('penerangan') }}</textarea>
                @error('penerangan')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="mb-4">
                <label for="fail" class="form-label">Muat Naik Fail</label>
                <input type="file" class="form-control @error('fail') is-invalid @enderror" 
                       id="fail" name="fail">
                @error('fail')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
                <small class="text-muted">Maksimum 10MB. Format: PDF, Word, Excel, PowerPoint, Gambar</small>
            </div>

            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                    <i class="bi bi-cloud-upload me-1"></i>Muat Naik
                </button>
                <a href="{{ route('resources.index') }}" class="btn btn-secondary">Batal</a>
            </div>
        </form>
    </div>
</div>
@endsection
