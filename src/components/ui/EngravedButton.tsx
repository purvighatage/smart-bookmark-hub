'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface EngravedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
}

export const EngravedButton = ({ isLoading, children, className, ...props }: EngravedButtonProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.01, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.98, filter: "brightness(0.95)" }}
            disabled={isLoading || props.disabled}
            className={`
                group relative w-full py-4 px-6
                bg-gradient-to-br from-[#C5A059] via-[#E6C683] to-[#9A7B3E]
                text-[#3E2723] font-serif font-bold text-lg tracking-[0.15em] uppercase
                border border-[#F7E7CE]/40
                shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.1)]
                rounded-sm
                overflow-hidden
                disabled:opacity-70 disabled:grayscale
                ${className}
            `}
            {...(props as any)}
        >
            {/* Engraved Effect (Inner Shadow) */}
            <div className="absolute inset-0 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] pointer-events-none rounded-sm" />

            {/* Metal Sheen Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none skew-x-12" />

            <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-[0_1px_0_rgba(255,255,255,0.4)]">
                {isLoading && <Loader2 className="w-5 h-5 animate-spin text-[#3E2723]" />}
                {children}
            </span>
        </motion.button>
    );
};
