import type { Borrowing } from '@/types'
import { api } from './api'

interface PaginatedResponse {
    data: Record<string, unknown>[]
    current_page: number
    last_page: number
    total: number
}

function transformBorrowing(item: Record<string, unknown>): Borrowing {
    return {
        id: String(item.id),
        userId: String(item.user_id),
        userName: (item.user as Record<string, unknown>)?.name as string ?? '',
        bookId: String(item.book_id),
        bookTitle: (item.book as Record<string, unknown>)?.title as string ?? '',
        bookCover: (item.book as Record<string, unknown>)?.cover as string ?? '',
        status: item.status as Borrowing['status'],
        borrowDate: item.borrow_date as string,
        dueDate: item.due_date as string,
        returnDate: (item.return_date as string) ?? null,
    }
}

export async function getAllBorrowings(): Promise<Borrowing[]> {
    const response = await api.get<PaginatedResponse>('/borrowings?per_page=100')
    return response.data.map(transformBorrowing)
}

export async function getBorrowingsByUserId(userId: string): Promise<Borrowing[]> {
    const response = await api.get<Record<string, unknown>[]>(`/borrowings/user/${userId}`)
    return response.map(transformBorrowing)
}

export async function getActiveBorrowings(): Promise<Borrowing[]> {
    const response = await api.get<PaginatedResponse>('/borrowings', { status: 'Borrowed' })
    return response.data.map(transformBorrowing)
}

export async function getOverdueBorrowings(): Promise<Borrowing[]> {
    const response = await api.get<PaginatedResponse>('/borrowings', { status: 'Borrowed', overdue: '1' })
    return response.data.map(transformBorrowing)
}

export async function searchBorrowings(query: string): Promise<Borrowing[]> {
    const response = await api.get<PaginatedResponse>('/borrowings', { search: query })
    return response.data.map(transformBorrowing)
}

export async function createBorrowing(data: { user_id: number; book_id: number }): Promise<Borrowing> {
    const response = await api.post<Record<string, unknown>>('/borrowings', data)
    return transformBorrowing(response)
}

export async function approveBorrowing(id: string | number): Promise<Borrowing> {
    const response = await api.post<Record<string, unknown>>(`/borrowings/${id}/approve`)
    return transformBorrowing(response)
}

export async function rejectBorrowing(id: string | number): Promise<void> {
    await api.post(`/borrowings/${id}/reject`)
}

export async function returnBorrowing(id: string | number): Promise<Borrowing> {
    const response = await api.post<Record<string, unknown>>(`/borrowings/${id}/return`)
    return transformBorrowing(response)
}
