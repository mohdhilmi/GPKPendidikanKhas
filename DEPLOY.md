# Panduan Deploy ke Sempoi Hosting (Pilihan A - Pre-built)

## One Stop Center GPK Pendidikan Khas
**URL**: https://gpk.mohdhilmi.com

---

## Kaedah: GitHub Actions Build + Deploy Branch

Projek ini menggunakan Next.js SSR (Server-Side Rendering).
Build dilakukan **secara automatik di GitHub Actions**, kemudian output yang sudah compiled
di-push ke branch `deploy`. Hosting hanya perlu `git pull` dan restart - **tanpa build di server**.

### Kenapa kaedah ini?

- Sempoi Hosting (CloudLinux) ada had proses/memori - tak boleh `npm run build`
- CloudLinux NodeJS Selector guna symlink `node_modules` - tak boleh `npm install` biasa via SSH
- Solusi: Build di GitHub (tiada had), push hasil ke branch khas, hosting tarik sahaja

---

## Aliran Kerja (Workflow)

```
Push ke main/feat/nextjs-rebuild
        |
        v
GitHub Actions: npm install + npm run build
        |
        v
Push ke branch "deploy" (mengandungi .next/, server.js, package.json minimal)
        |
        v
Di hosting: git pull origin deploy + cPanel "Run NPM Install" + Restart App
```

---

## Setup Pertama Kali (Di Hosting)

### 1. Clone branch deploy

```bash
# SSH ke hosting (pastikan nodevenv TIDAK aktif)
# Jika ada (nenv) di prompt, taip: deactivate

cd /home/mohdhilmi
git clone -b deploy https://github.com/mohdhilmi/GPKPendidikanKhas.git gpk.mohdhilmi.com
```

### 2. Setup Node.js App di cPanel

1. Login cPanel > **Setup Node.js App**
2. Klik **Create Application**
3. Isi:
   - **Node.js version**: 20.x (atau 18.x)
   - **Application mode**: Production
   - **Application root**: `gpk.mohdhilmi.com`
   - **Application URL**: `gpk.mohdhilmi.com`
   - **Application startup file**: `server.js`
4. Klik **Create**
5. Klik **Run NPM Install** (install only next, react, react-dom - sangat ringan)
6. Klik **Restart App**

### 3. Verify

Buka https://gpk.mohdhilmi.com - sepatutnya app berfungsi.

---

## Update Website (Selepas Push Kod Baru)

### Automatik (jika SSH secrets ada di GitHub)

Boleh tambah step SSH di workflow untuk auto-pull. Lihat bahagian "Auto Deploy via SSH" di bawah.

### Manual (disyorkan untuk permulaan)

```bash
# SSH ke hosting
# Pastikan nodevenv TIDAK aktif (taip: deactivate jika perlu)

cd /home/mohdhilmi/gpk.mohdhilmi.com
git pull origin deploy
```

Kemudian di cPanel:
1. **Setup Node.js App** > pilih app
2. Klik **Run NPM Install** (jika package.json berubah)
3. Klik **Restart App**

---

## Auto Deploy via SSH (Opsional)

Jika mahu deploy automatik selepas build, tambah secrets di GitHub repo:

1. Pergi ke GitHub > Settings > Secrets and variables > Actions
2. Tambah secrets:
   - `SSH_HOST`: hostname/IP Sempoi Hosting
   - `SSH_USERNAME`: username cPanel
   - `SSH_KEY`: private key SSH (jana di cPanel > SSH Access)
   - `SSH_PORT`: port SSH (biasa 22)

Kemudian workflow akan secara automatik SSH ke server dan jalankan `git pull`.

**Nota**: Restart app masih perlu dilakukan melalui cPanel panel kerana CloudLinux
tidak benarkan restart app melalui SSH biasa.

---

## Struktur Branch `deploy`

Branch `deploy` mengandungi hanya fail runtime yang diperlukan:

```
deploy branch/
├── .next/              <- Compiled Next.js output (pages, chunks, dll)
├── public/             <- Static assets (jika ada)
├── server.js           <- Node.js startup file untuk cPanel
├── next.config.js      <- Next.js configuration
├── .htaccess           <- Reverse proxy ke Node.js app
├── package.json        <- Minimal (hanya next, react, react-dom)
└── .gitignore          <- Tidak ignore .next/ folder
```

**Tiada** dalam branch deploy:
- `src/` (source code - sudah compiled dalam .next/)
- `node_modules/` (di-install oleh cPanel)
- `tailwind.config.ts` (build tool sahaja)
- `tsconfig.json` (build tool sahaja)
- `postcss.config.js` (build tool sahaja)

---

## Troubleshooting

### App tidak start / Error 503

- Pastikan **Application startup file** di cPanel ialah `server.js`
- Pastikan port dalam server.js sepadan dengan cPanel config
- Check log di cPanel > Setup Node.js App > pilih app > View Log

### "Run NPM Install" gagal

- Package.json dalam branch deploy sangat ringan (3 dependencies sahaja)
- Jika masih gagal, mungkin disk quota penuh
- Check disk usage di cPanel > Disk Usage

### Halaman 404 / routing tidak berfungsi

- Pastikan `.htaccess` ada di root aplikasi
- Pastikan `mod_proxy` aktif di hosting
- Jika guna subdomain, pastikan document root point ke folder yang betul

### git pull gagal

- Pastikan `deactivate` nodevenv sebelum git commands
- Jika `node_modules` symlink menghalang: `unlink node_modules` kemudian git pull, 
  kemudian cPanel "Run NPM Install" untuk cipta semula symlink

---

## Kelebihan Kaedah Ini

- Tiada build di server (elak EAGAIN spawn error)
- Tiada install banyak devDependencies di server
- Package.json minimal - hanya 3 runtime deps (next, react, react-dom)
- Sesuai untuk shared hosting dengan had proses/memori/inode
- Build penuh dilakukan di GitHub Actions (tiada had resources)
- Workflow automatik - push sahaja, GitHub Actions buat kerja

---

## Nota Penting

1. **JANGAN** build di server - hosting tak mampu (EAGAIN error)
2. Branch `deploy` dijana automatik oleh GitHub Actions - jangan edit manually
3. Deactivate nodevenv sebelum jalankan git commands via SSH
4. Guna cPanel panel sahaja untuk npm install dan restart
5. Jika package.json tidak berubah, tidak perlu "Run NPM Install" - restart sahaja sudah cukup
