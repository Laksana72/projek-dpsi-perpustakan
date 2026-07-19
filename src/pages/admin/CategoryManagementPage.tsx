import { useState, useEffect, useMemo } from 'react'
import {
    BookOpen,
    Layers,
    Search,
    RotateCcw,
    Plus,
    Edit3,
    Trash2,
    BookMarked,
} from 'lucide-react'
import { getAllCategories, createCategory, updateCategory, deleteCategory, type Category } from '@/services/category.service'
import StatCard from '@/components/cards/StatCard'
import Button from '@/components/ui/Button'
import Pagination from '@/components/navigation/Pagination'
import Modal from '@/components/feedback/Modal'
import Skeleton from '@/components/feedback/Skeleton'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'

const ITEMS_PER_PAGE = 10

function CategoryManagementPage() {
    const [search, setSearch] = useState('')
    const [categories, setCategories] = useState<(Category & { bookCount: number })[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState<Category | null>(null)
    const [deleteModal, setDeleteModal] = useState<string | null>(null)

    useEffect(() => {
        fetchCategories()
    }, [])

    const totalBooks = useMemo(
        () => categories.reduce((sum, c) => sum + c.bookCount, 0),
        [categories],
    )

    const filtered = useMemo(() => {
        let result = [...categories]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(
                (c) =>
                    c.name.toLowerCase().includes(q) ||
                    c.description.toLowerCase().includes(q),
            )
        }

        return result
    }, [search, categories])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const resetFilters = () => {
        setSearch('')
        setCurrentPage(1)
    }

    const hasActiveFilters = search

    function fetchCategories() {
        setError(false)
        setLoading(true)
        getAllCategories()
            .then((data) => setCategories(data.map((c) => ({ ...c, bookCount: c.books_count ?? 0 }))))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    const handleRetry = fetchCategories

    const [addForm, setAddForm] = useState({ name: '', description: '' })
    const [editForm, setEditForm] = useState<Partial<Category>>({})

    const openEditModal = (cat: Category) => {
        setEditForm({ ...cat })
        setEditModal(cat)
    }

    const resetAddForm = () => {
        setAddForm({ name: '', description: '' })
    }

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat data kategori. Silakan coba lagi."
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
                <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {[1, 2].map((i) => (
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
                    Manajemen Kategori
                </h2>
                <p className="text-text-secondary">
                    Kelola kategori buku perpustakaan.
                </p>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                <StatCard
                    icon={<Layers className="h-8 w-8" />}
                    title="Total Kategori"
                    value={categories.length}
                    description="Jumlah kategori buku"
                    variant="primary"
                />
                <StatCard
                    icon={<BookMarked className="h-8 w-8" />}
                    title="Total Buku"
                    value={totalBooks}
                    description="Buku dalam semua kategori"
                    variant="info"
                />
            </div>

            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative max-w-xl flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-disabled" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                        placeholder="Cari nama atau deskripsi kategori..."
                        aria-label="Cari kategori"
                        className="h-12 w-full rounded-[12px] border border-border bg-white pl-12 pr-4 text-base text-text-primary placeholder:text-disabled transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div className="flex items-center gap-3">
                    {hasActiveFilters && (
                        <Button
                            variant="outline"
                            size="md"
                            leftIcon={<RotateCcw className="h-4 w-4" />}
                            onClick={resetFilters}
                            aria-label="Reset filter"
                        >
                            Reset
                        </Button>
                    )}
                    <Button
                        variant="primary"
                        size="md"
                        leftIcon={<Plus className="h-4 w-4" />}
                        onClick={() => {
                            resetAddForm()
                            setAddModal(true)
                        }}
                    >
                        Tambah Kategori
                    </Button>
                </div>
            </div>

            {paginated.length > 0 ? (
                <>
                    <div className="hidden overflow-x-auto rounded-[16px] border border-border md:block">
                        <table className="w-full border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    {[
                                        'No',
                                        'Nama Kategori',
                                        'Deskripsi',
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
                                {paginated.map((c, idx) => (
                                    <tr
                                        key={c.id}
                                        className="transition-colors duration-150 hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td className="px-3 py-3 text-sm font-medium text-text-primary whitespace-nowrap">
                                            {c.name}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary max-w-xs truncate">
                                            {c.description}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {c.bookCount}
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex flex-wrap gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => openEditModal(c)}
                                                    aria-label={`Edit ${c.name}`}
                                                >
                                                    <Edit3 className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteModal(c.id)}
                                                    aria-label={`Hapus ${c.name}`}
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
                        {paginated.map((c) => (
                            <div
                                key={c.id}
                                className="rounded-[16px] border border-border bg-white p-4 shadow-card"
                            >
                                <div className="mb-2 flex items-start justify-between">
                                    <h5 className="text-sm font-semibold text-text-primary">
                                        {c.name}
                                    </h5>
                                    <span className="text-sm font-medium text-text-secondary">
                                        {c.bookCount} buku
                                    </span>
                                </div>
                                <p className="mb-3 text-xs text-text-secondary line-clamp-2">
                                    {c.description}
                                </p>
                                <div className="flex gap-2">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => openEditModal(c)}
                                    >
                                        <Edit3 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setDeleteModal(c.id)}
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
                    title="Belum ada kategori"
                    description="Tidak ada kategori yang sesuai dengan pencarian."
                    actionLabel="Refresh"
                    onAction={handleRetry}
                />
            )}

            <Modal
                isOpen={addModal}
                onClose={() => setAddModal(false)}
                title="Tambah Kategori"
                size="md"
            >
                <div className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-text-primary">
                            Nama Kategori
                        </label>
                        <input
                            type="text"
                            value={addForm.name}
                            onChange={(e) =>
                                setAddForm((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            placeholder="Masukkan nama kategori"
                            className="h-12 w-full rounded-[12px] border border-border bg-white px-4 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-text-primary">
                            Deskripsi
                        </label>
                        <textarea
                            value={addForm.description}
                            onChange={(e) =>
                                setAddForm((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            placeholder="Masukkan deskripsi kategori"
                            rows={4}
                            className="w-full resize-none rounded-[12px] border border-border bg-white px-4 py-3 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setAddModal(false)}>
                        Batal
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => setAddModal(false)}
                    >
                        Simpan
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={!!editModal}
                onClose={() => setEditModal(null)}
                title="Edit Kategori"
                size="md"
            >
                <div className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-text-primary">
                            Nama Kategori
                        </label>
                        <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) =>
                                setEditForm((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            className="h-12 w-full rounded-[12px] border border-border bg-white px-4 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-text-primary">
                            Deskripsi
                        </label>
                        <textarea
                            value={editForm.description || ''}
                            onChange={(e) =>
                                setEditForm((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            rows={4}
                            className="w-full resize-none rounded-[12px] border border-border bg-white px-4 py-3 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setEditModal(null)}>
                        Batal
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => setEditModal(null)}
                    >
                        Simpan
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={!!deleteModal}
                onClose={() => setDeleteModal(null)}
                title="Hapus Kategori"
                size="sm"
            >
                <p className="text-sm text-text-secondary">
                    Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak
                    dapat dibatalkan.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setDeleteModal(null)}>
                        Batal
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => setDeleteModal(null)}
                    >
                        Hapus
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default CategoryManagementPage
