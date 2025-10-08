# 🗄️ Database Schema Documentation

This document provides a comprehensive overview of the NoFap Recovery Platform database schema.

## Overview

The platform uses **PostgreSQL** (via Neon DB) with **Prisma ORM** for type-safe database operations.

## 📊 Database Tables

### Authentication & User Management

#### **User** (`users`)
Core user information and profile data.

```prisma
User {
  id: String (CUID)
  name: String?
  email: String (unique)
  emailVerified: DateTime?
  password: String? // For email/password auth
  image: String?
  createdAt: DateTime
  updatedAt: DateTime

  // Profile Information
  username: String? (unique)
  relationshipStatus: RelationshipStatus (SINGLE, COMMITTED, RECOVERING_FROM_BREAKUP, PREFER_NOT_TO_SAY)
  hasCompletedOnboarding: Boolean
  cloudinaryPublicId: String?
  
  // Streak Information
  streakStartDate: DateTime?
  currentStreak: Int (default: 0)
  longestStreak: Int (default: 0)
  lastCheckInDate: DateTime?
  totalResets: Int (default: 0)
  
  // Gamification
  totalXP: Int (default: 0)
  currentLevel: Int (default: 1)
  currentTier: UserTier (BEGINNER, INTERMEDIATE, ADVANCED, MASTER)
  
  // Settings
  notificationsEnabled: Boolean (default: true)
  dailyReminderTime: String? (default: "09:00")
  privacySettings: Json
  
  // Privacy & Community
  anonymousUsername: String? (unique)
  showStreakPublicly: Boolean (default: true)
}
```

**Key Features:**
- Email/password and OAuth authentication support
- Comprehensive streak tracking
- XP and level-based gamification
- Privacy controls for leaderboard and community
- Auto-generated anonymous username for forum posts

---

#### **Account** (`accounts`)
OAuth provider accounts linked to users (NextAuth.js).

```prisma
Account {
  id: String
  userId: String
  type: String
  provider: String (google, github, etc.)
  providerAccountId: String
  refresh_token: String?
  access_token: String?
  expires_at: Int?
  token_type: String?
  scope: String?
  id_token: String?
  session_state: String?
}
```

---

#### **Session** (`sessions`)
Active user sessions (NextAuth.js).

```prisma
Session {
  id: String
  sessionToken: String (unique)
  userId: String
  expires: DateTime
}
```

---

#### **VerificationToken** (`verification_tokens`)
Email verification and password reset tokens (NextAuth.js).

```prisma
VerificationToken {
  identifier: String
  token: String (unique)
  expires: DateTime
}
```

---

### Progress Tracking

#### **DailyLog** (`daily_logs`)
Daily check-in data including mood, energy, urges, and activities.

```prisma
DailyLog {
  id: String
  userId: String
  date: DateTime (unique per user)
  
  // Daily Tracking (1-10 scale)
  moodRating: Int?
  energyLevel: Int?
  confidenceLevel: Int?
  urgeIntensity: Int? (0-10)
  
  // Activities
  activitiesCompleted: String[]
  exerciseCompleted: Boolean
  meditationCompleted: Boolean
  socialInteraction: Boolean
  
  // Notes & Analysis
  notes: String?
  triggers: String[]
  copingStrategies: String[]
  
  checkInTime: DateTime
  updatedAt: DateTime
}
```

**Usage:**
- Morning check-ins
- Evening reflections
- Activity tracking
- Trigger pattern analysis

---

#### **StreakShare** (`streak_shares`)
Social media shares of milestone achievements.

```prisma
StreakShare {
  id: String
  userId: String
  streakDays: Int
  shareImageUrl: String? // Cloudinary generated image
  platform: String (twitter, instagram, facebook, custom)
  sharedAt: DateTime
}
```

---

### Health & Wellness

#### **HealthMetric** (`health_metrics`)
Comprehensive health and wellness tracking.

