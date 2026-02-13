'use client';

import { Search, LogOut, User as UserIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface BookShelfHeaderProps {
    userEmail?: string;
    onSearch?: (query: string) => void;
    searchQuery?: string;
}

export const BookShelfHeader = ({ userEmail, onSearch, searchQuery }: BookShelfHeaderProps) => {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh(); // Ensure server state is cleared
    };

    return (
        <header className="w-full h-20 bg-[var(--color-saddle-brown)] flex items-center justify-between px-8 border-b-4 border-[var(--color-walnut)] shadow-lg relative z-50">
            {/* Logo Area: Embossed Gold Text */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-2 border-[var(--color-gold)] rounded flex items-center justify-center bg-[var(--color-walnut)] shadow-inner">
                    <span className="text-[var(--color-gold)] font-serif font-bold text-xl">B</span>
                </div>
                <h1 className="text-[var(--color-parchment)] font-serif font-bold text-xl tracking-wider drop-shadow-md hidden md:block">
                    MY DIGITAL LIBRARY
                </h1>
            </div>

            {/* Center: Search Input (Slide Out) */}
            <div className="flex-1 max-w-xl mx-8 relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-[var(--color-gold-dim)] group-focus-within:text-[var(--color-gold)] transition-colors" />
                </div>
                <input
                    type="text"
                    value={searchQuery || ''}
                    onChange={(e) => onSearch?.(e.target.value)}
                    placeholder="Search your collection..."
                    className="block w-full pl-10 pr-3 py-2 border-2 border-[var(--color-walnut)] rounded-md leading-5 bg-[var(--color-parchment-dim)] text-[var(--color-ink)] placeholder-[var(--color-ink-faded)] focus:outline-none focus:bg-[var(--color-parchment)] focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] sm:text-sm transition-all shadow-inner font-serif"
                    aria-label="Search bookmarks"
                />
            </div>

            {/* Right: User Profile (Engraved Plate) */}
            <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end text-[var(--color-parchment)] text-xs font-mono opacity-80">
                    <span>LIBRARIAN</span>
                    <span className="font-bold text-[var(--color-gold)]">{userEmail || 'Guest'}</span>
                </div>

                <div
                    onClick={() => router.push('/profile')}
                    className="w-10 h-10 bg-[var(--color-walnut)] rounded-full border border-[var(--color-gold-dim)] flex items-center justify-center text-[var(--color-gold)] shadow-lg overflow-hidden relative group cursor-pointer transition-transform hover:scale-105"
                    title="Open Author Profile"
                >
                    <UserIcon className="w-5 h-5" />
                </div>

                <button
                    onClick={handleSignOut}
                    className="ml-2 p-2 text-[var(--color-parchment)] hover:text-[var(--color-gold)] transition-colors"
                    title="Sign Out"
                    aria-label="Sign Out"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>

            <div className="absolute top-full right-8 mt-2">
                <button
                    onClick={() => router.push('/recommended')}
                    className="text-[var(--color-gold)] text-xs font-mono hover:underline hover:text-[var(--color-parchment)] transition-colors flex items-center gap-1"
                >
                    Recommended Reading &rarr;
                </button>
            </div>

            {/* Shelf Edge Highlight */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.3)] pointer-events-none" />
        </header>
    );
};
