'use client';

import { Book } from '@/types/book';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';
import { Bookmark, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface BookCardProps {
    book: Book;
    userId?: string;
}

export const BookCard = ({ book, userId }: BookCardProps) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const supabase = createClient();

    const handleSave = async () => {
        if (!userId) {
            toast.error('Please login to save bookmarks');
            return;
        }

        if (isSaved) return;

        setIsSaving(true);

        try {
            // Check for duplicate first
            const { data: existing } = await supabase
                .from('bookmarks')
                .select('id')
                .eq('user_id', userId)
                .eq('url', `https://openlibrary.org/works/${book.id}`)
                .single();

            if (existing) {
                toast.info('Book already in your library');
                setIsSaved(true);
                return;
            }

            const { error } = await supabase.from('bookmarks').insert({
                user_id: userId,
                title: book.title,
                url: `https://openlibrary.org/works/${book.id}`, // Link to OpenLibrary page
                // Note: Schema currently only has user_id, title, url. 
                // We're adapting the book data to fit the schema.
            });

            if (error) throw error;

            setIsSaved(true);
            toast.success(`"${book.title}" added to library`);

        } catch (error) {
            console.error('Save error:', error);
            toast.error('Failed to save book');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="group relative bg-[var(--color-parchment)] rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-[var(--color-parchment-dim)]"
        >
            {/* Cover Image Area */}
            <div className="relative aspect-[2/3] w-full overflow-hidden bg-[var(--color-walnut)]">
                {book.coverUrl ? (
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[var(--color-parchment)] text-center p-4">
                        <span className="font-serif italic">{book.title}</span>
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(62,39,35,0.8)] to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-serif font-bold text-lg text-[var(--color-ink)] leading-tight mb-1 line-clamp-2">
                    {book.title}
                </h3>
                <p className="font-mono text-xs text-[var(--color-saddle-brown)] mb-4 uppercase tracking-wider">
                    {book.author}
                </p>

                <div className="mt-auto pt-4 border-t border-[var(--color-gold-dim)] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[var(--color-ink-faded)]">
                        {book.publishYear || 'Classic'}
                    </span>

                    <button
                        onClick={handleSave}
                        disabled={isSaving || isSaved}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold font-serif transition-colors
                            ${isSaved
                                ? 'bg-[var(--color-gold-dim)] text-[var(--color-walnut)] cursor-default'
                                : 'bg-[var(--color-saddle-brown)] text-[var(--color-parchment)] hover:bg-[var(--color-walnut)]'
                            }
                            disabled:opacity-70 disabled:cursor-not-allowed
                        `}
                        aria-label={isSaved ? "Saved to Library" : "Save to Library"}
                    >
                        {isSaving ? (
                            <Loader2 className="w-3 h-3 animate-spin" />
                        ) : isSaved ? (
                            <Check className="w-3 h-3" />
                        ) : (
                            <Bookmark className="w-3 h-3" />
                        )}
                        {isSaved ? 'In Library' : 'Save'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
