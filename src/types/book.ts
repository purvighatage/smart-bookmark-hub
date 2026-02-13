export interface OpenLibraryBook {
    key: string;
    title: string;
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number;
    isbn?: string[];
}

export interface Book {
    id: string;
    title: string;
    author: string;
    coverUrl: string;
    publishYear?: number;
}
