#!/bin/bash
# =====================================================
# Deploy Script - GPK Pendidikan Khas
# Run this script on Sempoi Hosting via SSH
# =====================================================

echo "🚀 Deploying GPK Pendidikan Khas..."

# Navigate to app directory
cd /home/$(whoami)/gpk.mohdhilmi.com || exit 1

# Pull latest code from GitHub
echo "📥 Pulling latest code..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install --production

# Build the app
echo "🔨 Building production..."
npm run build

# Restart PM2
echo "♻️ Restarting app..."
pm2 restart gpk-pendidikan-khas 2>/dev/null || pm2 start ecosystem.config.js

echo "✅ Deploy complete! App running at https://gpk.mohdhilmi.com"
pm2 status
