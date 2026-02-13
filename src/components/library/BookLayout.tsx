'use client';

import { useState, useEffect } from 'react';
import { Bookmark, useBookmarks } from '@/hooks/useBookmarks';
import { BookShelfHeader } from './BookShelfHeader';
import { BookmarkPageCard } from './BookmarkPageCard';
import { EmptyLibrary } from './EmptyLibrary';
import { PageInsertModal } from './PageInsertModal';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, Plus } from 'lucide-react';

interface BookLayoutProps {
    initialBookmarks: Bookmark[];
    user: any; // Using any for Supabase user object simplicity, ideally generic
}

export const BookLayout = ({ initialBookmarks, user }: BookLayoutProps) => {
    const { bookmarks, handleDelete } = useBookmarks(initialBookmarks);
    const [activeBookmark, setActiveBookmark] = useState<Bookmark | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

    const handleEdit = (bookmark: Bookmark) => {
        setEditingBookmark(bookmark);
        setIsAddModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsAddModalOpen(false);
        setEditingBookmark(null);
    };

    // Initial Active State
    useEffect(() => {
        if (!activeBookmark && bookmarks.length > 0) {
            setActiveBookmark(bookmarks[0]);
        }
    }, [bookmarks, activeBookmark]);

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeys = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement;
            // Ensure e.key exists and target has a tagName (avoid crashing on non-elements)
            if (e.key && e.key.toLowerCase() === 'n' && target.tagName && !['INPUT', 'TEXTAREA'].includes(target.tagName)) {
                e.preventDefault();
                setEditingBookmark(null);
                setIsAddModalOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, []);

    // Helper: Filter
    const filteredBookmarks = bookmarks.filter(b =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.url.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-walnut)] texture-wood text-[var(--color-parchment)] overflow-hidden">
            {/* 1. Header (The Shelf) */}
            <BookShelfHeader
                userEmail={user?.email}
                onSearch={setSearchQuery}
                searchQuery={searchQuery}
            />

            {/* 2. Main Desk Surface */}
            <main className="flex-1 p-4 md:p-8 flex items-center justify-center relative">

                {/* 3. The Book Container */}
                <div className="relative w-full max-w-7xl aspect-[16/10] bg-[var(--color-saddle-brown)] rounded-[var(--radius-book)] shadow-book flex overflow-hidden border-8 border-[var(--color-saddle-brown)]">

                    {/* LEFT PAGE: The Index (List) */}
                    <div className="flex-1 bg-[var(--color-parchment)] relative flex flex-col border-r-2 border-[rgba(0,0,0,0.1)] z-10">
                        <div className="absolute inset-0 texture-paper opacity-50 pointer-events-none" />

                        {/* Title of Index */}
                        <div className="p-6 border-b border-[var(--color-gold-dim)] relative z-10 flex justify-between items-center text-[var(--color-ink)]">
                            <h2 className="font-serif font-bold text-2xl tracking-widest uppercase opacity-80 decoration-double underline decoration-[var(--color-gold)] underline-offset-4">
                                Index
                            </h2>
                            <span className="font-mono text-xs opacity-50">{filteredBookmarks.length} Entries</span>
                        </div>

                        {/* List Content */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 relative z-10 space-y-2">
                            <AnimatePresence mode="popLayout">
                                {filteredBookmarks.length > 0 ? (
                                    filteredBookmarks.map((bookmark) => (
                                        <BookmarkPageCard
                                            key={bookmark.id}
                                            bookmark={bookmark}
                                            isActive={activeBookmark?.id === bookmark.id}
                                            onClick={() => setActiveBookmark(bookmark)}
                                            onDelete={handleDelete}
                                            onEdit={handleEdit}
                                        />
                                    ))
                                ) : (
                                    <EmptyLibrary />
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer / Add Action */}
                        <div className="p-4 bg-[rgba(245,245,220,0.5)] border-t border-[var(--color-gold-dim)] relative z-10">
                            <button
                                onClick={() => {
                                    setEditingBookmark(null);
                                    setIsAddModalOpen(true);
                                }}
                                className="w-full py-3 border-2 border-[var(--color-ink-faded)] border-dashed rounded text-[var(--color-ink)] font-serif font-bold uppercase hover:bg-[var(--color-parchment-dim)] hover:border-[var(--color-gold)] hover:text-[var(--color-gold-dim)] transition-all flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Inscribe New Page
                            </button>
                        </div>
                    </div>

                    {/* CENTER SPINE (Visual Only) */}
                    <div className="w-4 bg-gradient-to-r from-[rgba(0,0,0,0.2)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.2)] bg-[var(--color-parchment-dim)] shadow-inner z-20 relative hidden md:block" />

                    {/* RIGHT PAGE: The Content (Preview) */}
                    <div
                        className="flex-1 bg-[var(--color-parchment)] relative hidden md:flex flex-col z-10"
                        style={{ perspective: "1000px" }}
                    >
                        <div className="absolute inset-0 texture-paper opacity-50 pointer-events-none" />
                        <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[rgba(0,0,0,0.1)] to-transparent pointer-events-none z-20" /> {/* Page curl shadow */}

                        <AnimatePresence mode="wait">
                            {activeBookmark ? (
                                <motion.div
                                    key={activeBookmark.id}
                                    initial={{ rotateY: -90, opacity: 0 }}
                                    animate={{ rotateY: 0, opacity: 1 }}
                                    exit={{ rotateY: -90, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                                    style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
                                    className="flex-1 flex flex-col relative z-10 p-8 h-full origin-left"
                                >
                                    {/* Header */}
                                    <div className="mb-6 border-b-2 border-[var(--color-gold)] pb-4">
                                        <h1 className="font-serif font-bold text-4xl text-[var(--color-ink)] leading-tight mb-2">
                                            {activeBookmark.title}
                                        </h1>
                                        <a
                                            href={activeBookmark.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-mono text-[var(--color-crimson)] text-sm flex items-center gap-2 hover:underline opacity-80 hover:opacity-100"
                                        >
                                            <ExternalLink className="w-3 h-3" />
                                            {activeBookmark.url}
                                        </a>
                                    </div>

                                    {/* Content Area (Iframe or Placeholder) */}
                                    <div className="flex-1 bg-white border border-[var(--color-ink-faded)] shadow-inner relative overflow-hidden rounded-sm">
                                        <iframe
                                            src={activeBookmark.url}
                                            className="w-full h-full border-none opacity-90"
                                            sandbox="allow-scripts allow-same-origin"
                                            title="Preview"
                                        />
                                        {/* Overlay for failed iframes */}
                                        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-[var(--color-parchment)] opacity-0 hover:opacity-90 transition-opacity duration-300 z-10 border-4 border-dashed border-[var(--color-gold-dim)] m-4">
                                            <p className="font-serif text-[var(--color-ink)] mb-4 font-bold text-xl">View Original Source</p>
                                            <a
                                                href={activeBookmark.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="pointer-events-auto px-6 py-3 bg-[var(--color-saddle-brown)] text-[var(--color-parchment)] font-bold rounded shadow-lg hover:scale-105 transition-transform"
                                            >
                                                Open External Link
                                            </a>
                                        </div>
                                    </div>

                                    {/* Footer (Metadata) */}
                                    <div className="mt-4 flex justify-between text-xs font-mono text-[var(--color-ink-faded)] opacity-50">
                                        <span>Date Inscribed: {new Date(activeBookmark.created_at).toLocaleDateString()}</span>
                                        <span>Page: {activeBookmark.id}</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-1 flex items-center justify-center relative z-10"
                                >
                                    <p className="font-serif italic text-2xl text-[var(--color-ink-faded)] opacity-40">Select a chapter to begin reading...</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Modals */}
            <PageInsertModal
                isOpen={isAddModalOpen}
                onClose={handleCloseModal}
                initialData={editingBookmark}
                mode={editingBookmark ? 'edit' : 'add'}
            />
        </div>
    );
};
