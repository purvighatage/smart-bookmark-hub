'use client';

import { motion } from 'framer-motion';
import { GoldButton } from '@/components/ui/GoldButton';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import { toast } from 'sonner';

export const AncientCard = () => {
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
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-full max-w-md"
        >
            {/* Card Shadows/Glow */}
            <div className="absolute inset-0 bg-yellow-900/40 blur-3xl transform scale-110 rounded-full" />

            {/* Main Manuscript Card */}
            <div className="relative bg-[#FDFBF7] dark:bg-[#1a1614] p-12 rounded-xl shadow-2xl border-4 border-double border-yellow-700/30 overflow-hidden">

                {/* Vintage Paper Texture */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" />

                {/* Greek Key Pattern (Simplified CSS representation top/bottom) */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-repeat-x opacity-20 border-b border-yellow-800/20"
                    style={{ backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)`, backgroundSize: '10px 10px', backgroundPosition: '0 0, 5px 5px' }} />
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-repeat-x opacity-20 border-t border-yellow-800/20"
                    style={{ backgroundImage: `linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)`, backgroundSize: '10px 10px', backgroundPosition: '0 0, 5px 5px' }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">

                    {/* Emblem */}
                    <div className="mb-8 p-4 rounded-full border-2 border-yellow-600/50 bg-yellow-50/50 dark:bg-yellow-900/20">
                        <svg className="w-12 h-12 text-yellow-700 dark:text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                        </svg>
                    </div>

                    <h1 className="font-serif text-4xl font-bold text-slate-800 dark:text-amber-50 mb-2 tracking-tight">
                        Library of Wisdom
                    </h1>

                    <p className="font-serif italic text-slate-500 dark:text-amber-200/60 mb-10 text-lg">
                        Enter the Archives
                    </p>

                    <GoldButton
                        onClick={handleGoogleLogin}
                        isLoading={isLoading}
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" fillOpacity="0.9" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" fillOpacity="0.7" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" fillOpacity="0.6" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" fillOpacity="0.8" />
                        </svg>
                        Sign in with Google
                    </GoldButton>

                    <div className="mt-8 flex items-center justify-center gap-4 text-xs font-serif text-slate-400 dark:text-slate-600">
                        <span className="h-px w-8 bg-current opacity-30" />
                        <span>EST. MMXIV</span>
                        <span className="h-px w-8 bg-current opacity-30" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
