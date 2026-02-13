'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function addBookmark(formData: FormData) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const title = formData.get('title') as string
    const url = formData.get('url') as string

    if (!title || !url) {
        return { error: 'Title and URL are required' }
    }

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'User not authenticated' }
    }

    const { error } = await supabase.from('bookmarks').insert({
        title,
        url,
        user_id: user.id,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/')
    return { success: true }
}

export async function updateBookmark(formData: FormData) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const url = formData.get('url') as string

    if (!id || !title || !url) {
        return { error: 'ID, Title, and URL are required' }
    }

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'User not authenticated' }
    }

    const { error } = await supabase
        .from('bookmarks')
        .update({ title, url })
        .eq('id', id)
        .eq('user_id', user.id) // Ensure ownership

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/')
    return { success: true }
}

export async function deleteBookmark(id: number) {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'User not authenticated' }
    }

    // RLS will ensure they can only delete their own
    const { error } = await supabase.from('bookmarks').delete().eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/')
    return { success: true }
}
