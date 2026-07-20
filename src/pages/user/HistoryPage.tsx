import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    BookOpen,
    CheckCircle2,
    Clock,
    Wallet,
    Search,
    RotateCcw,
} from 'lucide-react'
import { getAllHistory } from '@/services/history.service'
import { getAllBooks } from '@/services/book.service'
import type { History, Book } from '@/types'
import BookCoverPlaceholder from '@/components/ui/BookCoverPlaceholder'
import StatCard from '@/components/cards/StatCard'
import Select from '@/components/forms/Select'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Pagination from '@/components/navigation/Pagination'
import Skeleton from '@/components/feedback/Skeleton'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'

const ITEMS_PER_PAGE = 10

const statusOptions = [
    { value: '', label: 'Semua Status' },
    { value: 'Returned', label: 'Dikembalikan' },
    { value: 'Late', label: 'Terlambat' },
    { value: 'Lost', label: 'Hilang' },
]

const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'newest', label: 'Terbaru' },
    { value: 'oldest', label: 'Terlama' },
    { value: 'az', label: 'Judul A-Z' },
    { value: 'za', label: 'Judul Z-A' },
]

const statusVariant: Record<string, 'success' | 'danger' | 'default'> = {
    Returned: 'success',
    Late: 'danger',
    Lost: 'default',
}

const statusLabel: Record<string, string> = {
    Returned: 'Dikembalikan',
    Late: 'Terlambat',
    Lost: 'Hilang',
}

