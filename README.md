# NoFap Recovery Platform

A comprehensive Next.js application for personal recovery, streak tracking, and community support.

## Features

- ✅ **Streak Tracking**: Visual progress tracking with heat map calendar
- ✅ **Health Monitoring**: Mood, energy, and wellness tracking
- ✅ **Gamification**: Tier-based challenges and achievement system
- ✅ **Community Forum**: Anonymous posting with public discussions
- ✅ **Crisis Support**: Immediate access to coping strategies
- ✅ **PWA Support**: Offline functionality and mobile app experience
- ✅ **Smart Motivations**: Personalized daily messages
- ✅ **Mobile Responsive**: Optimized for all devices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Prisma ORM (Neon DB)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Media Storage**: Cloudinary
- **PWA**: @ducanh2912/next-pwa
- **Charts**: Recharts
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (or Neon DB account)
- Cloudinary account (optional)

### Installation

1. **Clone the repository**
git clone <repository-url>
cd nofap-recovery-platform



2. **Install dependencies**
npm install



3. **Environment Setup**
cp .env.example .env.local



Fill in your environment variables:
DATABASE_URL="your-postgresql-connection-string"
DIRECT_URL="your-direct-postgresql-connection"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"



4. **Database Setup**
npx prisma generate
npx prisma db push
npx prisma db seed



5. **Run the development server**
npm run dev



6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- Docker
- Traditional hosting with Node.js support

## Database Schema

The application uses PostgreSQL with the following main entities:
- **Users**: Authentication and profile data
- **Daily Logs**: Mood, energy, and daily tracking
- **Achievements**: Gamification system
- **Forum Posts**: Community discussions
- **Challenges**: Daily and tier-based challenges
- **Health Metrics**: Physical wellness tracking

## PWA Features

The app works as a Progressive Web App with:
- Offline functionality for core features
- Push notifications for reminders
- Install prompts for mobile devices
- Background sync for data submission

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you need help or have questions:
- Check the documentation
- Open an issue on GitHub
- Join our community discussions

## Acknowledgments

- Built with ❤️ for the recovery community
- Inspired by evidence-based recovery techniques
- Special thanks to all contributors and beta testers

---

**Remember**: This platform is for support and motivation. For serious mental health concerns, please consult with healthcare professionals.