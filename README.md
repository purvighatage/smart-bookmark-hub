# Smart Bookmark App

A simple, secure, and real-time bookmark manager built with **Next.js**, **Supabase**, and **Tailwind CSS**. This application allows users to store their favorite links in a private, cloud-synced library.

**Live URL:** [https://smart-bookmark-hub.vercel.app](https://smart-bookmark-hub.vercel.app)
**GitHub Repo:** [https://github.com/purvighatage/smart-bookmark-hub](https://github.com/purvighatage/smart-bookmark-hub)

---

## 🚀 Features

-   **Google OAuth Authentication**: Secure sign-up and login using Google accounts only.
-   **Private Bookmarks**: Each user has a private collection. User A cannot see User B's bookmarks (enforced via Row Level Security).
-   **Real-time Updates**: The bookmark list updates instantly across multiple tabs/devices without refreshing the page.
-   **Manage Bookmarks**:
    -   **Add**: Clean interface to add a URL and Title.
    -   **Delete**: Users can remove their own bookmarks.
-   **Responsive Design**: A clean, book-inspired UI that works on desktop and mobile.

---

## 🛠 Tech Stack

-   **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS 4
-   **Backend**: Supabase (PostgreSQL Database, Auth, Realtime)
-   **Styling**: Custom "Victoriana" theme with Lucide Icons and Framer Motion animations.
-   **Deployment**: Vercel

---

## ⚙️ Getting Started

### Prerequisites

1.  Node.js installed.
2.  A Supabase project.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/purvighatage/smart-bookmark-hub.git
    cd smart-bookmark-hub
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root directory:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the application:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚧 Challenges & Solutions

During the development and deployment of this project, I encountered and solved the following issues:

### 1. Next.js 16 Middleware Architecture Changes
**Problem:** The application build process failed due to strict export validation in the Next.js 16 Edge Runtime.
**Technical Context:** Next.js 16 introduced breaking changes to how middleware is resolved. The previously standard named export `middleware` in `src/proxy.ts` is no longer recognized as a valid entry point, causing Turbopack build failures.
**Solution:** I refactored the entry point to export the function as `proxy`, adhering to the updated Next.js routing specifications and ensuring correct middleware invocation during the request lifecycle.

### 2. Edge Runtime Defensive Programming
**Problem:** Unhandled exceptions during the initialization of the Supabase SSR client in the Edge Middleware could cause catastrophic 500 errors.
**Technical Context:** The middleware operates in the Edge Runtime, where strict error handling is critical. Initializing the `createServerClient` with potentially `undefined` environment variables (due to configuration drift) led to immediate runtime crashes before the request could be processed.
**Solution:** I implemented robust null-guard checking within the middleware logic. The system now validates the presence of critical configuration (`Supabase URL` and `Anon Key`) before attempting client instantiation. If configuration is missing, it gracefully degrades by bypassing the auth layer and logging a structured error, maintaining application availability.

### 3. Cross-Environment Configuration Standardization
**Problem:** Inconsistent environment variable nomenclature created friction between Client-side and Server-side contexts.
**Technical Context:** The codebase initially used a non-standard key (`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`), which deviated from the industry-standard `NEXT_PUBLIC_SUPABASE_ANON_KEY` expected by Supabase client libraries and infrastructure-as-code patterns.
**Solution:** I executed a codebase-wide refactor to standardize on `NEXT_PUBLIC_SUPABASE_ANON_KEY`. This involved updating the Singleton client initialization, Server Component patterns, and Auth Route Handlers to ensure a unified configuration source of truth across the full stack.
