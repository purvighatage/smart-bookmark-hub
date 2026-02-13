Smart Bookmark Hub
A production-ready, real-time bookmark manager built with a unique book-themed UI, where bookmarks are visualized as "pages" in a personal digital library. Users can sign up and log in exclusively via Google OAuth, manage private bookmarks (URL + title), and experience seamless realtime updates across tabs. The app enforces user isolation, supports bookmark deletion, and is deployed on Vercel for instant access.

🚀 Live Demo
View Live App on Vercel
(Test with your Google account—bookmarks are private and realtime-enabled.)

📖 Features
Google OAuth Only: Secure sign-up and login without email/password fields.
Private Bookmarks: Each user sees only their own bookmarks, enforced by Supabase Row Level Security (RLS).
Realtime Updates: Bookmark list syncs instantly across tabs without refresh (powered by Supabase Realtime).
Add & Delete Bookmarks: Simple URL + title input with validation; delete with optimistic UI.
Book-Themed UI:
Top header search (as a "bookmark ribbon") for global filtering.
Left page: Scrollable bookmark list as "chapters."
Right page: Live iframe preview of selected bookmark with quick notes and actions.
Micro-interactions: Page-flip animations, loading skeletons, and toast notifications.
Advanced UX: URL validation, favicon previews, copy-to-clipboard, dark/light theme toggle, keyboard shortcuts (e.g., 'N' for add modal), and graceful error handling.
Responsive & Accessible: Mobile-friendly with ARIA labels, keyboard navigation, and high-contrast themes.
Production-Ready: Clean, modular code with TypeScript, server/client component separation, and no bundle bloat.
🛠 Tech Stack
Frontend: Next.js 13+ (App Router for SSR/SSG), Tailwind CSS for styling, Lucide React for icons.
Backend: Supabase (Auth for Google OAuth, Database for bookmarks, Realtime for live updates).
Deployment: Vercel (automatic builds from GitHub, zero config).
Other: TypeScript for type safety, React Hot Toast for notifications, Next Themes for dark mode.
📦 Installation & Setup
Clone the Repo:

bash

Copy code
git clone https://github.com/yourusername/smart-bookmark-hub.git
cd smart-bookmark-hub
Install Dependencies:

bash

Copy code
npm install
Set Up Supabase:

Create a free project at supabase.com.
Enable Google OAuth: Go to Authentication > Providers > Google, and add your Google Client ID/Secret (from Google Cloud Console). Set redirect URIs to https://your-vercel-url.vercel.app/auth/callback.
Run this SQL in Supabase SQL Editor to set up the database:
sql

Copy code
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own bookmarks" ON bookmarks
  FOR ALL USING (auth.uid() = user_id);
Note your Project URL and API keys (publishable and secret) from Settings > API.
Environment Variables:

Create .env.local in the root:

Copy code
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
SUPABASE_SERVICE_ROLE_KEY=your_secret_key
Security Note: Never commit .env.local to Git. Use Vercel's env vars for production.
Run Locally:

bash

Copy code
npm run dev
Visit http://localhost:3000. Sign in with Google, add bookmarks, and test realtime across tabs.
🚀 Deployment on Vercel
Connect to Vercel:

Push your code to a public GitHub repo.
Log in to vercel.com, click "Add New Project," and import your GitHub repo.
Vercel auto-detects Next.js—no custom config needed.
Set Environment Variables in Vercel:

In Vercel Dashboard > Settings > Environment Variables, add:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
Set for "Production" (and "Preview" for PRs).
Deploy:

Click "Deploy." Vercel provides a live URL (e.g., https://smart-bookmark-hub.vercel.app).
For previews: Enable "Create preview deployments" in Settings > Git for branch/PR URLs.
Verify:

Test the live URL: Sign in, add/delete bookmarks, check realtime. Ensure RLS blocks cross-user access.
📋 Usage
Sign Up/Login: Click "Sign in with Google" on the landing page.
Dashboard:
Use top search to filter bookmarks instantly.
Click a bookmark on the left to preview its iframe on the right.
Press 'N' or click "+ NEW CHAPTER" to add a bookmark (slide-in modal).
Edit notes, copy URL, or delete from the right panel.
Themes: Toggle dark/light mode in the header.
Realtime: Open two tabs—changes sync immediately.
🐛 Problems Ran Into and Solutions
During development and deployment, I encountered several challenges as a full-stack engineer building for production. Here's a breakdown with solutions:

Supabase Client Initialization Errors on Vercel (500 Errors):

Problem: Deployed app crashed with "Your project's URL and Key are required" because environment variables weren't set in Vercel (local .env.local doesn't transfer).
Solution: Explicitly added NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY in Vercel Dashboard > Environment Variables. Used Supabase's new publishable/secret keys for security. Redeployed, and errors resolved—app now SSRs correctly with auth.
Realtime Updates Not Syncing Across Tabs:

Problem: Initial implementation used basic fetch calls, causing delays and no cross-tab sync.
Solution: Integrated Supabase Realtime in a custom useBookmarks hook with supabaseClient.channel('bookmarks').on('postgres_changes'). Subscribed to user-specific changes, ensuring instant updates. Added optimistic UI for perceived speed.
Google OAuth Redirect Issues:

Problem: Post-login redirects failed due to mismatched URIs in Google Cloud Console.
Solution: Updated Google OAuth settings to include the Vercel URL (https://your-app.vercel.app/auth/callback). Used Supabase's auth helpers for seamless handling.
Book-Themed UI Responsiveness and Accessibility:

Problem: Split-view (left/right pages) broke on mobile, and iframe previews had security/loading issues.
Solution: Used Tailwind's responsive classes (e.g., md:flex for desktop split, flex-col for mobile). Added iframe sandboxing and lazy loading. Implemented ARIA labels, keyboard navigation, and WCAG-compliant contrast ratios.
RLS Policy Enforcement:

Problem: Early tests showed potential data leaks without proper policies.
Solution: Applied strict RLS with auth.uid() = user_id in Supabase SQL. Tested isolation by simulating multi-user scenarios—no cross-access possible.
Bundle Size and Performance:

Problem: Initial builds were slow due to unused imports.
Solution: Used server components for data fetching, client components only for interactivity. Optimized with Next.js Image for favicons and debounced search inputs.
These issues were resolved through iterative testing, Vercel logs, and Supabase docs. The app is now robust, secure, and performant.

