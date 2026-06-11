# Panduan Deploy ke Sempoi Hosting

## One Stop Center GPK Pendidikan Khas
**URL**: https://gpk.mohdhilmi.com

---

## Prasyarat

- Akaun Sempoi Hosting dengan sokongan Node.js
- Subdomain `gpk.mohdhilmi.com` sudah dibuat
- Akses SSH atau Terminal di cPanel

---

## Langkah 1: Setup Supabase

1. Pergi ke [supabase.com](https://supabase.com) dan buat projek baru
2. Buka **SQL Editor** dan jalankan semua SQL dari file `supabase-schema.sql`
3. Buat **Storage Buckets**:
   - `documents` (Private)
   - `images` (Public)
   - `certificates` (Private)
4. Buat user di **Authentication > Users > Add User**:
   - Email: `admin@gpk.mohdhilmi.com`
   - Password: (pilih sendiri)
5. Catat **Project URL** dan **Anon Key** dari Settings > API

---

## Langkah 2: Upload Files ke Hosting

### Cara A: Git Clone (Recommended jika ada SSH)

```bash
cd /home/mohdhilmi/gpk.mohdhilmi.com
git clone https://github.com/mohdhilmi/GPKPendidikanKhas.git .
```

### Cara B: Upload Manual

1. Download zip dari GitHub
2. Upload melalui File Manager cPanel
3. Extract ke folder subdomain `/home/mohdhilmi/gpk.mohdhilmi.com/`

---

## Langkah 3: Setup Environment Variables

Buat file `.env.local` di root folder:

```bash
cd /home/mohdhilmi/gpk.mohdhilmi.com
nano .env.local
```

Isi dengan:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Langkah 4: Install Dependencies & Build

SSH ke hosting dan jalankan:

```bash
cd /home/mohdhilmi/gpk.mohdhilmi.com

# Pastikan Node.js version 18+
node -v

# Install dependencies
npm install

# Build production
npm run build
```

---

## Langkah 5: Start Application

### Menggunakan PM2 (Recommended)

```bash
# Install PM2 globally (jika belum ada)
npm install -g pm2

# Start app menggunakan ecosystem config
pm2 start ecosystem.config.js

# Pastikan app auto-start selepas server reboot
pm2 save
pm2 startup
```

### Menggunakan Node.js App Setup di cPanel

Jika Sempoi Hosting ada **Setup Node.js App** di cPanel:

1. Buka cPanel > **Setup Node.js App**
2. Klik **Create Application**
3. Isi:
   - **Node.js version**: 18 atau lebih tinggi
   - **Application mode**: Production
   - **Application root**: `/home/mohdhilmi/gpk.mohdhilmi.com`
   - **Application URL**: `gpk.mohdhilmi.com`
   - **Application startup file**: `node_modules/.bin/next`
4. Klik **Create**
5. Kemudian klik **Run NPM Install**
6. Kemudian klik **Run Script** > `build`
7. Start application

---

## Langkah 6: Configure Domain (jika perlu)

Jika subdomain belum point ke Node.js app, tambah `.htaccess` di root:

```apache
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
```

**ATAU** jika cPanel Node.js App sudah auto-configure, langkah ini tidak perlu.

---

## Langkah 7: Verify

1. Buka `https://gpk.mohdhilmi.com`
2. Login page sepatutnya muncul
3. Klik "Masuk Demo (Tanpa Supabase)" untuk test tanpa database
4. Atau login dengan email yang dibuat di Supabase

---

## Pengurusan

### Check Status App

```bash
pm2 status
pm2 logs gpk-pendidikan-khas
```

### Restart App

```bash
pm2 restart gpk-pendidikan-khas
```

### Update Code

```bash
cd /home/mohdhilmi/gpk.mohdhilmi.com
git pull origin main
npm install
npm run build
pm2 restart gpk-pendidikan-khas
```

---

## Troubleshooting

### App tak start

```bash
# Check logs
pm2 logs gpk-pendidikan-khas --lines 50

# Check port
netstat -tlnp | grep 3000
```

### Error: Module not found

```bash
rm -rf node_modules
npm install
npm run build
```

### 502 Bad Gateway

- Pastikan app sudah running (`pm2 status`)
- Pastikan port dalam `.htaccess` sama dengan port app (3000)
- Check jika cPanel Node.js App panel ada, guna tu instead of manual PM2

### Permission Error

```bash
chmod -R 755 /home/mohdhilmi/gpk.mohdhilmi.com
chmod -R 755 .next/
```

---

## Struktur Folder di Hosting

```
/home/mohdhilmi/gpk.mohdhilmi.com/
├── .env.local              ← Environment variables
├── .next/                  ← Build output (auto-generated)
├── ecosystem.config.js     ← PM2 config
├── next.config.js
├── package.json
├── node_modules/           ← Dependencies
├── src/
│   ├── app/               ← Pages
│   ├── components/        ← Shared components
│   ├── lib/               ← Supabase client
│   └── types/             ← TypeScript types
├── supabase-schema.sql    ← Database setup
└── DEPLOY.md              ← This file
```

---

## Nota Penting

1. **Jangan upload `node_modules/`** ke git - ia akan di-install di server
2. **Jangan commit `.env.local`** - ia mengandungi keys
3. **Build perlu dijalankan di server** selepas setiap code update
4. Pastikan Node.js **version 18+** di hosting
5. Jika guna cPanel Node.js App, ikut arahan panel tersebut

---

## Support

Jika ada masalah deployment:
1. Check `pm2 logs` untuk error details
2. Pastikan semua environment variables betul
3. Pastikan `npm run build` berjaya tanpa error
4. Contact Sempoi Hosting support jika masalah berkaitan server
