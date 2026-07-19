export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Library Management System'

export const ROUTES = {
    LANDING: '/',
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    ADMIN_DASHBOARD: '/admin/dashboard',
    CATALOG: '/catalog',
    BOOK_DETAIL: '/book/:id',
    BORROWINGS: '/borrowings',
    HISTORY: '/history',
    PROFILE: '/profile',
} as const

export const API_ENDPOINTS = {
    BOOKS: '/api/books',
    USERS: '/api/users',
    BORROWINGS: '/api/borrowings',
    RETURNS: '/api/returns',
    HISTORY: '/api/history',
    PROFILE: '/api/profile',
    DASHBOARD: '/api/dashboard',
    ADMIN_DASHBOARD: '/api/admin/dashboard',
} as const

export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    MAX_BOOK: 100,
} as const

export const SIDEBAR_WIDTH = 260
export const HEADER_HEIGHT = 72

export const BOOK_STATUS = {
    AVAILABLE: 'Available',
    BORROWED: 'Borrowed',
    PENDING: 'Pending',
    RETURNED: 'Returned',
} as const
