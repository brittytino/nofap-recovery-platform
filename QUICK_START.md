# ⚡ Quick Start Guide

Get the NoFap Recovery Platform running in 5 minutes!

## Step 1: Install Dependencies (30 seconds)

```bash
npm install
```

## Step 2: Setup Environment (2 minutes)

Create `.env` file in root directory:

```env
# Minimum required for local development

# Database (Get free from neon.tech)
DATABASE_URL="postgresql://user:pass@host.neon.tech/dbname?sslmode=require"
DIRECT_URL="postgresql://user:pass@host.neon.tech/dbname?sslmode=require"

# Auth (Generate secret)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"

# Google OAuth (Get from console.cloud.google.com)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Cloudinary (Get free from cloudinary.com)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

### Quick Setup Links:
- **Neon DB**: https://neon.tech (Free tier - 0.5GB)
- **Google OAuth**: https://console.cloud.google.com (Free)
- **Cloudinary**: https://cloudinary.com (Free tier - 25GB)

## Step 3: Initialize Database (1 minute)

```bash
# Generate Prisma Client
npx prisma generate

# Create tables in database
npx prisma db push

# Seed achievements and challenges
npm run db:seed
```

## Step 4: Run Development Server (10 seconds)

```bash
npm run dev
```

Visit: **http://localhost:3000** 🎉

---

## 🎯 First Steps After Launch

1. **Register** with email or Google
2. **Complete onboarding** (5 steps)
3. **Do first check-in** → Earn 10 XP
4. **Explore dashboard** → See your streak
5. **Test SOS button** → Try crisis support

---

## 🔧 Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL is correct
- Ensure Neon DB project is active
- Run `npx prisma db push` again

### "OAuth error"
- Add `http://localhost:3000/api/auth/callback/google` to Google OAuth redirect URIs
- Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET

### "Cloudinary upload failed"
- Verify cloud name, API key, and secret
- Check Cloudinary dashboard is accessible

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
npx prisma generate
```

---

## 📚 Next Steps

- Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
- See [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for all features
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) to go live

---

## ⚙️ Development Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:push         # Update database schema
npm run db:seed         # Seed achievements/challenges
npm run db:generate     # Generate Prisma Client

# Code Quality
npm run lint            # Run ESLint
```

---

## 🎨 Test Features

### Test Daily Check-In
1. Click "Daily Check-In" button
2. Complete 5 steps
3. Earn 10 XP ✨

### Test Crisis Support
1. Click "Need Help?" button
2. Try breathing exercise
3. View coping strategies

### Test Forum
1. Navigate to /forum
2. Create anonymous post
3. Upvote and comment

### Test Achievements
1. Complete activities
2. Check /achievements
3. Watch celebration animations 🎉

---

## 🚀 Ready to Deploy?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for one-click Vercel deployment!

---

**Happy building! Your recovery platform is ready to help people. 💪✨**

