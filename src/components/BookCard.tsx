'use client'

import { ExternalLink, Trash2, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

type Bookmark = {
    id: number
    title: string
    url: string
    created_at: string
}

export default function BookCard({ bookmark, onDelete }: { bookmark: Bookmark, onDelete: (id: number) => void }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(bookmark.url)
            setCopied(true)
            toast.success('Link copied to clipboard')
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error('Failed to copy link')
        }
    }

    // Google Favicon Service
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=32`

    return (
        <div className="group relative flex items-center justify-between p-4 border-b border-stone-200 hover:bg-stone-100 transition-colors animate-page-turn">
            <div className="flex items-center gap-3 overflow-hidden flex-1">
                {/* Favicon / Book Cover Icon */}
                <div className="flex-shrink-0 w-8 h-8 bg-stone-200 rounded-sm border border-stone-300 flex items-center justify-center overflow-hidden">
                    <img
                        src={faviconUrl}
                        alt="cover"
                        className="w-5 h-5 opacity-80"
                        onError={(e) => {
                            e.currentTarget.style.display = 'none'
                        }}
                    />
                </div>

                <div className="flex flex-col gap-0.5 overflow-hidden flex-1">
                    <h3 className="font-serif text-lg text-ink font-bold leading-tight group-hover:text-amber-700 transition-colors truncate">
                        {bookmark.title}
                    </h3>
                    <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-xs font-sans text-stone-500 flex items-center gap-1 hover:underline truncate w-fit">
                        <ExternalLink size={12} />
                        {new URL(bookmark.url).hostname}
                    </a>
                </div>
            </div>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button
                    onClick={handleCopy}
                    className="p-2 text-stone-400 hover:text-amber-700 transition-colors"
                    title="Copy reference"
                >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>

                <button
                    onClick={() => onDelete(bookmark.id)}
                    className="p-2 text-stone-400 hover:text-red-600 transition-colors"
                    title="Tear out page"
                >
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    )
}
