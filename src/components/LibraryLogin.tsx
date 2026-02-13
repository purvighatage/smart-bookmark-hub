'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { toast } from 'sonner'

export default function LibraryLogin() {
    const [loading, setLoading] = useState(false)
    const supabase = createClient()

    async function handleLogin() {
        setLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${location.origin}/auth/callback`,
                },
            })
            if (error) {
                toast.error(error.message)
            }
        } catch (error) {
            toast.error('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-wood-pattern flex items-center justify-center p-4">
            {/* The Login Card */}
            <div className="w-full max-w-md bg-paper p-8 rounded shadow-2xl border-t-4 border-gold relative transform rotate-1 hover:rotate-0 transition-transform duration-500">

                {/* Decorative Stamps */}
                <div className="absolute top-4 right-4 w-16 h-16 border-2 border-red-600/30 rounded-full flex items-center justify-center transform -rotate-12 pointer-events-none">
                    <span className="text-red-600/30 font-serif font-bold text-xs uppercase text-center">Library<br />Of<br />Alexandria</span>
                </div>

                <div className="text-center mb-10 mt-4">
                    <h1 className="font-serif text-3xl font-bold text-ink mb-2">Smart Bookmark Hub</h1>
                    <div className="w-16 h-1 bg-ink mx-auto mb-2"></div>
                    <p className="font-serif text-stone-500 italic">Member Access Only</p>
                </div>

                <div className="space-y-6">
                    <div className="bg-stone-100 p-6 border border-stone-200 rounded-sm">
                        <label className="block font-sans text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Identity Provider</label>
                        <div className="font-serif text-xl text-ink border-b border-stone-300 pb-1 mb-4">Google Secure Auth</div>

                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className={`w-full group relative flex items-center justify-center gap-3 bg-ink text-paper px-6 py-3 font-serif font-bold text-lg hover:bg-leather transition-all shadow-lg ${loading ? 'opacity-80 cursor-wait' : ''}`}
                        >
                            {loading ? (
                                <span className="animate-pulse">Verifying Credentials...</span>
                            ) : (
                                <>
                                    <span>Sign with Google</span>
                                    <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">✒️</span>
                                </>
                            )}
                        </button>
                    </div>

                    <p className="text-center text-xs font-sans text-stone-400 leading-relaxed">
                        By signing, you agree to abide by the library rules,<br />terms of service, and privacy archival policies.
                    </p>
                </div>
            </div>
        </div>
    )
}
