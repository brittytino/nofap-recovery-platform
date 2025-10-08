# 🌟 NoFap/NoPorn Recovery Platform

A comprehensive, privacy-focused recovery platform designed to support individuals on their journey to better mental and physical health. Built with modern web technologies and focused on gamification, community support, and personal growth.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.7-teal)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-green)

## ✨ Features

### 🔐 Authentication & Security
- **Email/Password** - Secure credential-based registration and login
- **Google OAuth** - One-click sign-in with Google
- **GitHub OAuth** - Developer-friendly authentication
- **NextAuth.js v5** - Industry-standard session management
- **bcrypt Hashing** - Military-grade password encryption (12 rounds)
- **JWT Sessions** - Secure, stateless authentication
- **Email Verification** - Verify email addresses
- **Password Reset** - Secure password recovery flow

📘 [Complete Authentication Guide](./AUTHENTICATION.md)

### 🎯 Comprehensive Onboarding
- Initial recovery assessment
- Goal setting and motivation tracking
- Relationship status personalization
- Notification preference configuration
- Personalized recovery plan creation

### 📊 Personalized Dashboard
- **Real-time Streak Counter** - Track your progress day by day
- **Year-Long Heatmap Calendar** - Visual representation of your journey
- **XP & Level System** - Gamified progress tracking
- **Daily Motivation Cards** - Contextual encouragement based on your profile
- **Quick Action Buttons** - Easy access to all features

### ✅ Daily Check-In System
- Mood rating (1-10 scale)
- Energy level tracking
- Sleep quality monitoring
- Confidence level assessment
- Urge intensity logging
- Trigger identification
- Activity completion tracking
- Automatic XP rewards

### 💪 Health Tracking
- Exercise logging with type and duration
- Sleep hours and quality ratings
- Step counter integration
- Social interaction tracking
- Meditation minutes
- Water intake monitoring
- Weight tracking
- Comprehensive analytics and trends

### 🆘 Crisis Management
- **SOS Button** - Immediate access to help
- **Urge Logger** - Track and understand urge patterns
- **Breathing Exercises** - Guided box breathing technique
- **Coping Strategies** - 8+ proven strategies to resist urges
- **Emergency Contacts** - Quick access to helplines
- **Pattern Recognition** - AI-powered trigger analysis

### 🏆 Gamification System
- **XP System** - Earn points for every positive action
- **Level Progression** - Visual representation of growth
- **Achievement System** - 16+ unlockable achievements
- **Tiered Badges** - Bronze → Silver → Gold → Diamond → Legendary
- **Milestone Celebrations** - Animated rewards with confetti
- **Daily Challenges** - Personalized tasks based on your tier

### 👥 Community Features
- **Anonymous Forum** - Share experiences safely
- **Auto-generated Usernames** - BraveWarrior123 style
- **Topic-Based Discussions** - Organized categories
- **Upvote/Downvote System** - Community-driven content
- **Comment Threads** - Supportive discussions
- **No Private Messaging** - Maintains healthy boundaries
- **Success Stories** - Inspiration from others

### 🏅 Leaderboard System
- Weekly, monthly, and all-time rankings
- Privacy settings (opt-in/opt-out)
- Partial name anonymization
- Streak-based ranking
- XP-based ranking
- Level display

### 📱 Progressive Web App (PWA)
- **Offline Functionality** - Access core features without internet
- **Install Prompt** - Add to home screen
- **Service Worker Caching** - Fast loading and offline data
- **Background Sync** - Sync when connection returns
- **Push Notifications** - Timely reminders and motivation

### 🔔 Smart Notification System
- **Morning Motivation** - Start your day right (customizable time)
- **Mid-Day Check-In** - Stay on track (customizable time)
- **Evening Reflection** - End-of-day review (customizable time)
- **Milestone Alerts** - Celebrate achievements
- **Urge Support** - Get help when you need it
- **Relationship-Based Messaging** - Tailored to your status

### 🖼️ Media Management
- **Cloudinary Integration** - Optimized image delivery
- **AI Content Moderation** - Automatic inappropriate content detection
- **Profile Pictures** - Upload and manage avatars
- **Responsive Images** - Auto-optimization for all devices

### 📈 Analytics & Insights
- Mood vs. Streak correlation
- Energy level trends
- Sleep quality analysis
- Trigger pattern recognition
- Success rate tracking
- Progress visualization

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Beautiful UI components
- **Framer Motion** - Smooth animations
- **Recharts** - Data visualization
- **date-fns** - Date manipulation

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma ORM** - Type-safe database access
- **NextAuth.js** - Authentication
- **Neon DB** - Serverless PostgreSQL

### Infrastructure
- **Vercel** - Deployment platform
- **Cloudinary** - Media management
- **Google OAuth** - Social authentication
- **Service Workers** - PWA functionality

## 📦 Installation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed installation instructions.

### Quick Start

```bash
# 1. Clone repository
git clone <your-repo>
cd nofap-recovery-platform

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Edit .env with your credentials (see ENV_SETUP.md)

# 4. Initialize database
npm run db:generate  # Generate Prisma Client
npm run db:push      # Push schema to database
npm run db:seed      # Seed initial data (achievements, challenges, categories)

# 5. Run development server
npm run dev
```

