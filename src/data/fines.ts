import type { Fine } from '@/types'

export const fines: Fine[] = [
    { id: 'fine-1', borrowingId: '2', bookTitle: 'Machine Learning untuk Pemula', amount: 5000, status: 'Unpaid', dueDate: '2026-07-25' },
    { id: 'fine-2', borrowingId: '4', bookTitle: 'Keamanan Siber', amount: 14000, status: 'Unpaid', dueDate: '2026-07-20' },
    { id: 'fine-3', borrowingId: '6', bookTitle: 'Algoritma dan Struktur Data', amount: 10000, status: 'Unpaid', dueDate: '2026-07-20' },
    { id: 'fine-4', borrowingId: '12', bookTitle: 'Pemrograman Web dengan React', amount: 10000, status: 'Paid', dueDate: '2026-06-15' },
    { id: 'fine-5', borrowingId: '5', bookTitle: 'Keamanan Siber', amount: 15000, status: 'Paid', dueDate: '2026-03-15' },
    { id: 'fine-6', borrowingId: '9', bookTitle: 'Algoritma dan Struktur Data', amount: 150000, status: 'Unpaid', dueDate: '2026-07-25' },
]
