# 🚀 Deployment Guide

## Deployment to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- Neon DB account
- Cloudinary account
- Google Cloud Console project

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
   - Install Command: `npm install`

### Step 3: Add Environment Variables

In Vercel dashboard, add all environment variables:

```env
# Database
DATABASE_URL=
DIRECT_URL=

# Auth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Optional
EMAIL_SERVER_HOST=
EMAIL_SERVER_PORT=
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=
```

### Step 4: Update Google OAuth

Add Vercel domain to authorized redirect URIs:
- `https://your-domain.vercel.app/api/auth/callback/google`

### Step 5: Deploy

Click "Deploy" and wait for build to complete.

### Step 6: Initialize Database

After successful deployment, run migrations:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Run database seed
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

## Custom Domain Setup

### Step 1: Add Domain in Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Step 2: Update Environment Variables
Update `NEXTAUTH_URL` to your custom domain:
```env
NEXTAUTH_URL=https://yourdomain.com
```

### Step 3: Update OAuth Redirects
Add custom domain to Google OAuth authorized URIs.

## Alternative: Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and Run

```bash
# Build image
docker build -t recovery-platform .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  recovery-platform
```

## Performance Optimization

### 1. Database Optimization

Add indexes to frequently queried fields:

```sql
CREATE INDEX idx_user_streak ON users(current_streak DESC);
CREATE INDEX idx_daily_log_date ON daily_logs(user_id, date DESC);
CREATE INDEX idx_forum_posts_created ON forum_posts(created_at DESC);
CREATE INDEX idx_achievements_category ON achievements(category, tier);
```

### 2. Caching Strategy

Enable edge caching for static content:

```typescript
// In API routes
export const runtime = 'edge'
export const revalidate = 60 // 1 minute
```

### 3. Image Optimization

Cloudinary is already configured for automatic optimization.

### 4. Code Splitting

Already implemented via Next.js dynamic imports.

## Monitoring & Analytics

### Vercel Analytics

Enable in Vercel dashboard:
1. Go to Project Settings
2. Click Analytics
3. Enable Web Analytics

### Error Tracking with Sentry (Optional)

```bash
npm install @sentry/nextjs
```

Configure Sentry:

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs"

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
})
```

## Database Backup Strategy

### Neon DB Automatic Backups

Neon provides automatic point-in-time recovery.

### Manual Backup

```bash
pg_dump $DATABASE_URL > backup.sql
```

### Restore

```bash
psql $DATABASE_URL < backup.sql
```

## Security Checklist

- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables secured
- [ ] CORS configured
- [ ] Rate limiting implemented
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection enabled
- [ ] CSRF tokens validated
- [ ] Content Security Policy configured
- [ ] Cloudinary moderation enabled

## Performance Benchmarks

Target metrics:
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Lighthouse Score: > 90
- API Response Time: < 200ms

## Rollback Strategy

Vercel automatically keeps deployments:

1. Go to Deployments tab
2. Find previous working deployment
3. Click "..." → "Promote to Production"

## Post-Deployment Checklist

- [ ] All API routes working
- [ ] Authentication functional
- [ ] Database connected
- [ ] Cloudinary images loading
- [ ] PWA installable
- [ ] Notifications sending
- [ ] Forum posts working
- [ ] Streak tracking accurate
- [ ] Achievements unlocking
- [ ] Leaderboard updating

## Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
vercel --force

# Check build logs
vercel logs <deployment-url>
```

### Database Connection Issues

```bash
# Test connection
npx prisma db pull

# Reset database
npx prisma db push --force-reset
```

### OAuth Errors

- Verify redirect URIs match exactly
- Check NEXTAUTH_URL is correct
- Ensure NEXTAUTH_SECRET is set

## Scaling Considerations

### Database
- Neon scales automatically
- Consider connection pooling for high traffic
- Use read replicas if needed

### API Routes
- Vercel Edge Functions for global distribution
- Implement rate limiting
- Cache frequent queries

### File Storage
- Cloudinary handles CDN distribution
- Automatic image optimization
- Infinite scaling

## Cost Estimation

### Free Tier Usage:
- Vercel: 100GB bandwidth/month
- Neon DB: 0.5 GB storage
- Cloudinary: 25 GB storage, 25K transformations

### Estimated Costs (1000 active users):
- Vercel Pro: $20/month
- Neon DB: ~$10/month
- Cloudinary: ~$15/month
- **Total: ~$45/month**

## Support & Maintenance

### Regular Updates

```bash
# Update dependencies monthly
npm update

# Security patches
npm audit fix

# Database migrations
npx prisma migrate dev
```

### Health Checks

Monitor these endpoints:
- `/api/health` - API status
- `/api/auth/session` - Auth working
- Database connectivity

---

**Your platform is now live! 🎉**

Users can start their recovery journey at your deployed URL.

