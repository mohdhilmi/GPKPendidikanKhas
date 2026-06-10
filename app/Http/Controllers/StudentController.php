<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Senarai semua murid.
     */
    public function index(Request $request)
    {
        $query = Student::query();

        // Search
        if ($request->filled('carian')) {
            $carian = $request->carian;
            $query->where(function ($q) use ($carian) {
                $q->where('nama', 'like', "%{$carian}%")
                  ->orWhere('no_mykid', 'like', "%{$carian}%")
                  ->orWhere('kelas', 'like', "%{$carian}%");
            });
        }

        // Filter by tahun
        if ($request->filled('tahun')) {
            $query->where('tahun', $request->tahun);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Filter by kategori OKU
        if ($request->filled('kategori')) {
            $query->where('kategori_oku', $request->kategori);
        }

        $students = $query->orderBy('nama')->paginate(15)->withQueryString();

        // Get unique categories for filter dropdown
        $kategoriList = Student::distinct()->pluck('kategori_oku')->filter()->sort()->values();

        return view('students.index', compact('students', 'kategoriList'));
    }

    /**
     * Papar borang tambah murid baru.
     */
    public function create()
    {
        return view('students.create');
    }

    /**
     * Simpan murid baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'no_mykid' => 'required|string|max:12|unique:students,no_mykid',
            'tarikh_lahir' => 'required|date',
            'jantina' => 'required|in:Lelaki,Perempuan',
            'kelas' => 'required|string|max:100',
            'tahun' => 'required|integer|between:1,6',
            'kategori_oku' => 'required|string|max:255',
            'catatan_perubatan' => 'nullable|string',
            'nama_penjaga' => 'required|string|max:255',
            'telefon_penjaga' => 'required|string|max:20',
            'hubungan_penjaga' => 'nullable|string|max:100',
            'alamat' => 'nullable|string',
            'status' => 'required|in:Aktif,Tidak Aktif,Berhenti',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Handle foto upload
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');
            $namaFoto = time() . '_' . $foto->getClientOriginalName();
            $foto->move(public_path('uploads/students'), $namaFoto);
            $validated['foto'] = 'uploads/students/' . $namaFoto;
        }

        Student::create($validated);

        return redirect()->route('students.index')
            ->with('success', 'Murid berjaya didaftarkan!');
    }

    /**
     * Papar maklumat murid.
     */
    public function show(Student $student)
    {
        return view('students.show', compact('student'));
    }

    /**
     * Papar borang edit murid.
     */
    public function edit(Student $student)
    {
        return view('students.edit', compact('student'));
    }

    /**
     * Kemaskini maklumat murid.
     */
    public function update(Request $request, Student $student)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'no_mykid' => 'required|string|max:12|unique:students,no_mykid,' . $student->id,
            'tarikh_lahir' => 'required|date',
            'jantina' => 'required|in:Lelaki,Perempuan',
            'kelas' => 'required|string|max:100',
            'tahun' => 'required|integer|between:1,6',
            'kategori_oku' => 'required|string|max:255',
            'catatan_perubatan' => 'nullable|string',
            'nama_penjaga' => 'required|string|max:255',
            'telefon_penjaga' => 'required|string|max:20',
            'hubungan_penjaga' => 'nullable|string|max:100',
            'alamat' => 'nullable|string',
            'status' => 'required|in:Aktif,Tidak Aktif,Berhenti',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Handle foto upload
        if ($request->hasFile('foto')) {
            // Delete old foto
            if ($student->foto && file_exists(public_path($student->foto))) {
                unlink(public_path($student->foto));
            }
            $foto = $request->file('foto');
            $namaFoto = time() . '_' . $foto->getClientOriginalName();
            $foto->move(public_path('uploads/students'), $namaFoto);
            $validated['foto'] = 'uploads/students/' . $namaFoto;
        }

        $student->update($validated);

        return redirect()->route('students.index')
            ->with('success', 'Maklumat murid berjaya dikemaskini!');
    }

    /**
     * Padam murid.
     */
    public function destroy(Student $student)
    {
        // Delete foto if exists
        if ($student->foto && file_exists(public_path($student->foto))) {
            unlink(public_path($student->foto));
        }

        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Rekod murid berjaya dipadam!');
    }
}