```prisma
HealthMetric {
  id: String
  userId: String
  date: DateTime (unique per user)
  
  // Sleep
  sleepHours: Float?
  sleepQuality: Int? (1-10)
  
  // Fitness
  exerciseMinutes: Int?
  steps: Int?
  workoutType: String?
  
  // Social & Confidence
  socialInteractions: Int?
  confidenceRating: Int? (1-10)
  anxietyLevel: Int? (1-10)
  
  // Energy & Focus
  energyLevel: Int? (1-10)
  focusLevel: Int? (1-10)
  productivityRating: Int? (1-10)
  
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Analytics:**
- Correlations between streak length and health metrics
- Sleep quality trends
- Energy and confidence improvements over time
- Exercise consistency tracking

---

### Crisis Management

#### **UrgeLog** (`urge_logs`)
Detailed logging of urges for pattern recognition and support.

```prisma
UrgeLog {
  id: String
  userId: String
  urgeIntensity: Int (1-10)
  triggers: String[]
  context: String?
  copingStrategy: String?
  wasSuccessful: Boolean (default: true)
  emotionalState: String[]
  timeOfDay: String
  location: String?
  notes: String?
  createdAt: DateTime
}
```

**Features:**
- Pattern recognition (time, triggers, locations)
- Success rate tracking
- Personalized coping strategy recommendations
- Crisis intervention data

---

### Gamification

#### **Achievement** (`achievements`)
Unlockable badges and milestones.

```prisma
Achievement {
  id: String
  name: String (unique)
  description: String
  category: AchievementCategory (STREAK, HEALTH, SOCIAL, COMMUNITY, CHALLENGE, SPECIAL)
  tier: AchievementTier (BRONZE, SILVER, GOLD, PLATINUM, DIAMOND)
  badgeImageUrl: String?
  unlockCriteria: Json // {type: "streak", value: 7}
  xpReward: Int
  isActive: Boolean
  createdAt: DateTime
}
```

**Achievement Types:**
- **STREAK**: Day-based milestones (7, 30, 90, 365 days)
- **HEALTH**: Fitness and wellness goals
- **SOCIAL**: Confidence and relationship building
- **COMMUNITY**: Forum participation
- **CHALLENGE**: Daily challenge completion
- **SPECIAL**: Unique accomplishments (urge conquest, comeback stories)

---

#### **UserAchievement** (`user_achievements`)
User's unlocked achievements.

```prisma
UserAchievement {
  id: String
  userId: String
  achievementId: String
  unlockedAt: DateTime
  progress: Float (0-100%)
}
```

---

#### **UserXPLog** (`user_xp_logs`)
XP earning history and activity log.

```prisma
UserXPLog {
  id: String
  userId: String
  activityType: XPActivityType
  pointsEarned: Int
  description: String?
  createdAt: DateTime
}
```

**XP Activity Types:**
- DAILY_CHECK_IN (20-30 XP)
- EXERCISE (25-50 XP)
- MEDITATION (20-40 XP)
- SOCIAL_INTERACTION (15-30 XP)
- FORUM_POST (30 XP)
- FORUM_COMMENT (10 XP)
- CHALLENGE_COMPLETED (20-70 XP based on difficulty)
- MILESTONE_REACHED (50-2000 XP)
- URGE_OVERCOME (40 XP)
- HELP_OTHERS (20 XP)

---

### Challenge System

#### **DailyChallenge** (`daily_challenges`)
Pool of available daily challenges.

```prisma
DailyChallenge {
  id: String
  title: String
  description: String
  tier: UserTier (BEGINNER, INTERMEDIATE, ADVANCED, MASTER)
  category: ChallengeCategory
  xpReward: Int
  difficulty: ChallengeDifficulty
  isActive: Boolean
  createdAt: DateTime
}
```

**Challenge Categories:**
- FITNESS: Workouts, steps, cardio
- MENTAL_HEALTH: Meditation, journaling, cold showers
- SOCIAL: Conversations, eye contact, events
- PRODUCTIVITY: Deep work, digital detox, learning
- CREATIVITY: Art, writing, photography
- SELF_CARE: Sleep, nutrition, hydration

---

#### **UserDailyChallenge** (`user_daily_challenges`)
User's assigned and completed challenges.

```prisma
UserDailyChallenge {
  id: String
  userId: String
  challengeId: String
  assignedDate: DateTime
  completedAt: DateTime?
  isCompleted: Boolean
  progress: Float (0-100%)
}
```

**Assignment Logic:**
- 3 challenges assigned daily
- Based on user's current tier
- Balanced across categories
- Auto-refreshes at midnight

---

### Community Forum

#### **ForumCategory** (`forum_categories`)
Topic-based forum categories.

```prisma
ForumCategory {
  id: String
  name: String (unique)
  slug: String (unique)
  description: String?
  icon: String?
  order: Int
  isActive: Boolean
  createdAt: DateTime
}
```

**Default Categories:**
1. 🌱 Getting Started
2. 🏆 Success Stories
3. 🛡️ Urge Management
4. 💪 Fitness & Health
5. ❤️ Relationships
6. 🧠 Mental Health
7. 🤝 Accountability
8. ⚡ Motivation
9. 🔄 Relapse Recovery
10. 📚 Science & Education

---

#### **ForumPost** (`forum_posts`)
User-created forum discussions.

```prisma
ForumPost {
  id: String
  userId: String
  categoryId: String
  title: String
  content: String
  contentImageUrl: String? // Cloudinary upload
  isAnonymous: Boolean (default: true)
  isPinned: Boolean
  isLocked: Boolean
  upvoteCount: Int
  commentCount: Int
  viewCount: Int
  tags: String[]
  createdAt: DateTime
  updatedAt: DateTime
}
```

**Features:**
- Anonymous posting (uses anonymousUsername)
- Image upload support (Cloudinary moderation)
- Upvote/downvote system
- Tagging for discoverability
- Pin and lock capabilities (moderators)

---

#### **ForumComment** (`forum_comments`)
Nested comments on forum posts.

```prisma
ForumComment {
  id: String
  postId: String
  userId: String
  content: String
  isAnonymous: Boolean (default: true)
  upvoteCount: Int
  parentCommentId: String? // For nested replies
  createdAt: DateTime
  updatedAt: DateTime
}
```

---

#### **PostUpvote** (`post_upvotes`)
User upvotes on forum posts.

```prisma
PostUpvote {
  id: String
  postId: String
  userId: String
  createdAt: DateTime
  
  @@unique([postId, userId]) // One vote per user per post
}
```

---

#### **CommentUpvote** (`comment_upvotes`)
User upvotes on comments.

```prisma
CommentUpvote {
  id: String
  commentId: String
  userId: String
  createdAt: DateTime
  
  @@unique([commentId, userId])
}
```

---

### Notifications

#### **Notification** (`notifications`)
In-app and push notifications.

```prisma
Notification {
  id: String
  userId: String
  type: NotificationType
  title: String
  message: String
  link: String? // Deep link to relevant page
  isRead: Boolean (default: false)
  data: Json? // Additional metadata
  createdAt: DateTime
  readAt: DateTime?
}
```

**Notification Types:**
- DAILY_REMINDER: Morning motivation
- MILESTONE: Streak achievements
- ACHIEVEMENT_UNLOCKED: New badges
- CHALLENGE_ASSIGNED: Daily challenges
- FORUM_REPLY: Comment responses
- ENCOURAGEMENT: Contextual motivation
- STREAK_WARNING: Missed check-in alerts
- LEVEL_UP: XP level increases
- COMMUNITY_UPDATE: Forum highlights

---

## 🔐 Enums

### RelationshipStatus
```prisma
enum RelationshipStatus {
  SINGLE
  COMMITTED
  RECOVERING_FROM_BREAKUP
  PREFER_NOT_TO_SAY
}
```

### UserTier
```prisma
enum UserTier {
  BEGINNER      // 1-30 days
  INTERMEDIATE  // 31-90 days
  ADVANCED      // 91-365 days
  MASTER        // 365+ days
}
```

### AchievementCategory
```prisma
enum AchievementCategory {
  STREAK
  HEALTH
  SOCIAL
  COMMUNITY
  CHALLENGE
  SPECIAL
}
```

### AchievementTier
```prisma
enum AchievementTier {
  BRONZE
  SILVER
  GOLD
  PLATINUM
  DIAMOND
}
```

### XPActivityType
```prisma
enum XPActivityType {
  DAILY_CHECK_IN
  EXERCISE
  MEDITATION
  SOCIAL_INTERACTION
  FORUM_POST
  FORUM_COMMENT
  CHALLENGE_COMPLETED
  MILESTONE_REACHED
  URGE_OVERCOME
  HELP_OTHERS
}
```

### ChallengeCategory
```prisma
enum ChallengeCategory {
  FITNESS
  MENTAL_HEALTH
  SOCIAL
  PRODUCTIVITY
  CREATIVITY
  SELF_CARE
}
```

### ChallengeDifficulty
```prisma
enum ChallengeDifficulty {
  EASY
  MEDIUM
  HARD
  EXTREME
}
```

### NotificationType
```prisma
enum NotificationType {
  DAILY_REMINDER
  MILESTONE
  ACHIEVEMENT_UNLOCKED
  CHALLENGE_ASSIGNED
  FORUM_REPLY
  ENCOURAGEMENT
  STREAK_WARNING
  LEVEL_UP
  COMMUNITY_UPDATE
}
```

---

## 🔄 Database Operations

### Setup & Migration

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Create and run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

### Seeded Data

The seed script (`prisma/seed.ts`) populates:
- **21 Achievements** across all categories and tiers
- **27 Daily Challenges** for all user tiers
- **10 Forum Categories** covering major topics

---

## 📈 Indexing Strategy

**Optimized Indexes:**
- `users.email` - Fast login lookups
- `users.currentStreak` - Leaderboard queries
- `users.totalXP` - Leaderboard queries
- `daily_logs.userId` - User history queries
- `daily_logs.date` - Date-based analytics
- `health_metrics.userId` - User metrics
- `forum_posts.categoryId` - Category filtering
- `forum_posts.createdAt` - Chronological sorting
- `notifications.userId` - User notifications
- `notifications.isRead` - Unread count queries

---

## 🔒 Data Privacy

**Privacy Features:**
1. **Anonymous Forum Posting**: Auto-generated usernames
2. **Leaderboard Opt-Out**: `showStreakPublicly` flag
3. **No Private Messaging**: Prevents unhealthy interactions
4. **Encrypted Passwords**: bcrypt hashing (12 rounds)
5. **Soft Data**: No personally identifiable information required

---

## 📊 Analytics Queries

### Streak Leaderboard
```typescript
await db.user.findMany({
  where: { showStreakPublicly: true },
  orderBy: [
    { currentStreak: 'desc' },
    { totalXP: 'desc' }
  ],
  take: 100
})
```

### User Progress Dashboard
```typescript
const userData = await db.user.findUnique({
  where: { id: userId },
  include: {
    dailyLogs: {
      orderBy: { date: 'desc' },
      take: 30
    },
    healthMetrics: {
      orderBy: { date: 'desc' },
      take: 30
    },
    userAchievements: {
      include: { achievement: true }
    },
    dailyChallenges: {
      where: {
        assignedDate: {
          gte: startOfDay(new Date())
        }
      }
    }
  }
})
```

### Trigger Pattern Analysis
```typescript
const urgeLogs = await db.urgeLog.findMany({
  where: { userId },
  orderBy: { createdAt: 'desc' },
  take: 100
})

// Analyze common triggers, times, locations
```

---

## 🚀 Performance Considerations

1. **Pagination**: Use cursor-based pagination for large lists
2. **Lazy Loading**: Include relations only when needed
3. **Caching**: Cache leaderboard and static data
4. **Connection Pooling**: Neon DB automatically handles pooling
5. **Query Optimization**: Use Prisma's `select` to limit fields

---

## 📚 Related Documentation

- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [NextAuth.js Database Adapters](https://next-auth.js.org/adapters/prisma)
- [Neon DB Documentation](https://neon.tech/docs)

