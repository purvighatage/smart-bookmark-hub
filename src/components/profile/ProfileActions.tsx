'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { LogOut, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProfileActions = () => {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-4"
        >
            <button
                onClick={() => router.push('/')}
                className="px-6 py-3 border-2 border-[var(--color-saddle-brown)] text-[var(--color-saddle-brown)] font-bold font-serif rounded hover:bg-[var(--color-saddle-brown)] hover:text-[var(--color-parchment)] transition-all flex items-center gap-2"
            >
                <ArrowLeft className="w-4 h-4" />
                Return to Library
            </button>
            <button
                onClick={handleSignOut}
                className="px-6 py-3 bg-[var(--color-walnut)] text-[var(--color-parchment)] font-bold font-serif rounded shadow-lg hover:bg-[var(--color-crimson)] transition-colors flex items-center gap-2"
            >
                <LogOut className="w-4 h-4" />
                Sign Out
            </button>
        </motion.div>
    );
};
