import type { History } from '@/types'
import { api } from './api'

interface PaginatedResponse {
    data: Record<string, unknown>[]
    current_page: number
    last_page: number
    total: number
}

function transformHistory(item: Record<string, unknown>): History {
    const fineRecord = item.fine as Record<string, unknown> | null
    const isLate = item.status === 'Late' || item.status === 'Lost'
    return {
        id: String(item.id),
        bookId: String(item.book_id),
        bookTitle: (item.book as Record<string, unknown>)?.title as string ?? '',
        bookCover: (item.book as Record<string, unknown>)?.cover as string ?? '',
        borrowDate: item.borrow_date as string,
        returnDate: item.return_date as string,
        status: isLate ? 'Late' : 'Returned',
        fine: (fineRecord?.amount as number) ?? 0,
    }
}

export async function getAllHistory(): Promise<History[]> {
    const response = await api.get<PaginatedResponse>('/history?per_page=100')
    return response.data.map(transformHistory)
}

export async function searchHistory(query: string): Promise<History[]> {
    const response = await api.get<PaginatedResponse>('/history', { search: query })
    return response.data.map(transformHistory)
}
