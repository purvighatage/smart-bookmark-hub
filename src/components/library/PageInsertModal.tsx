'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Save, PenTool } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { addBookmark, updateBookmark } from '@/actions/bookmark-actions';
import { toast } from 'sonner';
import { Bookmark } from '@/hooks/useBookmarks';

interface PageFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: Bookmark | null;
    mode: 'add' | 'edit';
}

export const PageInsertModal = ({ isOpen, onClose, initialData, mode }: PageFormModalProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = mode === 'edit';

    // Reset form when opening/changing mode
    useEffect(() => {
        if (isOpen && formRef.current) {
            formRef.current.reset();
            // If editing, manually set values (native reset clears them)
            if (isEdit && initialData) {
                const urlInput = formRef.current.querySelector('input[name="url"]') as HTMLInputElement;
                const titleInput = formRef.current.querySelector('input[name="title"]') as HTMLInputElement;
                const idInput = formRef.current.querySelector('input[name="id"]') as HTMLInputElement;

                if (urlInput) urlInput.value = initialData.url;
                if (titleInput) titleInput.value = initialData.title;
                if (idInput) idInput.value = initialData.id.toString();
            }
        }
    }, [isOpen, isEdit, initialData]);

    const handleSubmit = async (formData: FormData) => {
        let result;

        if (isEdit) {
            result = await updateBookmark(formData);
        } else {
            result = await addBookmark(formData);
        }

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success(isEdit ? 'Chapter rewritten.' : 'New chapter inscribed.');
            formRef.current?.reset();
            onClose();
        }
    };

    // Keyboard Shortcuts
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-sm z-[60]"
                        aria-hidden="true"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ y: -50, opacity: 0, rotate: -2 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -50, opacity: 0, rotate: 2 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg bg-[var(--color-parchment)] p-8 rounded-lg shadow-2xl z-[70] border-t-8 border-[var(--color-gold)] texture-paper"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="modal-title"
                    >
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-[rgba(0,0,0,0.1)] blur-sm rounded-full" />

                        <div className="flex justify-between items-center mb-6 border-b border-[var(--color-gold-dim)] pb-2">
                            <h2 id="modal-title" className="text-2xl font-serif font-bold text-[var(--color-ink)] flex items-center gap-2">
                                {isEdit ? <PenTool className="w-6 h-6 text-[var(--color-gold)]" /> : <Plus className="w-6 h-6 text-[var(--color-gold)]" />}
                                {isEdit ? 'Rewrite Chapter' : 'Inscribe New Entry'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-[var(--color-ink-faded)] hover:text-[var(--color-crimson)] transition-colors p-1"
                                aria-label="Close Modal"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form ref={formRef} action={handleSubmit} className="space-y-6">
                            {/* Hidden ID for edits */}
                            {isEdit && <input type="hidden" name="id" />}

                            <div>
                                <label htmlFor="url" className="block text-sm font-bold uppercase tracking-widest text-[var(--color-ink-faded)] mb-1 font-mono">
                                    Location (URL)
                                </label>
                                <input
                                    id="url"
                                    name="url"
                                    type="url"
                                    required
                                    autoFocus
                                    placeholder="https://"
                                    className="w-full bg-[rgba(255,255,255,0.5)] border-2 border-[var(--color-walnut)] rounded p-3 font-mono text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none focus:bg-white transition-all shadow-inner"
                                />
                            </div>

                            <div>
                                <label htmlFor="title" className="block text-sm font-bold uppercase tracking-widest text-[var(--color-ink-faded)] mb-1 font-mono">
                                    Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    placeholder="E.g. The Archives of History"
                                    className="w-full bg-[rgba(255,255,255,0.5)] border-2 border-[var(--color-walnut)] rounded p-3 font-serif text-lg font-bold text-[var(--color-ink)] focus:border-[var(--color-gold)] focus:outline-none focus:bg-white transition-all shadow-inner"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-[var(--color-saddle-brown)] text-[var(--color-parchment)] font-serif font-bold text-lg rounded shadow-lg hover:bg-[var(--color-walnut)] hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-[var(--color-gold)]"
                            >
                                <Save className="w-5 h-5" />
                                {isEdit ? 'Save Changes' : 'Save to Library'}
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
