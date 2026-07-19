const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface ApiOptions extends RequestInit {
    params?: Record<string, string>
}

function getToken(): string | null {
    return localStorage.getItem('token')
}

async function request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options
    const token = getToken()
    const headers: Record<string, string> = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(fetchOptions.headers as Record<string, string>),
    }
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    let url = `${API_BASE}${endpoint}`
    if (params) {
        const searchParams = new URLSearchParams(params)
        url += `?${searchParams.toString()}`
    }

    const response = await fetch(url, {
        ...fetchOptions,
        headers,
    })

    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }))
        throw new Error(error.message || `HTTP ${response.status}`)
    }

    return response.json()
}

export const api = {
    get: <T>(endpoint: string, params?: Record<string, string>) =>
        request<T>(endpoint, { method: 'GET', params }),
    post: <T>(endpoint: string, data?: unknown) =>
        request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        }),
    put: <T>(endpoint: string, data?: unknown) =>
        request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        }),
    delete: <T>(endpoint: string) =>
        request<T>(endpoint, { method: 'DELETE' }),
}