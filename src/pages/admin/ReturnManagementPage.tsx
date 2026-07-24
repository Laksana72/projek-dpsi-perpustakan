import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Undo2,
    BookOpen,
    Clock,
    Wallet,
    Search,
    RotateCcw,
} from 'lucide-react'
import { getAllReturns } from '@/services/return.service'
import { getAllBorrowings, returnBorrowing, confirmReturn } from '@/services/borrowing.service'
import { getAllBooks } from '@/services/book.service'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'sonner'
import type { Return, Book, Borrowing } from '@/types'
import BookCoverPlaceholder from '@/components/ui/BookCoverPlaceholder'
import StatCard from '@/components/cards/StatCard'
import Select from '@/components/forms/Select'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Pagination from '@/components/navigation/Pagination'
import Modal from '@/components/feedback/Modal'
import Skeleton from '@/components/feedback/Skeleton'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'
import { exportReturns } from '@/services/excel.service'

const ITEMS_PER_PAGE = 10

const statusBadge: Record<string, 'success' | 'warning' | 'danger' | 'default'> = {
    'On Time': 'success',
    Late: 'danger',
    Pending: 'warning',
    Lost: 'default',
}

const statusLabel: Record<string, string> = {
    'On Time': 'Tepat Waktu',
    Late: 'Terlambat',
    Pending: 'Menunggu',
    Lost: 'Hilang',
}

