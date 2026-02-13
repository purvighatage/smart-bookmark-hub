import { getRecommendedBooks } from '@/actions/book-service';
import { BookCard } from '@/components/books/BookCard';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ArrowLeft, Library } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function RecommendedPage() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data: { user } } = await supabase.auth.getUser();

    const books = await getRecommendedBooks('software architecture', 12);

    return (
        <div className="min-h-screen bg-[var(--color-walnut)] texture-wood p-4 md:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-[var(--color-saddle-brown)] pb-6 shadow-sm bg-[var(--color-parchment)] p-8 rounded-t-lg rounded-b-sm texture-paper">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[var(--color-saddle-brown)] hover:text-[var(--color-crimson)] font-serif font-bold mb-4 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to My Library
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-ink)] flex items-center gap-4">
                            <Library className="w-10 h-10 text-[var(--color-gold)]" />
                            Curated Collection
                        </h1>
                        <p className="mt-2 text-[var(--color-ink-faded)] font-mono max-w-xl">
                            Discover essential volumes on software architecture and engineering from the global archives.
                        </p>
                    </div>

                    <div className="text-right hidden md:block">
                        <span className="block font-mono text-xs uppercase tracking-widest text-[var(--color-ink-faded)]">
                            Curated By
                        </span>
                        <span className="font-serif font-bold text-lg text-[var(--color-saddle-brown)]">
                            OpenLibrary API
                        </span>
                    </div>
                </header>

                {/* Grid */}
                {books.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20">
                        {books.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                userId={user?.id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-[rgba(255,255,255,0.05)] rounded-lg border-2 border-dashed border-[var(--color-gold-dim)]">
                        <p className="font-serif text-xl text-[var(--color-parchment)] opacity-50">
                            The archives are currently silent. Please check back later.
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
}
