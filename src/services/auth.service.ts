import type { User } from '@/types'
import { api } from './api'

export interface LoginResult {
    success: boolean
    user?: User
    token?: string
}

function transformUser(item: Record<string, unknown>): User {
    const avatar = (item.avatar as string) ?? ''
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
    const baseUrl = apiBase.replace(/\/api$/, '')
    return {
        id: String(item.id),
        name: item.name as string,
        email: item.email as string,
        nim: (item.nim as string) ?? '',
        programStudi: (item.program_studi as string) ?? '',
        avatar: avatar && !avatar.startsWith('http') ? `${baseUrl}/storage/${avatar}` : avatar,
        role: item.role as User['role'],
        membershipStatus: (item.membership_status as string) ?? '',
        membershipExpiry: (item.membership_expiry as string) ?? '',
    }
}

export async function loginService(login: string, password: string): Promise<LoginResult> {
    try {
        const response = await api.post<{ user: Record<string, unknown>; token: string }>('/login', { login, password })
        return {
            success: true,
            user: transformUser(response.user),
            token: response.token,
        }
    } catch {
        return { success: false }
    }
}

export async function logoutService(): Promise<void> {
    try {
        await api.post('/logout')
    } catch {
        // ignore
    }
}

export function validateToken(_token: string): boolean {
    return !!_token
}

export async function updateProfile(data: { name?: string; email?: string; nim?: string; program_studi?: string }): Promise<User> {
    const response = await api.put<Record<string, unknown>>('/user', data)
    return transformUser(response)
}

export async function changePassword(data: { current_password: string; new_password: string; new_password_confirmation: string }): Promise<void> {
    await api.put('/user/password', data)
}

export async function uploadAvatar(file: File): Promise<{ avatar: string; avatar_url: string }> {
    const formData = new FormData()
    formData.append('avatar', file)
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/upload/avatar`, {
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
