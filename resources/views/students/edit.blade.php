@extends('layouts.app')

@section('title', 'Edit Murid - ' . $student->nama)

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-pencil-square me-2"></i>Edit Murid: {{ $student->nama }}</h4>
    <a href="{{ route('students.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-1"></i>Kembali
    </a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body">
        <form method="POST" action="{{ route('students.update', $student) }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <!-- Maklumat Peribadi -->
            <h6 class="text-primary mb-3"><i class="bi bi-person me-1"></i>Maklumat Peribadi</h6>
            <div class="row mb-4">
                <div class="col-md-6 mb-3">
                    <label for="nama" class="form-label">Nama Penuh <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('nama') is-invalid @enderror" 
                           id="nama" name="nama" value="{{ old('nama', $student->nama) }}" required>
                    @error('nama')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-6 mb-3">
                    <label for="no_mykid" class="form-label">No MyKID <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('no_mykid') is-invalid @enderror" 
                           id="no_mykid" name="no_mykid" value="{{ old('no_mykid', $student->no_mykid) }}" maxlength="12" required>
                    @error('no_mykid')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="tarikh_lahir" class="form-label">Tarikh Lahir <span class="text-danger">*</span></label>
                    <input type="date" class="form-control @error('tarikh_lahir') is-invalid @enderror" 
                           id="tarikh_lahir" name="tarikh_lahir" value="{{ old('tarikh_lahir', $student->tarikh_lahir->format('Y-m-d')) }}" required>
                    @error('tarikh_lahir')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="jantina" class="form-label">Jantina <span class="text-danger">*</span></label>
                    <select class="form-select @error('jantina') is-invalid @enderror" id="jantina" name="jantina" required>
                        <option value="Lelaki" {{ old('jantina', $student->jantina) == 'Lelaki' ? 'selected' : '' }}>Lelaki</option>
                        <option value="Perempuan" {{ old('jantina', $student->jantina) == 'Perempuan' ? 'selected' : '' }}>Perempuan</option>
                    </select>
                    @error('jantina')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="foto" class="form-label">Foto</label>
                    @if($student->foto)
                        <div class="mb-2">
                            <img src="{{ asset($student->foto) }}" class="rounded" width="50" height="50" style="object-fit: cover;">
                            <small class="text-muted ms-2">Foto semasa</small>
                        </div>
                    @endif
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
                           id="kelas" name="kelas" value="{{ old('kelas', $student->kelas) }}" required>
                    @error('kelas')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="tahun" class="form-label">Tahun <span class="text-danger">*</span></label>
                    <select class="form-select @error('tahun') is-invalid @enderror" id="tahun" name="tahun" required>
                        @for($i = 1; $i <= 6; $i++)
                            <option value="{{ $i }}" {{ old('tahun', $student->tahun) == $i ? 'selected' : '' }}>Tahun {{ $i }}</option>
                        @endfor
                    </select>
                    @error('tahun')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="status" class="form-label">Status <span class="text-danger">*</span></label>
                    <select class="form-select @error('status') is-invalid @enderror" id="status" name="status" required>
                        <option value="Aktif" {{ old('status', $student->status) == 'Aktif' ? 'selected' : '' }}>Aktif</option>
                        <option value="Tidak Aktif" {{ old('status', $student->status) == 'Tidak Aktif' ? 'selected' : '' }}>Tidak Aktif</option>
                        <option value="Berhenti" {{ old('status', $student->status) == 'Berhenti' ? 'selected' : '' }}>Berhenti</option>
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
                        @foreach(['Masalah Pembelajaran', 'Masalah Pendengaran', 'Masalah Penglihatan', 'Masalah Fizikal', 'Masalah Pertuturan', 'Pelbagai Ketidakupayaan', 'Autisme', 'ADHD', 'Down Syndrome', 'Lain-lain'] as $kat)
                            <option value="{{ $kat }}" {{ old('kategori_oku', $student->kategori_oku) == $kat ? 'selected' : '' }}>{{ $kat }}</option>
                        @endforeach
                    </select>
                    @error('kategori_oku')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-6 mb-3">
                    <label for="catatan_perubatan" class="form-label">Catatan Perubatan</label>
                    <textarea class="form-control @error('catatan_perubatan') is-invalid @enderror" 
                              id="catatan_perubatan" name="catatan_perubatan" rows="3">{{ old('catatan_perubatan', $student->catatan_perubatan) }}</textarea>
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
                           id="nama_penjaga" name="nama_penjaga" value="{{ old('nama_penjaga', $student->nama_penjaga) }}" required>
                    @error('nama_penjaga')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="telefon_penjaga" class="form-label">No. Telefon <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('telefon_penjaga') is-invalid @enderror" 
                           id="telefon_penjaga" name="telefon_penjaga" value="{{ old('telefon_penjaga', $student->telefon_penjaga) }}" required>
                    @error('telefon_penjaga')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="hubungan_penjaga" class="form-label">Hubungan</label>
                    <select class="form-select @error('hubungan_penjaga') is-invalid @enderror" id="hubungan_penjaga" name="hubungan_penjaga">
                        <option value="">-- Pilih --</option>
                        @foreach(['Ibu/Bapa', 'Datuk/Nenek', 'Adik-beradik', 'Penjaga', 'Lain-lain'] as $hub)
                            <option value="{{ $hub }}" {{ old('hubungan_penjaga', $student->hubungan_penjaga) == $hub ? 'selected' : '' }}>{{ $hub }}</option>
                        @endforeach
                    </select>
                    @error('hubungan_penjaga')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-12 mb-3">
                    <label for="alamat" class="form-label">Alamat</label>
                    <textarea class="form-control @error('alamat') is-invalid @enderror" 
                              id="alamat" name="alamat" rows="2">{{ old('alamat', $student->alamat) }}</textarea>
                    @error('alamat')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                    <i class="bi bi-check-circle me-1"></i>Kemaskini
                </button>
                <a href="{{ route('students.index') }}" class="btn btn-secondary">Batal</a>
            </div>
        </form>
    </div>
</div>
@endsection
