import { useState, useEffect, useMemo } from 'react'
import {
    Users,
    UserCheck,
    UserX,
    BookOpen,
    Search,
    RotateCcw,
    Eye,
    Edit3,
    Trash2,
    X,
} from 'lucide-react'
import { getAllMembers, createMember, updateMember, deleteMember } from '@/services/member.service'
import { toast } from 'sonner'
import { getAllBorrowings } from '@/services/borrowing.service'
import type { User, Borrowing } from '@/types'
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

function MemberManagementPage() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [prodiFilter, setProdiFilter] = useState('')
    const [sort, setSort] = useState('')
    const [members, setMembers] = useState<User[]>([])
    const [borrowings, setBorrowings] = useState<Borrowing[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [detailModal, setDetailModal] = useState<User | null>(null)
    const [editModal, setEditModal] = useState<User | null>(null)
    const [deleteModal, setDeleteModal] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const memberUsers = useMemo(() => members.filter((u) => u.role === 'user'), [members])

    const activeCount = useMemo(
        () => memberUsers.filter((u) => u.membershipStatus === 'Active').length,
        [memberUsers],
    )

    const nonActiveCount = useMemo(
        () => memberUsers.filter((u) => u.membershipStatus !== 'Active').length,
        [memberUsers],
    )

    const totalBorrowed = useMemo(
        () => borrowings.filter((b) => b.status === 'Borrowed').length,
        [borrowings],
    )

    const programStudiList = useMemo(() => {
        const set = new Set(memberUsers.map((u) => u.programStudi))
        return Array.from(set).sort()
    }, [memberUsers])

    const filtered = useMemo(() => {
        let result = [...memberUsers]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(
                (u) =>
                    u.name.toLowerCase().includes(q) ||
                    u.email.toLowerCase().includes(q) ||
                    u.nim.toLowerCase().includes(q),
            )
        }

        if (statusFilter) {
            result = result.filter((u) =>
                statusFilter === 'Active'
                    ? u.membershipStatus === 'Active'
                    : u.membershipStatus !== 'Active',
            )
        }

        if (prodiFilter) {
            result = result.filter((u) => u.programStudi === prodiFilter)
        }

        switch (sort) {
            case 'name':
                result.sort((a, b) => a.name.localeCompare(b.name))
                break
            case 'name_desc':
                result.sort((a, b) => b.name.localeCompare(a.name))
                break
            case 'newest':
                result.sort(
                    (a, b) =>
                        new Date(b.membershipExpiry).getTime() -
                        new Date(a.membershipExpiry).getTime(),
                )
                break
            case 'oldest':
                result.sort(
                    (a, b) =>
                        new Date(a.membershipExpiry).getTime() -
                        new Date(b.membershipExpiry).getTime(),
                )
                break
        }

        return result
    }, [search, statusFilter, prodiFilter, sort, memberUsers])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const resetFilters = () => {
        setSearch('')
        setStatusFilter('')
        setProdiFilter('')
        setSort('')
        setCurrentPage(1)
    }

    const hasActiveFilters = search || statusFilter || prodiFilter || sort

    function fetchData() {
        setError(false)
        setLoading(true)
        Promise.all([getAllMembers(), getAllBorrowings()])
            .then(([membersData, borrowingsData]) => {
                setMembers(membersData)
                setBorrowings(borrowingsData)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    const handleRetry = fetchData

    const [editForm, setEditForm] = useState<Partial<User>>({})

    const openEditModal = (user: User) => {
        setEditForm({ ...user })
        setEditModal(user)
    }

    const handleEditChange = (field: keyof User, value: string) => {
        setEditForm((prev) => ({ ...prev, [field]: value }))
    }

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat data anggota. Silakan coba lagi."
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
                    Manajemen Anggota
                </h2>
                <p className="text-text-secondary">
                    Kelola data anggota perpustakaan.
                </p>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<Users className="h-8 w-8" />}
                    title="Total Anggota"
                    value={memberUsers.length}
                    description="Seluruh anggota terdaftar"
                    variant="primary"
                />
                <StatCard
                    icon={<UserCheck className="h-8 w-8" />}
                    title="Anggota Aktif"
                    value={activeCount}
                    description="Status keanggotaan aktif"
                    variant="success"
                />
                <StatCard
                    icon={<UserX className="h-8 w-8" />}
                    title="Non-Aktif"
                    value={nonActiveCount}
                    description="Keanggotaan tidak aktif"
                    variant="danger"
                />
                <StatCard
                    icon={<BookOpen className="h-8 w-8" />}
                    title="Total Buku Dipinjam"
                    value={totalBorrowed}
                    description="Buku sedang dipinjam"
                    variant="info"
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
                        placeholder="Cari nama, email, atau NIM..."
                        aria-label="Cari anggota"
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
                            { value: 'Active', label: 'Aktif' },
                            { value: 'Inactive', label: 'Non-Aktif' },
                        ]}
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                <div className="w-full sm:w-[200px]">
                    <Select
                        label="Program Studi"
                        options={[
                            { value: '', label: 'Semua Prodi' },
                            ...programStudiList.map((p) => ({
                                value: p,
                                label: p,
                            })),
                        ]}
                        value={prodiFilter}
                        onChange={(e) => {
                            setProdiFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                <div className="w-full sm:w-[180px]">
                    <Select
                        label="Urutkan"
                        options={[
                            { value: '', label: 'Default' },
                            { value: 'name', label: 'Nama (A-Z)' },
                            { value: 'name_desc', label: 'Nama (Z-A)' },
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
                                        'Avatar',
                                        'Nama',
                                        'NIM',
                                        'Email',
                                        'Program Studi',
                                        'Status',
                                        'Bergabung',
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
                                {paginated.map((u, idx) => (
                                    <tr
                                        key={u.id}
                                        className="transition-colors duration-150 hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="h-9 w-9 overflow-hidden rounded-full bg-gray-100">
                                                {u.avatar ? (
                                                    <img
                                                        src={u.avatar}
                                                        alt={u.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-semibold text-primary">
                                                        {u.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-sm font-medium text-text-primary whitespace-nowrap">
                                            {u.name}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {u.nim}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {u.email}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {u.programStudi}
                                        </td>
                                        <td className="px-3 py-3">
                                            <Badge
                                                variant={
                                                    u.membershipStatus === 'Active'
                                                        ? 'success'
                                                        : 'danger'
                                                }
                                                size="sm"
                                            >
                                                {u.membershipStatus === 'Active'
                                                    ? 'Aktif'
                                                    : 'Non-Aktif'}
                                            </Badge>
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {new Date(
                                                u.membershipExpiry,
                                            ).toLocaleDateString('id-ID')}
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex flex-wrap gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDetailModal(u)}
                                                    aria-label={`Detail ${u.name}`}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => openEditModal(u)}
                                                    aria-label={`Edit ${u.name}`}
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteModal(u.id)}
                                                    aria-label={`Hapus ${u.name}`}
                                                >
                                                    <Trash2 className="h-4 w-4 text-danger" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-4 md:hidden">
                        {paginated.map((u) => (
                            <div
                                key={u.id}
                                className="rounded-[16px] border border-border bg-white p-4 shadow-card"
                            >
                                <div className="mb-3 flex items-start gap-3">
                                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
                                        {u.avatar ? (
                                            <img
                                                src={u.avatar}
                                                alt={u.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-semibold text-primary">
                                                {u.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h5 className="text-sm font-semibold text-text-primary">
                                            {u.name}
                                        </h5>
                                        <p className="text-xs text-text-secondary">
                                            {u.nim}
                                        </p>
                                        <p className="text-xs text-text-secondary">
                                            {u.email}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={
                                            u.membershipStatus === 'Active'
                                                ? 'success'
                                                : 'danger'
                                        }
                                        size="sm"
                                    >
                                        {u.membershipStatus === 'Active'
                                            ? 'Aktif'
                                            : 'Non-Aktif'}
                                    </Badge>
                                </div>
                                <div className="mb-3 text-xs text-text-secondary">
                                    <span>Program Studi: {u.programStudi}</span>
                                    <br />
                                    <span>
                                        Bergabung:{' '}
                                        {new Date(
                                            u.membershipExpiry,
                                        ).toLocaleDateString('id-ID')}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => setDetailModal(u)}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => openEditModal(u)}
                                    >
                                        <Edit3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDeleteModal(u.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-danger" />
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
                    title="Belum ada data anggota"
                    description="Tidak ada data anggota yang sesuai dengan pencarian."
                    actionLabel="Refresh"
                    onAction={handleRetry}
                />
            )}

            <Modal
                isOpen={!!detailModal}
                onClose={() => setDetailModal(null)}
                title="Detail Anggota"
                size="md"
            >
                {detailModal && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100">
                                {detailModal.avatar ? (
                                    <img
                                        src={detailModal.avatar}
                                        alt={detailModal.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xl font-semibold text-primary">
                                        {detailModal.name.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-text-primary">
                                    {detailModal.name}
                                </h4>
                                <p className="text-sm text-text-secondary">
                                    {detailModal.email}
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="block text-text-secondary">NIM</span>
                                <span className="font-medium text-text-primary">
                                    {detailModal.nim}
                                </span>
                            </div>
                            <div>
                                <span className="block text-text-secondary">
                                    Program Studi
                                </span>
                                <span className="font-medium text-text-primary">
                                    {detailModal.programStudi}
                                </span>
                            </div>
                            <div>
                                <span className="block text-text-secondary">Role</span>
                                <span className="font-medium text-text-primary capitalize">
                                    {detailModal.role}
                                </span>
                            </div>
                            <div>
                                <span className="block text-text-secondary">
                                    Status Keanggotaan
                                </span>
                                <Badge
                                    variant={
                                        detailModal.membershipStatus === 'Active'
                                            ? 'success'
                                            : 'danger'
                                    }
                                    size="sm"
                                >
                                    {detailModal.membershipStatus === 'Active'
                                        ? 'Aktif'
                                        : 'Non-Aktif'}
                                </Badge>
                            </div>
                            <div>
                                <span className="block text-text-secondary">
                                    Masa Berlaku
                                </span>
                                <span className="font-medium text-text-primary">
                                    {new Date(
                                        detailModal.membershipExpiry,
                                    ).toLocaleDateString('id-ID')}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>

            <Modal
                isOpen={!!editModal}
                onClose={() => setEditModal(null)}
                title="Edit Anggota"
                size="md"
            >
                <div className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-text-primary">
                            Nama
                        </label>
                        <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) => handleEditChange('name', e.target.value)}
                            className="h-12 w-full rounded-[12px] border border-border bg-white px-4 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-text-primary">
                            Email
                        </label>
                        <input
                            type="email"
                            value={editForm.email || ''}
                            onChange={(e) => handleEditChange('email', e.target.value)}
                            className="h-12 w-full rounded-[12px] border border-border bg-white px-4 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-text-primary">
                            NIM
                        </label>
                        <input
                            type="text"
                            value={editForm.nim || ''}
                            onChange={(e) => handleEditChange('nim', e.target.value)}
                            className="h-12 w-full rounded-[12px] border border-border bg-white px-4 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-text-primary">
                            Program Studi
                        </label>
                        <input
                            type="text"
                            value={editForm.programStudi || ''}
                            onChange={(e) =>
                                handleEditChange('programStudi', e.target.value)
                            }
                            className="h-12 w-full rounded-[12px] border border-border bg-white px-4 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <Select
                            label="Status Keanggotaan"
                            options={[
                                { value: 'Active', label: 'Aktif' },
                                { value: 'Expired', label: 'Non-Aktif' },
                            ]}
                            value={editForm.membershipStatus || ''}
                            onChange={(e) =>
                                handleEditChange('membershipStatus', e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-text-primary">
                            Masa Berlaku
                        </label>
                        <input
                            type="date"
                            value={editForm.membershipExpiry || ''}
                            onChange={(e) =>
                                handleEditChange('membershipExpiry', e.target.value)
                            }
                            className="h-12 w-full rounded-[12px] border border-border bg-white px-4 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setEditModal(null)}>
                        Batal
                    </Button>
                    <Button
                        variant="primary"
                        disabled={submitting}
                        onClick={async () => {
                            if (!editModal) return
                            setSubmitting(true)
                            try {
                                await updateMember(editModal.id, editForm)
                                toast.success('Anggota berhasil diperbarui')
                                setEditModal(null)
                                fetchMembers()
                            } catch {
                                toast.error('Gagal memperbarui anggota')
                            } finally {
                                setSubmitting(false)
                            }
                        }}
                    >
                        {submitting ? 'Menyimpan...' : 'Simpan'}
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={!!deleteModal}
                onClose={() => setDeleteModal(null)}
                title="Hapus Anggota"
                size="sm"
            >
                <p className="text-sm text-text-secondary">
                    Apakah Anda yakin ingin menghapus anggota ini? Tindakan ini tidak
                    dapat dibatalkan.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setDeleteModal(null)}>
                        Batal
                    </Button>
                    <Button
                        variant="danger"
                        disabled={submitting}
                        onClick={async () => {
                            if (!deleteModal) return
                            setSubmitting(true)
                            try {
                                await deleteMember(deleteModal)
                                toast.success('Anggota berhasil dihapus')
                                setDeleteModal(null)
                                fetchMembers()
                            } catch {
                                toast.error('Gagal menghapus anggota')
                            } finally {
                                setSubmitting(false)
                            }
                        }}
                    >
                        {submitting ? 'Menghapus...' : 'Hapus'}
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default MemberManagementPage
