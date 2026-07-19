export interface Book {
    id: string
    title: string
    author: string
    isbn: string
    publisher: string
    year: number
    category: string
    description: string
    cover: string
    status: 'Available' | 'Borrowed' | 'Reserved' | 'Lost'
    pages: number
    language?: string
    edition?: string
    addedDate?: string
    location?: string
    callNumber?: string
}

export interface User {
    id: string
    name: string
    email: string
    nim: string
    programStudi: string
    avatar: string
    role: 'user' | 'admin'
    membershipStatus: string
    membershipExpiry: string
}

export interface Borrowing {
    id: string
    userId: string
    userName: string
    bookId: string
    bookTitle: string
    bookCover: string
    status: 'Borrowed' | 'Returned' | 'Pending'
    borrowDate: string
    dueDate: string
    returnDate: string | null
}

export interface Return {
    id: string
    userId: string
    userName: string
    nim: string
    bookId: string
    bookTitle: string
    bookCover: string
    borrowDate: string
    dueDate: string
    returnDate: string
    status: 'On Time' | 'Late' | 'Pending' | 'Lost'
    fine: number
}

export interface History {
    id: string
    bookId: string
    bookTitle: string
    bookCover: string
    borrowDate: string
    returnDate: string
    status: 'Returned' | 'Late' | 'Lost'
    fine: number
}

export interface Fine {
    id: string
    borrowingId: string
    bookTitle: string
    amount: number
    status: 'Unpaid' | 'Paid'
    dueDate: string
}

export interface DashboardStats {
    totalBooks: number
    totalBorrowings: number
    totalReturns: number
    totalFines: number
}

export interface AdminDashboardStats {
    totalBooks: number
    totalMembers: number
    totalBorrowings: number
    totalReturns: number
}

export interface Notification {
    id: string
    type: 'success' | 'warning' | 'info' | 'error'
    message: string
    date: string
    read: boolean
}

export interface Profile {
    user: User
    membership: {
        id: string
        type: string
        startDate: string
        expiryDate: string
        status: string
    }
    statistics: {
        totalBorrowed: number
        totalReturned: number
        totalFines: number
    }
    phoneNumber?: string
    faculty?: string
    address?: string
}
