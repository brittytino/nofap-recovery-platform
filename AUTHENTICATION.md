# 🔐 Authentication Documentation

Complete guide to authentication implementation in the NoFap Recovery Platform.

## Overview

The platform uses **NextAuth.js v5** (beta) for authentication with support for:
- ✅ Email/Password credentials
- ✅ Google OAuth
- ✅ GitHub OAuth
- ✅ Session management (JWT)
- ✅ Secure password hashing (bcryptjs)

---

## 🚀 Setup

### 1. Environment Variables

Create a `.env` file with the following variables:

```bash
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here" # Generate: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000" # Production: https://yourdomain.com

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### 2. OAuth Provider Setup

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Add callback URL:
   - `http://localhost:3000/api/auth/callback/github` (development)
   - `https://yourdomain.com/api/auth/callback/github` (production)

---

## 📝 Implementation

### Configuration (`lib/auth.ts`)

```typescript
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import GitHub from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    // Google OAuth
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    
    // GitHub OAuth
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    
    // Email/Password
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email as string }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
export const getServerSession = auth
```

---

## 🔑 User Registration

### API Route (`app/api/auth/register/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: 'Password must be at least 8 characters' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password (12 rounds)
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate anonymous username for forum
    const adjectives = ['Brave', 'Strong', 'Determined', 'Focused', 'Resilient']
    const nouns = ['Warrior', 'Champion', 'Hero', 'Phoenix', 'Eagle']
    const randomNum = Math.floor(Math.random() * 1000)
    const anonymousUsername = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${randomNum}`

    // Create user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        anonymousUsername,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}
```

---

## 🖥️ Client-Side Authentication

### Login Page (`app/(auth)/login/page.tsx`)

```typescript
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Email/Password Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      toast.error('Invalid email or password')
    } else {
      toast.success('Login successful!')
      router.push('/dashboard')
    }
  }

  // Google OAuth
  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  // GitHub OAuth
  const handleGitHubSignIn = async () => {
    await signIn('github', { callbackUrl: '/dashboard' })
  }

  return (
    // UI components...
  )
}
```

### Register Page (`app/(auth)/register/page.tsx`)

```typescript
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    // Register user
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      toast.success('Account created successfully!')
      
      // Auto sign in after registration
      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        callbackUrl: '/onboarding',
      })
    } else {
      toast.error(data.message || 'Registration failed')
    }
  }

  return (
    // UI components...
  )
}
```

---

## 🛡️ Protected Routes

### Middleware (`middleware.ts`)

```typescript
export { auth as middleware } from '@/lib/auth'

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/forum/:path*',
    '/achievements/:path*',
    '/challenges/:path*',
    '/health/:path*',
    '/streak/:path*',
  ]
}
```

### Server-Side Protection

```typescript
import { getServerSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }

  // Protected page content...
}
```

### API Route Protection

```typescript
import { getServerSession } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Protected API logic...
}
```

---

## 📱 Session Management

### Get Current User (Client)

```typescript
'use client'

import { useSession } from 'next-auth/react'

export function UserProfile() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <div>Not authenticated</div>
  }

  return (
    <div>
      <p>Logged in as {session.user.email}</p>
      <p>User ID: {session.user.id}</p>
    </div>
  )
}
```

### Get Current User (Server)

```typescript
import { getServerSession } from '@/lib/auth'

export default async function Component() {
  const session = await getServerSession()
  
  return (
    <div>
      <p>Logged in as {session?.user.email}</p>
    </div>
  )
}
```

### Sign Out

```typescript
'use client'

import { signOut } from 'next-auth/react'

export function SignOutButton() {
  return (
    <button onClick={() => signOut({ callbackUrl: '/' })}>
      Sign Out
    </button>
  )
}
```

---

## 🔒 Security Best Practices

### Password Security
- ✅ Minimum 8 characters required
- ✅ Bcrypt hashing with 12 salt rounds
- ✅ Never store plain text passwords
- ✅ Server-side validation

### Session Security
- ✅ JWT tokens with expiration
- ✅ Secure HTTP-only cookies
- ✅ CSRF protection (NextAuth.js built-in)
- ✅ Auto-refresh tokens

### OAuth Security
- ✅ State parameter validation
- ✅ Nonce verification
- ✅ HTTPS-only callbacks in production
- ✅ Client secret protection (server-side only)

---

## 🔄 User Flow

### Registration Flow
1. User fills registration form
2. Client validates input (password length, match)
3. POST to `/api/auth/register`
4. Server validates and checks for existing user
5. Password is hashed with bcrypt
6. User created in database
7. Auto-login with `signIn('credentials')`
8. Redirect to onboarding

### Login Flow (Email/Password)
1. User enters credentials
2. `signIn('credentials', { email, password, redirect: false })`
3. NextAuth.js calls `authorize()` function
4. Password compared with bcrypt
5. JWT token created
6. Session cookie set
7. Redirect to dashboard

### Login Flow (OAuth)
1. User clicks "Sign in with Google/GitHub"
2. `signIn('google')` or `signIn('github')`
3. Redirect to provider's consent screen
4. User approves
5. Callback to `/api/auth/callback/[provider]`
6. Provider account linked to user
7. Session created
8. Redirect to dashboard

---

## 🐛 Troubleshooting

### "Credentials sign in failed"
- Check database connection
- Verify email/password are correct
- Ensure user has a password (not OAuth-only)
- Check bcrypt comparison

### "OAuth provider failed"
- Verify client ID and secret
- Check callback URLs match exactly
- Ensure provider is enabled in console
- Check NEXTAUTH_URL is correct

### "Session is null"
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear cookies and try again
- Check middleware matcher paths

### "Cannot find module 'next-auth'"
```bash
npm install next-auth@beta
```

---

## 📚 Additional Resources

- [NextAuth.js Documentation](https://next-auth.js.org)
- [NextAuth.js v5 Beta](https://authjs.dev/guides/upgrade-to-v5)
- [Prisma Adapter](https://authjs.dev/reference/adapter/prisma)
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)

