'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, User as UserIcon, Globe, AtSign } from 'lucide-react';
import { updateProfile, UserProfile } from '@/actions/profile-actions';
import { toast } from 'sonner';

interface ProfileEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData: UserProfile | null;
    userEmail?: string;
}

export const ProfileEditModal = ({ isOpen, onClose, initialData, userEmail }: ProfileEditModalProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await updateProfile(formData);

        if (result?.error) {
            toast.error(result.error as string);
        } else {
            toast.success('Profile updated successfully');
            onClose();
        }
        setIsLoading(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-[var(--color-parchment)] rounded-lg shadow-2xl overflow-hidden border-4 border-[var(--color-saddle-brown)]"
                    >
                        {/* Header */}
                        <div className="bg-[var(--color-walnut)] p-4 flex justify-between items-center border-b-2 border-[var(--color-gold)]">
                            <h2 className="text-[var(--color-gold)] font-serif font-bold text-xl flex items-center gap-2">
                                <UserIcon className="w-5 h-5" />
                                Edit Scholar Profile
                            </h2>
                            <button onClick={onClose} className="text-[var(--color-parchment)] hover:text-[var(--color-gold)] transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">

                            {/* Full Name */}
                            <div className="space-y-1">
                                <label className="block text-sm font-serif font-bold text-[var(--color-ink)]">Full Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserIcon className="h-4 w-4 text-[var(--color-ink-faded)]" />
                                    </div>
                                    <input
                                        name="fullName"
                                        defaultValue={initialData?.full_name || ''}
                                        placeholder="e.g. Athena of Athens"
                                        className="block w-full pl-10 pr-3 py-2 border-2 border-[var(--color-walnut)] rounded bg-[var(--color-parchment-dim)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] font-serif"
                                    />
                                </div>
                            </div>

                            {/* Username */}
                            <div className="space-y-1">
                                <label className="block text-sm font-serif font-bold text-[var(--color-ink)]">Username</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <AtSign className="h-4 w-4 text-[var(--color-ink-faded)]" />
                                    </div>
                                    <input
                                        name="username"
                                        defaultValue={initialData?.username || ''}
                                        placeholder="e.g. athena_wisdom"
                                        className="block w-full pl-10 pr-3 py-2 border-2 border-[var(--color-walnut)] rounded bg-[var(--color-parchment-dim)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] font-serif"
                                    />
                                </div>
                            </div>

                            {/* Website */}
                            <div className="space-y-1">
                                <label className="block text-sm font-serif font-bold text-[var(--color-ink)]">Website / Portfolio</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Globe className="h-4 w-4 text-[var(--color-ink-faded)]" />
                                    </div>
                                    <input
                                        name="website"
                                        defaultValue={initialData?.website || ''}
                                        placeholder="https://..."
                                        className="block w-full pl-10 pr-3 py-2 border-2 border-[var(--color-walnut)] rounded bg-[var(--color-parchment-dim)] text-[var(--color-ink)] focus:outline-none focus:border-[var(--color-gold)] font-serif"
                                    />
                                </div>
                            </div>

                            {/* Read-only Email */}
                            <div className="pt-2 text-xs text-[var(--color-ink-faded)] font-mono text-center">
                                Identity: {userEmail}
                            </div>

                            {/* Actions */}
                            <div className="pt-4 flex justify-end gap-3 border-t border-[var(--color-ink-faded)] border-dashed">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 text-[var(--color-ink)] hover:text-[var(--color-crimson)] font-serif font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-6 py-2 bg-[var(--color-saddle-brown)] text-[var(--color-parchment)] rounded shadow hover:bg-[var(--color-walnut)] transition-colors font-serif font-bold disabled:opacity-50"
                                >
                                    {isLoading ? 'Saving...' : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            Update Records
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
