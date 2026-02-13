'use client';

import { motion } from 'framer-motion';
import { EngravedButton } from '@/components/ui/EngravedButton';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import { toast } from 'sonner';

export const MythicFrame = () => {
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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full max-w-xl mx-auto"
        >
            {/* Outer Frame (The Book Cover) */}
            <div className="relative bg-[#1a110d] p-3 rounded-lg shadow-2xl shadow-black/80 ring-1 ring-[#3E2723]">

                {/* Gold Border Ornament */}
                <div className="absolute inset-2 border-[3px] border-[#B8860B] rounded opacity-70 pointer-events-none" />
                <div className="absolute inset-3 border border-[#DAA520] rounded opacity-40 pointer-events-none" />

                {/* Corner Ornaments (CSS) */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-[3px] border-l-[3px] border-[#DAA520] rounded-tl-sm" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-[3px] border-r-[3px] border-[#DAA520] rounded-tr-sm" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-[3px] border-l-[3px] border-[#DAA520] rounded-bl-sm" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-[3px] border-r-[3px] border-[#DAA520] rounded-br-sm" />

                {/* Inner Panel (The Parchment Page) */}
                <div className="relative bg-[var(--color-parchment)] py-8 px-6 sm:py-12 sm:px-8 md:px-12 rounded shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] overflow-hidden">

                    {/* Texture Overlays */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,transparent_0%,#3E2723_100%)] pointer-events-none" />

                    {/* Content Container */}
                    <div className="relative z-10 flex flex-col items-center text-center space-y-6 sm:space-y-8">

                        {/* Mythic Emblem */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#1a110d] border-2 border-[#DAA520] flex items-center justify-center shadow-lg relative group">
                            <div className="absolute inset-0 rounded-full border border-[#B8860B] animate-pulse opacity-50" />
                            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#DAA520] drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L1 21h22L12 2zm0 3.8l7.53 13.2H4.47L12 5.8zM12 11c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                        </div>

                        {/* Title Block */}
                        <div>
                            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#3E2723] uppercase tracking-widest drop-shadow-sm border-b-2 border-[#DAA520]/30 pb-4 mb-2">
                                Archives of Olympus
                            </h1>
                            <p className="font-serif italic text-[#5D4037] text-lg">
                                Enter the Sacred Library
                            </p>
                        </div>

                        {/* Login Action */}
                        <div className="w-full pt-4">
                            <EngravedButton
                                onClick={handleGoogleLogin}
                                isLoading={isLoading}
                            >
                                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#fff" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#fff" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fff" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#fff" />
                                </svg>
                                Enter via Google
                            </EngravedButton>
                        </div>

                        {/* Seal */}
                        <div className="mt-8 opacity-40 mix-blend-multiply">
                            <div className="w-16 h-16 border-2 border-[#5D4037] rounded-full flex items-center justify-center p-1 transform rotate-12">
                                <div className="w-full h-full border border-[#5D4037] border-dashed rounded-full flex items-center justify-center text-[8px] font-mono text-center leading-tight text-[#5D4037]">
                                    SECURE<br />ARCHIVE<br />protocol
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
};
