import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { BookShelfHeader } from '@/components/library/BookShelfHeader';
import { getProfile } from '@/actions/profile-actions';
import { ProfileView } from '@/components/profile/ProfileView';

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/signin');
    }

    // Parallel fetching
    const [{ data: profile, error: profileError }, { count: bookmarkCount }] = await Promise.all([
        getProfile(user.id),
        supabase.from('bookmarks').select('*', { count: 'exact', head: true }).eq('user_id', user.id)
    ]);

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-walnut)] texture-wood text-[var(--color-parchment)] overflow-hidden">
            <BookShelfHeader userEmail={user.email} />

            <main className="flex-1 p-8 flex items-center justify-center relative overflow-y-auto">
                <ProfileView
                    user={user}
                    profile={profile}
                    bookmarkCount={bookmarkCount || 0}
                    error={profileError}
                />
            </main>
        </div>
    );
}
