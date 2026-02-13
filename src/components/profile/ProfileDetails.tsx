'use client';

import { motion } from 'framer-motion';

interface ProfileDetailsProps {
    email: string;
    userId: string;
}

export const ProfileDetails = ({ email, userId }: ProfileDetailsProps) => {
    // Mask User ID: Show last 6 chars
    const maskedId = `...${userId.slice(-6)}`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="w-full max-w-2xl bg-[var(--color-parchment-dim)] p-8 rounded border border-[var(--color-gold-dim)] shadow-inner mb-8"
        >
            <h3 className="font-serif font-bold text-xl text-[var(--color-saddle-brown)] mb-6 border-b border-[var(--color-gold-dim)] pb-2">
                Registry Information
            </h3>

            <dl className="grid grid-cols-1 gap-4 font-mono text-sm">
                <div className="flex justify-between items-center py-2 border-b border-[rgba(0,0,0,0.05)]">
                    <dt className="text-[var(--color-ink-faded)]">Email Address</dt>
                    <dd className="text-[var(--color-ink)] font-bold">{email}</dd>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[rgba(0,0,0,0.05)]">
                    <dt className="text-[var(--color-ink-faded)]">Library ID</dt>
                    <dd className="text-[var(--color-ink)] font-bold tracking-widest">{maskedId}</dd>
                </div>
                <div className="flex justify-between items-center py-2">
                    <dt className="text-[var(--color-ink-faded)]">Account Status</dt>
                    <dd className="text-[var(--color-gold-dim)] font-bold uppercase">Active Scholar</dd>
                </div>
            </dl>
        </motion.div>
    );
};