function computeLateDays(dueDate: string, returnDate: string): number {
    const due = new Date(dueDate)
    due.setHours(0, 0, 0, 0)
    const ret = returnDate ? new Date(returnDate) : new Date()
    ret.setHours(0, 0, 0, 0)
    const diff = Math.ceil((ret.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
}

function ReturnManagementPage() {
    const navigate = useNavigate()
    const { isPustakawan } = useAuth()
    const bookPrefix = isPustakawan ? '/pustakawan' : '/admin'
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [returns, setReturns] = useState<Return[]>([])
    const [books, setBooks] = useState<Book[]>([])
    const [borrowings, setBorrowings] = useState<Borrowing[]>([])
    const [confirmModal, setConfirmModal] = useState<string | null>(null)
    const [printModal, setPrintModal] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        setError(false)
        Promise.all([
            getAllReturns(),
            getAllBooks(),
            getAllBorrowings(),
        ])
            .then(([returnsData, booksData, borrowingsData]) => {
                setReturns(returnsData)
                setBooks(booksData)
                setBorrowings(borrowingsData)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const bookMap = useMemo(() => new Map(books.map((b) => [b.id, b])), [books])

    const categories = useMemo(() => {
        const cats = new Set<string>()
        returns.forEach((r) => {
            const book = bookMap.get(r.bookId)
            if (book) cats.add(book.category)
        })
        return Array.from(cats).sort()
    }, [returns, bookMap])

    const filtered = useMemo(() => {
        let result = [...returns]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter((r) => {
                const memberId = r.nim?.toLowerCase() || ''
                return (
                    r.userName.toLowerCase().includes(q) ||
                    memberId.includes(q) ||
                    r.bookTitle.toLowerCase().includes(q)
                )
            })
        }

        if (statusFilter) {
            result = result.filter((r) => r.status === statusFilter)
        }

        if (categoryFilter) {
            result = result.filter((r) => {
                const book = bookMap.get(r.bookId)
                return book?.category === categoryFilter
            })
        }

        if (dateFilter) {
            result = result.filter((r) => {
                if (!r.returnDate) return false
                const rd = new Date(r.returnDate)
                const target = new Date(dateFilter)
                return (
                    rd.getFullYear() === target.getFullYear() &&
                    rd.getMonth() === target.getMonth() &&
                    rd.getDate() === target.getDate()
                )
            })
        }

        switch (sort) {
            case 'newest':
                result.sort(
                    (a, b) =>
                        new Date(b.returnDate || b.dueDate).getTime() -
                        new Date(a.returnDate || a.dueDate).getTime(),
                )
                break
            case 'oldest':
                result.sort(
                    (a, b) =>
                        new Date(a.returnDate || a.dueDate).getTime() -
                        new Date(b.returnDate || b.dueDate).getTime(),
                )
                break
            case 'name':
                result.sort((a, b) => a.userName.localeCompare(b.userName))
                break
            case 'title':
                result.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle))
                break
        }

        return result
    }, [search, statusFilter, categoryFilter, dateFilter, sort, returns, bookMap])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const todayStr = new Date().toISOString().split('T')[0]

    const returnsToday = returns.filter((r) => {
        if (!r.returnDate) return false
        const rd = new Date(r.returnDate).toISOString().split('T')[0]
        return rd === todayStr
    }).length

    const unreturned = borrowings.filter((b) => b.status !== 'Returned').length

    const lateCount = returns.filter((r) => r.status === 'Late').length

    const totalFine = returns.reduce((sum, r) => sum + r.fine, 0)

    const resetFilters = () => {
        setSearch('')
        setStatusFilter('')
        setCategoryFilter('')
        setDateFilter('')
        setSort('')
        setCurrentPage(1)
    }

    const hasActiveFilters =
        search || statusFilter || categoryFilter || dateFilter || sort

    const handleRetry = () => {
        setError(false)
        setLoading(true)
        Promise.all([
            getAllReturns(),
            getAllBooks(),
            getAllBorrowings(),
        ])
            .then(([returnsData, booksData, borrowingsData]) => {
                setReturns(returnsData)
                setBooks(booksData)
                setBorrowings(borrowingsData)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat data pengembalian. Silakan coba lagi."
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
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Pengembalian Buku</h2>
                <p className="text-text-secondary">
                    Kelola proses pengembalian buku anggota perpustakaan.
                </p>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<Undo2 className="h-8 w-8" />}
                    title="Pengembalian Hari Ini"
                    value={returnsToday}
                    description="Total pengembalian hari ini"
                    variant="primary"
                />
                <StatCard
                    icon={<BookOpen className="h-8 w-8" />}
                    title="Belum Dikembalikan"
                    value={unreturned}
                    description="Buku masih dipinjam"
                    variant="warning"
                />
                <StatCard
                    icon={<Clock className="h-8 w-8" />}
                    title="Terlambat"
                    value={lateCount}
                    description="Melebihi batas waktu"
                    variant="danger"
                />
                <StatCard
                    icon={<Wallet className="h-8 w-8" />}
                    title="Total Denda"
                    value={`Rp${totalFine.toLocaleString('id-ID')}`}
                    description="Akumulasi denda"
                    variant="danger"
                />
            </div>

            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="relative max-w-xl flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-disabled" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Cari anggota, judul buku, atau nomor anggota..."
                        aria-label="Cari pengembalian"
                        className="h-12 w-full rounded-[12px] border border-border bg-white pl-12 pr-4 text-base text-text-primary placeholder:text-disabled transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <Button
                    variant="primary"
                    size="md"
                    onClick={exportReturns}
                >
                    Export Excel
                </Button>
            </div>

            <div className="mb-6 flex flex-wrap items-end gap-3">
                <div className="w-full sm:w-[160px]">
                    <Select
                        label="Status"
                        options={[
                            { value: '', label: 'Semua Status' },
                            { value: 'On Time', label: 'Tepat Waktu' },
                            { value: 'Late', label: 'Terlambat' },
                            { value: 'Pending', label: 'Menunggu' },
                            { value: 'Lost', label: 'Hilang' },
                        ]}
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
                <div className="w-full sm:w-[170px]">
                    <input
                        type="date"
                        value={dateFilter}
                        onChange={(e) => {
                            setDateFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                        aria-label="Filter tanggal pengembalian"
                        className="h-12 w-full rounded-[12px] border border-border bg-white px-4 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div className="w-full sm:w-[180px]">
                    <Select
                        label="Urutkan"
                        options={[
                            { value: '', label: 'Default' },
                            { value: 'newest', label: 'Terbaru' },
                            { value: 'oldest', label: 'Terlama' },
                            { value: 'name', label: 'Nama Anggota' },
                            { value: 'title', label: 'Judul Buku' },
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
                                        'Nomor Anggota',
                                        'Nama Anggota',
                                        'Cover',
                                        'Judul Buku',
                                        'Tgl Pinjam',
                                        'Jatuh Tempo',
                                        'Tgl Kembali',
                                        'Hari Terlambat',
                                        'Denda',
                                        'Status',
                                        'Aksi',
                                    ].map((h) => (
                                        <th
                                            key={h}
                                            className="px-3 py-3 text-left text-sm font-medium text-text-secondary whitespace-nowrap"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {paginated.map((r, idx) => {
                                    const lateDays = computeLateDays(r.dueDate, r.returnDate)
                                    return (
                                        <tr
                                            key={r.id}
                                            className="transition-colors duration-150 hover:bg-gray-50"
                                        >
                                            <td className="px-3 py-3 text-sm text-text-secondary">
                                                {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                            </td>
                                            <td className="px-3 py-3 text-sm text-text-secondary">
                                                {r.nim}
                                            </td>
                                            <td className="px-3 py-3 text-sm font-medium text-text-primary whitespace-nowrap">
                                                {r.userName}
                                            </td>
                                            <td className="px-3 py-3">
                                                <div className="h-10 w-8 overflow-hidden rounded">
                                                    {r.bookCover ? (
                                                        <img
                                                            src={r.bookCover}
                                                            alt={r.bookTitle}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <BookCoverPlaceholder title={r.bookTitle} className="h-full w-full" />
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-3 py-3 text-sm text-text-primary whitespace-nowrap">
                                                {r.bookTitle}
                                            </td>
                                            <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                                {new Date(r.borrowDate).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                                {new Date(r.dueDate).toLocaleDateString('id-ID')}
                                            </td>
                                            <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                                {r.returnDate
                                                    ? new Date(r.returnDate).toLocaleDateString('id-ID')
                                                    : '-'}
                                            </td>
                                            <td className="px-3 py-3 text-sm text-text-secondary text-center">
                                                {lateDays > 0 ? lateDays : '-'}
                                            </td>
                                            <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                                {r.fine > 0
                                                    ? `Rp${r.fine.toLocaleString('id-ID')}`
                                                    : '-'}
                                            </td>
                                            <td className="px-3 py-3">
                                                <Badge
                                                    variant={statusBadge[r.status] || 'default'}
                                                    size="sm"
                                                >
                                                    {statusLabel[r.status] || r.status}
                                                </Badge>
                                            </td>
                                            <td className="px-3 py-3">
                                                <div className="flex flex-wrap gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => navigate(`${bookPrefix}/book/${r.bookId}`)}
                                                        aria-label={`Detail ${r.bookTitle}`}
                                                    >
                                                        Detail
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setConfirmModal(r.id)}
                                                        aria-label={`Konfirmasi ${r.bookTitle}`}
                                                    >
                                                        Konfirmasi
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => setPrintModal(r.id)}
                                                        aria-label={`Cetak bukti ${r.bookTitle}`}
                                                    >
                                                        Cetak
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-4 md:hidden">
                        {paginated.map((r) => {
                            const lateDays = computeLateDays(r.dueDate, r.returnDate)
                            return (
                                <div
                                    key={r.id}
                                    className="rounded-[16px] border border-border bg-white p-4 shadow-card"
                                >
                                    <div className="mb-3 flex items-start gap-3">
                                        <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg">
                                            {r.bookCover ? (
                                                <img
                                                    src={r.bookCover}
                                                    alt={r.bookTitle}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <BookCoverPlaceholder title={r.bookTitle} className="h-full w-full" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h5 className="text-sm font-semibold text-text-primary">
                                                {r.bookTitle}
                                            </h5>
                                            <p className="text-xs text-text-secondary">{r.userName}</p>
                                            <p className="text-xs text-text-secondary">
                                                {r.nim}
                                            </p>
                                        </div>
                                        <Badge
                                            variant={statusBadge[r.status] || 'default'}
                                            size="sm"
                                        >
                                            {statusLabel[r.status] || r.status}
                                        </Badge>
                                    </div>
                                    <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
                                        <span>
                                            Pinjam:{' '}
                                            {new Date(r.borrowDate).toLocaleDateString('id-ID')}
                                        </span>
                                        <span>
                                            Jatuh Tempo:{' '}
                                            {new Date(r.dueDate).toLocaleDateString('id-ID')}
                                        </span>
                                        <span>
                                            Kembali:{' '}
                                            {r.returnDate
                                                ? new Date(r.returnDate).toLocaleDateString('id-ID')
                                                : '-'}
                                        </span>
                                        <span>
                                            Terlambat: {lateDays > 0 ? `${lateDays} hari` : '-'}
                                        </span>
                                        <span>
                                            Denda:{' '}
                                            {r.fine > 0
                                                ? `Rp${r.fine.toLocaleString('id-ID')}`
                                                : '-'}
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => navigate(`${bookPrefix}/book/${r.bookId}`)}
                                        >
                                            Detail
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setConfirmModal(r.id)}
                                        >
                                            Konfirmasi
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setPrintModal(r.id)}
                                        >
                                            Cetak
                                        </Button>
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
                <EmptyState
                    title="Belum ada data pengembalian"
                    description="Tidak ada data pengembalian yang sesuai dengan pencarian."
                    actionLabel="Refresh"
                    onAction={handleRetry}
                />
            )}

            <Modal
                isOpen={!!confirmModal}
                onClose={() => setConfirmModal(null)}
                title="Konfirmasi Pengembalian"
                size="sm"
            >
                {(() => {
                    const r = returns.find((x) => x.id === confirmModal)
                    if (!r) return null
                    return (
                        <>
                            <div className="mb-4 space-y-2 text-sm text-text-secondary">
                                <p><span className="font-medium text-text-primary">Buku:</span> {r.bookTitle}</p>
                                <p><span className="font-medium text-text-primary">Peminjam:</span> {r.userName}</p>
                                <p><span className="font-medium text-text-primary">Tgl Kembali:</span> {new Date(r.returnDate).toLocaleDateString('id-ID')}</p>
                                <p><span className="font-medium text-text-primary">Status:</span> {r.status === 'Late' ? 'Terlambat' : 'Tepat Waktu'}</p>
                                {r.fine > 0 && <p><span className="font-medium text-text-primary">Denda:</span> Rp{r.fine.toLocaleString()}</p>}
                            </div>
                            <p className="mb-6 text-sm text-text-secondary">Konfirmasi pengembalian buku ini?</p>
                            <div className="flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setConfirmModal(null)}>
                                    Batal
                                </Button>
                                <Button
                                    variant="primary"
                                    disabled={submitting}
                                    onClick={async () => {
                                        if (!confirmModal) return
                                        setSubmitting(true)
                                        try {
                                            await confirmReturn(confirmModal)
                                            toast.success('Pengembalian berhasil dikonfirmasi')
                                            setConfirmModal(null)
                                            fetchReturns()
                                        } catch {
                                            toast.error('Gagal mengkonfirmasi pengembalian')
                                        } finally {
                                            setSubmitting(false)
                                        }
                                    }}
                                >
                                    {submitting ? 'Memproses...' : 'Konfirmasi'}
                                </Button>
                            </div>
                        </>
                    )
                })()}
            </Modal>

            <Modal
                isOpen={!!printModal}
                onClose={() => setPrintModal(null)}
                title="Cetak Bukti Pengembalian"
                size="md"
            >
                {(() => {
                    const r = returns.find((x) => x.id === printModal)
                    if (!r) return null
                    return (
                        <>
                            <div id="receipt" className="space-y-3 p-4 text-sm">
                                <div className="text-center border-b pb-3">
                                    <h3 className="font-bold text-base">BUKTI PENGEMBALIAN BUKU</h3>
                                    <p className="text-text-secondary">Perpustakaan Universitas Ahmad Dahlan</p>
                                </div>
                                <div className="space-y-1.5">
                                    <p><span className="font-medium">Judul Buku:</span> {r.bookTitle}</p>
                                    <p><span className="font-medium">Peminjam:</span> {r.userName} ({r.nim})</p>
                                    <p><span className="font-medium">Tgl Pinjam:</span> {new Date(r.borrowDate).toLocaleDateString('id-ID')}</p>
                                    <p><span className="font-medium">Jatuh Tempo:</span> {new Date(r.dueDate).toLocaleDateString('id-ID')}</p>
                                    <p><span className="font-medium">Tgl Kembali:</span> {new Date(r.returnDate).toLocaleDateString('id-ID')}</p>
                                    <p><span className="font-medium">Status:</span> {r.status === 'Late' ? 'Terlambat' : 'Tepat Waktu'}</p>
                                    {r.fine > 0 && <p><span className="font-medium">Denda:</span> Rp{r.fine.toLocaleString()}</p>}
                                </div>
                                <div className="text-center text-xs text-text-secondary pt-3 border-t mt-3">
                                    <p>Dicetak pada: {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-3">
                                <Button variant="outline" onClick={() => setPrintModal(null)}>
                                    Tutup
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        const printContent = document.getElementById('receipt')
                                        if (!printContent) return
                                        const win = window.open('', '_blank')
                                        if (!win) return
                                        win.document.write(`
                                            <html><head><title>Bukti Pengembalian</title>
                                            <style>
                                                body { font-family: monospace; padding: 40px; font-size: 14px; }
                                                .text-center { text-align: center; }
                                                .border-b { border-bottom: 1px solid #000; }
                                                .border-t { border-top: 1px solid #000; }
                                                .pt-3 { padding-top: 12px; }
                                                .pb-3 { padding-bottom: 12px; }
                                                .mt-3 { margin-top: 12px; }
                                                .space-y-1\\.5 > * + * { margin-top: 6px; }
                                                .space-y-3 > * + * { margin-top: 12px; }
                                                .font-bold { font-weight: bold; }
                                                .font-medium { font-weight: 500; }
                                                .text-base { font-size: 16px; }
                                                .text-xs { font-size: 11px; }
                                                .text-text-secondary { color: #555; }
                                            </style></head>
                                            <body>${printContent.innerHTML}</body></html>
                                        `)
                                        win.document.close()
                                        win.print()
                                    }}
                                >
                                    Cetak
                                </Button>
                            </div>
                        </>
                    )
                })()}
            </Modal>
        </div>
    )
}

export default ReturnManagementPage
