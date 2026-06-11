# Setup Auto-Deploy: GitHub → Sempoi Hosting

## Cara Kerja (Full Auto Pipeline)

```
Push ke main → GitHub Actions build → push ke deploy branch → SSH ke hosting → git pull → site updated
```

Setiap kali awak push code ke branch `main`, sistem akan:
1. Build Next.js di GitHub Actions (npm install + npm run build)
2. Push compiled output ke branch `deploy`
3. SSH ke Sempoi Hosting secara automatik
4. `git pull origin deploy` di server
5. `touch tmp/restart.txt` untuk trigger Passenger restart
6. Site di https://gpk.mohdhilmi.com dikemaskini

**Tiada sebarang langkah manual diperlukan selepas setup.**

---

## SETUP PERTAMA KALI (Sekali sahaja)

### Step 1: SSH ke Sempoi Hosting

Login ke hosting melalui SSH:
```bash
ssh username@gpk.mohdhilmi.com
```

Atau guna **Terminal** di cPanel.

---

### Step 2: Clone Branch `deploy` di Hosting

```bash
cd /home/mohdhilmi
git clone -b deploy https://github.com/mohdhilmi/GPKPendidikanKhas.git gpk.mohdhilmi.com
```

> **Penting**: Clone branch `deploy`, bukan `main`. Branch deploy mengandungi output
> yang sudah compiled - tiada perlu build di server.

> Jika folder tak kosong, kosongkan dulu atau clone ke temp folder dan pindah.

---

### Step 3: Setup Node.js App di cPanel

1. Login cPanel > **Setup Node.js App**
2. Klik **Create Application**
3. Isi:
   - **Node.js version**: 20.x (atau 18.x)
   - **Application mode**: Production
   - **Application root**: `gpk.mohdhilmi.com`
   - **Application URL**: `gpk.mohdhilmi.com`
   - **Application startup file**: `server.js`
4. Klik **Create**
5. Klik **Run NPM Install** (hanya install next, react, react-dom - sangat ringan)
6. Klik **Restart App**

---

### Step 4: Setup SSH Key untuk GitHub Actions

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

Copy output tu (dari `-----BEGIN` sampai `-----END`).

---

### Step 5: Tambah GitHub Secrets

Pergi ke GitHub repo: **Settings > Secrets and variables > Actions > New repository secret**

Tambah 4 secrets:

| Secret Name    | Value                                                |
|---------------|------------------------------------------------------|
| `SSH_HOST`    | IP atau hostname Sempoi (contoh: `s1.sempoihosting.com`) |
| `SSH_USERNAME`| Username cPanel (contoh: `mohdhilm`)                |
| `SSH_KEY`     | Private key dari Step 4 (full content)               |
| `SSH_PORT`    | Port SSH (biasanya `22` atau `2222`)                 |

---

### Step 6: Buat directory `tmp` di hosting (untuk Passenger restart)

```bash
cd /home/mohdhilm/gpk.mohdhilmi.com
mkdir -p tmp
```

---

### Step 7: Verify

1. Push sebarang perubahan ke `main`
2. Check tab **Actions** di GitHub repo - pastikan workflow berjaya
3. Buka https://gpk.mohdhilmi.com - pastikan perubahan terpapar

---

## SIAP!

Selepas ni, setiap kali awak:

```bash
git add .
git commit -m "update"
git push origin main
```

GitHub Actions akan auto:
1. Install dependencies dan build Next.js
2. Push compiled output ke branch `deploy`
3. SSH ke Sempoi Hosting
4. `git pull origin deploy` (tarik kod terkini)
5. `touch tmp/restart.txt` (trigger Passenger restart)

Site di https://gpk.mohdhilmi.com dikemaskini secara automatik dalam 2-3 minit.

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

Tak perlu buat apa-apa lagi di hosting. Semua auto!

---

## Manual Deploy (Jika Auto-Deploy Gagal)

Jika atas sebab tertentu GitHub Actions SSH step gagal:

```bash
# SSH ke hosting
# Pastikan nodevenv TIDAK aktif (taip: deactivate jika perlu)

cd /home/mohdhilm/gpk.mohdhilmi.com
git pull origin deploy
touch tmp/restart.txt
```

Atau di cPanel: **Setup Node.js App** > pilih app > **Restart App**

---

## Troubleshooting

### GitHub Actions fail - SSH step

1. Check **Actions** tab di GitHub repo
2. Klik workflow yang fail
3. Biasa punca:
   - SSH key salah (pastikan private key penuh, termasuk BEGIN dan END lines)
   - Port salah (check port SSH hosting, biasa 22 atau 2222)
   - Username salah (guna username cPanel)
   - Hosting firewall block GitHub Actions IPs

### GitHub Actions fail - Build step

1. Check error log di Actions tab
2. Biasa punca:
   - TypeScript error dalam source code
   - Missing environment variables (check .env.local.example)

### App tak accessible / Error 503

- Pastikan **Application startup file** di cPanel ialah `server.js`
- Check log di cPanel > Setup Node.js App > pilih app > View Log
- Cuba restart app di cPanel manually

### git pull gagal di hosting

```bash
# Set git safe directory
git config --global --add safe.directory /home/mohdhilm/gpk.mohdhilmi.com

# Jika ada conflict
cd /home/mohdhilm/gpk.mohdhilmi.com
git reset --hard origin/deploy
git pull origin deploy
```

### Permission denied (SSH)

- Pastikan public key ada dalam `~/.ssh/authorized_keys` di hosting
- Pastikan permission: `chmod 600 ~/.ssh/authorized_keys`
- Pastikan `~/.ssh` directory: `chmod 700 ~/.ssh`

---

## Nota Penting

1. **JANGAN** build di server - hosting tak mampu (CloudLinux memory/process limits)
2. Branch `deploy` dijana automatik oleh GitHub Actions - jangan edit manually
3. Semua build berlaku di GitHub Actions (tiada had resources)
4. Jika package.json berubah, mungkin perlu login cPanel sekali untuk "Run NPM Install"
5. `touch tmp/restart.txt` trigger Passenger auto-restart tanpa perlu akses cPanel
6. Jika Passenger restart tidak mencukupi, login cPanel dan klik Restart App
