# Panduan Deploy ke Sempoi Hosting (Full Auto Pipeline)

## One Stop Center GPK Pendidikan Khas
**URL**: https://gpk.mohdhilmi.com

---

## Kaedah: GitHub Actions Build + Deploy Branch + SSH Auto-Pull

Projek ini menggunakan Next.js SSR (Server-Side Rendering).
Build dilakukan **secara automatik di GitHub Actions**, kemudian output yang sudah compiled
di-push ke branch `deploy`. Selepas itu, GitHub Actions akan **SSH ke hosting secara automatik**
dan jalankan `git pull` - **tanpa sebarang langkah manual**.

### Kenapa kaedah ini?

- Sempoi Hosting (CloudLinux) ada had proses/memori - tak boleh `npm run build`
- CloudLinux NodeJS Selector guna symlink `node_modules` - tak boleh `npm install` biasa via SSH
- Solusi: Build di GitHub (tiada had), push hasil ke branch khas, SSH auto-pull ke hosting

---

## Aliran Kerja Penuh (Full Auto Pipeline)

```
Developer push ke main
        |
        v
GitHub Actions: npm install + npm run build
        |
        v
Push ke branch "deploy" (mengandungi .next/, server.js, package.json minimal)
        |
        v
GitHub Actions: SSH ke Sempoi Hosting
        |
        v
Di hosting: git pull origin deploy
        |
        v
touch tmp/restart.txt (Passenger auto-restart)
        |
        v
Site updated di https://gpk.mohdhilmi.com
```

**Tiada langkah manual diperlukan.** Push ke `main`, tunggu 2-3 minit, site dikemaskini.

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

### 3. Setup SSH Key untuk GitHub Actions

Di Sempoi Hosting, generate SSH key:
```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Ambil private key:
```bash
cat ~/.ssh/github_deploy
```

Copy output (dari `-----BEGIN` sampai `-----END`).

### 4. Tambah GitHub Secrets

Pergi ke GitHub repo: **Settings > Secrets and variables > Actions > New repository secret**

Tambah 4 secrets:

| Secret Name    | Value                                                |
|---------------|------------------------------------------------------|
| `SSH_HOST`    | IP atau hostname Sempoi (contoh: `s1.sempoihosting.com`) |
| `SSH_USERNAME`| Username cPanel (contoh: `mohdhilm`)                |
| `SSH_KEY`     | Private key dari Step 3 (full content)               |
| `SSH_PORT`    | Port SSH (biasanya `22` atau `2222`)                 |

### 5. Verify

Buka https://gpk.mohdhilmi.com - sepatutnya app berfungsi.

---

## Workflow Harian

```bash
# Di local PC:
# 1. Edit code
# 2. Commit & push
git add .
git commit -m "tambah feature baru"
git push origin main

# 3. Tunggu 2-3 minit
# 4. Check https://gpk.mohdhilmi.com - siap updated!
```

Semua berlaku secara automatik. Tiada perlu login cPanel atau SSH manual.

---

## Update Website (Manual - Jika Perlu)

Jika atas sebab tertentu auto-deploy tidak berfungsi:

```bash
# SSH ke hosting
# Pastikan nodevenv TIDAK aktif (taip: deactivate jika perlu)

cd /home/mohdhilm/gpk.mohdhilmi.com
git pull origin deploy
```

Kemudian di cPanel:
1. **Setup Node.js App** > pilih app
2. Klik **Run NPM Install** (jika package.json berubah)
3. Klik **Restart App**

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

### SSH deploy step gagal di GitHub Actions

- Check SSH key betul (perlu private key penuh dalam secret)
- Check port SSH betul (biasa 22 atau 2222)
- Check username betul
- Check hosting firewall tidak block GitHub Actions IPs
- Lihat error log di tab Actions di GitHub repo

---

## Kelebihan Kaedah Ini

- **Fully automatic** - push sahaja, semua berlaku sendiri
- Tiada build di server (elak EAGAIN spawn error)
- Tiada install banyak devDependencies di server
- Package.json minimal - hanya 3 runtime deps (next, react, react-dom)
- Sesuai untuk shared hosting dengan had proses/memori/inode
- Build penuh dilakukan di GitHub Actions (tiada had resources)
- SSH auto-pull menghapuskan keperluan login manual ke hosting

---

## Nota Penting

1. **JANGAN** build di server - hosting tak mampu (EAGAIN error)
2. Branch `deploy` dijana automatik oleh GitHub Actions - jangan edit manually
3. Deactivate nodevenv sebelum jalankan git commands via SSH (untuk manual sahaja)
4. Jika package.json berubah, mungkin perlu login cPanel untuk "Run NPM Install" sekali
5. `touch tmp/restart.txt` digunakan untuk trigger Passenger restart secara automatik
6. Jika Passenger restart tidak mencukupi, login cPanel dan klik Restart App
