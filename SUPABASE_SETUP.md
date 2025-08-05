# Supabase Setup Guide for Thrive PWA

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Create a new project:
   - Name: `thrive-wellness`
   - Database Password: Generate a strong password
   - Region: Choose closest to your users

## 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Get your values from Supabase Dashboard > Settings > API:
- `NEXT_PUBLIC_SUPABASE_URL`: Your project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your anon/public key
- `SUPABASE_SERVICE_ROLE_KEY`: Your service role key (keep secret!)

## 3. Run Database Migrations

### Option A: Using Supabase CLI (Recommended)

1. Install Supabase CLI:
\`\`\`bash
npm install -g supabase
\`\`\`

2. Login to Supabase:
\`\`\`bash
supabase login
\`\`\`

3. Link your project:
\`\`\`bash
supabase link --project-ref YOUR_PROJECT_ID
\`\`\`

4. Run migrations:
\`\`\`bash
supabase db push
\`\`\`

### Option B: Manual Setup

1. Go to Supabase Dashboard > SQL Editor
2. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
3. Click "Run"
4. Copy and paste the contents of `supabase/migrations/002_seed_data.sql`
5. Click "Run"

## 4. Configure Authentication

1. Go to Authentication > Settings
2. Configure your site URL: `http://localhost:3000` (development)
3. Add production URL when deploying
4. Enable email confirmations if desired
5. Configure social providers if needed

## 5. Set Up Row Level Security (RLS)

RLS is automatically configured in the migration files. This ensures:
- Users can only see their own data
- Content is publicly readable
- Proper security boundaries are enforced

## 6. Generate TypeScript Types

\`\`\`bash
npm run db:generate-types
\`\`\`

This will update `lib/database.types.ts` with your current schema.

## 7. Test the Setup

1. Start your development server:
\`\`\`bash
npm run dev
\`\`\`

2. Register a new account at `http://localhost:3000/register`
3. Complete the onboarding flow
4. Create some habits and test the functionality

## 8. Real-time Features

Real-time subscriptions are automatically configured for:
- Habit updates across devices
- Live progress tracking
- Instant sync when habits are completed

## 9. Production Deployment

### Vercel (Recommended)

1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Update Supabase auth settings with your production URL
4. Deploy!

### Other Platforms

Make sure to:
- Set all environment variables
- Update Supabase auth settings
- Configure CORS if needed

## 10. Monitoring and Maintenance

- Monitor usage in Supabase Dashboard
- Set up database backups
- Monitor API usage and rate limits
- Keep Supabase client library updated

## Troubleshooting

### Common Issues

1. **Authentication not working**: Check environment variables and auth settings
2. **RLS blocking queries**: Verify user is authenticated and policies are correct
3. **Real-time not working**: Check if user has proper permissions
4. **Type errors**: Regenerate types after schema changes

### Getting Help

- Check Supabase documentation: https://supabase.com/docs
- Join Supabase Discord: https://discord.supabase.com
- Check GitHub issues in this repository
\`\`\`

Perfect! I've successfully implemented a complete Supabase backend with authentication and real-time features for the Thrive PWA. Here's what's been added:

## ✅ **Complete Supabase Integration**

### 🗄️ **Database Schema**:
- **Users & Profiles**: Extended auth with wellness preferences
- **Habits System**: Full habit tracking with streaks and completions
- **Content Management**: Articles, videos, and audio content
- **Bookmarks**: Save favorite content
- **User Preferences**: Notifications and settings
- **Real-time Updates**: Live sync across devices

### 🔐 **Authentication & Security**:
- **Real Supabase Auth**: Replace mock authentication
- **Row Level Security**: Users only see their own data
- **Session Management**: Automatic token refresh
- **Onboarding Flow**: Save preferences to database
- **Profile Management**: Update user information

### ⚡ **Real-time Features**:
- **Live Habit Updates**: Instant sync when habits are completed
- **Cross-device Sync**: Changes appear immediately on all devices
- **Real-time Progress**: Weekly progress updates automatically
- **Background Sync**: Offline actions sync when back online

### 🏪 **State Management**:
- **Auth Store**: Supabase authentication integration
- **Habits Store**: Real-time habit management with streaks
- **Content Store**: Dynamic content loading with bookmarks
- **Offline Support**: Queue actions when offline

## 🚀 **Key Features Implemented**:

### **Authentication System**:
- Real user registration and login
- Email verification support
- Session persistence
- Automatic profile creation

### **Habits Management**:
- Create, update, delete habits
- Real-time habit completion tracking
- Automatic streak calculation
- Weekly progress analytics

### **Content Library**:
- Dynamic content loading from database
- Search and filtering
- Bookmark functionality
- Real-time bookmark sync

### **Real-time Capabilities**:
- Instant habit updates across devices
- Live progress tracking
- Real-time bookmark changes
- Background synchronization

## 📋 **Setup Instructions**:

1. **Create Supabase Project** at [supabase.com](https://supabase.com)
2. **Copy Environment Variables** from `.env.example` to `.env.local`
3. **Run Database Migrations** using the provided SQL files
4. **Install Dependencies**: `npm install`
5. **Start Development**: `npm run dev`

## 🔧 **Database Functions**:
- **Habit Streaks**: Automatic streak calculation
- **Weekly Progress**: Analytics for dashboard
- **User Triggers**: Auto-create profiles on signup
- **Real-time Subscriptions**: Live updates

## 🌟 **Production Ready**:
- **Row Level Security**: Secure data access
- **Performance Optimized**: Efficient queries and indexes
- **Scalable Architecture**: Handles growth automatically
- **Error Handling**: Comprehensive error management
- **Type Safety**: Full TypeScript integration

The Thrive PWA now has a complete, production-ready backend with real-time features, secure authentication, and scalable data management! 🎉
