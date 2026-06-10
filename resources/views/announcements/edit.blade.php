@extends('layouts.app')

@section('title', 'Edit Pengumuman')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-pencil-square me-2"></i>Edit Pengumuman</h4>
    <a href="{{ route('announcements.index') }}" class="btn btn-outline-secondary">
        <i class="bi bi-arrow-left me-1"></i>Kembali
    </a>
</div>

<div class="card border-0 shadow-sm">
    <div class="card-body">
        <form method="POST" action="{{ route('announcements.update', $announcement) }}" enctype="multipart/form-data">
            @csrf
            @method('PUT')

            <div class="row">
                <div class="col-md-8 mb-3">
                    <label for="tajuk" class="form-label">Tajuk <span class="text-danger">*</span></label>
                    <input type="text" class="form-control @error('tajuk') is-invalid @enderror" 
                           id="tajuk" name="tajuk" value="{{ old('tajuk', $announcement->tajuk) }}" required>
                    @error('tajuk')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="kategori" class="form-label">Kategori <span class="text-danger">*</span></label>
                    <select class="form-select @error('kategori') is-invalid @enderror" id="kategori" name="kategori" required>
                        <option value="">-- Pilih --</option>
                        @foreach(['Pekeliling', 'Panduan', 'Maklumat Am', 'Notis'] as $kat)
                            <option value="{{ $kat }}" {{ old('kategori', $announcement->kategori) == $kat ? 'selected' : '' }}>{{ $kat }}</option>
                        @endforeach
                    </select>
                    @error('kategori')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="mb-3">
                <label for="kandungan" class="form-label">Kandungan <span class="text-danger">*</span></label>
                <textarea class="form-control @error('kandungan') is-invalid @enderror" 
                          id="kandungan" name="kandungan" rows="6" required>{{ old('kandungan', $announcement->kandungan) }}</textarea>
                @error('kandungan')
                    <div class="invalid-feedback">{{ $message }}</div>
                @enderror
            </div>

            <div class="row">
                <div class="col-md-4 mb-3">
                    <label for="keutamaan" class="form-label">Keutamaan <span class="text-danger">*</span></label>
                    <select class="form-select @error('keutamaan') is-invalid @enderror" id="keutamaan" name="keutamaan" required>
                        <option value="Rendah" {{ old('keutamaan', $announcement->keutamaan) == 'Rendah' ? 'selected' : '' }}>Rendah</option>
                        <option value="Sederhana" {{ old('keutamaan', $announcement->keutamaan) == 'Sederhana' ? 'selected' : '' }}>Sederhana</option>
                        <option value="Tinggi" {{ old('keutamaan', $announcement->keutamaan) == 'Tinggi' ? 'selected' : '' }}>Tinggi</option>
                    </select>
                    @error('keutamaan')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="tarikh_mula" class="form-label">Tarikh Mula</label>
                    <input type="date" class="form-control @error('tarikh_mula') is-invalid @enderror" 
                           id="tarikh_mula" name="tarikh_mula" 
                           value="{{ old('tarikh_mula', $announcement->tarikh_mula ? $announcement->tarikh_mula->format('Y-m-d') : '') }}">
                    @error('tarikh_mula')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
                <div class="col-md-4 mb-3">
                    <label for="tarikh_tamat" class="form-label">Tarikh Tamat</label>
                    <input type="date" class="form-control @error('tarikh_tamat') is-invalid @enderror" 
                           id="tarikh_tamat" name="tarikh_tamat" 
                           value="{{ old('tarikh_tamat', $announcement->tarikh_tamat ? $announcement->tarikh_tamat->format('Y-m-d') : '') }}">
                    @error('tarikh_tamat')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="lampiran" class="form-label">Lampiran</label>
                    @if($announcement->lampiran_path)
                        <div class="mb-2">
                            <span class="badge bg-light text-dark">
                                <i class="bi bi-paperclip me-1"></i>{{ $announcement->lampiran_nama }}
                            </span>
                        </div>
                    @endif
                    <input type="file" class="form-control @error('lampiran') is-invalid @enderror" 
                           id="lampiran" name="lampiran">
                    @error('lampiran')
                        <div class="invalid-feedback">{{ $message }}</div>
                    @enderror
                    <small class="text-muted">Biarkan kosong jika tidak mahu tukar. Maks 5MB.</small>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label d-block">&nbsp;</label>
                    <div class="form-check form-check-inline mt-2">
                        <input class="form-check-input" type="checkbox" id="is_pinned" name="is_pinned" value="1" 
                               {{ old('is_pinned', $announcement->is_pinned) ? 'checked' : '' }}>
                        <label class="form-check-label" for="is_pinned">
                            <i class="bi bi-pin text-danger me-1"></i>Sematkan di atas
                        </label>
                    </div>
                    <div class="form-check form-check-inline mt-2">
                        <input class="form-check-input" type="checkbox" id="is_active" name="is_active" value="1" 
                               {{ old('is_active', $announcement->is_active) ? 'checked' : '' }}>
                        <label class="form-check-label" for="is_active">
                            <i class="bi bi-check-circle text-success me-1"></i>Aktif
                        </label>
                    </div>
                </div>
            </div>

            <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                    <i class="bi bi-check-circle me-1"></i>Kemaskini
                </button>
                <a href="{{ route('announcements.index') }}" class="btn btn-secondary">Batal</a>
            </div>
        </form>
    </div>
</div>
@endsection