function HistoryPage() {
    const navigate = useNavigate()
    const [historyList, setHistoryList] = useState<History[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [yearFilter, setYearFilter] = useState('')
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setLoading(true)
        Promise.all([getAllHistory(), getAllBooks()])
            .then(([historyData, booksData]) => {
                setHistoryList(historyData)
                setBooks(booksData)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const bookMap = useMemo(() => new Map(books.map((b) => [b.id, b])), [books])

    const categories = useMemo(() => {
        const cats = new Set<string>()
        historyList.forEach((h) => {
            const book = bookMap.get(h.bookId)
            if (book) cats.add(book.category)
        })
        return Array.from(cats).sort()
    }, [historyList, bookMap])

    const years = useMemo(() => {
        const ys = new Set<number>()
        historyList.forEach((h) => {
            const book = bookMap.get(h.bookId)
            if (book) ys.add(book.year)
        })
        return Array.from(ys).sort((a, b) => b - a)
    }, [historyList, bookMap])

    const filtered = useMemo(() => {
        let result = [...historyList]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter((h) => {
                const book = bookMap.get(h.bookId)
                const author = book?.author?.toLowerCase() || ''
                const isbn = book?.isbn?.toLowerCase() || ''
                return (
                    h.bookTitle.toLowerCase().includes(q) ||
                    author.includes(q) ||
                    isbn.includes(q)
                )
            })
        }

        if (statusFilter) {
            result = result.filter((h) => h.status === statusFilter)
        }

        if (categoryFilter) {
            result = result.filter((h) => {
                const book = bookMap.get(h.bookId)
                return book?.category === categoryFilter
            })
        }

        if (yearFilter) {
            result = result.filter((h) => {
                const book = bookMap.get(h.bookId)
                return book?.year === Number(yearFilter)
            })
        }

        switch (sort) {
            case 'newest':
                result.sort(
                    (a, b) =>
                        new Date(b.borrowDate).getTime() -
                        new Date(a.borrowDate).getTime(),
                )
                break
            case 'oldest':
                result.sort(
                    (a, b) =>
                        new Date(a.borrowDate).getTime() -
                        new Date(b.borrowDate).getTime(),
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
    }, [search, statusFilter, categoryFilter, yearFilter, sort, historyList, bookMap])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const totalBorrowed = historyList.length
    const returnedCount = historyList.filter((h) => h.status === 'Returned').length
    const lateCount = historyList.filter((h) => h.status === 'Late').length
    const totalFine = historyList.reduce((sum, h) => sum + h.fine, 0)

    const getBookAuthor = (bookId: string): string =>
        bookMap.get(bookId)?.author || '-'

    const resetFilters = () => {
        setSearch('')
        setStatusFilter('')
        setCategoryFilter('')
        setYearFilter('')
        setSort('')
        setCurrentPage(1)
    }

    const hasActiveFilters =
        search || statusFilter || categoryFilter || yearFilter || sort

    const handleRetry = () => {
        setError(false)
        setLoading(true)
        setTimeout(() => setLoading(false), 500)
    }

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat riwayat peminjaman. Silakan coba lagi."
                    retryLabel="Coba Lagi"
                    onRetry={handleRetry}
                />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="animate-fade-in">
                <div className="mb-6">
                    <Skeleton variant="text" className="mb-2 h-8 w-64" />
                    <Skeleton variant="text" className="h-4 w-96" />
                </div>
                <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} variant="rectangular" className="h-32" />
                    ))}
                </div>
                <Skeleton variant="rectangular" className="mb-4 h-12" />
                <Skeleton variant="rectangular" className="h-96" />
            </div>
        )
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Riwayat Peminjaman</h2>
                <p className="text-text-secondary">
                    Melihat seluruh riwayat peminjaman buku yang pernah dilakukan.
                </p>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<BookOpen className="h-8 w-8" />}
                    title="Total Peminjaman"
                    value={totalBorrowed}
                    description="Seluruh peminjaman"
                    variant="primary"
                />
                <StatCard
                    icon={<CheckCircle2 className="h-8 w-8" />}
                    title="Sudah Dikembalikan"
                    value={returnedCount}
                    description="Tepat waktu"
                    variant="success"
                />
                <StatCard
                    icon={<Clock className="h-8 w-8" />}
                    title="Terlambat"
                    value={lateCount}
                    description="Melebihi batas waktu"
                    variant="warning"
                />
                <StatCard
                    icon={<Wallet className="h-8 w-8" />}
                    title="Total Denda"
                    value={`Rp${totalFine.toLocaleString('id-ID')}`}
                    description="Akumulasi denda dibayar"
                    variant="danger"
                />
            </div>

            <div className="mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-disabled" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Cari berdasarkan judul buku atau penulis..."
                        aria-label="Cari riwayat peminjaman"
                        className="h-12 w-full rounded-[12px] border border-border bg-white pl-12 pr-4 text-base text-text-primary placeholder:text-disabled transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>

            <div className="mb-6 flex flex-wrap items-end gap-3">
                <div className="w-full sm:w-[160px]">
                    <Select
                        label="Status"
                        options={statusOptions}
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                <div className="w-full sm:w-[160px]">
                    <Select
                        label="Kategori"
                        options={[
                            { value: '', label: 'Semua Kategori' },
                            ...categories.map((c) => ({ value: c, label: c })),
                        ]}
                        value={categoryFilter}
                        onChange={(e) => {
                            setCategoryFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                <div className="w-full sm:w-[140px]">
                    <Select
                        label="Tahun"
                        options={[
                            { value: '', label: 'Semua Tahun' },
                            ...years.map((y) => ({ value: String(y), label: String(y) })),
                        ]}
                        value={yearFilter}
                        onChange={(e) => {
                            setYearFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                <div className="w-full sm:w-[160px]">
                    <Select
                        label="Urutkan"
                        options={sortOptions}
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
                        aria-label="Reset filter"
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
                                        'Tanggal Pinjam',
                                        'Tanggal Kembali',
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
                                {paginated.map((h, idx) => (
                                    <tr
                                        key={h.id}
                                        className="transition-colors duration-150 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="h-10 w-8 overflow-hidden rounded bg-gray-100">
                                                {h.bookCover ? (
                                                    <img
                                                        src={h.bookCover}
                                                        alt={h.bookTitle}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <BookCoverPlaceholder title={h.bookTitle} className="h-full w-full rounded" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-text-primary">
                                            {h.bookTitle}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {new Date(h.borrowDate).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {new Date(h.returnDate).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant={statusVariant[h.status] || 'default'} size="sm">
                                                {statusLabel[h.status] || h.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {h.fine > 0
                                                ? `Rp${h.fine.toLocaleString('id-ID')}`
                                                : '-'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => navigate(`/book/${h.bookId}`)}
                                                aria-label={`Lihat detail ${h.bookTitle}`}
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
                        {paginated.map((h) => (
                            <div
                                key={h.id}
                                className="rounded-[16px] border border-border bg-white p-4 shadow-card"
                            >
                                <div className="mb-3 flex items-start gap-3">
                                    <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                        {h.bookCover ? (
                                            <img
                                                src={h.bookCover}
                                                alt={h.bookTitle}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <BookCoverPlaceholder title={h.bookTitle} className="h-full w-full rounded-lg" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h5 className="text-sm font-semibold text-text-primary">
                                            {h.bookTitle}
                                        </h5>
                                        <p className="text-xs text-text-secondary">
                                            {getBookAuthor(h.bookId)}
                                        </p>
                                    </div>
                                    <Badge variant={statusVariant[h.status] || 'default'} size="sm">
                                        {statusLabel[h.status] || h.status}
                                    </Badge>
                                </div>
                                <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
                                    <span>
                                        Pinjam: {new Date(h.borrowDate).toLocaleDateString('id-ID')}
                                    </span>
                                    <span>
                                        Kembali: {new Date(h.returnDate).toLocaleDateString('id-ID')}
                                    </span>
                                    <span>
                                        Denda:{' '}
                                        {h.fine > 0
                                            ? `Rp${h.fine.toLocaleString('id-ID')}`
                                            : '-'}
                                    </span>
                                </div>
                                <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => navigate(`/book/${h.bookId}`)}
                                    aria-label={`Lihat detail ${h.bookTitle}`}
                                >
                                    Detail
                                </Button>
                            </div>
                        ))}
                    </div>

                    <Pagination
                        className="mt-6"
                        currentPage={safePage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <EmptyState
                    title="Belum ada riwayat peminjaman"
                    description="Anda belum memiliki riwayat peminjaman buku."
                    actionLabel="Lihat Katalog Buku"
                    onAction={() => navigate('/catalog')}
                />
            )}
        </div>
    )
}

export default HistoryPage
