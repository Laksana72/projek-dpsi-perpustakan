import { useState, useEffect, useMemo } from 'react'
import {
    Wallet,
    DollarSign,
    Check,
    Clock,
    Search,
    RotateCcw,
    FileText,
} from 'lucide-react'
import { getAllFines, payFine } from '@/services/fine.service'
import type { Fine } from '@/types'
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

const statusBadge: Record<string, 'success' | 'danger'> = {
    Unpaid: 'danger',
    Paid: 'success',
}

const statusLabel: Record<string, string> = {
    Unpaid: 'Belum Dibayar',
    Paid: 'Lunas',
}

function FineManagementPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [sort, setSort] = useState('')
    const [fines, setFines] = useState<Fine[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [payModal, setPayModal] = useState<string | null>(null)
    const [detailModal, setDetailModal] = useState<string | null>(null)

    useEffect(() => {
        fetchFines()
    }, [])

    const filtered = useMemo(() => {
        let result = [...fines]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter((f) => f.bookTitle.toLowerCase().includes(q))
        }

        if (statusFilter) {
            result = result.filter((f) => f.status === statusFilter)
        }

        switch (sort) {
            case 'amount-asc':
                result.sort((a, b) => a.amount - b.amount)
                break
            case 'amount-desc':
                result.sort((a, b) => b.amount - a.amount)
                break
            case 'date-asc':
                result.sort(
                    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
                )
                break
            case 'date-desc':
                result.sort(
                    (a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
                )
                break
        }

        return result
    }, [search, statusFilter, sort, fines])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const totalFine = fines.reduce((sum, f) => sum + f.amount, 0)
    const unpaidTotal = fines
        .filter((f) => f.status === 'Unpaid')
        .reduce((sum, f) => sum + f.amount, 0)
    const paidTotal = fines
        .filter((f) => f.status === 'Paid')
        .reduce((sum, f) => sum + f.amount, 0)

    const resetFilters = () => {
        setSearch('')
        setStatusFilter('')
        setSort('')
        setCurrentPage(1)
    }

    const hasActiveFilters = search || statusFilter || sort

    function fetchFines() {
        setError(false)
        setLoading(true)
        getAllFines()
            .then(setFines)
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    const handleRetry = fetchFines

    const selectedFine = detailModal ? fines.find((f) => f.id === detailModal) : null

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat data denda. Silakan coba lagi."
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
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Manajemen Denda</h2>
                <p className="text-text-secondary">
                    Kelola data denda perpustakaan.
                </p>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<Wallet className="h-8 w-8" />}
                    title="Total Denda"
                    value={`Rp${totalFine.toLocaleString('id-ID')}`}
                    description="Akumulasi seluruh denda"
                    variant="primary"
                />
                <StatCard
                    icon={<DollarSign className="h-8 w-8" />}
                    title="Belum Dibayar"
                    value={`Rp${unpaidTotal.toLocaleString('id-ID')}`}
                    description="Denda yang belum dibayar"
                    variant="danger"
                />
                <StatCard
                    icon={<Check className="h-8 w-8" />}
                    title="Lunas"
                    value={`Rp${paidTotal.toLocaleString('id-ID')}`}
                    description="Denda yang sudah dibayar"
                    variant="success"
                />
                <StatCard
                    icon={<Clock className="h-8 w-8" />}
                    title="Jumlah Denda"
                    value={fines.length}
                    description="Total transaksi denda"
                    variant="warning"
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
                        aria-label="Cari denda"
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
                            { value: 'Unpaid', label: 'Belum Dibayar' },
                            { value: 'Paid', label: 'Lunas' },
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
                            { value: 'amount-asc', label: 'Denda (Terendah)' },
                            { value: 'amount-desc', label: 'Denda (Tertinggi)' },
                            { value: 'date-asc', label: 'Jatuh Tempo (Terlama)' },
                            { value: 'date-desc', label: 'Jatuh Tempo (Terbaru)' },
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
                                        'Judul Buku',
                                        'Jumlah Denda',
                                        'Status',
                                        'Jatuh Tempo',
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
                                {paginated.map((f, idx) => (
                                    <tr
                                        key={f.id}
                                        className="transition-colors duration-150 hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td className="px-3 py-3 text-sm font-medium text-text-primary whitespace-nowrap">
                                            {f.bookTitle}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            Rp{f.amount.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-3 py-3">
                                            <Badge
                                                variant={statusBadge[f.status] || 'default'}
                                                size="sm"
                                            >
                                                {statusLabel[f.status] || f.status}
                                            </Badge>
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {new Date(f.dueDate).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex gap-1">
                                                {f.status === 'Unpaid' && (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        leftIcon={<Check className="h-4 w-4" />}
                                                        onClick={() => setPayModal(f.id)}
                                                        aria-label={`Bayar denda ${f.bookTitle}`}
                                                    >
                                                        Bayar
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    leftIcon={<FileText className="h-4 w-4" />}
                                                    onClick={() => setDetailModal(f.id)}
                                                    aria-label={`Detail denda ${f.bookTitle}`}
                                                >
                                                    Detail
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-4 md:hidden">
                        {paginated.map((f) => (
                            <div
                                key={f.id}
                                className="rounded-[16px] border border-border bg-white p-4 shadow-card"
                            >
                                <div className="mb-2 flex items-start justify-between">
                                    <h5 className="text-sm font-semibold text-text-primary">
                                        {f.bookTitle}
                                    </h5>
                                    <Badge
                                        variant={statusBadge[f.status] || 'default'}
                                        size="sm"
                                    >
                                        {statusLabel[f.status] || f.status}
                                    </Badge>
                                </div>
                                <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
                                    <span>
                                        Denda: Rp{f.amount.toLocaleString('id-ID')}
                                    </span>
                                    <span>
                                        Jatuh Tempo:{' '}
                                        {new Date(f.dueDate).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    {f.status === 'Unpaid' && (
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            leftIcon={<Check className="h-4 w-4" />}
                                            onClick={() => setPayModal(f.id)}
                                        >
                                            Bayar
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        leftIcon={<FileText className="h-4 w-4" />}
                                        onClick={() => setDetailModal(f.id)}
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
                    title="Belum ada data denda"
                    description="Tidak ada data denda yang sesuai dengan pencarian."
                    actionLabel="Refresh"
                    onAction={handleRetry}
                />
            )}

            <Modal
                isOpen={!!payModal}
                onClose={() => setPayModal(null)}
                title="Konfirmasi Pembayaran"
                size="sm"
            >
                <p className="mb-4 text-sm text-text-secondary">
                    Apakah Anda yakin ingin mengkonfirmasi pembayaran denda ini?
                </p>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="md" onClick={() => setPayModal(null)}>
                        Batal
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        leftIcon={<Check className="h-4 w-4" />}
                        onClick={async () => {
                            if (!payModal) return
                            try {
                                await payFine(payModal)
                                setPayModal(null)
                                fetchFines()
                            } catch {
                                setPayModal(null)
                            }
                        }}
                    >
                        Konfirmasi Bayar
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={!!detailModal}
                onClose={() => setDetailModal(null)}
                title="Detail Denda"
                size="sm"
            >
                {selectedFine && (
                    <div className="flex flex-col gap-3 text-sm">
                        <div>
                            <span className="font-medium text-text-primary">Judul Buku: </span>
                            <span className="text-text-secondary">{selectedFine.bookTitle}</span>
                        </div>
                        <div>
                            <span className="font-medium text-text-primary">Jumlah Denda: </span>
                            <span className="text-text-secondary">
                                Rp{selectedFine.amount.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <div>
                            <span className="font-medium text-text-primary">Status: </span>
                            <Badge
                                variant={statusBadge[selectedFine.status] || 'default'}
                                size="sm"
                            >
                                {statusLabel[selectedFine.status] || selectedFine.status}
                            </Badge>
                        </div>
                        <div>
                            <span className="font-medium text-text-primary">Jatuh Tempo: </span>
                            <span className="text-text-secondary">
                                {new Date(selectedFine.dueDate).toLocaleDateString('id-ID')}
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

export default FineManagementPage
