'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Trash2 } from 'lucide-react';
import { Bookmark } from '@/hooks/useBookmarks';

interface BookmarkPageCardProps {
    bookmark: Bookmark;
    isActive: boolean;
    onClick: () => void;
    onDelete: (id: number) => void;
    onEdit: (bookmark: Bookmark) => void;
}

export const BookmarkPageCard = ({ bookmark, isActive, onClick, onDelete, onEdit }: BookmarkPageCardProps) => {
    // Get domain for favicon/display
    const domain = new URL(bookmark.url).hostname;
    const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

    return (
        <motion.article
            layout="position"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
            onClick={onClick}
            className={`group relative p-4 mb-3 rounded border-l-4 transition-all cursor-pointer overflow-hidden
                ${isActive
                    ? 'bg-[var(--color-parchment-dim)] border-[var(--color-gold)] shadow-md'
                    : 'bg-transparent border-transparent hover:bg-[rgba(0,0,0,0.03)] hover:border-[var(--color-gold-dim)]'
                }
            `}
            role="button"
            aria-current={isActive ? 'true' : undefined}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
        >
            {/* Content Container */}
            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4 overflow-hidden">
                    {/* Favicon as Chapter Icon */}
                    <div className="w-8 h-8 flex-shrink-0 bg-white p-1 rounded border border-[var(--color-gold-dim)] shadow-sm">
                        <img
                            src={faviconUrl}
                            alt=""
                            className="w-full h-full object-contain opacity-80 decoration-slice"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>

                    {/* Text Details */}
                    <div className="flex flex-col overflow-hidden">
                        <h3 className={`font-serif text-lg font-bold truncate leading-tight transition-colors ${isActive ? 'text-[var(--color-ink)]' : 'text-[var(--color-ink-faded)] group-hover:text-[var(--color-ink)]'}`}>
                            {bookmark.title}
                        </h3>
                        <span className="text-xs font-mono text-[var(--color-ink-faded)] opacity-60 truncate">
                            {domain}
                        </span>
                    </div>
                </div>

                {/* Actions (Visible on Hover/Focus) */}
                <div className={`flex items-center gap-2 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100'}`}>
                    <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-[var(--color-ink-faded)] hover:text-[var(--color-gold)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                        title="Open in New Tab"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(bookmark);
                        }}
                        className="p-2 text-[var(--color-ink-faded)] hover:text-[var(--color-gold)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)]"
                        title="Rewrite (Edit)"
                        aria-label="Edit Bookmark"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                        >
                            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            <path d="m15 5 4 4" />
                        </svg>
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(bookmark.id);
                        }}
                        className="p-2 text-[var(--color-ink-faded)] hover:text-[var(--color-crimson)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--color-crimson)]"
                        title="Tear Page (Delete)"
                        aria-label="Delete Bookmark"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Active Indicator Line */}
            {isActive && (
                <motion.div
                    layoutId="active-line"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[var(--color-gold)] to-transparent opacity-50"
                />
            )}
        </motion.article>
    );
};
