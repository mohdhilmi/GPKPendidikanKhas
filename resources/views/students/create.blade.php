@extends('layouts.app')

@section('title', 'Tambah Murid Baru')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-person-plus-fill me-2"></i>Tambah Murid Baru</h4>
    <a href="{{ route('students.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-1"></i>Kembali
    </a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body">
        <form method="POST" action="{{ route('students.store') }}" enctype="multipart/form-data">
            @csrf

            <!-- Maklumat Peribadi -->
            <h6 class="text-primary mb-3"><i class="bi bi-person me-1"></i>Maklumat Peribadi</h6>
            <div class="row mb-4">
                <div class="col-md-6 mb-3">
                    <label for="nama" class="form-label">Nama Penuh <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('nama') is-invalid @enderror" 
                           id="nama" name="nama" value="{{ old('nama') }}" required>
                    @error('nama')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-6 mb-3">
                    <label for="no_mykid" class="form-label">No MyKID <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('no_mykid') is-invalid @enderror" 
                           id="no_mykid" name="no_mykid" value="{{ old('no_mykid') }}" maxlength="12" required>
                    @error('no_mykid')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="tarikh_lahir" class="form-label">Tarikh Lahir <span class="text-danger">*</span></label>
                    <input type="date" class="form-control @error('tarikh_lahir') is-invalid @enderror" 
                           id="tarikh_lahir" name="tarikh_lahir" value="{{ old('tarikh_lahir') }}" required>
                    @error('tarikh_lahir')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="jantina" class="form-label">Jantina <span class="text-danger">*</span></label>
                    <select class="form-select @error('jantina') is-invalid @enderror" id="jantina" name="jantina" required>
                        <option value="">-- Pilih --</option>
                        <option value="Lelaki" {{ old('jantina') == 'Lelaki' ? 'selected' : '' }}>Lelaki</option>
                        <option value="Perempuan" {{ old('jantina') == 'Perempuan' ? 'selected' : '' }}>Perempuan</option>
                    </select>
                    @error('jantina')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="foto" class="form-label">Foto</label>
                    <input type="file" class="form-control @error('foto') is-invalid @enderror" 
                           id="foto" name="foto" accept="image/*">
                    @error('foto')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <!-- Maklumat Akademik -->
            <h6 class="text-primary mb-3"><i class="bi bi-book me-1"></i>Maklumat Akademik</h6>
            <div class="row mb-4">
                <div class="col-md-4 mb-3">
                    <label for="kelas" class="form-label">Kelas <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('kelas') is-invalid @enderror" 
                           id="kelas" name="kelas" value="{{ old('kelas') }}" placeholder="Contoh: Bestari" required>
                    @error('kelas')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="tahun" class="form-label">Tahun <span class="text-danger">*</span></label>
                    <select class="form-select @error('tahun') is-invalid @enderror" id="tahun" name="tahun" required>
                        <option value="">-- Pilih --</option>
                        @for($i = 1; $i <= 6; $i++)
                            <option value="{{ $i }}" {{ old('tahun') == $i ? 'selected' : '' }}>Tahun {{ $i }}</option>
                        @endfor
                    </select>
                    @error('tahun')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="status" class="form-label">Status <span class="text-danger">*</span></label>
                    <select class="form-select @error('status') is-invalid @enderror" id="status" name="status" required>
                        <option value="Aktif" {{ old('status', 'Aktif') == 'Aktif' ? 'selected' : '' }}>Aktif</option>
                        <option value="Tidak Aktif" {{ old('status') == 'Tidak Aktif' ? 'selected' : '' }}>Tidak Aktif</option>
                        <option value="Berhenti" {{ old('status') == 'Berhenti' ? 'selected' : '' }}>Berhenti</option>
                    </select>
                    @error('status')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <!-- Maklumat OKU -->
            <h6 class="text-primary mb-3"><i class="bi bi-heart-pulse me-1"></i>Maklumat OKU & Perubatan</h6>
            <div class="row mb-4">
                <div class="col-md-6 mb-3">
                    <label for="kategori_oku" class="form-label">Kategori OKU <span class="text-danger">*</span></label>
                    <select class="form-select @error('kategori_oku') is-invalid @enderror" id="kategori_oku" name="kategori_oku" required>
                        <option value="">-- Pilih Kategori --</option>
                        <option value="Masalah Pembelajaran" {{ old('kategori_oku') == 'Masalah Pembelajaran' ? 'selected' : '' }}>Masalah Pembelajaran</option>
                        <option value="Masalah Pendengaran" {{ old('kategori_oku') == 'Masalah Pendengaran' ? 'selected' : '' }}>Masalah Pendengaran</option>
                        <option value="Masalah Penglihatan" {{ old('kategori_oku') == 'Masalah Penglihatan' ? 'selected' : '' }}>Masalah Penglihatan</option>
                        <option value="Masalah Fizikal" {{ old('kategori_oku') == 'Masalah Fizikal' ? 'selected' : '' }}>Masalah Fizikal</option>
                        <option value="Masalah Pertuturan" {{ old('kategori_oku') == 'Masalah Pertuturan' ? 'selected' : '' }}>Masalah Pertuturan</option>
                        <option value="Pelbagai Ketidakupayaan" {{ old('kategori_oku') == 'Pelbagai Ketidakupayaan' ? 'selected' : '' }}>Pelbagai Ketidakupayaan</option>
                        <option value="Autisme" {{ old('kategori_oku') == 'Autisme' ? 'selected' : '' }}>Autisme</option>
                        <option value="ADHD" {{ old('kategori_oku') == 'ADHD' ? 'selected' : '' }}>ADHD</option>
                        <option value="Down Syndrome" {{ old('kategori_oku') == 'Down Syndrome' ? 'selected' : '' }}>Down Syndrome</option>
                        <option value="Lain-lain" {{ old('kategori_oku') == 'Lain-lain' ? 'selected' : '' }}>Lain-lain</option>
                    </select>
                    @error('kategori_oku')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-6 mb-3">
                    <label for="catatan_perubatan" class="form-label">Catatan Perubatan</label>
                    <textarea class="form-control @error('catatan_perubatan') is-invalid @enderror" 
                              id="catatan_perubatan" name="catatan_perubatan" rows="3">{{ old('catatan_perubatan') }}</textarea>
                    @error('catatan_perubatan')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <!-- Maklumat Penjaga -->
            <h6 class="text-primary mb-3"><i class="bi bi-person-badge me-1"></i>Maklumat Penjaga</h6>
            <div class="row mb-4">
                <div class="col-md-4 mb-3">
                    <label for="nama_penjaga" class="form-label">Nama Penjaga <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('nama_penjaga') is-invalid @enderror" 
                           id="nama_penjaga" name="nama_penjaga" value="{{ old('nama_penjaga') }}" required>
                    @error('nama_penjaga')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="telefon_penjaga" class="form-label">No. Telefon <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('telefon_penjaga') is-invalid @enderror" 
                           id="telefon_penjaga" name="telefon_penjaga" value="{{ old('telefon_penjaga') }}" required>
                    @error('telefon_penjaga')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="hubungan_penjaga" class="form-label">Hubungan</label>
                    <select class="form-select @error('hubungan_penjaga') is-invalid @enderror" id="hubungan_penjaga" name="hubungan_penjaga">
                        <option value="">-- Pilih --</option>
                        <option value="Ibu/Bapa" {{ old('hubungan_penjaga') == 'Ibu/Bapa' ? 'selected' : '' }}>Ibu/Bapa</option>
                        <option value="Datuk/Nenek" {{ old('hubungan_penjaga') == 'Datuk/Nenek' ? 'selected' : '' }}>Datuk/Nenek</option>
                        <option value="Adik-beradik" {{ old('hubungan_penjaga') == 'Adik-beradik' ? 'selected' : '' }}>Adik-beradik</option>
                        <option value="Penjaga" {{ old('hubungan_penjaga') == 'Penjaga' ? 'selected' : '' }}>Penjaga</option>
                        <option value="Lain-lain" {{ old('hubungan_penjaga') == 'Lain-lain' ? 'selected' : '' }}>Lain-lain</option>
                    </select>
                    @error('hubungan_penjaga')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-12 mb-3">
                    <label for="alamat" class="form-label">Alamat</label>
                    <textarea class="form-control @error('alamat') is-invalid @enderror" 
                              id="alamat" name="alamat" rows="2">{{ old('alamat') }}</textarea>
                    @error('alamat')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                    <i class="bi bi-check-circle me-1"></i>Simpan
                </button>
                <a href="{{ route('students.index') }}" class="btn btn-secondary">Batal</a>
            </div>
        </form>
    </div>
</div>
@endsection
