@extends('layouts.app')

@section('title', 'Senarai Murid')

@section('content')
<div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="mb-0"><i class="bi bi-people-fill me-2"></i>Senarai Murid Pendidikan Khas</h4>
    <a href="{{ route('students.create') }}" class="btn btn-primary">
        <i class="bi bi-plus-circle me-1"></i>Tambah Murid
    </a>
</div>

<!-- Filter & Search -->
<div class="card border-0 shadow-sm mb-4">
    <div class="card-body">
        <form method="GET" action="{{ route('students.index') }}">
            <div class="row g-3">
                <div class="col-md-4">
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-search"></i></span>
                        <input type="text" class="form-control" name="carian" 
                               value="{{ request('carian') }}" placeholder="Cari nama, MyKID, kelas...">
                    </div>
                </div>
                <div class="col-md-2">
                    <select name="tahun" class="form-select">
                        <option value="">Semua Tahun</option>
                        @for($i = 1; $i <= 6; $i++)
                            <option value="{{ $i }}" {{ request('tahun') == $i ? 'selected' : '' }}>Tahun {{ $i }}</option>
                        @endfor
                    </select>
                </div>
                <div class="col-md-2">
                    <select name="status" class="form-select">
                        <option value="">Semua Status</option>
                        <option value="Aktif" {{ request('status') == 'Aktif' ? 'selected' : '' }}>Aktif</option>
                        <option value="Tidak Aktif" {{ request('status') == 'Tidak Aktif' ? 'selected' : '' }}>Tidak Aktif</option>
                        <option value="Berhenti" {{ request('status') == 'Berhenti' ? 'selected' : '' }}>Berhenti</option>
                    </select>
                </div>
                <div class="col-md-2">
                    <select name="kategori" class="form-select">
                        <option value="">Semua Kategori</option>
                        @foreach($kategoriList as $kat)
                            <option value="{{ $kat }}" {{ request('kategori') == $kat ? 'selected' : '' }}>{{ $kat }}</option>
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

<!-- Students Table -->
<div class="card border-0 shadow-sm">
    <div class="card-body p-0">
        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>No MyKID</th>
                        <th>Kelas</th>
                        <th>Tahun</th>
                        <th>Kategori OKU</th>
                        <th>Status</th>
                        <th class="text-center">Tindakan</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($students as $index => $student)
                        <tr>
                            <td>{{ $students->firstItem() + $index }}</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    @if($student->foto)
                                        <img src="{{ asset($student->foto) }}" class="rounded-circle me-2" width="32" height="32" style="object-fit: cover;">
                                    @else
                                        <div class="rounded-circle bg-primary bg-opacity-10 me-2 d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                                            <i class="bi bi-person text-primary"></i>
                                        </div>
                                    @endif
                                    <strong>{{ $student->nama }}</strong>
                                </div>
                            </td>
                            <td>{{ $student->no_mykid }}</td>
                            <td>{{ $student->kelas }}</td>
                            <td>{{ $student->tahun }}</td>
                            <td><span class="badge bg-info text-dark">{{ $student->kategori_oku }}</span></td>
                            <td>
                                @if($student->status == 'Aktif')
                                    <span class="badge bg-success">Aktif</span>
                                @elseif($student->status == 'Tidak Aktif')
                                    <span class="badge bg-warning text-dark">Tidak Aktif</span>
                                @else
                                    <span class="badge bg-danger">Berhenti</span>
                                @endif
                            </td>
                            <td class="text-center">
                                <div class="btn-group btn-group-sm">
                                    <a href="{{ route('students.show', $student) }}" class="btn btn-outline-info" title="Lihat">
                                        <i class="bi bi-eye"></i>
                                    </a>
                                    <a href="{{ route('students.edit', $student) }}" class="btn btn-outline-warning" title="Edit">
                                        <i class="bi bi-pencil"></i>
                                    </a>
                                    <form action="{{ route('students.destroy', $student) }}" method="POST" 
                                          onsubmit="return confirm('Adakah anda pasti ingin memadamkan rekod murid ini?')">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-outline-danger btn-sm" title="Padam">
                                            <i class="bi bi-trash"></i>
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="8" class="text-center py-4 text-muted">
                                <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                                Tiada rekod murid dijumpai.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
    @if($students->hasPages())
        <div class="card-footer bg-white">
            {{ $students->links() }}
        </div>
    @endif
</div>
@endsection
