import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    BookMarked,
    History,
    Timer,
    BookOpen,
    Library,
    ChevronRight,
    BookPlus,
    Clock,
    User,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { getAllBooks } from '@/services/book.service'
import { getAllBorrowings } from '@/services/borrowing.service'
import StatCard from '@/components/cards/StatCard'
import BookCard from '@/components/cards/BookCard'
import Card from '@/components/cards/Card'
import { cn } from '@/utils/cn'
import type { Book, Borrowing } from '@/types'

const quickAccessItems = [
    { label: 'Katalog Buku', icon: BookOpen, path: '/catalog', color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Peminjaman', icon: BookPlus, path: '/borrowings', color: 'text-success', bg: 'bg-success/10' },
    { label: 'Riwayat', icon: Clock, path: '/history', color: 'text-info', bg: 'bg-info/10' },
    { label: 'Profil', icon: User, path: '/profile', color: 'text-warning', bg: 'bg-warning/10' },
]

const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']
const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

function formatDate(date: Date): string {
    const day = days[date.getDay()]
    const month = months[date.getMonth()]
    return `${day}, ${date.getDate()} ${month} ${date.getFullYear()}`
}

function DashboardPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const today = formatDate(new Date())

    const [books, setBooks] = useState<Book[]>([])
    const [borrowings, setBorrowings] = useState<Borrowing[]>([])

    useEffect(() => {
        Promise.all([getAllBooks(), getAllBorrowings()])
            .then(([booksData, borrowingsData]) => {
                setBooks(booksData)
                setBorrowings(borrowingsData)
            })
            .catch(() => {})
    }, [])

    const availableBooks = books.filter((b) => b.status === 'Available').length
    const totalBorrowings = borrowings.filter((b) => b.status === 'Borrowed').length
    const totalReturns = borrowings.filter((b) => b.status === 'Returned').length
    const totalFines = 5000
    const popularBooks = books.slice(0, 4)

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h2 className="mb-1 text-2xl font-bold text-text-primary">
                    Halo, {user?.name || 'Pengguna'} 👋
                </h2>
                <p className="text-text-secondary">
                    Selamat datang kembali di Sistem Perpustakaan.
                </p>
                <p className="mt-1 text-sm text-text-secondary">{today}</p>
            </div>

            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<BookMarked className="h-8 w-8" />}
                    title="Buku Dipinjam"
                    value={totalBorrowings}
                    description="Buku yang sedang dipinjam"
                    variant="primary"
                />
                <StatCard
                    icon={<History className="h-8 w-8" />}
                    title="Riwayat"
                    value={totalReturns}
                    description="Riwayat peminjaman"
                    variant="info"
                />
                <StatCard
                    icon={<Timer className="h-8 w-8" />}
                    title="Total Denda"
                    value={`Rp${totalFines.toLocaleString('id-ID')}`}
                    description="Total denda saat ini"
                    variant="warning"
                />
                <StatCard
                    icon={<Library className="h-8 w-8" />}
                    title="Buku Tersedia"
                    value={availableBooks}
                    description={`Dari ${books.length} total koleksi`}
                    variant="success"
                />
            </div>

            <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-text-primary">Buku Populer</h3>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {popularBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            title={book.title}
                            author={book.author}
                            category={book.category}
                            status={book.status}
                            onDetail={() => navigate(`/book/${book.id}`)}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">Akses Cepat</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {quickAccessItems.map((item) => (
                        <Card
                            key={item.path}
                            variant="interactive"
                            padding="md"
                            onClick={() => navigate(item.path)}
                            className="flex cursor-pointer items-center gap-4"
                        >
                            <div
                                className={cn(
                                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                                    item.bg,
                                )}
                            >
                                <item.icon className={cn('h-6 w-6', item.color)} />
                            </div>
                            <div className="flex flex-1 items-center justify-between">
                                <span className="text-sm font-medium text-text-primary">
                                    {item.label}
                                </span>
                                <ChevronRight className="h-4 w-4 text-disabled" />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
