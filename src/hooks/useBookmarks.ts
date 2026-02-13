'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { deleteBookmark } from '@/actions/bookmark-actions'
import { toast } from 'sonner'

export type Bookmark = {
    id: number
    title: string
    url: string
    created_at: string
}

export function useBookmarks(initialBookmarks: Bookmark[]) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
    const supabase = createClient()

    useEffect(() => {
        // Reset state when initials change (e.g. server re-render)
        setBookmarks(initialBookmarks)

        const channel = supabase
            .channel('realtime bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                },
                (payload: any) => {
                    console.log('Real-time payload received:', payload);
                    if (payload.eventType === 'INSERT') {
                        setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== payload.old.id));
                    } else if (payload.eventType === 'UPDATE') {
                        setBookmarks((prev) => prev.map((b) => b.id === payload.new.id ? payload.new as Bookmark : b));
                    }
                }
            )
            .subscribe((status: any) => {
                if (status === 'SUBSCRIBED') {
                    console.log('Real-time connection established for bookmarks.');
                }
                if (status === 'CHANNEL_ERROR') {
                    console.error('Real-time connection failed.');
                }
            });

        return () => {
            supabase.removeChannel(channel);
        };
    }, [initialBookmarks, supabase]);

    const handleDelete = async (id: number) => {
        // Optimistic update
        const previousBookmarks = bookmarks
        setBookmarks(bookmarks.filter(b => b.id !== id))

        const result = await deleteBookmark(id)
        if (result?.error) {
            setBookmarks(previousBookmarks) // Revert if error
            toast.error(result.error)
        } else {
            toast.success('Chapter removed')
        }
    }

    return {
        bookmarks,
        handleDelete
    }
}
