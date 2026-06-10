export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id'>>
      }
      erph: {
        Row: ERPH
        Insert: Omit<ERPH, 'id' | 'created_at'>
        Update: Partial<Omit<ERPH, 'id'>>
      }
      rekod_pbd: {
        Row: RekodPBD
        Insert: Omit<RekodPBD, 'id' | 'created_at'>
        Update: Partial<Omit<RekodPBD, 'id'>>
      }
      headcount: {
        Row: Headcount
        Insert: Omit<Headcount, 'id' | 'created_at'>
        Update: Partial<Omit<Headcount, 'id'>>
      }
      pencerapan: {
        Row: Pencerapan
        Insert: Omit<Pencerapan, 'id' | 'created_at'>
        Update: Partial<Omit<Pencerapan, 'id'>>
      }
      programs: {
        Row: Program
        Insert: Omit<Program, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Program, 'id'>>
      }
      kewangan_peruntukan: {
        Row: Peruntukan
        Insert: Omit<Peruntukan, 'id' | 'created_at'>
        Update: Partial<Omit<Peruntukan, 'id'>>
      }
      kewangan_perbelanjaan: {
        Row: Perbelanjaan
        Insert: Omit<Perbelanjaan, 'id' | 'created_at'>
        Update: Partial<Omit<Perbelanjaan, 'id'>>
      }
      jalinan: {
        Row: Jalinan
        Insert: Omit<Jalinan, 'id' | 'created_at'>
        Update: Partial<Omit<Jalinan, 'id'>>
      }
      projek_ict: {
        Row: ProjekICT
        Insert: Omit<ProjekICT, 'id' | 'created_at'>
        Update: Partial<Omit<ProjekICT, 'id'>>
      }
      kemahiran_digital: {
        Row: KemahiranDigital
        Insert: Omit<KemahiranDigital, 'id' | 'created_at'>
        Update: Partial<Omit<KemahiranDigital, 'id'>>
      }
      sumbangan: {
        Row: Sumbangan
        Insert: Omit<Sumbangan, 'id' | 'created_at'>
        Update: Partial<Omit<Sumbangan, 'id'>>
      }
      pencapaian: {
        Row: Pencapaian
        Insert: Omit<Pencapaian, 'id' | 'created_at'>
        Update: Partial<Omit<Pencapaian, 'id'>>
      }
      inovasi: {
        Row: Inovasi
        Insert: Omit<Inovasi, 'id' | 'created_at'>
        Update: Partial<Omit<Inovasi, 'id'>>
      }
      documents: {
        Row: Document
        Insert: Omit<Document, 'id' | 'created_at'>
        Update: Partial<Omit<Document, 'id'>>
      }
    }
  }
}

// === CORE TYPES ===

export interface Profile {
  id: string
  user_id: string
  nama: string
  jawatan: string
  sekolah: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

// === MODULE 1: PERANCANGAN ===

export interface ERPH {
  id: string
  user_id: string
  tajuk: string
  bulan: string
  tahun: number
  jenis: 'pdf' | 'link'
  file_path?: string
  link_url?: string
  catatan?: string
  created_at: string
}

export interface RekodPBD {
  id: string
  user_id: string
  nama_murid: string
  kelas: string
  mata_pelajaran: string
  tahap_penguasaan: number
  evidens_path?: string
  catatan?: string
  created_at: string
}

export interface Headcount {
  id: string
  user_id: string
  mata_pelajaran: string
  kelas: string
  sasaran_lulus: number
  pencapaian_semasa: number
  tahun: number
  penggal: number
  created_at: string
}

// === MODULE 2: PENYELIAAN ===

export interface Pencerapan {
  id: string
  user_id: string
  tarikh: string
  pegawai_penyelia: string
  status: 'Belum' | 'Selesai' | 'Ditangguh'
  borang_path?: string
  catatan_penambahbaikan?: string
  tindakan_susulan?: string
  created_at: string
}

// === MODULE 3: PROGRAM ===

export interface Program {
  id: string
  user_id: string
  nama: string
  kategori: 'Kurikulum' | 'HEM' | 'Kokurikulum' | 'Pendidikan Khas'
  tarikh_mula: string
  tarikh_tamat?: string
  status: 'Perancangan' | 'Sedang Berjalan' | 'Selesai'
  // PLAN
  kertas_kerja_path?: string
  objektif?: string
  sasaran?: string
  // DO
  laporan_path?: string
  gambar_paths?: string[]
  kehadiran_path?: string
  // CHECK
  borang_penilaian_path?: string
  post_mortem?: string
  analisis_impak?: string
  // ACTION
  intervensi?: string
  penambahbaikan?: string
  inovasi_cadangan?: string
  created_at: string
  updated_at: string
}

// === MODULE 4: KEWANGAN ===

export interface Peruntukan {
  id: string
  user_id: string
  tarikh: string
  sumber: string
  jumlah: number
  catatan?: string
  created_at: string
}

export interface Perbelanjaan {
  id: string
  user_id: string
  tarikh: string
  item: string
  jumlah: number
  resit_path?: string
  kategori?: string
  catatan?: string
  created_at: string
}

// === MODULE 5: JALINAN ===

export interface Jalinan {
  id: string
  user_id: string
  nama_organisasi: string
  jenis: 'Agensi' | 'NGO' | 'Syarikat' | 'Komuniti'
  pegawai_hubungan: string
  telefon?: string
  email?: string
  surat_kerjasama_path?: string
  laporan_aktiviti_path?: string
  catatan?: string
  created_at: string
}

// === MODULE 6: ICT ===

export interface ProjekICT {
  id: string
  user_id: string
  nama_projek: string
  tahun: number
  deskripsi: string
  evidens_path?: string
  link_url?: string
  created_at: string
}

export interface KemahiranDigital {
  id: string
  user_id: string
  kategori: 'Google Workspace' | 'Canva' | 'AI Tools' | 'Microsoft Office' | 'Website Development'
  nama_kemahiran: string
  tahap: 'Asas' | 'Pertengahan' | 'Mahir'
  sijil_path?: string
  created_at: string
}

// === MODULE 7: SUMBANGAN ===

export interface Sumbangan {
  id: string
  user_id: string
  jenis: 'Penceramah' | 'Jurulatih Utama' | 'Jawatan Luar'
  tajuk: string
  tarikh: string
  organisasi: string
  sijil_path?: string
  evidens_path?: string
  catatan?: string
  created_at: string
}

// === MODULE 8: PENCAPAIAN ===

export interface Pencapaian {
  id: string
  user_id: string
  nama: string
  tahun: number
  peringkat: 'Daerah' | 'Negeri' | 'Kebangsaan' | 'Antarabangsa'
  sijil_path?: string
  gambar_path?: string
  catatan?: string
  created_at: string
}

// === MODULE 9: INOVASI ===

export interface Inovasi {
  id: string
  user_id: string
  nama: string
  tahun: number
  penerangan: string
  video_url?: string
  gambar_path?: string
  dokumen_path?: string
  kategori?: string
  created_at: string
}

// === DOCUMENTS ===

export interface Document {
  id: string
  user_id: string
  nama: string
  folder: string
  file_path: string
  file_size: number
  file_type: string
  tags?: string[]
  modul?: string
  created_at: string
}
