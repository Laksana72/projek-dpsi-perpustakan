import type { Return } from '@/types'
import { api } from './api'

interface PaginatedResponse {
    data: Record<string, unknown>[]
    current_page: number
    last_page: number
    total: number
}

function transformReturn(item: Record<string, unknown>): Return {
    const returnDate = new Date(item.return_date as string)
    const dueDate = new Date(item.due_date as string)
    const isLate = returnDate > dueDate
    const fineRecord = item.fine as Record<string, unknown> | null
    return {
        id: String(item.id),
        userId: String(item.user_id),
        userName: (item.user as Record<string, unknown>)?.name as string ?? '',
        nim: (item.user as Record<string, unknown>)?.nim as string ?? '',
        bookId: String(item.book_id),
        bookTitle: (item.book as Record<string, unknown>)?.title as string ?? '',
        bookCover: (item.book as Record<string, unknown>)?.cover as string ?? '',
        borrowDate: item.borrow_date as string,
        dueDate: item.due_date as string,
        returnDate: item.return_date as string,
        status: isLate ? 'Late' : 'On Time',
        fine: (fineRecord?.amount as number) ?? 0,
    }
}

export async function getAllReturns(): Promise<Return[]> {
    const response = await api.get<PaginatedResponse>('/returns?per_page=100')
    return response.data.map(transformReturn)
}

export async function getReturnsByUserId(userId: string): Promise<Return[]> {
    const response = await api.get<PaginatedResponse>('/returns', { user_id: userId })
    return response.data.map(transformReturn)
}

export async function getReturnsToday(): Promise<Return[]> {
    const response = await api.get<Record<string, unknown>[]>('/returns/today')
    return response.map(transformReturn)
}

export async function searchReturns(query: string): Promise<Return[]> {
    const response = await api.get<PaginatedResponse>('/returns', { search: query })
    return response.data.map(transformReturn)
}
