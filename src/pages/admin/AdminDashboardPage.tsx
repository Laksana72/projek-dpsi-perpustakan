import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Book as BookIcon,
    Users,
    BookOpen,
    Clock,
    Undo2,
    Wallet,
    PlusCircle,
    List,
    BookMarked,
    RefreshCw,
    FileText,
    Settings,
    Search,
} from 'lucide-react'
import { getAllBooks } from '@/services/book.service'
import { getAllBorrowings } from '@/services/borrowing.service'
import { getAllReturns } from '@/services/return.service'
import type { Book, Borrowing, Return } from '@/types'
import StatCard from '@/components/cards/StatCard'
import QuickActionCard from '@/components/cards/QuickActionCard'
import ActivityCard from '@/components/cards/ActivityCard'
import ProgressCard from '@/components/cards/ProgressCard'
import BookCard from '@/components/cards/BookCard'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Skeleton from '@/components/feedback/Skeleton'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'

const trends = {
    totalBooks: '+12.5%',
    totalMembers: '+8.3%',
    totalBorrowings: '+15.2%',
    totalOverdue: '-5.1%',
    totalReturns: '+22.7%',
    totalFines: '+10.4%',
}

const recentActivities = [
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

const topBorrowedBooks = ['1', '2', '3', '5', '7']

function getDaysUntil(dueDate: string): number {
    const due = new Date(dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function computeBorrowingStatus(b: { status: string; dueDate: string }): {
    label: string
    variant: 'success' | 'warning' | 'danger' | 'info'
} {
    if (b.status === 'Returned') return { label: 'Dikembalikan', variant: 'info' }
    const days = getDaysUntil(b.dueDate)
    if (days < 0) return { label: 'Terlambat', variant: 'danger' }
    if (days <= 7) return { label: 'Jatuh Tempo', variant: 'warning' }
    return { label: 'Dipinjam', variant: 'success' }
}

const quickActions = [
    { icon: <PlusCircle className="h-6 w-6" />, label: 'Tambah Buku', path: '/admin/books' },
    { icon: <List className="h-6 w-6" />, label: 'Kelola Buku', path: '/admin/books' },
    { icon: <Users className="h-6 w-6" />, label: 'Anggota', path: '/admin/members' },
    { icon: <BookMarked className="h-6 w-6" />, label: 'Data Peminjaman', path: '/admin/borrowings' },
    { icon: <RefreshCw className="h-6 w-6" />, label: 'Data Pengembalian', path: '/admin/returns' },
    { icon: <FileText className="h-6 w-6" />, label: 'Laporan', path: '/admin/reports' },
    { icon: <Wallet className="h-6 w-6" />, label: 'Denda', path: '/admin/fines' },
    { icon: <Settings className="h-6 w-6" />, label: 'Pengaturan', path: '/admin/profile' },
]

function AdminDashboardPage() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState<Book[]>([])
    const [borrowings, setBorrowings] = useState<Borrowing[]>([])
    const [returns, setReturns] = useState<Return[]>([])

    useEffect(() => {
        setLoading(true)
        setError(false)
        Promise.all([
            getAllBooks(),
            getAllBorrowings(),
            getAllReturns(),
        ])
            .then(([booksData, borrowingsData, returnsData]) => {
                setBooks(booksData)
                setBorrowings(borrowingsData)
                setReturns(returnsData)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const today = useMemo(() => {
        const d = new Date()
        d.setHours(0, 0, 0, 0)
        return d
    }, [])

    const stats = useMemo(() => {
        const overdueBorrowings = borrowings.filter((b) => {
            if (b.status === 'Returned') return false
            const due = new Date(b.dueDate)
            due.setHours(0, 0, 0, 0)
            return due < today
        })
        const totalFines = returns.reduce((sum, r) => sum + r.fine, 0)
        return {
            totalBooks: books.length,
            totalMembers: 120,
            totalBorrowings: borrowings.filter((b) => b.status !== 'Returned').length,
            totalReturns: returns.length,
            totalOverdue: overdueBorrowings.length,
            totalFines,
        }
    }, [books, borrowings, returns, today])

    const bookStatusCounts = useMemo(() => ({
        available: books.filter((b) => b.status === 'Available').length,
        borrowed: books.filter((b) => b.status === 'Borrowed').length,
        reserved: books.filter((b) => b.status === 'Reserved').length,
        lost: books.filter((b) => b.status === 'Lost').length,
    }), [books])

    const recentBorrowings = useMemo(() => borrowings.slice(0, 5), [borrowings])
    const recentReturns = useMemo(() => returns.slice(0, 5), [returns])

    const filteredActivities = useMemo(() => {
        if (!search.trim()) return recentActivities
        const q = search.toLowerCase()
        return recentActivities.filter(
            (a) =>
                a.name.toLowerCase().includes(q) ||
                a.action.toLowerCase().includes(q),
        )
    }, [search])

    const filteredBorrowings = useMemo(() => {
        if (!search.trim()) return recentBorrowings
        const q = search.toLowerCase()
        return recentBorrowings.filter(
            (b) =>
                b.userName.toLowerCase().includes(q) ||
                b.bookTitle.toLowerCase().includes(q),
        )
    }, [search, recentBorrowings])

    const filteredReturns = useMemo(() => {
        if (!search.trim()) return recentReturns
        const q = search.toLowerCase()
        return recentReturns.filter(
            (r) =>
                r.userName.toLowerCase().includes(q) ||
                r.bookTitle.toLowerCase().includes(q),
        )
    }, [search, recentReturns])

    const filteredBooks = useMemo(() => {
        if (!search.trim()) return topBorrowedBooks
        const q = search.toLowerCase()
        return topBorrowedBooks.filter((id) => {
            const book = books.find((b) => b.id === id)
            if (!book) return false
            return (
                book.title.toLowerCase().includes(q) ||
                book.author.toLowerCase().includes(q)
            )
        })
    }, [search, books])

    const handleRetry = () => {
        setError(false)
        setLoading(true)
        Promise.all([
            getAllBooks(),
            getAllBorrowings(),
            getAllReturns(),
        ])
            .then(([booksData, borrowingsData, returnsData]) => {
                setBooks(booksData)
                setBorrowings(borrowingsData)
                setReturns(returnsData)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat dashboard. Silakan coba lagi."
                    retryLabel="Coba Lagi"
                    onRetry={handleRetry}
                />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="animate-fade-in">
                <Skeleton variant="text" className="mb-2 h-8 w-64" />
                <Skeleton variant="text" className="mb-8 h-4 w-96" />
                <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Skeleton key={i} variant="rectangular" className="h-32" />
                    ))}
                </div>
                <Skeleton variant="rectangular" className="mb-8 h-24" />
                <Skeleton variant="rectangular" className="mb-8 h-48" />
                <Skeleton variant="rectangular" className="mb-8 h-48" />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} variant="rectangular" className="h-72" />
                    ))}
                </div>
            </div>
        )
    }

    const statCards = [
        {
            icon: <BookIcon className="h-8 w-8" />,
            title: 'Total Buku',
            value: stats.totalBooks,
            trend: trends.totalBooks,
            trendDir: 'up' as const,
            variant: 'primary' as const,
        },
        {
            icon: <Users className="h-8 w-8" />,
            title: 'Total Anggota',
            value: stats.totalMembers,
            trend: trends.totalMembers,
            trendDir: 'up' as const,
            variant: 'info' as const,
        },
        {
            icon: <BookOpen className="h-8 w-8" />,
            title: 'Buku Dipinjam',
            value: stats.totalBorrowings,
            trend: trends.totalBorrowings,
            trendDir: 'up' as const,
            variant: 'warning' as const,
        },
        {
            icon: <Clock className="h-8 w-8" />,
            title: 'Buku Terlambat',
            value: stats.totalOverdue,
            trend: trends.totalOverdue,
            trendDir: 'down' as const,
            variant: 'danger' as const,
        },
        {
            icon: <Undo2 className="h-8 w-8" />,
            title: 'Pengembalian',
            value: stats.totalReturns,
            trend: trends.totalReturns,
            trendDir: 'up' as const,
            variant: 'success' as const,
        },
        {
            icon: <Wallet className="h-8 w-8" />,
            title: 'Total Denda',
            value: `Rp${stats.totalFines.toLocaleString('id-ID')}`,
            trend: trends.totalFines,
            trendDir: 'up' as const,
            variant: 'danger' as const,
        },
    ]

    const statusBarItems = [
        {
            label: 'Tersedia',
            value: bookStatusCounts.available,
            total: stats.totalBooks,
            color: 'bg-success',
        },
        {
            label: 'Dipinjam',
            value: bookStatusCounts.borrowed,
            total: stats.totalBooks,
            color: 'bg-warning',
        },
        {
            label: 'Reservasi',
            value: bookStatusCounts.reserved,
            total: stats.totalBooks,
            color: 'bg-info',
        },
        {
            label: 'Hilang',
            value: bookStatusCounts.lost,
            total: stats.totalBooks,
            color: 'bg-disabled',
        },
    ]

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Dashboard Admin</h2>
                <p className="text-text-secondary">
                    Kelola seluruh aktivitas perpustakaan melalui dashboard administrator.
                </p>
            </div>

            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-disabled" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari buku, anggota, atau peminjaman..."
                        aria-label="Cari di dashboard"
                        className="h-12 w-full rounded-[12px] border border-border bg-white pl-12 pr-4 text-base text-text-primary placeholder:text-disabled transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>

            <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {statCards.map((card) => (
                    <StatCard
                        key={card.title}
                        icon={card.icon}
                        title={card.title}
                        value={card.value}
                        variant={card.variant}
                        trend={card.trendDir}
                        trendValue={card.trend}
                    />
                ))}
            </div>

            <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                    Akses Cepat
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    {quickActions.map((action) => (
                        <QuickActionCard
                            key={action.label}
                            icon={action.icon}
                            title={action.label}
                            onClick={() => navigate(action.path)}
                        />
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                    Aktivitas Terbaru
                </h3>
                <div className="rounded-[16px] bg-white p-6 shadow-card">
                    {filteredActivities.length > 0 ? (
                        <div className="space-y-5">
                            {filteredActivities.map((activity) => (
                                <ActivityCard
                                    key={activity.id}
                                    avatar={activity.avatar}
                                    name={activity.name}
                                    action={activity.action}
                                    time={activity.time}
                                />
                            ))}
                        </div>
                    ) : (
                        <EmptyState
                            title="Belum ada aktivitas"
                            description="Tidak ada aktivitas yang sesuai dengan pencarian."
                        />
                    )}
                </div>
            </div>

            <div className="mb-8 grid gap-6 lg:grid-cols-2">
                <ProgressCard
                    title="Status Buku"
                    items={statusBarItems}
                />

                <div>
                    <h3 className="mb-4 text-lg font-semibold text-text-primary">
                        Buku Terpopuler
                    </h3>
                    {filteredBooks.length > 0 ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                            {filteredBooks.map((bookId) => {
                                const book = books.find((b) => b.id === bookId)
                                if (!book) return null
                                return (
                                    <BookCard
                                        key={book.id}
                                        cover={book.cover}
                                        title={book.title}
                                        author={book.author}
                                        category={book.category}
                                        year={book.year}
                                        status={book.status}
                                        onDetail={() => navigate(`/book/${book.id}`)}
                                    />
                                )
                            })}
                        </div>
                    ) : (
                        <EmptyState
                            title="Belum ada buku"
                            description="Tidak ada buku yang sesuai dengan pencarian."
                        />
                    )}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                    Peminjaman Terbaru
                </h3>
                <div className="hidden overflow-x-auto rounded-[16px] border border-border md:block">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                {['No', 'Nama Anggota', 'Judul Buku', 'Tanggal Pinjam', 'Jatuh Tempo', 'Status', 'Aksi'].map(
                                    (h) => (
                                        <th
                                            key={h}
                                            className="px-4 py-3 text-left text-sm font-medium text-text-secondary"
                                        >
                                            {h}
                                        </th>
                                    ),
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredBorrowings.map((b, idx) => {
                                const ds = computeBorrowingStatus(b)
                                return (
                                    <tr
                                        key={b.id}
                                        className="transition-colors duration-150 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {idx + 1}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-text-primary">
                                            {b.userName}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-text-primary">
                                            {b.bookTitle}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {new Date(b.borrowDate).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {new Date(b.dueDate).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant={ds.variant} size="sm">
                                                {ds.label}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => navigate(`/book/${b.bookId}`)}
                                                aria-label={`Detail ${b.bookTitle}`}
                                            >
                                                Detail
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col gap-4 md:hidden">
                    {filteredBorrowings.map((b) => {
                        const ds = computeBorrowingStatus(b)
                        return (
                            <div
                                key={b.id}
                                className="rounded-[16px] border border-border bg-white p-4 shadow-card"
                            >
                                <div className="mb-2 flex items-start justify-between gap-3">
                                    <div>
                                        <h5 className="text-sm font-semibold text-text-primary">
                                            {b.bookTitle}
                                        </h5>
                                        <p className="text-xs text-text-secondary">{b.userName}</p>
                                    </div>
                                    <Badge variant={ds.variant} size="sm">
                                        {ds.label}
                                    </Badge>
                                </div>
                                <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
                                    <span>
                                        Pinjam: {new Date(b.borrowDate).toLocaleDateString('id-ID')}
                                    </span>
                                    <span>
                                        Jatuh Tempo: {new Date(b.dueDate).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => navigate(`/book/${b.bookId}`)}
                                >
                                    Detail
                                </Button>
                            </div>
                        )
                    })}
                    {filteredBorrowings.length === 0 && (
                        <EmptyState
                            title="Belum ada peminjaman"
                            description="Tidak ada data peminjaman yang sesuai."
                        />
                    )}
                </div>
                {filteredBorrowings.length === 0 && (
                    <div className="hidden md:block">
                        <EmptyState
                            title="Belum ada peminjaman"
                            description="Tidak ada data peminjaman yang sesuai."
                        />
                    </div>
                )}
            </div>

            <div className="mb-8">
                <h3 className="mb-4 text-lg font-semibold text-text-primary">
                    Pengembalian Terbaru
                </h3>
                <div className="hidden overflow-x-auto rounded-[16px] border border-border md:block">
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-50">
                            <tr>
                                {['No', 'Nama Anggota', 'Judul Buku', 'Tanggal Kembali', 'Status', 'Denda', 'Aksi'].map(
                                    (h) => (
                                        <th
                                            key={h}
                                            className="px-4 py-3 text-left text-sm font-medium text-text-secondary"
                                        >
                                            {h}
                                        </th>
                                    ),
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredReturns.map((r, idx) => (
                                <tr
                                    key={r.id}
                                    className="transition-colors duration-150 hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 text-sm text-text-secondary">
                                        {idx + 1}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-text-primary">
                                        {r.userName}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-text-primary">
                                        {r.bookTitle}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-text-secondary">
                                        {new Date(r.returnDate).toLocaleDateString('id-ID')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Badge
                                            variant={r.status === 'On Time' ? 'success' : 'danger'}
                                            size="sm"
                                        >
                                            {r.status === 'On Time' ? 'Tepat Waktu' : 'Terlambat'}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-text-secondary">
                                        {r.fine > 0
                                            ? `Rp${r.fine.toLocaleString('id-ID')}`
                                            : '-'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => navigate(`/book/${r.bookId}`)}
                                            aria-label={`Detail ${r.bookTitle}`}
                                        >
                                            Detail
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col gap-4 md:hidden">
                    {filteredReturns.map((r) => (
                        <div
                            key={r.id}
                            className="rounded-[16px] border border-border bg-white p-4 shadow-card"
                        >
                            <div className="mb-2 flex items-start justify-between gap-3">
                                <div>
                                    <h5 className="text-sm font-semibold text-text-primary">
                                        {r.bookTitle}
                                    </h5>
                                    <p className="text-xs text-text-secondary">{r.userName}</p>
                                </div>
                                <Badge
                                    variant={r.status === 'On Time' ? 'success' : 'danger'}
                                    size="sm"
                                >
                                    {r.status === 'On Time' ? 'Tepat Waktu' : 'Terlambat'}
                                </Badge>
                            </div>
                            <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
                                <span>
                                    Kembali: {new Date(r.returnDate).toLocaleDateString('id-ID')}
                                </span>
                                <span>
                                    Denda:{' '}
                                    {r.fine > 0
                                        ? `Rp${r.fine.toLocaleString('id-ID')}`
                                        : '-'}
                                </span>
                            </div>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => navigate(`/book/${r.bookId}`)}
                            >
                                Detail
                            </Button>
                        </div>
                    ))}
                    {filteredReturns.length === 0 && (
                        <EmptyState
                            title="Belum ada pengembalian"
                            description="Tidak ada data pengembalian yang sesuai."
                        />
                    )}
                </div>
                {filteredReturns.length === 0 && (
                    <div className="hidden md:block">
                        <EmptyState
                            title="Belum ada pengembalian"
                            description="Tidak ada data pengembalian yang sesuai."
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminDashboardPage
