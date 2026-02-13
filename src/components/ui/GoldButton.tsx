'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface GoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    children: React.ReactNode;
}

export const GoldButton = ({ isLoading, children, className, ...props }: GoldButtonProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading || props.disabled}
            className={`
                relative w-full py-4 px-6 
                bg-gradient-to-b from-yellow-600 via-yellow-500 to-yellow-700
                border-2 border-yellow-200/50 
                rounded-lg shadow-[0_4px_14px_0_rgba(234,179,8,0.39)]
                text-white font-serif font-bold text-lg tracking-wider uppercase
                overflow-hidden group
                disabled:opacity-70 disabled:cursor-not-allowed disabled:grayscale
                ${className}
            `}
            {...(props as any)}
        >
            {/* Inner Bevel Highlight */}
            <div className="absolute inset-0 border border-white/20 rounded-lg pointer-events-none" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 transition-transform bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

            <span className="relative z-10 flex items-center justify-center gap-3 drop-shadow-sm">
                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                {children}
            </span>
        </motion.button>
    );
};
