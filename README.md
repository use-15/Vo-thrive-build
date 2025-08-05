# Thrive - Wellness Habit Tracker PWA

A comprehensive wellness platform built with Next.js, Supabase, and modern web technologies. Thrive helps users build and maintain healthy habits through gamification, analytics, and community features.

## 🚀 Features

### Core Features
- **Habit Tracking**: Create, manage, and track daily wellness habits
- **Real-time Sync**: Supabase integration for real-time data synchronization
- **PWA Support**: Installable app with offline capabilities
- **Push Notifications**: Smart reminders and milestone celebrations
- **Analytics Dashboard**: Detailed progress tracking and insights
- **Achievement System**: Gamified experience with unlockable badges
- **Content Library**: Curated wellness articles and resources
- **Bookmarking**: Save favorite content for later reading

### Advanced Features
- **Streak Tracking**: Visual streak counters and milestone rewards
- **Category Organization**: Fitness, Mindfulness, Nutrition, and Sleep habits
- **Weekly Progress**: Visual charts and completion rates
- **User Profiles**: Customizable profiles with onboarding flow
- **Responsive Design**: Mobile-first design with desktop optimization
- **Dark Mode**: System preference detection and manual toggle

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **State Management**: Zustand with persistence
- **Charts**: Recharts for analytics visualization
- **PWA**: Service Worker, Web App Manifest
- **Deployment**: Vercel with automatic deployments

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm 8+
- Supabase account and project
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/thrive.git
   cd thrive
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your Supabase credentials:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   \`\`\`

4. **Set up Supabase database**
   \`\`\`bash
   # Run the migration files in supabase/migrations/
   # Or use the Supabase CLI:
   supabase db push
   \`\`\`

5. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Deployment to Vercel

### Automatic Deployment (Recommended)

1. **Connect to Vercel**
   - Fork this repository
   - Connect your GitHub account to Vercel
   - Import the project from your GitHub repository

2. **Configure Environment Variables**
   In your Vercel dashboard, add these environment variables:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   SITE_URL=https://your-app-name.vercel.app
   \`\`\`

3. **Deploy**
   - Vercel will automatically build and deploy your app
   - Your app will be available at `https://your-app-name.vercel.app`

### Manual Deployment

1. **Install Vercel CLI**
   \`\`\`bash
   npm install -g vercel
   \`\`\`

2. **Login to Vercel**
   \`\`\`bash
   vercel login
   \`\`\`

3. **Deploy**
   \`\`\`bash
   vercel --prod
   \`\`\`

## 📱 PWA Installation

Once deployed, users can install Thrive as a PWA:

1. **On Mobile (iOS/Android)**:
   - Open the app in Safari/Chrome
   - Tap "Add to Home Screen" or look for the install prompt

2. **On Desktop**:
   - Look for the install icon in the address bar
   - Or use the browser menu to "Install Thrive"

## 🗄️ Database Schema

The app uses the following main tables:

- `profiles` - User profiles and preferences
- `habits` - User habits and configurations
- `habit_completions` - Daily habit completion records
- `content` - Wellness articles and resources
- `bookmarks` - User bookmarked content
- `achievements` - User achievement progress

See `supabase/migrations/` for complete schema definitions.

## 🔧 Configuration

### PWA Configuration
- Manifest: `public/manifest.json`
- Service Worker: `public/sw.js`
- Icons: `public/icons/` (various sizes)

### Analytics & Monitoring
- Built-in analytics tracking
- Error tracking with Sentry integration
- Performance monitoring with Lighthouse

### Notifications
- Push notifications via Service Worker
- Habit reminders and milestone celebrations
- Weekly progress summaries

## 🎨 Customization

### Theming
- Colors defined in `tailwind.config.js`
- CSS variables in `app/globals.css`
- Component variants in `components/ui/`

### Content Management
- Add content via Supabase dashboard
- Bulk import via SQL scripts
- API endpoints for dynamic content

## 📊 Analytics & Insights

The app provides comprehensive analytics:

- **Habit Completion Rates**: Daily, weekly, monthly views
- **Streak Analysis**: Longest streaks, current streaks
- **Category Breakdown**: Performance by habit category
- **Progress Trends**: Visual charts and insights
- **Achievement Progress**: Gamification metrics

## 🔒 Security

- **Authentication**: Supabase Auth with email/password
- **Authorization**: Row Level Security (RLS) policies
- **Data Protection**: HTTPS, secure headers, CSRF protection
- **Privacy**: GDPR-compliant data handling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Join our GitHub Discussions for questions

## 🎯 Roadmap

- [ ] Social features and community challenges
- [ ] AI-powered habit recommendations
- [ ] Integration with fitness trackers
- [ ] Advanced customization options
- [ ] Multi-language support
- [ ] Team/family habit tracking

---

Built with ❤️ using Next.js and Supabase
\`\`\`

Finally, let's create a deployment checklist:
