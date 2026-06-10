<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ResourceController extends Controller
{
    /**
     * Senarai semua resources/bahan.
     */
    public function index(Request $request)
    {
        $query = Resource::with('uploader');

        // Search
        if ($request->filled('carian')) {
            $carian = $request->carian;
            $query->where(function ($q) use ($carian) {
                $q->where('tajuk', 'like', "%{$carian}%")
                  ->orWhere('penerangan', 'like', "%{$carian}%");
            });
        }

        // Filter by kategori
        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        // Filter by mata pelajaran
        if ($request->filled('mata_pelajaran')) {
            $query->where('mata_pelajaran', $request->mata_pelajaran);
        }

        $resources = $query->orderByDesc('created_at')->paginate(12)->withQueryString();

        // Get unique values for filter dropdowns
        $kategoriList = Resource::distinct()->pluck('kategori')->filter()->sort()->values();
        $mataPelajaranList = Resource::distinct()->pluck('mata_pelajaran')->filter()->sort()->values();

        return view('resources.index', compact('resources', 'kategoriList', 'mataPelajaranList'));
    }

    /**
     * Papar borang tambah resource.
     */
    public function create()
    {
        return view('resources.create');
    }

    /**
     * Simpan resource baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tajuk' => 'required|string|max:255',
            'penerangan' => 'nullable|string',
            'kategori' => 'required|string|max:255',
            'mata_pelajaran' => 'nullable|string|max:255',
            'fail' => 'nullable|file|max:10240', // Max 10MB
            'pautan_luar' => 'nullable|url|max:500',
        ]);

        $data = [
            'tajuk' => $validated['tajuk'],
            'penerangan' => $validated['penerangan'] ?? null,
            'kategori' => $validated['kategori'],
            'mata_pelajaran' => $validated['mata_pelajaran'] ?? null,
            'pautan_luar' => $validated['pautan_luar'] ?? null,
            'uploaded_by' => Auth::id(),
        ];

        // Handle file upload
        if ($request->hasFile('fail')) {
            $file = $request->file('fail');
            $namaFail = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/resources'), $namaFail);

            $data['fail_path'] = 'uploads/resources/' . $namaFail;
            $data['fail_nama'] = $file->getClientOriginalName();
            $data['fail_saiz'] = $file->getSize();
            $data['fail_jenis'] = $file->getClientMimeType();
        }

        Resource::create($data);

        return redirect()->route('resources.index')
            ->with('success', 'Bahan berjaya dimuat naik!');
    }

    /**
     * Papar resource.
     */
    public function show(Resource $resource)
    {
        return view('resources.show', compact('resource'));
    }

    /**
     * Papar borang edit resource.
     */
    public function edit(Resource $resource)
    {
        return view('resources.edit', compact('resource'));
    }

    /**
     * Kemaskini resource.
     */
    public function update(Request $request, Resource $resource)
    {
        $validated = $request->validate([
            'tajuk' => 'required|string|max:255',
            'penerangan' => 'nullable|string',
            'kategori' => 'required|string|max:255',
            'mata_pelajaran' => 'nullable|string|max:255',
            'fail' => 'nullable|file|max:10240',
            'pautan_luar' => 'nullable|url|max:500',
        ]);

        $data = [
            'tajuk' => $validated['tajuk'],
            'penerangan' => $validated['penerangan'] ?? null,
            'kategori' => $validated['kategori'],
            'mata_pelajaran' => $validated['mata_pelajaran'] ?? null,
            'pautan_luar' => $validated['pautan_luar'] ?? null,
        ];

        // Handle file upload
        if ($request->hasFile('fail')) {
            // Delete old file
            if ($resource->fail_path && file_exists(public_path($resource->fail_path))) {
                unlink(public_path($resource->fail_path));
            }

            $file = $request->file('fail');
            $namaFail = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/resources'), $namaFail);

            $data['fail_path'] = 'uploads/resources/' . $namaFail;
            $data['fail_nama'] = $file->getClientOriginalName();
            $data['fail_saiz'] = $file->getSize();
            $data['fail_jenis'] = $file->getClientMimeType();
        }

        $resource->update($data);

        return redirect()->route('resources.index')
            ->with('success', 'Bahan berjaya dikemaskini!');
    }

    /**
     * Padam resource.
     */
    public function destroy(Resource $resource)
    {
        // Delete file if exists
        if ($resource->fail_path && file_exists(public_path($resource->fail_path))) {
            unlink(public_path($resource->fail_path));
        }

        $resource->delete();

        return redirect()->route('resources.index')
            ->with('success', 'Bahan berjaya dipadam!');
    }

    /**
     * Muat turun fail resource.
     */
    public function download(Resource $resource)
    {
        if (!$resource->fail_path || !file_exists(public_path($resource->fail_path))) {
            return back()->with('error', 'Fail tidak dijumpai.');
        }

        // Increment download count
        $resource->increment('muat_turun_count');

        return response()->download(
            public_path($resource->fail_path),
            $resource->fail_nama
        );
    }
}
