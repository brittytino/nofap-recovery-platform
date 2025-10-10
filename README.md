Repository Name
clarity-app (Simple, memorable, represents mental clarity and focus)

🧘 Clarity - Digital Wellness & Dopamine Detox Platform
Clarity helps young adults break free from dopamine addiction cycles—social media, gaming, streaming, and adult content—by replacing destructive digital habits with meaningful real-world experiences. Completely free forever.

🎯 The Problem We Solve
Modern youth faces a dopamine addiction crisis. Endless scrolling, binge-watching, gaming, and instant gratification loops destroy motivation, focus, relationships, and mental health. Clarity addresses the root cause by helping users:

Track multiple addictions - Social media, gaming, streaming, adult content, and more

Build real-world habits - Replace screen time with exercise, social interactions, and meaningful activities

Find accountability - Anonymous community support without judgment

See tangible progress - Concrete metrics showing life transformation beyond just numbers

✨ Core Features
🔐 Authentication
Email/password registration and login (bcrypt hashing)

Google OAuth integration

GitHub OAuth integration

Secure session management with NextAuth.js

Profile pictures via Cloudinary (optimized delivery)

🎯 Smart Onboarding
Personalized habit assessment

Goal setting (multiple addiction tracking)

Relationship status configuration

Notification preferences

Custom recovery plan

📊 Dashboard
Real-time streak counter for multiple habits

Year-long heatmap calendar

XP and level progression

Daily motivation cards (relationship-aware)

Quick action buttons

✅ Daily Check-In
Mood rating (1-10)

Energy level tracking

Confidence assessment

Urge intensity logging

Trigger identification

Activity completion

Automatic XP rewards

💪 Health Tracking
Exercise logging (type, duration)

Sleep quality monitoring

Social interaction counting

Step tracking

Meditation minutes

Comprehensive analytics

🆘 Crisis Support
SOS button - Immediate help access

Urge logger - Pattern recognition

Breathing exercises - Guided box breathing

Coping strategies - 8+ proven techniques

Emergency contacts - Quick helpline access

🏆 Gamification
XP system for positive actions

Level progression (visual growth)

21+ achievements (Bronze → Silver → Gold → Diamond → Legendary)

Daily challenges (tier-based)

Milestone celebrations with confetti animations

👥 Community Forum
Anonymous posting (auto-generated usernames)

10+ topic categories (Getting Started, Success Stories, Urge Management, Fitness, Relationships, etc.)

Upvote/downvote system

Comment threads

No private messaging (healthy boundaries)

🏅 Leaderboard
Weekly, monthly, all-time rankings

Privacy settings (opt-in/opt-out)

Streak-based ranking

XP-based ranking

📱 Progressive Web App (PWA)
Offline functionality

Install to home screen

Service worker caching

Push notifications (morning motivation, check-in reminders, milestone alerts)

🏗️ Tech Stack
Frontend
Next.js 14 (App Router)

TypeScript

Tailwind CSS

Shadcn/ui components

Framer Motion (animations)

Recharts (data visualization)

Backend
Next.js API Routes

Prisma ORM

NextAuth.js (authentication)

Neon DB (PostgreSQL)

Storage
Cloudinary (profile pictures, optimized images)

Deployment
Vercel

🚀 Quick Start
bash
# 1. Clone repository
git clone https://github.com/yourusername/clarity-app.git
cd clarity-app

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Add your credentials:
# - DATABASE_URL (Neon DB)
# - NEXTAUTH_SECRET, NEXTAUTH_URL
# - GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET
# - GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
# - CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

# 4. Initialize database
npx prisma generate
npx prisma db push
npx prisma db seed

# 5. Run development server
npm run dev
Visit http://localhost:3000

🗄️ Database Schema (20+ Tables)
Authentication:

User - Profiles, streaks, XP, settings

Account - OAuth providers

Session - Active sessions

VerificationToken - Email verification

Progress Tracking:

DailyLog - Check-ins, mood, energy, urges

StreakShare - Social media shares

HealthMetric - Comprehensive wellness data

Crisis Management:

UrgeLog - Intensity, triggers, patterns

Gamification:

Achievement - 21 unlockable badges

UserAchievement - User progress

UserXPLog - XP history

DailyChallenge - 27 challenges (6 categories)

UserDailyChallenge - Challenge progress

Community:

ForumCategory - 10 topic categories

ForumPost - Anonymous discussions

ForumComment - Nested threads

PostUpvote / CommentUpvote - Voting

Notifications:

Notification - In-app and push alerts

Seeded Data
✅ 21 Achievements
✅ 27 Daily Challenges
✅ 10 Forum Categories

📂 Project Structure
text
├── app/
│   ├── (auth)/              # Login, register, password reset
│   ├── (dashboard)/         # Dashboard, streak, health, challenges, achievements, profile, crisis
│   ├── (community)/         # Forum, success stories, leaderboard
│   ├── api/                 # API routes (auth, user, streak, health, etc.)
│   └── onboarding/          # Onboarding flow
├── components/
│   ├── dashboard/           # Dashboard components
│   ├── gamification/        # XP, badges, achievements
│   ├── crisis/              # Crisis support
│   ├── motivation/          # Motivation system
│   └── ui/                  # Reusable UI
├── lib/                     # Utilities, auth, db, cloudinary
├── prisma/                  # Schema and migrations
└── services/                # Business logic
🎯 User Journey
New User
Land on homepage → View features

Register (email/password or Google/GitHub)

Complete onboarding (assessment, goals, preferences)

Personalized dashboard setup

First daily check-in (+10 XP)

Start building streaks

Daily Usage
Morning motivation popup

Daily check-in logging

Health metrics tracking

Forum browsing/posting

Challenge completion

Achievement unlocking

Evening reflection

Crisis Support
Click SOS button

View coping strategies

Breathing exercise

Log urge intensity

Identify triggers

Pattern analysis

Success tracking

🔒 Privacy & Security
Encrypted data at rest

bcrypt password hashing (12 rounds)

JWT session management

Anonymous forum participation

Optional leaderboard

No data selling

CSRF/XSS protection

💡 Why Clarity is Different
Feature	Clarity	Other Apps
Multiple Addictions	Track social media, gaming, streaming, adult content	Single-focus (e.g., just NoFap)
Gender Neutral	For everyone struggling with digital addiction	Often male-focused
100% Free	All features free forever	Paywalls and premium tiers
Real-World Focus	Replace digital habits with offline activities	Just tracking/blocking
Anonymous Community	Safe space without judgment	Private messaging (unhealthy)
Comprehensive Metrics	Mood, energy, sleep, social, confidence	Just streak counting
🤝 Contributing
We welcome contributions! See CONTRIBUTING.md for guidelines.

📄 License
MIT License - Free and open source

🆘 Support Resources
Built into the app:

Crisis SOS button

24/7 coping strategies

Emergency helplines

Anonymous community support

Reclaim your attention. Rebuild your life. Find your clarity. ✨