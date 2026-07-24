import type { Book } from '@/types'
import { api } from './api'

interface BookApiResponse {
    data: Book[]
    current_page: number
    last_page: number
    total: number
}

function transformBook(item: Record<string, unknown>): Book {
    const cover = (item.cover as string) ?? ''
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
    const baseUrl = apiBase.replace(/\/api$/, '')
    return {
        id: String(item.id),
        title: item.title as string,
        author: item.author as string,
        isbn: item.isbn as string,
        publisher: (item.publisher as Record<string, unknown>)?.name as string ?? '',
        year: item.year as number,
        category: (item.category as Record<string, unknown>)?.name as string ?? '',
        description: (item.description as string) ?? '',
        cover: cover && !cover.startsWith('http') ? `${baseUrl}/storage/${cover}` : cover,
        status: item.status as Book['status'],
        pages: (item.pages as number) ?? 0,
        language: item.language as string | undefined,
        edition: item.edition as string | undefined,
        addedDate: item.added_date as string | undefined,
        location: item.location as string | undefined,
        callNumber: item.call_number as string | undefined,
    }
}

export async function getAllBooks(): Promise<Book[]> {
    const response = await api.get<BookApiResponse>('/books?per_page=100')
    return response.data.map(transformBook)
}

export async function getBookById(id: string): Promise<Book | undefined> {
    try {
        const response = await api.get<Record<string, unknown>>(`/books/${id}`)
        return transformBook(response)
    } catch {
        return undefined
    }
}

export async function searchBooks(query: string): Promise<Book[]> {
    const response = await api.get<BookApiResponse>('/books/search', { q: query })
    return response.data.map(transformBook)
}

export async function getBooksByCategory(category: string): Promise<Book[]> {
    const response = await api.get<BookApiResponse>('/books', { category_id: category })
    return response.data.map(transformBook)
}

export async function createBook(book: Omit<Book, 'id'>): Promise<Book> {
    const response = await api.post<Record<string, unknown>>('/books', book)
    return transformBook(response)
}

export async function updateBook(id: string | number, book: Partial<Book>): Promise<Book> {
    const response = await api.put<Record<string, unknown>>(`/books/${id}`, book)
    return transformBook(response)
}

export async function deleteBook(id: string | number): Promise<void> {
    await api.delete(`/books/${id}`)
}

export async function getCategories(): Promise<string[]> {
    const response = await api.get<{ data: { id: number; name: string }[] }>('/categories')
    return response.data.map((c) => c.name)
}

export async function uploadCover(bookId: string | number, file: File): Promise<{ cover: string; cover_url: string }> {
    const formData = new FormData()
    formData.append('cover', file)
    formData.append('book_id', String(bookId))
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/upload/cover`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({ message: 'Gagal upload' }))
        throw new Error(err.message || 'Gagal upload')
    }
    return response.json()
}
