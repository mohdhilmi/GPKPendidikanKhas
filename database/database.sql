-- =====================================================
-- GPK Pendidikan Khas - Database Setup SQL
-- Domain: gpk.mohdhilmi.com
-- =====================================================
-- Jalankan SQL ini di phpMyAdmin pada shared hosting
-- Buat database baru: gpk_pendidikan_khas
-- =====================================================

-- Create database (jika belum dibuat)
-- CREATE DATABASE IF NOT EXISTS gpk_pendidikan_khas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE gpk_pendidikan_khas;

-- =====================================================
-- TABLE: users
-- =====================================================
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` VARCHAR(255) NOT NULL DEFAULT 'admin',
    `phone` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `last_login_at` TIMESTAMP NULL,
    `remember_token` VARCHAR(100) NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLE: students
-- =====================================================
CREATE TABLE IF NOT EXISTS `students` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `no_mykid` VARCHAR(255) NOT NULL,
    `tarikh_lahir` DATE NOT NULL,
    `jantina` ENUM('Lelaki', 'Perempuan') NOT NULL,
    `kelas` VARCHAR(255) NOT NULL,
    `tahun` INT NOT NULL COMMENT 'Tahun persekolahan: 1-6',
    `kategori_oku` VARCHAR(255) NOT NULL COMMENT 'Jenis ketidakupayaan',
    `catatan_perubatan` TEXT NULL,
    `nama_penjaga` VARCHAR(255) NOT NULL,
    `telefon_penjaga` VARCHAR(255) NOT NULL,
    `hubungan_penjaga` VARCHAR(255) NULL,
    `alamat` TEXT NULL,
    `status` ENUM('Aktif', 'Tidak Aktif', 'Berhenti') NOT NULL DEFAULT 'Aktif',
    `foto` VARCHAR(255) NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `students_no_mykid_unique` (`no_mykid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLE: resources
-- =====================================================
CREATE TABLE IF NOT EXISTS `resources` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tajuk` VARCHAR(255) NOT NULL,
    `penerangan` TEXT NULL,
    `kategori` VARCHAR(255) NOT NULL COMMENT 'Bahan Mengajar, Aktiviti, Lembaran Kerja, Video, Lain-lain',
    `mata_pelajaran` VARCHAR(255) NULL,
    `fail_path` VARCHAR(255) NULL COMMENT 'Path to uploaded file',
    `fail_nama` VARCHAR(255) NULL COMMENT 'Original filename',
    `fail_saiz` VARCHAR(255) NULL,
    `fail_jenis` VARCHAR(255) NULL COMMENT 'mime type',
    `pautan_luar` VARCHAR(255) NULL COMMENT 'External URL if any',
    `uploaded_by` BIGINT UNSIGNED NOT NULL,
    `muat_turun_count` INT NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `resources_uploaded_by_foreign` (`uploaded_by`),
    CONSTRAINT `resources_uploaded_by_foreign` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLE: announcements
-- =====================================================
CREATE TABLE IF NOT EXISTS `announcements` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `tajuk` VARCHAR(255) NOT NULL,
    `kandungan` TEXT NOT NULL,
    `kategori` VARCHAR(255) NOT NULL COMMENT 'Pekeliling, Panduan, Maklumat Am, Notis',
    `keutamaan` ENUM('Rendah', 'Sederhana', 'Tinggi') NOT NULL DEFAULT 'Sederhana',
    `lampiran_path` VARCHAR(255) NULL,
    `lampiran_nama` VARCHAR(255) NULL,
    `is_pinned` TINYINT(1) NOT NULL DEFAULT 0,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `tarikh_mula` DATE NULL,
    `tarikh_tamat` DATE NULL,
    `created_by` BIGINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP NULL,
    `updated_at` TIMESTAMP NULL,
    PRIMARY KEY (`id`),
    KEY `announcements_created_by_foreign` (`created_by`),
    CONSTRAINT `announcements_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLE: password_reset_tokens
-- =====================================================
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NULL,
    PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- TABLE: sessions (untuk session driver database - optional)
-- =====================================================
CREATE TABLE IF NOT EXISTS `sessions` (
    `id` VARCHAR(255) NOT NULL,
    `user_id` BIGINT UNSIGNED NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `payload` LONGTEXT NOT NULL,
    `last_activity` INT NOT NULL,
    PRIMARY KEY (`id`),
    KEY `sessions_user_id_index` (`user_id`),
    KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- INSERT DEFAULT ADMIN USER
-- Email: admin@gpk.mohdhilmi.com
-- Password: gpk@admin2024
-- =====================================================
INSERT INTO `users` (`name`, `email`, `password`, `role`, `phone`, `created_at`, `updated_at`) VALUES
('Admin GPK', 'admin@gpk.mohdhilmi.com', '$2y$12$ABC123HashedPasswordHerePleaseRunSeederInstead', 'admin', '0123456789', NOW(), NOW());

-- NOTA PENTING:
-- Password di atas BUKAN hash yang betul. 
-- Selepas deploy, jalankan: php artisan db:seed
-- ATAU guna command ini untuk generate password hash yang betul:
-- php artisan tinker
-- echo Hash::make('gpk@admin2024');
-- Kemudian update record user di phpMyAdmin dengan hash yang betul.
