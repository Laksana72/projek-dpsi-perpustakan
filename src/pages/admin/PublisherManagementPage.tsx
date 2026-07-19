import { useState, useEffect, useMemo } from 'react'
import {
    Building2,
    Book,
    Search,
    Plus,
    Edit,
    Trash2,
    RotateCcw,
} from 'lucide-react'
import { getAllPublishers, createPublisher, updatePublisher, deletePublisher, type Publisher } from '@/services/publisher.service'
import StatCard from '@/components/cards/StatCard'
import Button from '@/components/ui/Button'
import Pagination from '@/components/navigation/Pagination'
import Modal from '@/components/feedback/Modal'
import Skeleton from '@/components/feedback/Skeleton'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'
import Input from '@/components/forms/Input'

const ITEMS_PER_PAGE = 10

function PublisherManagementPage() {
    const [search, setSearch] = useState('')
    const [publishers, setPublishers] = useState<(Publisher & { bookCount: number })[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState<string | null>(null)
    const [deleteModal, setDeleteModal] = useState<string | null>(null)
    const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })

    useEffect(() => {
        fetchPublishers()
    }, [])

    const filtered = useMemo(() => {
        let result = [...publishers]
        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.email.toLowerCase().includes(q) ||
                    p.address.toLowerCase().includes(q),
            )
        }
        return result
    }, [search, publishers])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const totalBooks = publishers.reduce((sum, p) => sum + p.bookCount, 0)

    const resetFilters = () => {
        setSearch('')
        setCurrentPage(1)
    }

    const hasActiveFilters = search

    function fetchPublishers() {
        setError(false)
        setLoading(true)
        getAllPublishers()
            .then((data) => setPublishers(data.map((p) => ({ ...p, bookCount: p.books_count ?? 0 }))))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    const handleRetry = fetchPublishers

    const openAddModal = () => {
        setForm({ name: '', email: '', phone: '', address: '' })
        setAddModal(true)
    }

    const openEditModal = (p: Publisher) => {
        setForm({ name: p.name, email: p.email, phone: p.phone, address: p.address })
        setEditModal(p.id)
    }

    const handleFormChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat data penerbit. Silakan coba lagi."
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
                <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
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
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Manajemen Penerbit</h2>
                <p className="text-text-secondary">
                    Kelola data penerbit buku perpustakaan.
                </p>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatCard
                    icon={<Building2 className="h-8 w-8" />}
                    title="Total Penerbit"
                    value={publishers.length}
                    description="Jumlah penerbit terdaftar"
                    variant="primary"
                />
                <StatCard
                    icon={<Book className="h-8 w-8" />}
                    title="Total Buku"
                    value={totalBooks}
                    description="Jumlah buku dari penerbit"
                    variant="warning"
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
                        placeholder="Cari nama penerbit, email, atau alamat..."
                        aria-label="Cari penerbit"
                        className="h-12 w-full rounded-[12px] border border-border bg-white pl-12 pr-4 text-base text-text-primary placeholder:text-disabled transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <Button
                    variant="primary"
                    size="md"
                    leftIcon={<Plus className="h-4 w-4" />}
                    onClick={openAddModal}
                >
                    Tambah Penerbit
                </Button>
            </div>

            {hasActiveFilters && (
                <div className="mb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<RotateCcw className="h-4 w-4" />}
                        onClick={resetFilters}
                    >
                        Reset Filter
                    </Button>
                </div>
            )}

            {paginated.length > 0 ? (
                <>
                    <div className="hidden overflow-x-auto rounded-[16px] border border-border md:block">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        'No',
                                        'Nama Penerbit',
                                        'Email',
                                        'Telepon',
                                        'Alamat',
                                        'Jumlah Buku',
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
                                {paginated.map((p, idx) => (
                                    <tr
                                        key={p.id}
                                        className="transition-colors duration-150 hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td className="px-3 py-3 text-sm font-medium text-text-primary whitespace-nowrap">
                                            {p.name}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {p.email}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {p.phone}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {p.address}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary text-center">
                                            {p.bookCount}
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    leftIcon={<Edit className="h-4 w-4" />}
                                                    onClick={() => openEditModal(p)}
                                                    aria-label={`Edit ${p.name}`}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    leftIcon={<Trash2 className="h-4 w-4" />}
                                                    onClick={() => setDeleteModal(p.id)}
                                                    aria-label={`Hapus ${p.name}`}
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-4 md:hidden">
                        {paginated.map((p) => (
                            <div
                                key={p.id}
                                className="rounded-[16px] border border-border bg-white p-4 shadow-card"
                            >
                                <div className="mb-2">
                                    <h5 className="text-sm font-semibold text-text-primary">
                                        {p.name}
                                    </h5>
                                    <p className="text-xs text-text-secondary">{p.email}</p>
                                </div>
                                <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
                                    <span>Telepon: {p.phone}</span>
                                    <span>Buku: {p.bookCount}</span>
                                    <span className="col-span-2">Alamat: {p.address}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        leftIcon={<Edit className="h-4 w-4" />}
                                        onClick={() => openEditModal(p)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        leftIcon={<Trash2 className="h-4 w-4" />}
                                        onClick={() => setDeleteModal(p.id)}
                                    >
                                        Hapus
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
                    title="Belum ada data penerbit"
                    description="Tidak ada data penerbit yang sesuai dengan pencarian."
                    actionLabel="Refresh"
                    onAction={handleRetry}
                />
            )}

            <Modal
                isOpen={addModal}
                onClose={() => setAddModal(false)}
                title="Tambah Penerbit"
                size="sm"
            >
                <div className="flex flex-col gap-4">
                    <Input
                        label="Nama Penerbit"
                        value={form.name}
                        onChange={handleFormChange('name')}
                        placeholder="Masukkan nama penerbit"
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={handleFormChange('email')}
                        placeholder="Masukkan email penerbit"
                    />
                    <Input
                        label="Telepon"
                        value={form.phone}
                        onChange={handleFormChange('phone')}
                        placeholder="Masukkan nomor telepon"
                    />
                    <Input
                        label="Alamat"
                        value={form.address}
                        onChange={handleFormChange('address')}
                        placeholder="Masukkan alamat penerbit"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" size="md" onClick={() => setAddModal(false)}>
                            Batal
                        </Button>
                        <Button variant="primary" size="md">
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={!!editModal}
                onClose={() => setEditModal(null)}
                title="Edit Penerbit"
                size="sm"
            >
                <div className="flex flex-col gap-4">
                    <Input
                        label="Nama Penerbit"
                        value={form.name}
                        onChange={handleFormChange('name')}
                        placeholder="Masukkan nama penerbit"
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={handleFormChange('email')}
                        placeholder="Masukkan email penerbit"
                    />
                    <Input
                        label="Telepon"
                        value={form.phone}
                        onChange={handleFormChange('phone')}
                        placeholder="Masukkan nomor telepon"
                    />
                    <Input
                        label="Alamat"
                        value={form.address}
                        onChange={handleFormChange('address')}
                        placeholder="Masukkan alamat penerbit"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" size="md" onClick={() => setEditModal(null)}>
                            Batal
                        </Button>
                        <Button variant="primary" size="md">
                            Simpan
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={!!deleteModal}
                onClose={() => setDeleteModal(null)}
                title="Hapus Penerbit"
                size="sm"
            >
                <p className="mb-4 text-sm text-text-secondary">
                    Apakah Anda yakin ingin menghapus penerbit ini? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" size="md" onClick={() => setDeleteModal(null)}>
                        Batal
                    </Button>
                    <Button variant="danger" size="md" leftIcon={<Trash2 className="h-4 w-4" />}>
                        Hapus
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default PublisherManagementPage
