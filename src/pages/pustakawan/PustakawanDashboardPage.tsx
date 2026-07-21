import { useState, useEffect } from 'react'
import { BookOpen, BookMarked, Clock, RefreshCw } from 'lucide-react'
import { api } from '@/services/api'
import StatCard from '@/components/cards/StatCard'

interface DashboardData {
    totalBooks: number
    totalBorrowings: number
    pendingApprovals: number
    returnsToday: number
}

function PustakawanDashboardPage() {
    const [data, setData] = useState<DashboardData>({
        totalBooks: 0,
        totalBorrowings: 0,
        pendingApprovals: 0,
        returnsToday: 0,
    })

    useEffect(() => {
        api.get<DashboardData>('/dashboard/pustakawan')
            .then(setData)
            .catch(() => {})
    }, [])

    return (
        <div className="animate-fade-in">
            <h1 className="mb-8 text-2xl font-bold text-text-primary">Dashboard Pustakawan</h1>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Total Buku"
                    value={data.totalBooks}
                    icon={<BookOpen className="h-8 w-8" />}
                    variant="primary"
                />
                <StatCard
                    title="Peminjaman Aktif"
                    value={data.totalBorrowings}
                    icon={<BookMarked className="h-8 w-8" />}
                    variant="warning"
                />
                <StatCard
                    title="Menunggu Persetujuan"
                    value={data.pendingApprovals}
                    icon={<Clock className="h-8 w-8" />}
                    variant="info"
                />
                <StatCard
                    title="Jatuh Tempo Hari Ini"
                    value={data.returnsToday}
                    icon={<RefreshCw className="h-8 w-8" />}
                    variant="danger"
                />
            </div>
        </div>
    )
}

export default PustakawanDashboardPage
