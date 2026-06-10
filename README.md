# GPK Pendidikan Khas

One Stop Center GPK Pendidikan Khas - Portal pengurusan untuk Guru Pendidikan Khas.

**URL**: [https://gpk.mohdhilmi.com](https://gpk.mohdhilmi.com)

---

## Modul

| Modul | Fungsi |
|-------|--------|
| Dashboard | Overview statistik murid, pengumuman terkini |
| Pengurusan Murid | CRUD murid pendidikan khas (profil, kategori OKU, penjaga) |
| Bahan Bantu Mengajar | Upload/download resources (PDF, dokumen, video link) |
| Portal Maklumat | Pengumuman, pekeliling, panduan untuk GPK |

---

## Tech Stack

- **Framework**: Laravel 10 (PHP 8.1+)
- **Database**: MySQL
- **Frontend**: Bootstrap 5 + Bootstrap Icons (CDN)
- **Hosting**: Shared Hosting (Sempoi Hosting)
- **Domain**: gpk.mohdhilmi.com

---

## Login Akaun

| Field | Value |
|-------|-------|
| Email | `admin@gpk.mohdhilmi.com` |
| Password | `gpk@admin2024` |

> **PENTING**: Tukar password selepas login pertama kali!

---

## Deployment ke Shared Hosting

### Langkah 1: Buat Database MySQL

1. Login cPanel shared hosting
2. Buka **MySQL Databases**
3. Buat database baru: `gpk_pendidikan_khas`
4. Buat user baru dan assign ke database (All Privileges)
5. Import file `database/database.sql` melalui **phpMyAdmin**

### Langkah 2: Upload Files

1. Zip semua files projek
2. Upload ke shared hosting melalui **File Manager** atau **FTP**
3. Extract ke folder subdomain `gpk.mohdhilmi.com`

**Struktur folder di hosting:**
```
/home/username/gpk.mohdhilmi.com/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/       ← Document Root (point subdomain ke sini)
├── resources/
├── routes/
├── storage/
├── vendor/       ← Perlu install composer
├── .env
├── artisan
└── composer.json
```

### Langkah 3: Setup Document Root

Di cPanel > **Subdomains**, pastikan Document Root untuk `gpk.mohdhilmi.com` diarahkan ke folder `public`:

```
/home/username/gpk.mohdhilmi.com/public
```

**ATAU** jika tak boleh tukar Document Root, guna `.htaccess` di root:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>
```

### Langkah 4: Install Dependencies

SSH ke hosting (jika ada akses) atau gunakan Terminal di cPanel:

```bash
cd /home/username/gpk.mohdhilmi.com
composer install --no-dev --optimize-autoloader
```

Jika tiada akses SSH:
1. Install composer dependencies di local PC
2. Upload folder `vendor/` bersama files lain

### Langkah 5: Configure Environment

1. Copy `.env.example` ke `.env`
2. Edit `.env` dengan maklumat database:

```env
APP_NAME="GPK Pendidikan Khas"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://gpk.mohdhilmi.com

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=gpk_pendidikan_khas
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
```

3. Generate application key:

```bash
php artisan key:generate
```

### Langkah 6: Setup Storage & Permissions

```bash
php artisan storage:link
chmod -R 775 storage/
chmod -R 775 bootstrap/cache/
```

Buat folder upload:
```bash
mkdir -p public/uploads/students
mkdir -p public/uploads/resources
mkdir -p public/uploads/announcements
```

### Langkah 7: Seed Admin User

```bash
php artisan db:seed
```

Atau import `database/database.sql` dan kemudian update password hash melalui:
```bash
php artisan tinker
>>> \App\Models\User::first()->update(['password' => bcrypt('gpk@admin2024')]);
```

### Langkah 8: Setup DNS (Jika belum)

Di Sempoi Hosting DNS management, tambah:

| Type | Name | Value |
|------|------|-------|
| A | gpk | IP server hosting |

---

## Troubleshooting

### 500 Internal Server Error
- Pastikan `storage/` dan `bootstrap/cache/` boleh ditulis (chmod 775)
- Pastikan `.env` ada dan APP_KEY sudah di-set
- Check `storage/logs/laravel.log` untuk error details

### Halaman Kosong / Blank Page
- Pastikan Document Root point ke folder `public/`
- Pastikan mod_rewrite enabled

### Cannot Upload Files
- Pastikan folder `public/uploads/` wujud dan boleh ditulis
- Check PHP `upload_max_filesize` di hosting (minimum 10MB)

---

## Development

```bash
# Clone repo
git clone https://github.com/mohdhilmi/GPKPendidikanKhas.git
cd GPKPendidikanKhas

# Install dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Setup database
php artisan migrate
php artisan db:seed

# Run local server
php artisan serve
```

---

## License

MIT
