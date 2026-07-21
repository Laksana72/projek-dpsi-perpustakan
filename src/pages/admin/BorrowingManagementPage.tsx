import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    BookOpen,
    Clock,
    AlertTriangle,
    Search,
    RotateCcw,
    Check,
    X,
} from 'lucide-react'
import { getAllBorrowings, approveBorrowing, rejectBorrowing } from '@/services/borrowing.service'
import type { Borrowing } from '@/types'
import BookCoverPlaceholder from '@/components/ui/BookCoverPlaceholder'
import StatCard from '@/components/cards/StatCard'
import Select from '@/components/forms/Select'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Pagination from '@/components/navigation/Pagination'
import Modal from '@/components/feedback/Modal'
import QRCodeModal, { QRCodeButton } from '@/components/feedback/QRCodeModal'
import Skeleton from '@/components/feedback/Skeleton'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'

const ITEMS_PER_PAGE = 10

const statusBadge: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
    Borrowed: 'info',
    Returned: 'success',
    Pending: 'warning',
}

const statusLabel: Record<string, string> = {
    Borrowed: 'Dipinjam',
    Returned: 'Dikembalikan',
    Pending: 'Menunggu',
}

function BorrowingManagementPage() {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [borrowings, setBorrowings] = useState<Borrowing[]>([])
    const [detailModal, setDetailModal] = useState<string | null>(null)
    const [confirmModal, setConfirmModal] = useState<string | null>(null)
    const [rejectModal, setRejectModal] = useState<string | null>(null)
    const [qrModal, setQrModal] = useState<Borrowing | null>(null)

    useEffect(() => {
        setError(false)
        getAllBorrowings()
            .then(setBorrowings)
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const filtered = useMemo(() => {
        let result = [...borrowings]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter((b) => {
                const memberId = b.userId?.toLowerCase() || ''
                return (
                    b.userName.toLowerCase().includes(q) ||
                    memberId.includes(q) ||
                    b.bookTitle.toLowerCase().includes(q)
                )
            })
        }

        if (statusFilter) {
            result = result.filter((b) => b.status === statusFilter)
        }

        if (dateFilter) {
            result = result.filter((b) => {
                const bd = new Date(b.borrowDate)
                const target = new Date(dateFilter)
                return (
                    bd.getFullYear() === target.getFullYear() &&
                    bd.getMonth() === target.getMonth() &&
                    bd.getDate() === target.getDate()
                )
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
            case 'name':
                result.sort((a, b) => a.userName.localeCompare(b.userName))
                break
            case 'title':
                result.sort((a, b) => a.bookTitle.localeCompare(b.bookTitle))
                break
        }

        return result
    }, [search, statusFilter, dateFilter, sort, borrowings])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const totalBorrowings = borrowings.length
    const activeCount = borrowings.filter((b) => b.status === 'Borrowed').length
    const pendingCount = borrowings.filter((b) => b.status === 'Pending').length
    const overdueCount = borrowings.filter((b) => {
        if (b.status !== 'Borrowed') return false
        const due = new Date(b.dueDate)
        due.setHours(0, 0, 0, 0)
        return due < today
    }).length

    const resetFilters = () => {
        setSearch('')
        setStatusFilter('')
        setDateFilter('')
        setSort('')
        setCurrentPage(1)
    }

    const hasActiveFilters = search || statusFilter || dateFilter || sort

    const handleRetry = () => {
        setError(false)
        setLoading(true)
        getAllBorrowings()
            .then(setBorrowings)
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    const detailBorrowing = detailModal
        ? borrowings.find((b) => b.id === detailModal)
        : null

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat data peminjaman. Silakan coba lagi."
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
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Peminjaman Buku</h2>
                <p className="text-text-secondary">
                    Kelola proses peminjaman buku oleh anggota perpustakaan.
                </p>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<BookOpen className="h-8 w-8" />}
                    title="Total Peminjaman"
                    value={totalBorrowings}
                    description="Total peminjaman tercatat"
                    variant="primary"
                />
                <StatCard
                    icon={<BookOpen className="h-8 w-8" />}
                    title="Aktif"
                    value={activeCount}
                    description="Buku sedang dipinjam"
                    variant="info"
                />
                <StatCard
                    icon={<Clock className="h-8 w-8" />}
                    title="Menunggu"
                    value={pendingCount}
                    description="Permintaan peminjaman"
                    variant="warning"
                />
                <StatCard
                    icon={<AlertTriangle className="h-8 w-8" />}
                    title="Terlambat"
                    value={overdueCount}
                    description="Melebihi batas waktu"
                    variant="danger"
                />
            </div>

            <div className="mb-4">
                <div className="relative max-w-xl">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-disabled" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Cari anggota, judul buku, atau ID anggota..."
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
                            { value: '', label: 'Semua Status' },
                            { value: 'Borrowed', label: 'Dipinjam' },
                            { value: 'Returned', label: 'Dikembalikan' },
                            { value: 'Pending', label: 'Menunggu' },
                        ]}
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value)
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
                        aria-label="Filter tanggal pinjam"
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
                                        'Nama Anggota',
                                        'Judul Buku',
                                        'Tgl Pinjam',
                                        'Jatuh Tempo',
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
                                {paginated.map((b, idx) => (
                                    <tr
                                        key={b.id}
                                        className="transition-colors duration-150 hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td className="px-3 py-3 text-sm font-medium text-text-primary whitespace-nowrap">
                                            {b.userName}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-primary whitespace-nowrap">
                                            {b.bookTitle}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {new Date(b.borrowDate).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {new Date(b.dueDate).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-3 py-3">
                                            <Badge
                                                variant={statusBadge[b.status] || 'default'}
                                                size="sm"
                                            >
                                                {statusLabel[b.status] || b.status}
                                            </Badge>
                                        </td>
                                         <td className="px-3 py-3">
                                            <div className="flex flex-wrap gap-1">
                                                <button
                                                    onClick={() => setQrModal(b)}
                                                    className="flex items-center gap-1 rounded-lg bg-[#0B1B3D] px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0B1B3D]/90"
                                                >
                                                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="6" x2="14" y2="6"/></svg>
                                                    QR
                                                </button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDetailModal(b.id)}
                                                    aria-label={`Detail ${b.bookTitle}`}
                                                >
                                                    Detail
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setConfirmModal(b.id)}
                                                    aria-label={`Konfirmasi ${b.bookTitle}`}
                                                >
                                                    Konfirmasi
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setRejectModal(b.id)}
                                                    aria-label={`Tolak ${b.bookTitle}`}
                                                >
                                                    Tolak
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-4 md:hidden">
                        {paginated.map((b) => (
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
                                        <p className="text-xs text-text-secondary">{b.userName}</p>
                                    </div>
                                    <Badge
                                        variant={statusBadge[b.status] || 'default'}
                                        size="sm"
                                    >
                                        {statusLabel[b.status] || b.status}
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
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setQrModal(b)}
                                        className="flex items-center gap-1 rounded-lg bg-[#0B1B3D] px-2.5 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0B1B3D]/90"
                                    >
                                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="6" y1="10" x2="6" y2="14"/><line x1="10" y1="6" x2="14" y2="6"/></svg>
                                        QR
                                    </button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => setDetailModal(b.id)}
                                    >
                                        Detail
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setConfirmModal(b.id)}
                                    >
                                        Konfirmasi
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setRejectModal(b.id)}
                                    >
                                        Tolak
                                    </Button>
                                </div>
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
                    title="Belum ada data peminjaman"
                    description="Tidak ada data peminjaman yang sesuai dengan pencarian."
                    actionLabel="Refresh"
                    onAction={handleRetry}
                />
            )}

            <Modal
                isOpen={!!detailModal}
                onClose={() => setDetailModal(null)}
                title="Detail Peminjaman"
                size="md"
            >
                {detailBorrowing && (
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg">
                                {detailBorrowing.bookCover ? (
                                    <img
                                        src={detailBorrowing.bookCover}
                                        alt={detailBorrowing.bookTitle}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <BookCoverPlaceholder title={detailBorrowing.bookTitle} className="h-full w-full" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-semibold text-text-primary">
                                    {detailBorrowing.bookTitle}
                                </h4>
                                <p className="mt-1 text-sm text-text-secondary">
                                    ID Peminjaman: {detailBorrowing.id}
                                </p>
                                <p className="text-sm text-text-secondary">
                                    ID Anggota: {detailBorrowing.userId}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <span className="font-medium text-text-primary">Nama Anggota</span>
                                <p className="mt-0.5 text-text-secondary">
                                    {detailBorrowing.userName}
                                </p>
                            </div>
                            <div>
                                <span className="font-medium text-text-primary">Status</span>
                                <p className="mt-0.5">
                                    <Badge
                                        variant={statusBadge[detailBorrowing.status] || 'default'}
                                        size="sm"
                                    >
                                        {statusLabel[detailBorrowing.status] || detailBorrowing.status}
                                    </Badge>
                                </p>
                            </div>
                            <div>
                                <span className="font-medium text-text-primary">Tanggal Pinjam</span>
                                <p className="mt-0.5 text-text-secondary">
                                    {new Date(detailBorrowing.borrowDate).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                            <div>
                                <span className="font-medium text-text-primary">Jatuh Tempo</span>
                                <p className="mt-0.5 text-text-secondary">
                                    {new Date(detailBorrowing.dueDate).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                            <div>
                                <span className="font-medium text-text-primary">Tanggal Kembali</span>
                                <p className="mt-0.5 text-text-secondary">
                                    {detailBorrowing.returnDate
                                        ? new Date(detailBorrowing.returnDate).toLocaleDateString('id-ID')
                                        : '-'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                isOpen={!!confirmModal}
                onClose={() => setConfirmModal(null)}
                title="Konfirmasi Peminjaman"
                size="sm"
            >
                <p className="mb-4 text-sm text-text-secondary">
                    Setujui peminjaman buku ini? Buku akan tercatat sebagai sedang dipinjam oleh anggota.
                </p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" size="md" onClick={() => setConfirmModal(null)}>
                        Batal
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        leftIcon={<Check className="h-4 w-4" />}
                        onClick={async () => {
                            if (!confirmModal) return
                            try {
                                await approveBorrowing(confirmModal)
                                setConfirmModal(null)
                                getAllBorrowings().then(setBorrowings).catch(() => {})
                            } catch {
                                setConfirmModal(null)
                            }
                        }}
                    >
                        Setujui
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={!!rejectModal}
                onClose={() => setRejectModal(null)}
                title="Tolak Peminjaman"
                size="sm"
            >
                <p className="mb-4 text-sm text-text-secondary">
                    Tolak peminjaman buku ini? Peminjaman akan dihapus dari sistem.
                </p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" size="md" onClick={() => setRejectModal(null)}>
                        Batal
                    </Button>
                    <Button
                        variant="danger"
                        size="md"
                        leftIcon={<X className="h-4 w-4" />}
                        onClick={async () => {
                            if (!rejectModal) return
                            try {
                                await rejectBorrowing(rejectModal)
                                setRejectModal(null)
                                getAllBorrowings().then(setBorrowings).catch(() => {})
                            } catch {
                                setRejectModal(null)
                            }
                        }}
                    >
                        Tolak
                    </Button>
                </div>
            </Modal>

            <QRCodeModal
                open={!!qrModal}
                onClose={() => setQrModal(null)}
                data={qrModal ? `ID Peminjaman: ${qrModal.id}\nBuku: ${qrModal.bookTitle}\nPeminjam: ${qrModal.userName}\nTanggal: ${new Date(qrModal.borrowDate).toLocaleDateString('id-ID')}\nJatuh Tempo: ${new Date(qrModal.dueDate).toLocaleDateString('id-ID')}` : ''}
                title={`QR - ${qrModal?.bookTitle || ''}`}
            />
        </div>
    )
}

export default BorrowingManagementPage
