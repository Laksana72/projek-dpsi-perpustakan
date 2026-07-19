import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Wallet, Search, RotateCcw, Clock, CheckCircle2, BookX } from 'lucide-react'
import { getAllFines, payFine } from '@/services/fine.service'
import { getAllHistory } from '@/services/history.service'
import type { Fine, History } from '@/types'
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

const statusVariant: Record<string, 'success' | 'danger' | 'warning'> = {
    Paid: 'success',
    Unpaid: 'danger',
    Late: 'danger',
}

const statusLabel: Record<string, string> = {
    Paid: 'Lunas',
    Unpaid: 'Belum Dibayar',
    Late: 'Terlambat',
}

function UserFinePage() {
    const navigate = useNavigate()
    const [fines, setFines] = useState<Fine[]>([])
    const [historyList, setHistoryList] = useState<History[]>([])
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [payModal, setPayModal] = useState<string | null>(null)

    useEffect(() => {
        setLoading(true)
        Promise.all([getAllFines(), getAllHistory()])
            .then(([finesData, historyData]) => {
                setFines(finesData)
                setHistoryList(historyData)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const mergedFines = useMemo(() => {
        const result: {
            id: string
            bookTitle: string
            amount: number
            status: string
            dueDate: string
            bookId?: string
        }[] = []

        fines.forEach((f) => {
            result.push({
                id: f.id,
                bookTitle: f.bookTitle,
                amount: f.amount,
                status: f.status,
                dueDate: f.dueDate,
            })
        })

        historyList
            .filter((h) => h.fine > 0)
            .forEach((h) => {
                const exists = result.some(
                    (r) => r.bookTitle === h.bookTitle && r.amount === h.fine,
                )
                if (!exists) {
                    result.push({
                        id: `hist-${h.id}`,
                        bookTitle: h.bookTitle,
                        amount: h.fine,
                        status: h.status === 'Returned' ? 'Paid' : 'Unpaid',
                        dueDate: h.returnDate || '',
                        bookId: h.bookId,
                    })
                }
            })

        return result
    }, [fines, historyList])

    const unpaidTotal = mergedFines
        .filter((f) => f.status === 'Unpaid')
        .reduce((sum, f) => sum + f.amount, 0)

    const paidTotal = mergedFines
        .filter((f) => f.status === 'Paid')
        .reduce((sum, f) => sum + f.amount, 0)

    const filtered = useMemo(() => {
        let result = [...mergedFines]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter((f) => f.bookTitle.toLowerCase().includes(q))
        }

        if (statusFilter) {
            result = result.filter((f) => f.status === statusFilter)
        }

        switch (sort) {
            case 'highest':
                result.sort((a, b) => b.amount - a.amount)
                break
            case 'lowest':
                result.sort((a, b) => a.amount - b.amount)
                break
            case 'newest':
                result.sort(
                    (a, b) =>
                        new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime(),
                )
                break
            case 'oldest':
                result.sort(
                    (a, b) =>
                        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
                )
                break
        }

        return result
    }, [search, statusFilter, sort, mergedFines])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

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
        setTimeout(() => setLoading(false), 500)
    }

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
                <h2 className="mb-1 text-2xl font-bold text-text-primary">
                    Denda Saya
                </h2>
                <p className="text-text-secondary">
                    Kelola dan bayar denda peminjaman buku Anda.
                </p>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<Wallet className="h-8 w-8" />}
                    title="Total Denda"
                    value={`Rp${(unpaidTotal + paidTotal).toLocaleString('id-ID')}`}
                    description="Akumulasi seluruh denda"
                    variant="primary"
                />
                <StatCard
                    icon={<Clock className="h-8 w-8" />}
                    title="Belum Dibayar"
                    value={`Rp${unpaidTotal.toLocaleString('id-ID')}`}
                    description="Denda yang masih harus dibayar"
                    variant="danger"
                />
                <StatCard
                    icon={<CheckCircle2 className="h-8 w-8" />}
                    title="Sudah Lunas"
                    value={`Rp${paidTotal.toLocaleString('id-ID')}`}
                    description="Denda yang telah dibayar"
                    variant="success"
                />
                <StatCard
                    icon={<BookX className="h-8 w-8" />}
                    title="Jumlah Denda"
                    value={mergedFines.length}
                    description="Total catatan denda"
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
                            { value: 'highest', label: 'Denda Tertinggi' },
                            { value: 'lowest', label: 'Denda Terendah' },
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
                                    {['No', 'Judul Buku', 'Jumlah Denda', 'Status', 'Jatuh Tempo', 'Aksi'].map(
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
                                {paginated.map((f, idx) => (
                                    <tr
                                        key={f.id}
                                        className="transition-colors duration-150 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td className="px-4 py-3 text-sm font-medium text-text-primary">
                                            {f.bookTitle}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            Rp{f.amount.toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge
                                                variant={statusVariant[f.status] || 'warning'}
                                                size="sm"
                                            >
                                                {statusLabel[f.status] || f.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-text-secondary">
                                            {f.dueDate
                                                ? new Date(f.dueDate).toLocaleDateString('id-ID')
                                                : '-'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-1">
                                                {f.status === 'Unpaid' && (
                                                    <Button
                                                        variant="primary"
                                                        size="sm"
                                                        onClick={() => setPayModal(f.id)}
                                                        aria-label={`Bayar denda ${f.bookTitle}`}
                                                    >
                                                        Bayar
                                                    </Button>
                                                )}
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() =>
                                                        navigate(`/book/${f.bookId || ''}`)
                                                    }
                                                    aria-label={`Detail ${f.bookTitle}`}
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
                                <div className="mb-2 flex items-start justify-between gap-3">
                                    <div>
                                        <h5 className="text-sm font-semibold text-text-primary">
                                            {f.bookTitle}
                                        </h5>
                                        <p className="mt-1 text-lg font-bold text-danger">
                                            Rp{f.amount.toLocaleString('id-ID')}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={statusVariant[f.status] || 'warning'}
                                        size="sm"
                                    >
                                        {statusLabel[f.status] || f.status}
                                    </Badge>
                                </div>
                                <div className="mb-3 text-xs text-text-secondary">
                                    {f.dueDate && (
                                        <span>
                                            Jatuh Tempo:{' '}
                                            {new Date(f.dueDate).toLocaleDateString('id-ID')}
                                        </span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    {f.status === 'Unpaid' && (
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            onClick={() => setPayModal(f.id)}
                                        >
                                            Bayar
                                        </Button>
                                    )}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => navigate(`/book/${f.bookId || ''}`)}
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
                    title="Tidak ada denda"
                    description="Anda tidak memiliki catatan denda saat ini."
                    actionLabel="Refresh"
                    onAction={handleRetry}
                />
            )}

            <Modal
                isOpen={!!payModal}
                onClose={() => setPayModal(null)}
                title="Bayar Denda"
                size="sm"
            >
                {payModal?.startsWith('hist-') ? (
                    <p className="text-sm text-text-secondary">
                        Denda ini sudah tercatat lunas di sistem. Silakan hubungi petugas
                        perpustakaan jika ada pertanyaan lebih lanjut.
                    </p>
                ) : (
                    <>
                        <p className="mb-4 text-sm text-text-secondary">
                            Apakah Anda yakin ingin membayar denda ini? Pembayaran akan
                            dikonfirmasi dan status denda berubah menjadi Lunas.
                        </p>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" size="md" onClick={() => setPayModal(null)}>
                                Batal
                            </Button>
                            <Button
                                variant="primary"
                                size="md"
                                onClick={async () => {
                                    if (!payModal) return
                                    try {
                                        await payFine(payModal)
                                        setPayModal(null)
                                        const [finesData, historyData] = await Promise.all([
                                            getAllFines(),
                                            getAllHistory(),
                                        ])
                                        setFines(finesData)
                                        setHistoryList(historyData)
                                    } catch {
                                        setPayModal(null)
                                    }
                                }}
                            >
                                Konfirmasi Bayar
                            </Button>
                        </div>
                    </>
                )}
            </Modal>
        </div>
    )
}

export default UserFinePage
