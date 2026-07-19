export interface Category {
    id: string
    name: string
    description: string
    bookCount: number
}

export const categories: Category[] = [
    { id: 'cat-1', name: 'Teknologi', description: 'Buku tentang teknologi dan pemrograman', bookCount: 2 },
    { id: 'cat-2', name: 'Ilmu Komputer', description: 'Buku tentang ilmu komputer fundamental', bookCount: 1 },
    { id: 'cat-3', name: 'Data Science', description: 'Buku tentang data science dan machine learning', bookCount: 1 },
    { id: 'cat-4', name: 'Basis Data', description: 'Buku tentang database dan manajemen data', bookCount: 1 },
    { id: 'cat-5', name: 'Jaringan', description: 'Buku tentang jaringan komputer', bookCount: 1 },
    { id: 'cat-6', name: 'Keamanan', description: 'Buku tentang keamanan siber', bookCount: 1 },
    { id: 'cat-7', name: 'Desain', description: 'Buku tentang desain dan UI/UX', bookCount: 1 },
]
