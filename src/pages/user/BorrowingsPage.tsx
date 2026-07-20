import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, Calendar, CheckCircle2, Wallet, Search, RotateCcw } from 'lucide-react'
import { getBorrowingsByUserId } from '@/services/borrowing.service'
import { getAllBooks } from '@/services/book.service'
import { useAuth } from '@/hooks/useAuth'
import type { Borrowing, Book } from '@/types'
import BookCoverPlaceholder from '@/components/ui/BookCoverPlaceholder'
import StatCard from '@/components/cards/StatCard'
import Select from '@/components/forms/Select'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Pagination from '@/components/navigation/Pagination'
import Modal from '@/components/feedback/Modal'

const ITEMS_PER_PAGE = 10

function getDaysUntil(dueDate: string): number {
    const due = new Date(dueDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function computeDisplayStatus(b: Borrowing): {
    label: string
    variant: 'success' | 'warning' | 'danger' | 'info'
} {
    if (b.status === 'Pending') return { label: 'Menunggu', variant: 'warning' }
    if (b.status === 'Returned') return { label: 'Dikembalikan', variant: 'info' }
    const days = getDaysUntil(b.dueDate)
    if (days < 0) return { label: 'Terlambat', variant: 'danger' }
    if (days <= 7) return { label: 'Jatuh Tempo', variant: 'warning' }
    return { label: 'Dipinjam', variant: 'success' }
}

function computeFine(b: Borrowing): number {
    if (b.status === 'Returned' || b.status === 'Pending') return 0
    const days = getDaysUntil(b.dueDate)
    if (days < 0) return Math.abs(days) * 2000
    return 0
}

interface ActionModals {
    type: 'extend' | 'return'
    id: string
}

function BorrowingsPage() {
    const navigate = useNavigate()
    const { user } = useAuth()
    const [borrowings, setBorrowings] = useState<Borrowing[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [modal, setModal] = useState<ActionModals | null>(null)

    useEffect(() => {
        if (!user) return
        Promise.all([getBorrowingsByUserId(user.id), getAllBooks()])
            .then(([borrowingsData, booksData]) => {
                setBorrowings(borrowingsData)
                setBooks(booksData)
            })
            .catch(() => {})
    }, [user])

    const filtered = useMemo(() => {
        let result = [...borrowings]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(
                (b) =>
                    b.bookTitle.toLowerCase().includes(q) ||
                    b.userName.toLowerCase().includes(q),
            )
        }

        if (statusFilter) {
            result = result.filter((b) => {
                if (statusFilter === 'Pending') return b.status === 'Pending'
                if (statusFilter === 'Returned') return b.status === 'Returned'
                const ds = computeDisplayStatus(b)
                if (statusFilter === 'Borrowed') return ds.variant === 'success'
                if (statusFilter === 'DueSoon') return ds.variant === 'warning'
                if (statusFilter === 'Overdue') return ds.variant === 'danger'
                return true
            })
        }

        switch (sort) {
            case 'newest':
                result.sort(
                    (a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime(),
                )
                break
            case 'oldest':
                result.sort(
                    (a, b) => new Date(a.borrowDate).getTime() - new Date(b.borrowDate).getTime(),
                )
                break
            case 'az':
                result.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle))
                break
            case 'za':
                result.sort((a, b) => b.bookTitle.localeCompare(a.bookTitle))
                break
        }

        return result
    }, [search, statusFilter, sort, borrowings])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const activeCount = borrowings.filter(
        (b) => b.status !== 'Returned',
    ).length
    const dueThisWeek = borrowings.filter((b) => {
        if (b.status === 'Returned') return false
        const days = getDaysUntil(b.dueDate)
        return days >= 0 && days <= 7
    }).length
    const returnedCount = borrowings.filter((b) => b.status === 'Returned').length
    const totalFine = borrowings.reduce((sum, b) => sum + computeFine(b), 0)

    const getBookAuthor = (bookId: string): string => {
        return books.find((b) => b.id === bookId)?.author || '-'
    }

    const resetFilters = () => {
        setSearch('')
        setStatusFilter('')
        setSort('')
        setCurrentPage(1)
    }

    const hasActiveFilters = search || statusFilter || sort

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Peminjaman Saya</h2>
                <p className="text-text-secondary">
                    Lihat daftar buku yang sedang dipinjam maupun riwayat peminjaman.
                </p>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<BookOpen className="h-8 w-8" />}
                    title="Sedang Dipinjam"
                    value={activeCount}
                    description="Buku yang sedang dipinjam"
                    variant="primary"
                />
                <StatCard
                    icon={<Calendar className="h-8 w-8" />}
                    title="Jatuh Tempo Minggu Ini"
                    value={dueThisWeek}
                    description="Perlu perhatian khusus"
                    variant="warning"
                />
                <StatCard
                    icon={<CheckCircle2 className="h-8 w-8" />}
                    title="Sudah Dikembalikan"
                    value={returnedCount}
                    description="Riwayat pengembalian"
                    variant="success"
                />
                <StatCard
                    icon={<Wallet className="h-8 w-8" />}
                    title="Total Denda"
                    value={`Rp${totalFine.toLocaleString('id-ID')}`}
                    description="Akumulasi denda"
                    variant="danger"
                />
            </div>

            <div className="mb-4 flex flex-col gap-4 lg:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-disabled" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Cari judul buku..."
                        aria-label="Cari peminjaman"
                        className="h-12 w-full rounded-[12px] border border-border bg-white pl-12 pr-4 text-base text-text-primary placeholder:text-disabled transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>

            <div className="mb-6 flex flex-wrap items-end gap-3">
                <div className="w-full sm:w-[160px]">
                    <Select
                        label="Status"
                        options={[
                            { value: '', label: 'Semua' },
                            { value: 'Pending', label: 'Menunggu' },
                            { value: 'Borrowed', label: 'Dipinjam' },
                            { value: 'DueSoon', label: 'Jatuh Tempo' },
                            { value: 'Overdue', label: 'Terlambat' },
                            { value: 'Returned', label: 'Dikembalikan' },
                        ]}
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                <div className="w-full sm:w-[180px]">
                    <Select
                        label="Urutkan"
                        options={[
                            { value: '', label: 'Default' },
                            { value: 'newest', label: 'Terbaru' },
                            { value: 'oldest', label: 'Terlama' },
                            { value: 'az', label: 'Judul A-Z' },
                            { value: 'za', label: 'Judul Z-A' },
                        ]}
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        size="md"
                        leftIcon={<RotateCcw className="h-4 w-4" />}
                        onClick={resetFilters}
                    >
                        Reset Filter
                    </Button>
                )}
            </div>

            {paginated.length > 0 ? (
                <>
                    <div className="hidden overflow-x-auto rounded-[16px] border border-border md:block">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        'No',
                                        'Cover',
                                        'Judul Buku',
                                        'Penulis',
                                        'Tanggal Pinjam',
                                        'Jatuh Tempo',
                                        'Status',
                                        'Denda',
                                        'Aksi',
                                    ].map((h) => (
                                        <th
                                            key={h}
                                            className="px-4 py-3 text-left text-sm font-medium text-text-secondary"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {paginated.map((b, idx) => {
                                    const ds = computeDisplayStatus(b)
                                    const fine = computeFine(b)
                                    return (
                                        <tr
                                            key={b.id}
                                            className="transition-colors duration-150 hover:bg-gray-50"
                                        >
                                            <td className="px-4 py-3 text-sm text-text-secondary">
                                                {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="h-10 w-8 overflow-hidden rounded">
                                                    {b.bookCover ? (
                                                        <img
                                                            src={b.bookCover}
                                                            alt={b.bookTitle}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <BookCoverPlaceholder title={b.bookTitle} className="h-full w-full" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm font-medium text-text-primary">
                                                {b.bookTitle}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-text-secondary">
                                                {getBookAuthor(b.bookId)}
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
                                            <td className="px-4 py-3 text-sm text-text-secondary">
                                                {fine > 0
                                                    ? `Rp${fine.toLocaleString('id-ID')}`
                                                    : '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => navigate(`/book/${b.bookId}`)}
                                                    >
                                                        Detail
                                                    </Button>
                                                    {b.status !== 'Returned' && (
                                                        <>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    setModal({
                                                                        type: 'extend',
                                                                        id: b.id,
                                                                    })
                                                                }
                                                            >
                                                                Perpanjang
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() =>
                                                                    setModal({
                                                                        type: 'return',
                                                                        id: b.id,
                                                                    })
                                                                }
                                                            >
                                                                Kembalikan
                                                            </Button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-4 md:hidden">
                        {paginated.map((b) => {
                            const ds = computeDisplayStatus(b)
                            const fine = computeFine(b)
                            return (
                                <div
                                    key={b.id}
                                    className="rounded-[16px] border border-border bg-white p-4 shadow-card"
                                >
                                    <div className="mb-3 flex items-start gap-3">
                                        <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg">
                                            {b.bookCover ? (
                                                <img
                                                    src={b.bookCover}
                                                    alt={b.bookTitle}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <BookCoverPlaceholder title={b.bookTitle} className="h-full w-full" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h5 className="text-sm font-semibold text-text-primary">
                                                {b.bookTitle}
                                            </h5>
                                            <p className="text-xs text-text-secondary">
                                                {getBookAuthor(b.bookId)}
                                            </p>
                                        </div>
                                        <Badge variant={ds.variant} size="sm">
                                            {ds.label}
                                        </Badge>
                                    </div>
                                    <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
                                        <span>
                                            Pinjam:{' '}
                                            {new Date(b.borrowDate).toLocaleDateString('id-ID')}
                                        </span>
                                        <span>
                                            Jatuh Tempo:{' '}
                                            {new Date(b.dueDate).toLocaleDateString('id-ID')}
                                        </span>
                                        <span>
                                            Denda:{' '}
                                            {fine > 0
                                                ? `Rp${fine.toLocaleString('id-ID')}`
                                                : '-'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => navigate(`/book/${b.bookId}`)}
                                        >
                                            Detail
                                        </Button>
                                        {b.status !== 'Returned' && (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        setModal({ type: 'extend', id: b.id })
                                                    }
                                                >
                                                    Perpanjang
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        setModal({ type: 'return', id: b.id })
                                                    }
                                                >
                                                    Kembalikan
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <Pagination
                        className="mt-6"
                        currentPage={safePage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20">
                    <BookOpen className="mb-4 h-16 w-16 text-disabled" />
                    <h4 className="mb-2 text-lg font-semibold text-text-primary">
                        Belum ada data peminjaman
                    </h4>
                    <p className="mb-6 text-text-secondary">
                        Tidak ada data peminjaman yang sesuai dengan pencarian.
                    </p>
                    <Button variant="primary" onClick={() => navigate('/catalog')}>
                        Lihat Katalog Buku
                    </Button>
                </div>
            )}

            <Modal
                isOpen={!!modal}
                onClose={() => setModal(null)}
                title={modal?.type === 'extend' ? 'Perpanjang Peminjaman' : 'Kembalikan Buku'}
                size="sm"
            >
                <p className="text-sm text-text-secondary">
                    {modal?.type === 'extend'
                        ? 'Fitur perpanjangan peminjaman belum tersedia. Silakan hubungi petugas perpustakaan.'
                        : 'Fitur pengembalian buku belum tersedia. Silakan hubungi petugas perpustakaan.'}
                </p>
            </Modal>
        </div>
    )
}

export default BorrowingsPage
