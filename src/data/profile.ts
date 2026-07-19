import type { Profile } from '@/types'
import { users } from './users'

export const userProfile: Profile = {
    user: users[0],
    membership: {
        id: 'MBR-001',
        type: 'Student',
        startDate: '2025-01-01',
        expiryDate: '2026-12-31',
        status: 'Active',
    },
    statistics: {
        totalBorrowed: 5,
        totalReturned: 3,
        totalFines: 5000,
    },
    phoneNumber: '0812-3456-7890',
    faculty: 'FAST',
    address: 'Jl. Pendidikan No. 123, Kota Malang',
}
