# Setup Auto-Deploy: GitHub → Sempoi Hosting

## Cara Kerja

```
Push ke GitHub (main) → GitHub Actions → SSH ke Sempoi → git pull + build + restart
```

Setiap kali awak push code ke branch `main`, sistem akan auto-deploy ke Sempoi Hosting.

---

## SETUP PERTAMA KALI (Sekali sahaja)

### Step 1: SSH ke Sempoi Hosting

Login ke hosting melalui SSH:
```bash
ssh username@gpk.mohdhilmi.com
```

Atau guna **Terminal** di cPanel.

---

### Step 2: Clone Repo di Hosting

```bash
cd /home/$(whoami)/gpk.mohdhilmi.com
git clone https://github.com/mohdhilmi/GPKPendidikanKhas.git .
```

> Jika folder tak kosong, kosongkan dulu atau clone ke temp folder dan pindah.

---

### Step 3: Buat `.env.local`

```bash
nano .env.local
```

Isi:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Simpan: `Ctrl+X` → `Y` → `Enter`

---

### Step 4: Install & Build

```bash
npm install
npm run build
```

---

### Step 5: Start dengan PM2

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start ecosystem.config.js

# Auto-start on reboot
pm2 save
pm2 startup
```

---

### Step 6: Setup SSH Key untuk GitHub Actions

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

### Step 7: Tambah GitHub Secrets

Pergi ke GitHub repo: **Settings → Secrets and variables → Actions → New repository secret**

Tambah 4 secrets:

| Secret Name | Value |
|------------|-------|
| `SSH_HOST` | IP atau hostname Sempoi (contoh: `s1.sempoihosting.com`) |
| `SSH_USERNAME` | Username cPanel (contoh: `mohdhilmi`) |
| `SSH_KEY` | Private key dari Step 6 (full content) |
| `SSH_PORT` | Port SSH (biasanya `22` atau `2222`) |

---

## SIAP! 🎉

Selepas ni, setiap kali awak:

```bash
git add .
git commit -m "update"
git push origin main
```

GitHub Actions akan auto:
1. SSH ke Sempoi Hosting
2. `git pull` code terbaru
3. `npm install` dependencies
4. `npm run build` production
5. `pm2 restart` app

---

## Manual Deploy (Tanpa GitHub Actions)

Jika nak deploy manual, SSH ke hosting dan run:

```bash
cd /home/$(whoami)/gpk.mohdhilmi.com
bash deploy.sh
```

---

## Troubleshooting

### GitHub Actions fail

1. Check **Actions** tab di GitHub repo
2. Klik workflow yang fail
3. Baca error log
4. Biasanya: SSH key salah, port salah, atau path salah

### App tak accessible

```bash
# Check app status
pm2 status
pm2 logs gpk-pendidikan-khas

# Check port
curl http://localhost:3000
```

### Permission denied (git pull)

```bash
# Set git safe directory
git config --global --add safe.directory /home/$(whoami)/gpk.mohdhilmi.com
```

### npm run build error

```bash
# Check Node.js version (perlu 18+)
node -v

# Clear cache dan rebuild
rm -rf .next node_modules
npm install
npm run build
```

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

Tak perlu buat apa-apa lagi di hosting. Semua auto! 🚀
