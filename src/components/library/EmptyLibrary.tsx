'use client';

import { BookOpen } from 'lucide-react';

export const EmptyLibrary = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full p-12 text-center opacity-70">
            <div className="w-24 h-24 mb-6 rounded-full bg-[var(--color-walnut)] border-4 border-[var(--color-gold-dim)] flex items-center justify-center shadow-inner">
                <BookOpen className="w-12 h-12 text-[var(--color-parchment)]" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[var(--color-ink)] mb-2">The Shelves Are Bare</h3>
            <p className="font-serif italic text-lg text-[var(--color-ink-faded)] max-w-sm">
                "A library without books is like a body without a soul." <br />
                — Cicero
            </p>
            <div className="mt-8 text-sm font-mono text-[var(--color-ink-faded)]">
                Press 'N' to inscribe your first chapter.
            </div>
        </div>
    );
};
