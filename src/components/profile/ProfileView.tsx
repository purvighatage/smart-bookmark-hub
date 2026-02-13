'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { UserProfile } from '@/actions/profile-actions';
import { ProfileEditModal } from './ProfileEditModal';
import { Edit2, Globe, AtSign, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProfileViewProps {
    user: User;
    profile: UserProfile | null;
    bookmarkCount: number;
    error?: any;
}

export const ProfileView = ({ user, profile, bookmarkCount, error }: ProfileViewProps) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Specific handling for missing table error
    const isMissingTableError = error && (error.message?.includes('relation "public.profiles" does not exist') || error.code === '42P01');

    if (error) {
        return (
            <div className="relative w-full max-w-2xl bg-[var(--color-parchment)] rounded-lg shadow-book p-8 md:p-12 border-4 border-double border-[var(--color-crimson)] mx-auto text-center space-y-4">
                <h2 className="text-2xl font-bold font-serif text-[var(--color-crimson)]">System Error</h2>
                <p className="text-[var(--color-ink)]">{error.message || 'An unknown error occurred.'}</p>

                {isMissingTableError && (
                    <div className="bg-red-50 p-4 rounded border border-red-200 text-left text-sm font-mono text-red-800 overflow-x-auto">
                        <p className="font-bold mb-2">Missing Database Table. Please run this SQL in Supabase Dashboard:</p>
                        <pre className="whitespace-pre-wrap">
                            {`create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  constraint username_length check (char_length(username) >= 3)
);
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone." on profiles for select using ( true );
create policy "Users can insert their own profile." on profiles for insert with check ( auth.uid() = id );
create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );
`}
                        </pre>
                    </div>
                )}
            </div>
        )
    }

    return (
        <>
            <div className="relative w-full max-w-2xl bg-[var(--color-parchment)] rounded-lg shadow-book p-8 md:p-12 border-4 border-double border-[var(--color-saddle-brown)] mx-auto">

                {/* Texture Overlay */}
                <div className="absolute inset-0 texture-paper opacity-50 pointer-events-none" />

                {/* Back Button (Top Left) */}
                <Link href="/" className="absolute top-4 left-4 p-2 text-[var(--color-ink-faded)] hover:text-[var(--color-gold)] transition-colors z-20" title="Back to Library">
                    <ArrowLeft className="w-5 h-5" />
                </Link>

                {/* Edit Button (Top Right) */}
                <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="absolute top-4 right-4 p-2 text-[var(--color-ink-faded)] hover:text-[var(--color-gold)] transition-colors z-20"
                    title="Edit Record"
                >
                    <Edit2 className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-8">

                    {/* Avatar */}
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full bg-[var(--color-walnut)] border-4 border-[var(--color-gold)] flex items-center justify-center text-4xl font-serif font-bold text-[var(--color-gold)] shadow-lg overflow-hidden">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                (profile?.full_name?.[0] || user.email?.[0] || '?').toUpperCase()
                            )}
                        </div>
                        {/* Edit overlay hint */}
                        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-mono" onClick={() => setIsEditModalOpen(true)}>
                            EDIT
                        </div>
                    </div>

                    {/* Info */}
                    <div className="w-full">
                        <h1 className="font-serif text-3xl font-bold text-[var(--color-ink)] mb-1">
                            {profile?.full_name || 'Scholar Name'}
                        </h1>
                        <div className="flex flex-col items-center gap-1 text-[var(--color-ink-faded)]">
                            <span className="font-mono text-sm">{user.email}</span>
                            {profile?.username && (
                                <span className="flex items-center gap-1 text-xs font-bold text-[var(--color-saddle-brown)]">
                                    <AtSign className="w-3 h-3" /> {profile.username}
                                </span>
                            )}
                            {profile?.website && (
                                <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs hover:underline hover:text-[var(--color-crimson)]">
                                    <Globe className="w-3 h-3" /> Portfolio
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-16 h-1 bg-[var(--color-gold)] rounded-full opacity-50" />

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-md">
                        <div className="flex flex-col items-center p-4 bg-[rgba(62,39,35,0.05)] rounded border border-[var(--color-ink-faded)] border-dashed">
                            <span className="text-4xl font-serif font-bold text-[var(--color-crimson)]">
                                {bookmarkCount || 0}
                            </span>
                            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink)] mt-2">
                                Volumes
                            </span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-[rgba(62,39,35,0.05)] rounded border border-[var(--color-ink-faded)] border-dashed">
                            <span className="text-4xl font-serif font-bold text-[var(--color-crimson)]">
                                {new Date(user.created_at).getFullYear()}
                            </span>
                            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-ink)] mt-2">
                                Member Since
                            </span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="w-full pt-8 border-t border-[var(--color-gold-dim)] mt-8">
                        <p className="font-serif italic text-sm text-[var(--color-ink-faded)]">
                            "A room without books is like a body without a soul."
                        </p>
                    </div>

                </div>
            </div>

            <ProfileEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialData={profile}
                userEmail={user.email}
            />
        </>
    );
};
