import type { Borrowing, Return } from '@/types'
import { borrowings } from './borrowings'
import { returns } from './returns'
import { books } from './books'

const today = new Date('2026-07-12')
today.setHours(0, 0, 0, 0)

const overdueBorrowings = borrowings.filter((b) => {
    if (b.status === 'Returned') return false
    const due = new Date(b.dueDate)
    due.setHours(0, 0, 0, 0)
    return due < today
})

const totalFines = returns.reduce((sum, r) => sum + r.fine, 0)

export const adminDashboardStats = {
    totalBooks: books.length,
    totalMembers: 120,
    totalBorrowings: borrowings.filter((b) => b.status !== 'Returned').length,
    totalReturns: returns.length,
    totalOverdue: overdueBorrowings.length,
    totalFines,
}

export const trends = {
    totalBooks: '+12.5%',
    totalMembers: '+8.3%',
    totalBorrowings: '+15.2%',
    totalOverdue: '-5.1%',
    totalReturns: '+22.7%',
    totalFines: '+10.4%',
}

export const bookStatusCounts = {
    available: books.filter((b) => b.status === 'Available').length,
    borrowed: books.filter((b) => b.status === 'Borrowed').length,
    reserved: books.filter((b) => b.status === 'Reserved').length,
    lost: books.filter((b) => b.status === 'Lost').length,
}

export interface Activity {
    id: string
    avatar?: string
    name: string
    action: string
    time: string
}

export const recentActivities: Activity[] = [
    {
        id: '1',
        avatar: '/images/avatars/user1.jpg',
        name: 'Ahmad Rizki',
        action: 'meminjam buku "Algoritma dan Struktur Data"',
        time: '2 jam yang lalu',
    },
    {
        id: '2',
        avatar: '/images/avatars/user2.jpg',
        name: 'Siti Nurhaliza',
        action: 'meminjam buku "UI/UX Design Principles"',
        time: '5 jam yang lalu',
    },
    {
        id: '3',
        avatar: '/images/avatars/user1.jpg',
        name: 'Ahmad Rizki',
        action: 'mengembalikan buku "Pemrograman Web dengan React"',
        time: '1 hari yang lalu',
    },
    {
        id: '4',
        name: 'Admin Perpustakaan',
        action: 'menambahkan buku baru "Keamanan Siber"',
        time: '2 hari yang lalu',
    },
    {
        id: '5',
        name: 'Admin Perpustakaan',
        action: 'memperbarui data buku "Machine Learning untuk Pemula"',
        time: '3 hari yang lalu',
    },
    {
        id: '6',
        avatar: '/images/avatars/user2.jpg',
        name: 'Siti Nurhaliza',
        action: 'mengembalikan buku "Machine Learning untuk Pemula"',
        time: '3 hari yang lalu',
    },
    {
        id: '7',
        name: 'Admin Perpustakaan',
        action: 'menambahkan anggota baru "Budi Pratama"',
        time: '4 hari yang lalu',
    },
    {
        id: '8',
        name: 'Admin Perpustakaan',
        action: 'memperbarui status buku "Basis Data Terdistribusi" menjadi Tersedia',
        time: '5 hari yang lalu',
    },
    {
        id: '9',
        avatar: '/images/avatars/user1.jpg',
        name: 'Ahmad Rizki',
        action: 'meminjam buku "Jaringan Komputer Lanjutan"',
        time: '1 minggu yang lalu',
    },
    {
        id: '10',
        name: 'Admin Perpustakaan',
        action: 'melakukan maintenance sistem perpustakaan',
        time: '1 minggu yang lalu',
    },
]

export const topBorrowedBooks = ['1', '2', '3', '5', '7']

export const recentBorrowings: Borrowing[] = borrowings.slice(0, 5)

export const recentReturns: Return[] = returns.slice(0, 5)
