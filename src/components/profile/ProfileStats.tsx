'use client';

import { motion } from 'framer-motion';
import { Book, Clock, Calendar } from 'lucide-react';

interface ProfileStatsProps {
    totalBookmarks: number;
    lastActive: string | null;
    memberSince: string;
}

export const ProfileStats = ({ totalBookmarks, lastActive, memberSince }: ProfileStatsProps) => {
    const stats = [
        {
            label: "Total Volumes",
            value: totalBookmarks,
            icon: Book,
            color: "text-[var(--color-saddle-brown)]"
        },
        {
            label: "Last Inscription",
            value: lastActive ? new Date(lastActive).toLocaleDateString() : 'N/A',
            icon: Clock,
            color: "text-[var(--color-ink)]"
        },
        {
            label: "Member Since",
            value: new Date(memberSince).toLocaleDateString(),
            icon: Calendar,
            color: "text-[var(--color-ink-faded)]"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-12 border-y-2 border-[var(--color-gold-dim)] border-double py-8 bg-[rgba(255,255,255,0.2)]">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (index * 0.1) }}
                    className="flex flex-col items-center text-center p-4 border-r last:border-r-0 border-[var(--color-gold-dim)] border-opacity-30"
                >
                    <stat.icon className={`w-6 h-6 mb-3 ${stat.color} opacity-70`} />
                    <span className="font-serif text-2xl font-bold text-[var(--color-ink)] mb-1">
                        {stat.value}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--color-ink-faded)]">
                        {stat.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};
