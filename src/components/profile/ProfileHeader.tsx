'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface ProfileHeaderProps {
    userEmail: string;
    avatarUrl?: string;
}

export const ProfileHeader = ({ userEmail, avatarUrl }: ProfileHeaderProps) => {
    // Extract name from email for display if no explicit name
    const displayName = userEmail.split('@')[0];

    return (
        <div className="flex flex-col items-center mb-12 text-center">
            {/* Wax Seal Avatar Frame */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                className="relative w-32 h-32 mb-6 group cursor-default"
            >
                {/* Seal Border */}
                <div className="absolute inset-0 rounded-full border-[6px] border-[var(--color-gold)] bg-[var(--color-saddle-brown)] shadow-lg flex items-center justify-center overflow-hidden">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover opacity-90 sepia-[.3]" />
                    ) : (
                        <User className="w-16 h-16 text-[var(--color-gold)]" />
                    )}
                </div>

                {/* Decorative Ribbon/Seal Effect */}
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[var(--color-crimson)] rounded-full border-2 border-[var(--color-gold)] flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform">
                    <span className="text-[var(--color-parchment)] font-serif font-bold text-xs">Auth</span>
                </div>
            </motion.div>

            {/* Name/Role */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                <span className="block font-mono text-xs tracking-widest text-[var(--color-gold-dim)] uppercase mb-2">The Author</span>
                <h1 className="text-4xl font-serif font-bold text-[var(--color-ink)] mb-2 capitalize decoration-wavy underline decoration-[var(--color-gold-dim)] underline-offset-8">
                    {displayName}
                </h1>
            </motion.div>
        </div>
    );
};
