import { useState, useEffect } from 'react'
import {
    BookOpen,
    Users,
    TrendingUp,
    Wallet,
    Clock,
    Check,
    AlertTriangle,
    DollarSign,
} from 'lucide-react'
import { getAllBooks } from '@/services/book.service'
import { getAllBorrowings } from '@/services/borrowing.service'
import { getAllReturns } from '@/services/return.service'
import { getAllHistory } from '@/services/history.service'
import { getAllFines } from '@/services/fine.service'
import { getAllMembers } from '@/services/member.service'
import type { Book, User, Borrowing, Return, History, Fine } from '@/types'
import StatCard from '@/components/cards/StatCard'
import Badge from '@/components/ui/Badge'
import Skeleton from '@/components/feedback/Skeleton'
import ErrorState from '@/components/feedback/ErrorState'
import { exportBooks, exportBorrowings, exportReturns, exportFines } from '@/services/excel.service'

function ReportPage() {
    const [books, setBooks] = useState<Book[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [borrowings, setBorrowings] = useState<Borrowing[]>([])
    const [returns, setReturns] = useState<Return[]>([])
    const [historyList, setHistoryList] = useState<History[]>([])
    const [fines, setFines] = useState<Fine[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const totalBooks = books.length
    const totalMembers = users.filter((u) => u.role === 'user').length
    const totalBorrowings = borrowings.length
    const totalFines = fines.reduce((sum, f) => sum + f.amount, 0)

    const availableBooks = books.filter((b) => b.status === 'Available').length
    const borrowedBooks = books.filter((b) => b.status === 'Borrowed').length
    const lostBooks = books.filter((b) => b.status === 'Lost').length

    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const borrowingsThisMonth = borrowings.filter((b) => {
        const d = new Date(b.borrowDate)
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear
    }).length

    const overdueBorrowings = borrowings.filter((b) => {
        if (b.status === 'Returned') return false
        const due = new Date(b.dueDate)
        return due < now
    }).length

    const returnedBorrowings = borrowings.filter(
        (b) => b.status === 'Returned',
    ).length

    const unpaidFine = fines
        .filter((f) => f.status === 'Unpaid')
        .reduce((sum, f) => sum + f.amount, 0)
    const paidFine = fines
        .filter((f) => f.status === 'Paid')
        .reduce((sum, f) => sum + f.amount, 0)

    const topMembers = users
        .filter((u) => u.role === 'user')
        .slice(0, 5)
        .map((u) => ({
            ...u,
            borrowingCount: borrowings.filter((b) => b.userId === u.id).length,
        }))
        .sort((a, b) => b.borrowingCount - a.borrowingCount)

    function fetchData() {
        setError(false)
        setLoading(true)
        Promise.all([
            getAllBooks(),
            getAllMembers(),
            getAllBorrowings(),
            getAllReturns(),
            getAllHistory(),
            getAllFines(),
        ])
            .then(([b, u, br, r, h, f]) => {
                setBooks(b)
                setUsers(u)
                setBorrowings(br)
                setReturns(r)
                setHistoryList(h)
                setFines(f)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    const handleRetry = fetchData

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat data laporan. Silakan coba lagi."
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
                <div className="mb-6 grid gap-6 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} variant="rectangular" className="h-48" />
                    ))}
                </div>
                <Skeleton variant="rectangular" className="h-48" />
            </div>
        )
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="mb-1 text-2xl font-bold text-text-primary">Laporan Perpustakaan</h2>
                    <p className="text-text-secondary">
                        Ringkasan data dan statistik perpustakaan.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={exportBooks}>Export Buku</Button>
                    <Button variant="outline" size="sm" onClick={exportBorrowings}>Export Peminjaman</Button>
                    <Button variant="outline" size="sm" onClick={exportReturns}>Export Pengembalian</Button>
                    <Button variant="outline" size="sm" onClick={exportFines}>Export Denda</Button>
                </div>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<BookOpen className="h-8 w-8" />}
                    title="Total Buku"
                    value={totalBooks}
                    description="Jumlah buku di perpustakaan"
                    variant="primary"
                />
                <StatCard
                    icon={<Users className="h-8 w-8" />}
                    title="Total Anggota"
                    value={totalMembers}
                    description="Jumlah anggota terdaftar"
                    variant="success"
                />
                <StatCard
                    icon={<TrendingUp className="h-8 w-8" />}
                    title="Total Peminjaman"
                    value={totalBorrowings}
                    description="Jumlah transaksi peminjaman"
                    variant="warning"
                />
                <StatCard
                    icon={<Wallet className="h-8 w-8" />}
                    title="Total Denda"
                    value={`Rp${totalFines.toLocaleString('id-ID')}`}
                    description="Akumulasi denda"
                    variant="danger"
                />
            </div>

            <div className="mb-6 grid gap-6 lg:grid-cols-3">
                <div className="rounded-[16px] border border-border bg-white p-5 shadow-card">
                    <h3 className="mb-4 text-base font-semibold text-text-primary">
                        Statistik Buku
                    </h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-success" />
                                <span className="text-sm text-text-secondary">Tersedia</span>
                            </div>
                            <Badge variant="success" size="sm">
                                {availableBooks}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-warning" />
                                <span className="text-sm text-text-secondary">Dipinjam</span>
                            </div>
                            <Badge variant="warning" size="sm">
                                {borrowedBooks}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BookOpen className="h-4 w-4 text-danger" />
                                <span className="text-sm text-text-secondary">Hilang</span>
                            </div>
                            <Badge variant="danger" size="sm">
                                {lostBooks}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="rounded-[16px] border border-border bg-white p-5 shadow-card">
                    <h3 className="mb-4 text-base font-semibold text-text-primary">
                        Statistik Peminjaman
                    </h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-success" />
                                <span className="text-sm text-text-secondary">Bulan Ini</span>
                            </div>
                            <Badge variant="success" size="sm">
                                {borrowingsThisMonth}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-danger" />
                                <span className="text-sm text-text-secondary">Terlambat</span>
                            </div>
                            <Badge variant="danger" size="sm">
                                {overdueBorrowings}
                            </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                <span className="text-sm text-text-secondary">Dikembalikan</span>
                            </div>
                            <Badge variant="primary" size="sm">
                                {returnedBorrowings}
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="rounded-[16px] border border-border bg-white p-5 shadow-card">
                    <h3 className="mb-4 text-base font-semibold text-text-primary">
                        Statistik Denda
                    </h3>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-danger" />
                                <span className="text-sm text-text-secondary">Belum Dibayar</span>
                            </div>
                            <span className="text-sm font-medium text-text-primary">
                                Rp{unpaidFine.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-success" />
                                <span className="text-sm text-text-secondary">Lunas</span>
                            </div>
                            <span className="text-sm font-medium text-text-primary">
                                Rp{paidFine.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-primary" />
                                <span className="text-sm text-text-secondary">Total</span>
                            </div>
                            <span className="text-sm font-medium text-text-primary">
                                Rp{totalFines.toLocaleString('id-ID')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-[16px] border border-border bg-white p-5 shadow-card">
                <h3 className="mb-4 text-base font-semibold text-text-primary">
                    Anggota Teraktif
                </h3>
                {topMembers.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {topMembers.map((m, idx) => (
                            <div
                                key={m.id}
                                className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50"
                            >
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                    {idx + 1}
                                </div>
                                <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-100">
                                    {m.avatar ? (
                                        <img
                                            src={m.avatar}
                                            alt={m.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-xs font-bold text-disabled">
                                            {m.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium text-text-primary">
                                        {m.name}
                                    </p>
                                    <p className="text-xs text-text-secondary">{m.email}</p>
                                </div>
                                <Badge variant="primary" size="sm">
                                    {m.borrowingCount} Pinjam
                                </Badge>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-text-secondary">
                        Belum ada data anggota.
                    </p>
                )}
            </div>
        </div>
    )
}

export default ReportPage
