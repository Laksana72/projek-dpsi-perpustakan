import type { DashboardStats, Borrowing, Book } from '@/types'
import { borrowings } from './borrowings'
import { books } from './books'

export const userDashboardStats: DashboardStats = {
    totalBooks: books.length,
    totalBorrowings: borrowings.filter((b) => b.status === 'Borrowed').length,
    totalReturns: borrowings.filter((b) => b.status === 'Returned').length,
    totalFines: 5000,
}

export const popularBooks: Book[] = books.slice(0, 4)

export const latestBorrowings: Borrowing[] = borrowings.slice(0, 3)
