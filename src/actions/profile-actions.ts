'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export interface UserProfile {
    id: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    website: string | null;
    updated_at: string | null;
}

export async function getProfile(userId: string): Promise<{ data: UserProfile | null, error: any }> {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

        if (error) {
            console.error('Error fetching profile:', JSON.stringify(error, null, 2));
            return { data: null, error };
        }

        return { data, error: null };
    } catch (error) {
        console.error('Unexpected error fetching profile:', error);
        return { data: null, error };
    }
}

export async function updateProfile(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'Not authenticated' };
    }

    const fullName = formData.get('fullName') as string;
    const username = formData.get('username') as string;
    const website = formData.get('website') as string;

    // Basic validation
    if (username && username.length < 3) {
        return { error: 'Username must be at least 3 characters long.' };
    }

    const updates = {
        id: user.id,
        full_name: fullName,
        username: username,
        website: website,
        updated_at: new Date().toISOString(),
    };

    const { error } = await supabase
        .from('profiles')
        .upsert(updates) // Upsert handles creating if it doesn't exist
        .select();

    if (error) {
        console.error('Error updating profile:', error);
        return { error: error.message || 'Failed to update profile.' };
    }

    revalidatePath('/profile');
    return { success: true };
}
