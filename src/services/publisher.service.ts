import { api } from './api'

export interface Publisher {
    id: number
    name: string
    address: string | null
    phone: string | null
    email: string | null
    books_count?: number
}

export async function getAllPublishers(): Promise<Publisher[]> {
    const response = await api.get<Record<string, unknown>[]>('/publishers')
    return response as unknown as Publisher[]
}

export async function getPublisherById(id: number): Promise<Publisher> {
    const response = await api.get<Record<string, unknown>>(`/publishers/${id}`)
    return response as unknown as Publisher
}

export async function createPublisher(data: { name: string; address?: string; phone?: string; email?: string }): Promise<Publisher> {
    const response = await api.post<Record<string, unknown>>('/publishers', data)
    return response as unknown as Publisher
}

export async function updatePublisher(id: number, data: Partial<Publisher>): Promise<Publisher> {
    const response = await api.put<Record<string, unknown>>(`/publishers/${id}`, data)
    return response as unknown as Publisher
}

export async function deletePublisher(id: number): Promise<void> {
    await api.delete(`/publishers/${id}`)
}
