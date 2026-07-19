import { useState, useEffect, useMemo } from 'react'
import {
    History as HistoryIcon,
    Check,
    Clock,
    BookX,
    Search,
    RotateCcw,
    FileText,
    TrendingUp,
} from 'lucide-react'
import { getAllHistory } from '@/services/history.service'
import type { History } from '@/types'
import StatCard from '@/components/cards/StatCard'
import Select from '@/components/forms/Select'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Pagination from '@/components/navigation/Pagination'
import Modal from '@/components/feedback/Modal'
import Skeleton from '@/components/feedback/Skeleton'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'

const ITEMS_PER_PAGE = 10

const statusBadge: Record<string, 'success' | 'danger' | 'default'> = {
    Returned: 'success',
    Late: 'danger',
    Lost: 'default',
}

const statusLabel: Record<string, string> = {
    Returned: 'Dikembalikan',
    Late: 'Terlambat',
    Lost: 'Hilang',
}

function AdminHistoryPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [historyList, setHistoryList] = useState<History[]>([])
    const [detailModal, setDetailModal] = useState<string | null>(null)

    useEffect(() => {
        setError(false)
        getAllHistory()
            .then(setHistoryList)
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const filtered = useMemo(() => {
        let result = [...historyList]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter((h) => h.bookTitle.toLowerCase().includes(q))
        }

        if (statusFilter) {
            result = result.filter((h) => h.status === statusFilter)
        }

        switch (sort) {
            case 'newest':
                result.sort(
                    (a, b) =>
                        new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime(),
                )
                break
            case 'oldest':
                result.sort(
                    (a, b) =>
                        new Date(a.borrowDate).getTime() - new Date(b.borrowDate).getTime(),
                )
                break
        }

        return result
    }, [search, statusFilter, sort, historyList])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const returnedCount = historyList.filter((h) => h.status === 'Returned').length
    const lateCount = historyList.filter((h) => h.status === 'Late').length
    const lostCount = historyList.filter((h) => h.status === 'Lost').length

    const resetFilters = () => {
        setSearch('')
        setStatusFilter('')
        setSort('')
        setCurrentPage(1)
    }

    const hasActiveFilters = search || statusFilter || sort

    const handleRetry = () => {
        setError(false)
        setLoading(true)
        getAllHistory()
            .then(setHistoryList)
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    const selectedHistory = detailModal
        ? historyList.find((h) => h.id === detailModal)
        : null

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat data riwayat. Silakan coba lagi."
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
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Riwayat Peminjaman</h2>
                <p className="text-text-secondary">
                    Lihat riwayat peminjaman buku perpustakaan.
                </p>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<HistoryIcon className="h-8 w-8" />}
                    title="Total Riwayat"
                    value={historyList.length}
                    description="Seluruh riwayat peminjaman"
                    variant="primary"
                />
                <StatCard
                    icon={<Check className="h-8 w-8" />}
                    title="Dikembalikan"
                    value={returnedCount}
                    description="Buku dikembalikan tepat waktu"
                    variant="success"
                />
                <StatCard
                    icon={<Clock className="h-8 w-8" />}
                    title="Terlambat"
                    value={lateCount}
                    description="Melebihi batas waktu"
                    variant="danger"
                />
                <StatCard
                    icon={<BookX className="h-8 w-8" />}
                    title="Hilang"
                    value={lostCount}
                    description="Buku dilaporkan hilang"
                    variant="default"
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
                        placeholder="Cari judul buku..."
                        aria-label="Cari riwayat"
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
                            { value: 'Returned', label: 'Dikembalikan' },
                            { value: 'Late', label: 'Terlambat' },
                            { value: 'Lost', label: 'Hilang' },
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
                                        'Cover',
                                        'Judul Buku',
                                        'Tgl Pinjam',
                                        'Tgl Kembali',
                                        'Status',
                                        'Denda',
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
                                {paginated.map((h, idx) => (
                                    <tr
                                        key={h.id}
                                        className="transition-colors duration-150 hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="h-10 w-8 overflow-hidden rounded bg-gray-100">
                                                {h.bookCover ? (
                                                    <img
                                                        src={h.bookCover}
                                                        alt={h.bookTitle}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <BookX className="h-full w-full p-1 text-disabled" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-sm font-medium text-text-primary whitespace-nowrap">
                                            {h.bookTitle}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {new Date(h.borrowDate).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {new Date(h.returnDate).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-3 py-3">
                                            <Badge
                                                variant={statusBadge[h.status] || 'default'}
                                                size="sm"
                                            >
                                                {statusLabel[h.status] || h.status}
                                            </Badge>
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {h.fine > 0
                                                ? `Rp${h.fine.toLocaleString('id-ID')}`
                                                : '-'}
                                        </td>
                                        <td className="px-3 py-3">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                leftIcon={<FileText className="h-4 w-4" />}
                                                onClick={() => setDetailModal(h.id)}
                                                aria-label={`Detail ${h.bookTitle}`}
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
                                            <BookX className="h-full w-full p-2 text-disabled" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h5 className="text-sm font-semibold text-text-primary">
                                            {h.bookTitle}
                                        </h5>
                                    </div>
                                    <Badge
                                        variant={statusBadge[h.status] || 'default'}
                                        size="sm"
                                    >
                                        {statusLabel[h.status] || h.status}
                                    </Badge>
                                </div>
                                <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
                                    <span>
                                        Pinjam:{' '}
                                        {new Date(h.borrowDate).toLocaleDateString('id-ID')}
                                    </span>
                                    <span>
                                        Kembali:{' '}
                                        {new Date(h.returnDate).toLocaleDateString('id-ID')}
                                    </span>
                                    <span>
                                        Denda:{' '}
                                        {h.fine > 0
                                            ? `Rp${h.fine.toLocaleString('id-ID')}`
                                            : '-'}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        leftIcon={<FileText className="h-4 w-4" />}
                                        onClick={() => setDetailModal(h.id)}
                                    >
                                        Detail
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
                    title="Belum ada data riwayat"
                    description="Tidak ada data riwayat yang sesuai dengan pencarian."
                    actionLabel="Refresh"
                    onAction={handleRetry}
                />
            )}

            <Modal
                isOpen={!!detailModal}
                onClose={() => setDetailModal(null)}
                title="Detail Riwayat"
                size="sm"
            >
                {selectedHistory && (
                    <div className="flex flex-col gap-3 text-sm">
                        <div className="flex items-center gap-3">
                            <div className="h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                {selectedHistory.bookCover ? (
                                    <img
                                        src={selectedHistory.bookCover}
                                        alt={selectedHistory.bookTitle}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <BookX className="h-full w-full p-2 text-disabled" />
                                )}
                            </div>
                            <div>
                                <h5 className="font-semibold text-text-primary">
                                    {selectedHistory.bookTitle}
                                </h5>
                                <Badge
                                    variant={statusBadge[selectedHistory.status] || 'default'}
                                    size="sm"
                                >
                                    {statusLabel[selectedHistory.status] || selectedHistory.status}
                                </Badge>
                            </div>
                        </div>
                        <div>
                            <span className="font-medium text-text-primary">Tgl Pinjam: </span>
                            <span className="text-text-secondary">
                                {new Date(selectedHistory.borrowDate).toLocaleDateString('id-ID')}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-text-primary">Tgl Kembali: </span>
                            <span className="text-text-secondary">
                                {new Date(selectedHistory.returnDate).toLocaleDateString('id-ID')}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-text-primary">Denda: </span>
                            <span className="text-text-secondary">
                                {selectedHistory.fine > 0
                                    ? `Rp${selectedHistory.fine.toLocaleString('id-ID')}`
                                    : 'Tidak ada denda'}
                            </span>
                        </div>
                        <div className="flex justify-end pt-2">
                            <Button variant="outline" size="md" onClick={() => setDetailModal(null)}>
                                Tutup
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default AdminHistoryPage
