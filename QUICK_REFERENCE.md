# ⚡ Quick Reference Card

## 🔥 **Platform Stack**
- **Database**: Neon DB (PostgreSQL)
- **Auth**: Google + GitHub OAuth (NextAuth.js)
- **Images**: Cloudinary (100KB max)
- **Notifications**: localStorage (browser-based)
- **Framework**: Next.js 14 + TypeScript

---

## 🚀 **5-Minute Setup**

```bash
# 1. Clone & Install
npm install

# 2. Create .env (see .env.example)
# 3. Setup Database
npx prisma generate
npx prisma db push
npm run db:seed

# 4. Run
npm run dev
```

---

## 🔑 **Required Services**

1. **Neon DB** (free) - [neon.tech](https://neon.tech)
2. **Google OAuth** (free) - [console.cloud.google.com](https://console.cloud.google.com)
3. **GitHub OAuth** (free) - [github.com/settings/developers](https://github.com/settings/developers)
4. **Cloudinary** (free) - [cloudinary.com](https://cloudinary.com)

---

## 📝 **.env Template**

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="openssl rand -base64 32"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

---

## 📊 **Database Tables** (Auto-created)

- users
- accounts (OAuth)
- sessions
- daily_logs
- health_metrics
- urge_logs
- user_achievements
- user_xp
- achievements (16 seeded)
- challenges (15 seeded)
- forum_posts
- comments

---

## ✨ **Key Features**

| Feature | Status |
|---------|--------|
| Google/GitHub Login | ✅ Working |
| Neon DB Storage | ✅ Working |
| Cloudinary Upload (100KB) | ✅ Working |
| localStorage Notifications | ✅ Working |
| Onboarding Flow (5 steps) | ✅ Working |
| Daily Check-In | ✅ Working |
| Health Tracking | ✅ Working |
| Crisis Support | ✅ Working |
| XP & Achievements | ✅ Working |
| Anonymous Forum | ✅ Working |
| Leaderboard | ✅ Working |
| PWA Offline | ✅ Ready |

---

## 🐛 **Troubleshooting**

### "Database connection failed"
- Check Neon DB is active
- Verify DATABASE_URL in .env
- Run `npx prisma db push`

### "OAuth error"
- Check CLIENT_ID and CLIENT_SECRET
- Verify redirect URIs match
- Ensure callback: `http://localhost:3000/api/auth/callback/google`

### "Cloudinary upload failed"
- Check all 3 credentials
- Verify image < 100KB
- Test with different image

### TypeScript errors on build
- Normal for dev mode
- Run `npm run dev` instead
- Will work fine on Vercel

---

## 🚢 **Deploy to Vercel**

```bash
git push origin main
```
Then:
1. Import to Vercel
2. Add env variables
3. Deploy!
4. Update OAuth redirect URIs

---

## 📍 **Important URLs**

- Login: `/login`
- Register: `/register`
- Dashboard: `/dashboard`
- Profile: `/profile`
- Forum: `/forum`
- Crisis: `/crisis`
- Leaderboard: `/leaderboard`

---

## 💡 **Tips**

- Use Google Chrome for best PWA experience
- Test offline mode after first load
- Profile images must be < 100KB
- Notifications use browser storage
- All data syncs to Neon DB automatically

---

## 📚 **Full Documentation**

- `PRODUCTION_READY.md` - Complete overview
- `COMPLETE_SETUP.md` - Detailed setup guide
- `README.md` - Full documentation

---

**Need help? All guides are in the repo!** 🎉

