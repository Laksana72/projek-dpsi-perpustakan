import { useState, useEffect } from 'react'
import { Check, X } from 'lucide-react'
import { api } from '@/services/api'
import { toast } from 'sonner'
import type { Borrowing } from '@/types'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Pagination from '@/components/navigation/Pagination'
import Skeleton from '@/components/feedback/Skeleton'
import EmptyState from '@/components/feedback/EmptyState'

interface ApiBorrowing {
    id: number
    user: { id: number; name: string }
    book: { id: number; title: string }
    status: string
    borrow_date: string
    due_date: string
}

function parseBorrowing(item: ApiBorrowing): Borrowing {
    return {
        id: String(item.id),
        userId: String(item.user.id),
        userName: item.user.name,
        bookId: String(item.book.id),
        bookTitle: item.book.title,
        bookCover: '',
        status: item.status as Borrowing['status'],
        borrowDate: item.borrow_date,
        dueDate: item.due_date,
        returnDate: null,
    }
}

const statusLabel: Record<string, string> = {
    Pending: 'Menunggu',
    Borrowed: 'Dipinjam',
    Returned: 'Dikembalikan',
}

const statusBadge: Record<string, 'warning' | 'info' | 'success'> = {
    Pending: 'warning',
    Borrowed: 'info',
    Returned: 'success',
}

function ValidasiReservasiPage() {
    const [borrowings, setBorrowings] = useState<Borrowing[]>([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const ITEMS_PER_PAGE = 10

    const fetchPending = async () => {
        setLoading(true)
        try {
            const res = await api.get<{ data: ApiBorrowing[] }>('/borrowings', { status: 'Pending', per_page: '50' })
            setBorrowings(res.data.map(parseBorrowing))
        } catch {
            setBorrowings([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPending()
    }, [])

    const approve = async (id: string) => {
        try {
            await api.post(`/borrowings/${id}/approve`)
            toast.success('Reservasi berhasil disetujui')
            fetchPending()
        } catch {
            toast.error('Gagal menyetujui reservasi')
        }
    }

    const reject = async (id: string) => {
        try {
            await api.post(`/borrowings/${id}/reject`)
            toast.success('Reservasi ditolak')
            fetchPending()
        } catch {
            toast.error('Gagal menolak reservasi')
        }
    }

    const totalPages = Math.max(1, Math.ceil(borrowings.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = borrowings.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

    return (
        <div className="animate-fade-in">
            <h1 className="mb-6 text-2xl font-bold text-text-primary">Validasi Reservasi</h1>

            {loading ? (
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-lg" />
                    ))}
                </div>
            ) : paginated.length === 0 ? (
                <EmptyState
                    title="Tidak ada reservasi"
                    description="Belum ada reservasi buku yang perlu divalidasi."
                />
            ) : (
                <>
                    <div className="overflow-x-auto rounded-[16px] border border-border">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-4 py-3 font-medium text-text-secondary">No</th>
                                    <th className="px-4 py-3 font-medium text-text-secondary">Peminjam</th>
                                    <th className="px-4 py-3 font-medium text-text-secondary">Buku</th>
                                    <th className="px-4 py-3 font-medium text-text-secondary">Tanggal</th>
                                    <th className="px-4 py-3 font-medium text-text-secondary">Status</th>
                                    <th className="px-4 py-3 font-medium text-text-secondary">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {paginated.map((b, idx) => (
                                    <tr key={b.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-text-secondary">
                                            {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-text-primary">{b.userName}</td>
                                        <td className="px-4 py-3 text-text-primary">{b.bookTitle}</td>
                                        <td className="px-4 py-3 text-text-secondary">
                                            {new Date(b.borrowDate).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge variant={statusBadge[b.status]} size="sm">
                                                {statusLabel[b.status] || b.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            {b.status === 'Pending' && (
                                                <div className="flex gap-2">
                                                    <Button
                                                        variant="success"
                                                        size="sm"
                                                        onClick={() => approve(b.id)}
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        size="sm"
                                                        onClick={() => reject(b.id)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6">
                        <Pagination
                            currentPage={safePage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default ValidasiReservasiPage
