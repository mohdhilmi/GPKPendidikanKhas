# One Stop Center GPK Pendidikan Khas

Pusat Sehenti Digital Pengurusan Pendidikan Khas & Evidens PBPPP

**URL**: [https://gpk.mohdhilmi.com](https://gpk.mohdhilmi.com)

---

## Profil Pengguna

| Field | Maklumat |
|-------|----------|
| **Nama** | Mohamad Hilmi |
| **Jawatan** | Guru Penolong Kanan Pendidikan Khas (GPKPK) |
| **Sekolah** | SK Senai |

---

## Modul Sistem

| # | Modul | Fungsi |
|---|-------|--------|
| 1 | Perancangan & Pembangunan Pelajaran | e-RPH, Rekod PBD, Headcount |
| 2 | Penyeliaan & Pemantauan | Jadual Pencerapan, Borang Pencerapan |
| 3 | Program Pendidikan Khas | PDCA (Plan-Do-Check-Action) |
| 4 | Pengurusan Kewangan | Peruntukan, Perbelanjaan, Laporan |
| 5 | Jalinan & Jaringan | Agensi, NGO, Syarikat, Komuniti |
| 6 | ICT & Digitalisasi | Projek ICT, Kemahiran Digital |
| 7 | Sumbangan Profesional | Penceramah, Jurulatih, Jawatan Luar |
| 8 | Pencapaian | Timeline Achievement (Daerah-Antarabangsa) |
| 9 | Amalan Terbaik & Inovasi | Innovation Showcase |

**Tambahan:**
- Pengurusan Dokumen (folder automatik per modul)
- Carian Global
- Laporan Automatik (PDF)
- Dark Mode / Light Mode

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **PDF**: jsPDF + jspdf-autotable
- **Charts**: Recharts
- **Deployment**: Vercel / Shared Hosting

---

## Cara Setup

### 1. Clone Repository

```bash
git clone https://github.com/mohdhilmi/GPKPendidikanKhas.git
cd GPKPendidikanKhas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Buat projek baru di [supabase.com](https://supabase.com)
2. Jalankan SQL dari `supabase-schema.sql` di SQL Editor
3. Buat Storage Buckets:
   - `documents` (private)
   - `images` (public)
   - `certificates` (private)

### 4. Environment Variables

Copy `.env.local.example` ke `.env.local` dan isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Buat Admin User

Di Supabase Dashboard > Authentication > Users > Add User:
- Email: admin@gpk.mohdhilmi.com
- Password: (pilih sendiri)

### 6. Run Development

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Deployment ke Vercel

1. Push code ke GitHub
2. Connect repo di [vercel.com](https://vercel.com)
3. Add environment variables
4. Deploy

### Custom Domain (gpk.mohdhilmi.com)

Di Vercel Dashboard > Settings > Domains:
1. Tambah `gpk.mohdhilmi.com`
2. Tambah CNAME record di DNS:
   - Name: `gpk`
   - Value: `cname.vercel-dns.com`

---

## Design

- **Tema**: Pendidikan Khas Malaysia - Profesional Korporat
- **Warna Utama**: Biru, Putih, Emas
- **Layout**: Sidebar kiri + Dashboard moden
- **Responsive**: Mobile-first design
- **Dark/Light Mode**: Toggle switch

---

## License

MIT
