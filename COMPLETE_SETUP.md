# 🚀 Complete Setup Guide - NoFap Recovery Platform

## Stack: Neon DB + Cloudinary + Google/GitHub OAuth + localStorage Notifications

---

## Step 1: Clone and Install (1 minute)

```bash
git clone <your-repo>
cd nofap-recovery-platform
npm install
```

---

## Step 2: Setup Neon DB (2 minutes)

### Create Neon Database

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up/login
3. Create a new project: **nofap-recovery-platform**
4. Copy the connection string

Your connection string will look like:
```
postgresql://username:password@ep-xxx.aws.neon.tech/neondb?sslmode=require
```

---

## Step 3: Setup Google OAuth (3 minutes)

### Google Cloud Console

1. Go to [https://console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project or select existing
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen (external, add app name)
6. Create OAuth Client ID:
   - Application type: **Web application**
   - Name: **NoFap Recovery Platform**
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google`
     - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy **Client ID** and **Client Secret**

---

## Step 4: Setup GitHub OAuth (2 minutes)

### GitHub OAuth App

1. Go to [https://github.com/settings/developers](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in details:
   - Application name: **NoFap Recovery Platform**
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Click **Register application**
5. Generate a new client secret
6. Copy **Client ID** and **Client Secret**

---

## Step 5: Setup Cloudinary (2 minutes)

### Cloudinary Account

1. Go to [https://cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Go to **Dashboard**
4. Copy these 3 values:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## Step 6: Create .env File (1 minute)

Create a `.env` file in the root directory:

```env
# Neon DB (from Step 2)
DATABASE_URL="postgresql://username:password@ep-xxx.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://username:password@ep-xxx.aws.neon.tech/neondb?sslmode=require"

# NextAuth (generate secret below)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Google OAuth (from Step 3)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth (from Step 4)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Cloudinary (from Step 5)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# App Settings
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Generate NEXTAUTH_SECRET:

```bash
openssl rand -base64 32
```

Copy the output to `NEXTAUTH_SECRET`

---

## Step 7: Initialize Database (2 minutes)

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to Neon DB (creates all tables)
npx prisma db push

# Seed initial data (16 achievements + 15 challenges)
npm run db:seed
```

You should see:
```
✓ Tables created in Neon DB
✓ 16 achievements seeded
✓ 15 challenges seeded
```

---

## Step 8: Run Development Server (10 seconds)

```bash
npm run dev
```

Visit: **http://localhost:3000** 🎉

---

## 🧪 Testing the Platform

### 1. Test Google OAuth
1. Click **Sign up with Google**
2. Select your Google account
3. Complete onboarding (5 steps)
4. Should land on dashboard ✅

### 2. Test GitHub OAuth
1. Click **Sign up with GitHub**
2. Authorize the app
3. Complete onboarding
4. Should land on dashboard ✅

### 3. Test Profile Picture Upload
1. Go to Profile settings
2. Upload an image (must be < 100KB)
3. Image should upload to Cloudinary
4. Should appear in dashboard ✅

### 4. Test Daily Check-In
1. Click "Daily Check-In" on dashboard
2. Complete all 5 steps
3. Should earn +10 XP ✅

### 5. Test Crisis Support
1. Click "Need Help?" button
2. Try breathing exercise
3. Log an urge
4. Check crisis resources ✅

### 6. Test Forum
1. Navigate to /forum
2. Create an anonymous post
3. Comment on a post
4. Check anonymous username ✅

---

## 📊 Verify Database

Check your Neon DB dashboard - you should see these tables:

- ✅ users
- ✅ accounts
- ✅ sessions
- ✅ daily_logs
- ✅ health_metrics
- ✅ urge_logs
- ✅ user_achievements
- ✅ user_xp
- ✅ forum_posts
- ✅ comments
- ✅ achievements
- ✅ challenges

---

## 🔧 Common Issues & Solutions

### "Can't connect to database"
```bash
# Verify Neon DB is active
# Check connection string in .env
npx prisma db push --force-reset
```

### "OAuth error"
- Check redirect URIs match exactly
- Verify CLIENT_ID and CLIENT_SECRET
- Make sure OAuth apps are enabled

### "Cloudinary upload failed"
- Verify all 3 Cloudinary credentials
- Check image size (must be < 100KB)
- Ensure image format is supported (jpg, png, webp)

### "Build errors"
```bash
rm -rf .next node_modules package-lock.json
npm install
npx prisma generate
npm run dev
```

---

## 📱 Features Overview

### ✅ Authentication (OAuth Only)
- Google Sign-In
- GitHub Sign-In
- Secure JWT sessions
- No password management needed

### ✅ Profile Management
- Cloudinary image upload (max 100KB)
- Image displayed in dashboard
- Auto-optimized delivery

### ✅ Data Storage (Neon DB)
- All user data in PostgreSQL
- Type-safe Prisma ORM
- Real-time sync
- Automatic backups

### ✅ Notifications (localStorage)
- Browser-based notifications
- No email server needed
- Personalized timing
- Offline-capable

---

## 🚀 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repo
4. Add all environment variables from `.env`
5. Update these for production:
   - `NEXTAUTH_URL=https://your-domain.vercel.app`
   - Add production callback URLs to Google/GitHub OAuth

### 3. Deploy

Click **Deploy** and wait ~2 minutes ✅

---

## 📈 What's Included

✅ **16 Achievements** (Bronze → Legendary)  
✅ **15 Challenges** (Beginner → Master)  
✅ **Google + GitHub OAuth** (no passwords)  
✅ **Neon DB** (serverless PostgreSQL)  
✅ **Cloudinary** (image optimization)  
✅ **localStorage Notifications** (no email needed)  
✅ **PWA Support** (offline capability)  
✅ **Crisis Support** (SOS + breathing exercises)  
✅ **Anonymous Forum** (safe community)  
✅ **Gamification** (XP + levels + badges)  

---

## 🎯 Next Steps

1. ✅ Platform is running locally
2. Test all features
3. Customize branding/colors
4. Deploy to Vercel
5. Share with users!

---

## 📞 Need Help?

- **Setup Issues**: Re-read this guide
- **Database**: Check Neon DB dashboard
- **OAuth**: Verify credentials
- **Cloudinary**: Check API keys

---

**Built with ❤️ for recovery and growth. You're ready to help people! 🌟**

