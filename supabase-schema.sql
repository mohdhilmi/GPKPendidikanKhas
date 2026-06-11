-- =====================================================
-- GPK Pendidikan Khas - Supabase Database Schema
-- One Stop Center Pengurusan PK & Evidens PBPPP
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLE: profiles
-- =====================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nama TEXT NOT NULL DEFAULT 'Mohamad Hilmi',
  jawatan TEXT NOT NULL DEFAULT 'Guru Penolong Kanan Pendidikan Khas',
  sekolah TEXT NOT NULL DEFAULT 'SK Senai',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- =====================================================
-- TABLE: erph (Modul 1)
-- =====================================================
CREATE TABLE erph (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tajuk TEXT NOT NULL,
  bulan TEXT NOT NULL,
  tahun INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  jenis TEXT NOT NULL CHECK (jenis IN ('pdf', 'link')),
  file_path TEXT,
  link_url TEXT,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: rekod_pbd (Modul 1)
-- =====================================================
CREATE TABLE rekod_pbd (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nama_murid TEXT NOT NULL,
  kelas TEXT NOT NULL,
  mata_pelajaran TEXT NOT NULL,
  tahap_penguasaan INTEGER NOT NULL CHECK (tahap_penguasaan BETWEEN 1 AND 6),
  evidens_path TEXT,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: headcount (Modul 1)
-- =====================================================
CREATE TABLE headcount (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mata_pelajaran TEXT NOT NULL,
  kelas TEXT NOT NULL,
  sasaran_lulus INTEGER NOT NULL,
  pencapaian_semasa INTEGER NOT NULL DEFAULT 0,
  tahun INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  penggal INTEGER NOT NULL CHECK (penggal IN (1, 2)),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: pencerapan (Modul 2)
-- =====================================================
CREATE TABLE pencerapan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tarikh DATE NOT NULL,
  pegawai_penyelia TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Belum' CHECK (status IN ('Belum', 'Selesai', 'Ditangguh')),
  borang_path TEXT,
  catatan_penambahbaikan TEXT,
  tindakan_susulan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: programs (Modul 3)
-- =====================================================
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nama TEXT NOT NULL,
  kategori TEXT NOT NULL CHECK (kategori IN ('Kurikulum', 'HEM', 'Kokurikulum', 'Pendidikan Khas')),
  tarikh_mula DATE NOT NULL,
  tarikh_tamat DATE,
  status TEXT NOT NULL DEFAULT 'Perancangan' CHECK (status IN ('Perancangan', 'Sedang Berjalan', 'Selesai')),
  -- PLAN
  kertas_kerja_path TEXT,
  objektif TEXT,
  sasaran TEXT,
  -- DO
  laporan_path TEXT,
  gambar_paths TEXT[],
  kehadiran_path TEXT,
  -- CHECK
  borang_penilaian_path TEXT,
  post_mortem TEXT,
  analisis_impak TEXT,
  -- ACTION
  intervensi TEXT,
  penambahbaikan TEXT,
  inovasi_cadangan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: kewangan_peruntukan (Modul 4)
-- =====================================================
CREATE TABLE kewangan_peruntukan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tarikh DATE NOT NULL,
  sumber TEXT NOT NULL,
  jumlah DECIMAL(10, 2) NOT NULL,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: kewangan_perbelanjaan (Modul 4)
-- =====================================================
CREATE TABLE kewangan_perbelanjaan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tarikh DATE NOT NULL,
  item TEXT NOT NULL,
  jumlah DECIMAL(10, 2) NOT NULL,
  resit_path TEXT,
  kategori TEXT,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: jalinan (Modul 5)
-- =====================================================
CREATE TABLE jalinan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nama_organisasi TEXT NOT NULL,
  jenis TEXT NOT NULL CHECK (jenis IN ('Agensi', 'NGO', 'Syarikat', 'Komuniti')),
  pegawai_hubungan TEXT NOT NULL,
  telefon TEXT,
  email TEXT,
  surat_kerjasama_path TEXT,
  laporan_aktiviti_path TEXT,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: projek_ict (Modul 6)
-- =====================================================
CREATE TABLE projek_ict (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nama_projek TEXT NOT NULL,
  tahun INTEGER NOT NULL,
  deskripsi TEXT NOT NULL,
  evidens_path TEXT,
  link_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: kemahiran_digital (Modul 6)
-- =====================================================
CREATE TABLE kemahiran_digital (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  kategori TEXT NOT NULL CHECK (kategori IN ('Google Workspace', 'Canva', 'AI Tools', 'Microsoft Office', 'Website Development')),
  nama_kemahiran TEXT NOT NULL,
  tahap TEXT NOT NULL CHECK (tahap IN ('Asas', 'Pertengahan', 'Mahir')),
  sijil_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: sumbangan (Modul 7)
-- =====================================================
CREATE TABLE sumbangan (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  jenis TEXT NOT NULL CHECK (jenis IN ('Penceramah', 'Jurulatih Utama', 'Jawatan Luar')),
  tajuk TEXT NOT NULL,
  tarikh DATE NOT NULL,
  organisasi TEXT NOT NULL,
  sijil_path TEXT,
  evidens_path TEXT,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: pencapaian (Modul 8)
-- =====================================================
CREATE TABLE pencapaian (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nama TEXT NOT NULL,
  tahun INTEGER NOT NULL,
  peringkat TEXT NOT NULL CHECK (peringkat IN ('Daerah', 'Negeri', 'Kebangsaan', 'Antarabangsa')),
  sijil_path TEXT,
  gambar_path TEXT,
  catatan TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: inovasi (Modul 9)
-- =====================================================
CREATE TABLE inovasi (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nama TEXT NOT NULL,
  tahun INTEGER NOT NULL,
  penerangan TEXT NOT NULL,
  video_url TEXT,
  gambar_path TEXT,
  dokumen_path TEXT,
  kategori TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- TABLE: documents
-- =====================================================
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nama TEXT NOT NULL,
  folder TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL DEFAULT 0,
  file_type TEXT NOT NULL,
  tags TEXT[],
  modul TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE erph ENABLE ROW LEVEL SECURITY;
ALTER TABLE rekod_pbd ENABLE ROW LEVEL SECURITY;
ALTER TABLE headcount ENABLE ROW LEVEL SECURITY;
ALTER TABLE pencerapan ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE kewangan_peruntukan ENABLE ROW LEVEL SECURITY;
ALTER TABLE kewangan_perbelanjaan ENABLE ROW LEVEL SECURITY;
ALTER TABLE jalinan ENABLE ROW LEVEL SECURITY;
ALTER TABLE projek_ict ENABLE ROW LEVEL SECURITY;
ALTER TABLE kemahiran_digital ENABLE ROW LEVEL SECURITY;
ALTER TABLE sumbangan ENABLE ROW LEVEL SECURITY;
ALTER TABLE pencapaian ENABLE ROW LEVEL SECURITY;
ALTER TABLE inovasi ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Policies - Users can only access their own data
CREATE POLICY "Users can access own data" ON profiles FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON erph FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON rekod_pbd FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON headcount FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON pencerapan FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON programs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON kewangan_peruntukan FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON kewangan_perbelanjaan FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON jalinan FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON projek_ict FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON kemahiran_digital FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON sumbangan FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON pencapaian FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON inovasi FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can access own data" ON documents FOR ALL USING (auth.uid() = user_id);

-- =====================================================
-- STORAGE BUCKETS
-- =====================================================
-- Run these in Supabase Dashboard > Storage:
-- 1. Create bucket: "documents" (public: false)
-- 2. Create bucket: "images" (public: true)
-- 3. Create bucket: "certificates" (public: false)
