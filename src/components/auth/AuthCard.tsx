'use client';

import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export const AuthCard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const supabase = createClient();

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                toast.error(error.message);
                setIsLoading(false);
            }
        } catch (error) {
            toast.error('An unexpected error occurred.');
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-md p-1"
        >
            {/* Glow Effect behind card */}
            <div className="absolute inset-0 bg-[var(--color-gold)] opacity-20 blur-2xl rounded-[var(--radius-book)]" />

            <div className="relative bg-[var(--color-parchment)] border-4 border-[var(--color-saddle-brown)] rounded-[var(--radius-book)] shadow-book p-8 md:p-12 overflow-hidden flex flex-col items-center text-center">

                {/* Vintage Texture Overlay */}
                <div className="absolute inset-0 texture-paper opacity-40 pointer-events-none" />

                {/* Corner Ornaments (CSS Borders) */}
                <div className="absolute top-2 left-2 w-16 h-16 border-t-2 border-l-2 border-[var(--color-gold-dim)] rounded-tl-lg opacity-60" />
                <div className="absolute top-2 right-2 w-16 h-16 border-t-2 border-r-2 border-[var(--color-gold-dim)] rounded-tr-lg opacity-60" />
                <div className="absolute bottom-2 left-2 w-16 h-16 border-b-2 border-l-2 border-[var(--color-gold-dim)] rounded-bl-lg opacity-60" />
                <div className="absolute bottom-2 right-2 w-16 h-16 border-b-2 border-r-2 border-[var(--color-gold-dim)] rounded-br-lg opacity-60" />

                {/* Content */}
                <div className="relative z-10 w-full flex flex-col items-center">

                    {/* Icon / Emblem */}
                    <div className="mb-6 w-16 h-16 bg-[var(--color-walnut)] rounded-full flex items-center justify-center border-2 border-[var(--color-gold)] shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                    </div>

                    <h1 className="font-serif font-bold text-3xl text-[var(--color-ink)] mb-1 tracking-wide">
                        The Library
                    </h1>

                    <p className="font-mono text-xs text-[var(--color-saddle-brown)] mb-8 uppercase tracking-widest opacity-80">
                        Enter the Hall of Knowledge
                    </p>

                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--color-gold-dim)] to-transparent opacity-50 mb-8" />

                    <button
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                        className="
                            group relative w-full py-4 px-6 
                            bg-[var(--color-parchment-dim)] hover:bg-[var(--color-parchment)]
                            border-2 border-[var(--color-gold-dim)] hover:border-[var(--color-gold)]
                            text-[var(--color-ink)] font-serif font-bold text-lg
                            rounded shadow-sm hover:shadow-md hover:-translate-y-1
                            transition-all duration-300
                            flex items-center justify-center gap-3
                            disabled:opacity-70 disabled:cursor-not-allowed
                        "
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-[var(--color-saddle-brown)]" />
                        ) : (
                            // Simple Google G Icon replacement for theme consistency or use standard SVG
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                        )}
                        <span>{isLoading ? 'Opening the Gates...' : 'Sign in with Google'}</span>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:animate-shimmer pointer-events-none" />
                    </button>

                    <p className="mt-8 text-[10px] font-mono text-[var(--color-ink-faded)] opacity-60 max-w-xs leading-relaxed">
                        By entering, you agree to record your journey in the sacred archives of this browser.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
