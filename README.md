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

### 1. Next.js 16 Middleware Build Error
**Problem:** The deployment failed with `Error: Turbopack build failed... Proxy is missing expected function export name`.
**Context:** Next.js 16 changed how middleware functions are identified. The file `src/proxy.ts` was exporting a function named `middleware`, which is no longer the expected default.
**Solution:** I renamed the exported function in `src/proxy.ts` from `middleware` to `proxy` to align with the new Next.js 16 requirements.

### 2. Vercel 500 Internal Server Error (Missing Env Vars)
**Problem:** After a successful build, the deployed application crashed with a "500 Internal Server Error".
**Context:** The middleware (`src/utils/supabase/middleware.ts`) was using non-null assertions (`!`) to access environment variables. On Vercel, if these variables were missing (which they were initially), the server-side code threw an exception, crashing the entire app.
**Solution:** I implemented a safety check in the middleware. Instead of crashing, the code now checks if `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` exist. If they are missing, it logs an error and allows the request to proceed (bypassing auth), which prevents the 500 error and makes debugging easier.

### 3. Environment Variable Naming Inconsistency
**Problem:** The codebase was using a non-standard environment variable name: `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`.
**Context:** This naming convention was inconsistent with standard documentation and deployment instructions, leading to potential confusion when setting up the project on Vercel.
**Solution:** I refactored the entire codebase (Client, Server, Middleware, and Auth Route) to use the standard `NEXT_PUBLIC_SUPABASE_ANON_KEY`. I then updated the `.env.local` file and the documentation to match.
