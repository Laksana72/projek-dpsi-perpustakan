import type { User } from '@/types'

export const users: User[] = [
    {
        id: '1',
        name: 'Ahmad Rizki',
        email: 'ahmad.rizki@student.ac.id',
        nim: '20241001',
        programStudi: 'Sistem Informasi',
        avatar: '/images/avatars/user1.jpg',
        role: 'user',
        membershipStatus: 'Active',
        membershipExpiry: '2026-12-31',
    },
    {
        id: '2',
        name: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@student.ac.id',
        nim: '20241002',
        programStudi: 'Sistem Informasi',
        avatar: '/images/avatars/user2.jpg',
        role: 'user',
        membershipStatus: 'Active',
        membershipExpiry: '2026-12-31',
    },
]

export const adminUser: User = {
    id: '3',
    name: 'Admin Perpustakaan',
    email: 'admin@library.ac.id',
    nim: 'ADM-001',
    programStudi: 'Manajemen Perpustakaan',
    avatar: '/images/avatars/admin.jpg',
    role: 'admin',
    membershipStatus: 'Active',
    membershipExpiry: '2027-12-31',
}