Visit `http://localhost:3000`

### First User Account

1. Click "Sign Up" on homepage
2. Choose authentication method:
   - **Email/Password** - Create account with email
   - **Google** - One-click sign-in
   - **GitHub** - Developer authentication
3. Complete onboarding process
4. Start your recovery journey!

## 🗄️ Database Schema

The platform uses **PostgreSQL** (via Neon DB) with **Prisma ORM** for type-safe database operations.

### Core Models (20+ Tables)

**Authentication:**
- `User` - User profiles, streak data, XP, privacy settings
- `Account` - OAuth provider accounts (Google, GitHub)
- `Session` - Active user sessions
- `VerificationToken` - Email verification

**Progress Tracking:**
- `DailyLog` - Daily check-ins, mood, energy, urges
- `StreakShare` - Social media milestone shares
- `HealthMetric` - Comprehensive wellness tracking

**Crisis Management:**
- `UrgeLog` - Urge intensity, triggers, pattern analysis

**Gamification:**
- `Achievement` - **21 unlockable badges** (Bronze → Diamond)
- `UserAchievement` - User's earned achievements
- `UserXPLog` - XP earning history
- `DailyChallenge` - **27 challenges** across 6 categories
- `UserDailyChallenge` - Challenge progress

**Community Forum:**
- `ForumCategory` - **10 topic-based categories**
- `ForumPost` - Anonymous discussions with images
- `ForumComment` - Nested comment threads
- `PostUpvote` / `CommentUpvote` - Voting system

**Notifications:**
- `Notification` - In-app and push notifications

### Seeded Data

The database comes pre-populated with:
- ✅ **21 Achievements** - From "First Step" to "Year of Transformation"
- ✅ **27 Daily Challenges** - Across FITNESS, MENTAL_HEALTH, SOCIAL, PRODUCTIVITY, CREATIVITY, SELF_CARE
- ✅ **10 Forum Categories** - Getting Started, Success Stories, Urge Management, etc.

📘 [Complete Database Documentation](./DATABASE_SCHEMA.md)

## 📖 Documentation

### Getting Started
- 📘 [Quick Start Guide](./QUICK_START.md) - Get running in 5 minutes
- 📗 [Setup Guide](./SETUP_GUIDE.md) - Complete installation and configuration
- 📙 [Environment Variables](./ENV_SETUP.md) - Required configuration

### Technical Documentation
- 🗄️ [Database Schema](./DATABASE_SCHEMA.md) - Complete schema reference (20+ models)
- 🔐 [Authentication Guide](./AUTHENTICATION.md) - Auth implementation details
- 📊 [Project Summary](./PROJECT_SUMMARY.md) - All implemented features
- 🚀 [Deployment Guide](./DEPLOYMENT.md) - Deploy to Vercel

### API & Contributing
- 📘 [API Documentation](./docs/API.md) - API routes reference
- 📗 [Contributing Guidelines](./docs/CONTRIBUTING.md) - How to contribute

## 🗂️ Project Structure

```
├── app/                  # Next.js App Router
│   ├── (auth)/          # Authentication routes
│   ├── (dashboard)/     # Protected dashboard routes
│   ├── (community)/     # Forum and community
│   ├── api/             # API endpoints
│   └── onboarding/      # Onboarding flow
├── components/          # React components
│   ├── dashboard/       # Dashboard components
│   ├── gamification/    # XP, badges, achievements
│   ├── crisis/          # Crisis support
│   ├── motivation/      # Motivation system
│   └── ui/              # Reusable UI components
├── lib/                 # Utilities
├── prisma/              # Database schema
├── services/            # Business logic
├── store/               # State management
└── types/               # TypeScript types
```

## 🎯 Key Workflows

### New User Journey
1. Land on homepage → View features
2. Register with email or Google OAuth
3. Complete comprehensive onboarding:
   - Initial assessment
   - Goal setting
   - Relationship status
   - Notification preferences
4. Arrive at personalized dashboard
5. Complete first daily check-in (+10 XP)
6. Start building streak

### Daily Usage Flow
1. Morning motivation popup (time-based)
2. Daily check-in logging
3. Health metrics tracking
4. Forum browsing and posting
5. Challenge completion
6. Achievement unlocking
7. Evening reflection

### Crisis Support Flow
1. User clicks SOS button
2. Immediate coping strategies displayed
3. Breathing exercise offered
4. Urge intensity logged
5. Triggers identified
6. Pattern analysis updated
7. Success tracked and rewarded

## 🔒 Privacy & Security

- All user data encrypted at rest
- No tracking or analytics without consent
- Anonymous forum participation
- Optional leaderboard participation
- Secure password hashing (bcrypt)
- JWT session management
- CSRF protection
- XSS prevention
- Content moderation AI

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **In-App Support**: Forum and community
- **Crisis Resources**: Built-in emergency contacts
- **GitHub Issues**: Bug reports and feature requests

## 🙏 Acknowledgments

Built with compassion for those on their recovery journey. Every feature is designed to support, encourage, and empower.

---

**Remember: Progress, not perfection. Every day is a new opportunity.** 💪✨
