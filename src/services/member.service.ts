import type { User } from '@/types'
import { api } from './api'

function transformUser(item: Record<string, unknown>): User {
    return {
        id: String(item.id),
        name: item.name as string,
        email: item.email as string,
        nim: (item.nim as string) ?? '',
        programStudi: (item.program_studi as string) ?? '',
        avatar: (item.avatar as string) ?? '',
        role: item.role as User['role'],
        membershipStatus: (item.membership_status as string) ?? '',
        membershipExpiry: (item.membership_expiry as string) ?? '',
    }
}

export async function getAllMembers(): Promise<User[]> {
    const response = await api.get<{ data: Record<string, unknown>[] }>('/members')
    return response.data.map(transformUser)
}

export async function getMemberById(id: string | number): Promise<{ member: User; stats: Record<string, number> } | undefined> {
    try {
        const response = await api.get<{ member: Record<string, unknown>; stats: Record<string, number> }>(`/members/${id}`)
        return {
            member: transformUser(response.member),
            stats: response.stats,
        }
    } catch {
        return undefined
    }
}

export async function createMember(data: Record<string, unknown>): Promise<User> {
    const response = await api.post<Record<string, unknown>>('/members', data)
    return transformUser(response)
}

export async function updateMember(id: string | number, data: Partial<User>): Promise<User> {
    const response = await api.put<Record<string, unknown>>(`/members/${id}`, data)
    return transformUser(response)
}

export async function deleteMember(id: string | number): Promise<void> {
    await api.delete(`/members/${id}`)
}
