import type { Fine } from '@/types'
import { api } from './api'

function transformFine(item: Record<string, unknown>): Fine {
    const borrowing = item.borrowing as Record<string, unknown> | null
    const book = borrowing?.book as Record<string, unknown> | null
    return {
        id: String(item.id),
        borrowingId: String(item.borrowing_id),
        bookTitle: book?.title as string ?? '',
        amount: item.amount as number,
        status: item.status as Fine['status'],
        dueDate: item.due_date as string,
    }
}

export async function getAllFines(): Promise<Fine[]> {
    const response = await api.get<{ data: Record<string, unknown>[] }>('/fines?per_page=100')
    return response.data.map(transformFine)
}

export async function payFine(id: string | number): Promise<Fine> {
    const response = await api.post<Record<string, unknown>>(`/fines/${id}/pay`)
    return transformFine(response)
}
