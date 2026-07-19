import type { Profile, User } from '@/types'
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

export async function getProfile(): Promise<Profile> {
    const data = await api.get<Record<string, unknown>>('/user')
    const user = transformUser(data)
    const borrowings = (data.borrowings as Record<string, unknown>[]) ?? []
    const fines = (data.fines as Record<string, unknown>[]) ?? []
    const totalReturned = borrowings.filter((b) => b.status === 'Returned').length
    const totalFines = fines.reduce((sum: number, f: Record<string, unknown>) => sum + ((f.amount as number) ?? 0), 0)

    return {
        user,
        membership: {
            id: `M-${user.id.padStart(4, '0')}`,
            type: user.membershipStatus === 'Active' ? 'Aktif' : 'Non-Aktif',
            startDate: '',
            expiryDate: user.membershipExpiry,
            status: user.membershipStatus,
        },
        statistics: {
            totalBorrowed: borrowings.length,
            totalReturned,
            totalFines,
        },
        phoneNumber: '-',
        faculty: user.programStudi,
        address: '-',
    }
}
