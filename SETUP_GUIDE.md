# NoFap Recovery Platform - Complete Setup Guide

## 🚀 Quick Start

This guide will help you get the NoFap Recovery Platform up and running.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon DB recommended)
- Google Cloud Console account (for OAuth)
- Cloudinary account (for image uploads)

## 1. Clone and Install

```bash
git clone <your-repo-url>
cd nofap-recovery-platform
npm install
```

## 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Database (Neon DB)
DATABASE_URL="postgresql://username:password@host.neon.tech/nofap_recovery?sslmode=require"
DIRECT_URL="postgresql://username:password@host.neon.tech/nofap_recovery?sslmode=require"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"  # Generate with: openssl rand -base64 32

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Optional: Email (for password reset)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@recoveryplatform.com"

# Optional: Push Notifications
NEXT_PUBLIC_VAPID_PUBLIC_KEY="your-vapid-public-key"
VAPID_PRIVATE_KEY="your-vapid-private-key"
VAPID_SUBJECT="mailto:admin@recoveryplatform.com"
```

## 3. Database Setup

### Get Neon DB Connection String

1. Go to [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it to your `.env` file

### Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed initial data (achievements, challenges)
npm run db:seed
```

## 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Navigate to "APIs & Services" > "Credentials"
4. Click "Create Credentials" > "OAuth 2.0 Client ID"
5. Configure consent screen
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy Client ID and Client Secret to `.env`

## 5. Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Add to `.env`
5. (Optional) Enable automatic moderation in Settings > Security

## 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 7. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
nofap-recovery-platform/
├── app/                      # Next.js 14 app directory
│   ├── (auth)/              # Authentication routes
│   ├── (dashboard)/         # Dashboard routes
│   ├── (community)/         # Forum & community
│   ├── api/                 # API routes
│   └── onboarding/          # Onboarding flow
├── components/
│   ├── dashboard/           # Dashboard components
│   ├── gamification/        # XP, achievements, badges
│   ├── crisis/              # Crisis support components
│   ├── motivation/          # Motivation system
│   └── ui/                  # Shadcn UI components
├── lib/                     # Utilities & configs
├── prisma/                  # Database schema & migrations
├── services/                # Business logic
├── store/                   # Zustand state management
└── types/                   # TypeScript types
```

## 🔑 Key Features Implemented

### ✅ Authentication & Onboarding
- Email/password authentication
- Google OAuth integration
- Comprehensive onboarding flow
- Relationship status-based personalization
- Notification preferences

### ✅ Dashboard
- Real-time streak counter
- Year-long heatmap calendar
- Quick action buttons
- XP and level system
- Daily motivation cards

### ✅ Daily Check-In System
- Mood, energy, sleep quality tracking
- Urge intensity logging
- Trigger identification
- Activity completion tracking
- Automatic XP rewards

### ✅ Health Tracking
- Exercise logging
- Sleep tracking
- Steps counter
- Social interaction ratings
- Meditation minutes
- Water intake

### ✅ Crisis Management
- SOS button
- Urge logger
- Breathing exercises
- Coping strategies
- Emergency contacts
- Pattern analysis

### ✅ Gamification
- XP system with levels
- Achievement unlocking
- Milestone celebrations
- Animated rewards
- Tiered badges (Bronze → Legendary)

### ✅ Community Features
- Anonymous forum posts
- Topic-based discussions
- Upvote/downvote system
- Comment threads
- No private messaging

### ✅ Leaderboard
- Weekly/monthly/all-time rankings
- Privacy settings
- Partial name anonymization

### ✅ PWA Support
- Offline functionality
- Cached API responses
- Install prompt
- Service worker caching
- Mobile-optimized

### ✅ Smart Motivation System
- Relationship status-based messages
- Time-of-day awareness
- Contextual encouragement
- Automatic popup timing

## 🗄️ Database Schema

The platform uses PostgreSQL with Prisma ORM. Key tables:

- **users** - User profiles with streak & XP tracking
- **daily_logs** - Daily check-ins with mood/energy/urges
- **health_metrics** - Fitness, sleep, social interaction data
- **urge_logs** - Urge tracking with triggers & coping strategies
- **user_achievements** - Unlocked achievements
- **user_xp** - XP history and activity log
- **forum_posts** - Community posts with anonymous usernames
- **notifications** - In-app notification system

## 📱 PWA Installation

The app can be installed as a Progressive Web App:

1. Visit site on mobile or desktop
2. Look for "Install" prompt
3. Add to home screen
4. Works offline with cached data

## 🔧 Troubleshooting

### Database connection issues
```bash
# Reset database
npm run db:push -- --force-reset

# Regenerate Prisma client
npm run db:generate
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### OAuth not working
- Check redirect URIs in Google Console
- Verify `NEXTAUTH_URL` matches your domain
- Regenerate `NEXTAUTH_SECRET`

## 🚀 Deployment

### Recommended: Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy!

### Alternative: Docker

```bash
docker build -t recovery-platform .
docker run -p 3000:3000 recovery-platform
```

## 📊 Analytics & Monitoring

The platform tracks:
- User engagement metrics
- Streak statistics
- Forum activity
- Health tracking compliance
- Achievement unlock rates

## 🔐 Security Features

- Secure password hashing (bcrypt)
- JWT-based sessions
- CSRF protection
- Content moderation (Cloudinary AI)
- XSS prevention
- SQL injection protection (Prisma)

## 📈 Performance Optimizations

- Server-side rendering (SSR)
- Image optimization (Next.js Image)
- Code splitting
- API route caching
- Database indexing
- CDN delivery (Cloudinary)

## 🤝 Contributing

See CONTRIBUTING.md for guidelines.

## 📄 License

MIT License - See LICENSE file

## 🆘 Support

- Documentation: `/docs`
- Issues: GitHub Issues
- Community: Forum within app

---

**Built with ❤️ for recovery and personal growth**

