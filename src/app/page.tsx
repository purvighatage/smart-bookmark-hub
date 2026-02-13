import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import SigninPage from '@/app/auth/signin/page';
import { BookLayout } from '@/components/library/BookLayout'

export default async function Home() {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return <SigninPage />
    }

    const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('*')
        .order('created_at', { ascending: false })

    return <BookLayout initialBookmarks={bookmarks || []} user={user} />
}

