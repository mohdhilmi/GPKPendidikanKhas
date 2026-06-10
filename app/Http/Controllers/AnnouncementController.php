<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AnnouncementController extends Controller
{
    /**
     * Senarai semua pengumuman/maklumat.
     */
    public function index(Request $request)
    {
        $query = Announcement::with('creator');

        // Search
        if ($request->filled('carian')) {
            $carian = $request->carian;
            $query->where(function ($q) use ($carian) {
                $q->where('tajuk', 'like', "%{$carian}%")
                  ->orWhere('kandungan', 'like', "%{$carian}%");
            });
        }

        // Filter by kategori
        if ($request->filled('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        // Filter by keutamaan
        if ($request->filled('keutamaan')) {
            $query->where('keutamaan', $request->keutamaan);
        }

        $announcements = $query->orderByDesc('is_pinned')
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        return view('announcements.index', compact('announcements'));
    }

    /**
     * Papar borang tambah pengumuman.
     */
    public function create()
    {
        return view('announcements.create');
    }

    /**
     * Simpan pengumuman baru.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'tajuk' => 'required|string|max:255',
            'kandungan' => 'required|string',
            'kategori' => 'required|string|max:255',
            'keutamaan' => 'required|in:Rendah,Sederhana,Tinggi',
            'lampiran' => 'nullable|file|max:5120',
            'is_pinned' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
            'tarikh_mula' => 'nullable|date',
            'tarikh_tamat' => 'nullable|date|after_or_equal:tarikh_mula',
        ]);

        $data = [
            'tajuk' => $validated['tajuk'],
            'kandungan' => $validated['kandungan'],
            'kategori' => $validated['kategori'],
            'keutamaan' => $validated['keutamaan'],
            'is_pinned' => $request->boolean('is_pinned'),
            'is_active' => $request->boolean('is_active', true),
            'tarikh_mula' => $validated['tarikh_mula'] ?? null,
            'tarikh_tamat' => $validated['tarikh_tamat'] ?? null,
            'created_by' => Auth::id(),
        ];

        // Handle lampiran upload
        if ($request->hasFile('lampiran')) {
            $file = $request->file('lampiran');
            $namaFail = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/announcements'), $namaFail);

            $data['lampiran_path'] = 'uploads/announcements/' . $namaFail;
            $data['lampiran_nama'] = $file->getClientOriginalName();
        }

        Announcement::create($data);

        return redirect()->route('announcements.index')
            ->with('success', 'Pengumuman berjaya ditambah!');
    }

    /**
     * Papar pengumuman.
     */
    public function show(Announcement $announcement)
    {
        return view('announcements.show', compact('announcement'));
    }

    /**
     * Papar borang edit pengumuman.
     */
    public function edit(Announcement $announcement)
    {
        return view('announcements.edit', compact('announcement'));
    }

    /**
     * Kemaskini pengumuman.
     */
    public function update(Request $request, Announcement $announcement)
    {
        $validated = $request->validate([
            'tajuk' => 'required|string|max:255',
            'kandungan' => 'required|string',
            'kategori' => 'required|string|max:255',
            'keutamaan' => 'required|in:Rendah,Sederhana,Tinggi',
            'lampiran' => 'nullable|file|max:5120',
            'is_pinned' => 'nullable|boolean',
            'is_active' => 'nullable|boolean',
            'tarikh_mula' => 'nullable|date',
            'tarikh_tamat' => 'nullable|date|after_or_equal:tarikh_mula',
        ]);

        $data = [
            'tajuk' => $validated['tajuk'],
            'kandungan' => $validated['kandungan'],
            'kategori' => $validated['kategori'],
            'keutamaan' => $validated['keutamaan'],
            'is_pinned' => $request->boolean('is_pinned'),
            'is_active' => $request->boolean('is_active', true),
            'tarikh_mula' => $validated['tarikh_mula'] ?? null,
            'tarikh_tamat' => $validated['tarikh_tamat'] ?? null,
        ];

        // Handle lampiran upload
        if ($request->hasFile('lampiran')) {
            // Delete old file
            if ($announcement->lampiran_path && file_exists(public_path($announcement->lampiran_path))) {
                unlink(public_path($announcement->lampiran_path));
            }

            $file = $request->file('lampiran');
            $namaFail = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/announcements'), $namaFail);

            $data['lampiran_path'] = 'uploads/announcements/' . $namaFail;
            $data['lampiran_nama'] = $file->getClientOriginalName();
        }

        $announcement->update($data);

        return redirect()->route('announcements.index')
            ->with('success', 'Pengumuman berjaya dikemaskini!');
    }

    /**
     * Padam pengumuman.
     */
    public function destroy(Announcement $announcement)
    {
        // Delete lampiran if exists
        if ($announcement->lampiran_path && file_exists(public_path($announcement->lampiran_path))) {
            unlink(public_path($announcement->lampiran_path));
        }

        $announcement->delete();

        return redirect()->route('announcements.index')
            ->with('success', 'Pengumuman berjaya dipadam!');
    }
}
