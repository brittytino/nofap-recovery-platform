# Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

## Database Configuration (Neon DB - PostgreSQL)
```
DATABASE_URL="postgresql://username:password@host.neon.tech/nofap_recovery?sslmode=require"
DIRECT_URL="postgresql://username:password@host.neon.tech/nofap_recovery?sslmode=require"
```

## NextAuth.js Configuration
```
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
```

## Google OAuth
```
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Cloudinary Configuration
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

## Email Configuration
```
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@recoveryplatform.com"
```

## Push Notifications
```
NEXT_PUBLIC_VAPID_PUBLIC_KEY="your-vapid-public-key"
VAPID_PRIVATE_KEY="your-vapid-private-key"
VAPID_SUBJECT="mailto:admin@recoveryplatform.com"
```

## Application Settings
```
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## How to Generate NEXTAUTH_SECRET
Run: `openssl rand -base64 32`

## How to Setup Neon DB
1. Create account at https://neon.tech
2. Create new project
3. Copy connection string to DATABASE_URL and DIRECT_URL
4. Run `npm run db:push` to create tables

