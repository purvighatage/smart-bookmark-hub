# Smart Bookmark Hub - Personal Digital Library

A premium, book-inspired bookmark manager built with **Next.js**, **Supabase**, and **Tailwind CSS**.

## 🎨 Design System: "Personal Library"

The application embodies the aesthetic of a Victorian private library:
- **Visual Metaphor**: An open book lying on a walnut desk.
- **Color Palette**: Deep Walnut (#3E2723), Aged Parchment (#FDF6E3), and Gold Leaf (#DAA520).
- **Typography**: `Crimson Text` (Serif) for that classic printed feel.
- **Interactions**: Page-turning animations, tactile hover effects, and "inscribing" new chapters.

## 🚀 Features

### 1. The Open Book Layout
- **Desktop**: A two-page spread. Left page serves as the **Index** (list of bookmarks), Right page shows the **Content** (preview/details).
- **Responsive**: Adapts to single-page view on tablets and stacked view on mobile.
- **Spine**: Visual Divider with realistic shadows.

### 2. Authentication ("The Gateway")
- **Login Screen**: A grand entrance with gold-leaf accents.
- **Google OAuth**: Seamless sign-in.
- **Middleware**: Protected routes ensure privacy.

### 3. Bookmarks Management
- **Inscribe New Chapter**: A modal that slides down like a loose-leaf paper to add new bookmarks.
- **Privacy (RLS)**: Strict Row Level Security ensures users only see their own collection.

### 4. Real-time Updates
- **Live Sync**: New chapters appear instantly in the index without refreshing, powered by Supabase Realtime.

### 5. User Profile ("The Author's Bio")
- **Profile Page**: A dedicated page (`/profile`) styled like an author's biography.
- **Visuals**: Avatar in a wax-seal frame, stats displayed as "Scholarship Statistics".

### 6. Recommended Reading
- **Source**: OpenLibrary API integration.
- **Features**: Auto-fetching of cover art and "Save to Library" functionality.

## 🛠 Getting Started

### Prerequisites
1.  **Supabase Project**: Create a new project at [supabase.com](https://supabase.com).
2.  **Environment Variables**:
    Create a `.env.local` file:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_project_url
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_anon_key
    ```
3.  **Database Schema**: Run the SQL commands in `supabase/schema.sql` in your Supabase SQL Editor.

### Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## 📦 Deployment to Vercel

1.  Push to GitHub.
2.  Import to Vercel.
3.  Add Environment Variables (Supabase URL & Key).
4.  Deploy.

## 📜 License

MIT
