import { api } from './api'

export interface Category {
    id: number
    name: string
    description: string | null
    books_count?: number
}

export async function getAllCategories(): Promise<Category[]> {
    const response = await api.get<Record<string, unknown>[]>('/categories')
    return response as unknown as Category[]
}

export async function getCategoryById(id: number): Promise<Category> {
    const response = await api.get<Record<string, unknown>>(`/categories/${id}`)
    return response as unknown as Category
}

export async function createCategory(data: { name: string; description?: string }): Promise<Category> {
    const response = await api.post<Record<string, unknown>>('/categories', data)
    return response as unknown as Category
}

export async function updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    const response = await api.put<Record<string, unknown>>(`/categories/${id}`, data)
    return response as unknown as Category
}

export async function deleteCategory(id: number): Promise<void> {
    await api.delete(`/categories/${id}`)
}
