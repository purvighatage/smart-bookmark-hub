import { Book, OpenLibraryBook } from '@/types/book';

const OPEN_LIBRARY_SEARCH_URL = 'https://openlibrary.org/search.json';
const COVER_BASE_URL = 'https://covers.openlibrary.org/b/id';

export async function getRecommendedBooks(query: string = 'programming', limit: number = 12): Promise<Book[]> {
    try {
        const response = await fetch(`${OPEN_LIBRARY_SEARCH_URL}?q=${encodeURIComponent(query)}&limit=${limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        const data = await response.json();

        return data.docs.map((doc: OpenLibraryBook) => ({
            id: doc.key.replace('/works/', ''),
            title: doc.title,
            author: doc.author_name?.[0] || 'Unknown Author',
            coverUrl: doc.cover_i
                ? `${COVER_BASE_URL}/${doc.cover_i}-L.jpg`
                : 'https://placehold.co/400x600/e2e8f0/475569?text=No+Cover',
            publishYear: doc.first_publish_year
        }));

    } catch (error) {
        console.error('Error fetching recommended books:', error);
        return [];
    }
}
