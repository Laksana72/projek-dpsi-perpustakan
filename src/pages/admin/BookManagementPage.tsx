import { useState, useEffect, useMemo } from 'react'
import {
    Book as BookIcon,
    BookOpen,
    BookX,
    Search,
    Plus,
    Edit,
    Trash2,
    RotateCcw,
} from 'lucide-react'
import { toast } from 'sonner'
import { getAllBooks, createBook, updateBook, deleteBook } from '@/services/book.service'
import { getAllCategories } from '@/services/category.service'
import type { Book } from '@/types'
import BookCoverPlaceholder from '@/components/ui/BookCoverPlaceholder'
import StatCard from '@/components/cards/StatCard'
import Select from '@/components/forms/Select'
import Input from '@/components/forms/Input'
import Textarea from '@/components/forms/Textarea'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Pagination from '@/components/navigation/Pagination'
import Modal from '@/components/feedback/Modal'
import Skeleton from '@/components/feedback/Skeleton'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'
import { exportBooks, importBooks } from '@/services/excel.service'

const ITEMS_PER_PAGE = 10

const statusVariant: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
    Available: 'success',
    Borrowed: 'warning',
    Reserved: 'info',
    Lost: 'default',
}

const statusLabel: Record<string, string> = {
    Available: 'Tersedia',
    Borrowed: 'Dipinjam',
    Reserved: 'Reservasi',
    Lost: 'Hilang',
}

const emptyBook: Omit<Book, 'id'> = {
    title: '',
    author: '',
    isbn: '',
    publisher: '',
    year: new Date().getFullYear(),
    category: '',
    description: '',
    cover: '',
    status: 'Available',
    pages: 0,
    language: 'Indonesia',
    edition: 'Edisi Pertama',
    addedDate: new Date().toISOString().split('T')[0],
    location: '',
    callNumber: '',
}

function BookManagementPage() {
    const [search, setSearch] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')
    const [sort, setSort] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState<Book[]>([])
    const [addModal, setAddModal] = useState(false)
    const [editModal, setEditModal] = useState<Book | null>(null)
    const [deleteModal, setDeleteModal] = useState<Book | null>(null)
    const [formData, setFormData] = useState<Omit<Book, 'id'>>({ ...emptyBook })

    useEffect(() => {
        setError(false)
        Promise.all([
            getAllBooks(),
            getAllCategories(),
        ])
            .then(([booksData, categoriesData]) => {
                setBooks(booksData)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const categories = useMemo(() => {
        const cats = new Set(books.map((b) => b.category))
        return Array.from(cats).sort()
    }, [books])

    const filtered = useMemo(() => {
        let result = [...books]

        if (search.trim()) {
            const q = search.toLowerCase()
            result = result.filter(
                (b) =>
                    b.title.toLowerCase().includes(q) ||
                    b.author.toLowerCase().includes(q) ||
                    b.isbn.toLowerCase().includes(q),
            )
        }

        if (statusFilter) {
            result = result.filter((b) => b.status === statusFilter)
        }

        if (categoryFilter) {
            result = result.filter((b) => b.category === categoryFilter)
        }

        switch (sort) {
            case 'title-asc':
                result.sort((a, b) => a.title.localeCompare(b.title))
                break
            case 'title-desc':
                result.sort((a, b) => b.title.localeCompare(a.title))
                break
            case 'year-desc':
                result.sort((a, b) => b.year - a.year)
                break
            case 'year-asc':
                result.sort((a, b) => a.year - b.year)
                break
        }

        return result
    }, [search, statusFilter, categoryFilter, sort, books])

    const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginated = filtered.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const resetFilters = () => {
        setSearch('')
        setStatusFilter('')
        setCategoryFilter('')
        setSort('')
        setCurrentPage(1)
    }

    const hasActiveFilters = search || statusFilter || categoryFilter || sort

    const handleRetry = () => {
        setError(false)
        setLoading(true)
        Promise.all([
            getAllBooks(),
            getAllCategories(),
        ])
            .then(([booksData, categoriesData]) => {
                setBooks(booksData)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    const openAddModal = () => {
        setFormData({ ...emptyBook })
        setAddModal(true)
    }

    const openEditModal = (book: Book) => {
        setFormData({
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            publisher: book.publisher,
            year: book.year,
            category: book.category,
            description: book.description,
            cover: book.cover,
            status: book.status,
            pages: book.pages,
            language: book.language,
            edition: book.edition,
            addedDate: book.addedDate,
            location: book.location,
            callNumber: book.callNumber,
        })
        setEditModal(book)
    }

    const handleAddBook = async () => {
        try {
            await createBook(formData)
            setAddModal(false)
            const booksData = await getAllBooks()
            setBooks(booksData)
            toast.success('Buku berhasil ditambahkan')
        } catch {
            toast.error('Gagal menambahkan buku')
        }
    }

    const handleEditBook = async () => {
        if (!editModal) return
        try {
            await updateBook(editModal.id, formData)
            setEditModal(null)
            const booksData = await getAllBooks()
            setBooks(booksData)
            toast.success('Buku berhasil diperbarui')
        } catch {
            toast.error('Gagal memperbarui buku')
        }
    }

    const handleDeleteBook = async () => {
        if (!deleteModal) return
        try {
            await deleteBook(deleteModal.id)
            setDeleteModal(null)
            const booksData = await getAllBooks()
            setBooks(booksData)
            toast.success('Buku berhasil dihapus')
        } catch {
            toast.error('Gagal menghapus buku')
        }
    }

    const totalBooks = books.length
    const availableBooks = books.filter((b) => b.status === 'Available').length
    const borrowedBooks = books.filter((b) => b.status === 'Borrowed').length
    const lostBooks = books.filter((b) => b.status === 'Lost').length

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat data buku. Silakan coba lagi."
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
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="mb-1 text-2xl font-bold text-text-primary">Manajemen Buku</h2>
                    <p className="text-text-secondary">Kelola koleksi buku perpustakaan.</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => document.getElementById('import-books')?.click()}
                    >
                        Import Excel
                    </Button>
                    <input
                        id="import-books"
                        type="file"
                        accept=".xlsx,.xls"
                        className="hidden"
                        onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            try {
                                const result = await importBooks(file)
                                toast.success(result.message)
                                fetchBooks()
                            } catch (err) {
                                toast.error(err instanceof Error ? err.message : 'Gagal mengimpor')
                            }
                            e.target.value = ''
                        }}
                    />
                    <Button
                        variant="primary"
                        size="md"
                        onClick={exportBooks}
                        leftIcon={<BookOpen className="h-4 w-4" />}
                    >
                        Export Excel
                    </Button>
                    <Button
                        variant="primary"
                        size="md"
                        leftIcon={<Plus className="h-4 w-4" />}
                        onClick={openAddModal}
                    >
                        Tambah Buku
                    </Button>
                </div>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    icon={<BookIcon className="h-8 w-8" />}
                    title="Total Buku"
                    value={totalBooks}
                    description="Koleksi seluruh buku"
                    variant="primary"
                />
                <StatCard
                    icon={<BookOpen className="h-8 w-8" />}
                    title="Tersedia"
                    value={availableBooks}
                    description="Siap dipinjam"
                    variant="success"
                />
                <StatCard
                    icon={<BookX className="h-8 w-8" />}
                    title="Dipinjam"
                    value={borrowedBooks}
                    description="Sedang dipinjam"
                    variant="warning"
                />
                <StatCard
                    icon={<BookX className="h-8 w-8" />}
                    title="Hilang"
                    value={lostBooks}
                    description="Buku hilang"
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
                        placeholder="Cari judul, penulis, atau ISBN..."
                        aria-label="Cari buku"
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
                            { value: 'Available', label: 'Tersedia' },
                            { value: 'Borrowed', label: 'Dipinjam' },
                            { value: 'Reserved', label: 'Reservasi' },
                            { value: 'Lost', label: 'Hilang' },
                        ]}
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                <div className="w-full sm:w-[160px]">
                    <Select
                        label="Kategori"
                        options={[
                            { value: '', label: 'Semua Kategori' },
                            ...categories.map((c) => ({ value: c, label: c })),
                        ]}
                        value={categoryFilter}
                        onChange={(e) => {
                            setCategoryFilter(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                </div>
                <div className="w-full sm:w-[180px]">
                    <Select
                        label="Urutkan"
                        options={[
                            { value: '', label: 'Default' },
                            { value: 'title-asc', label: 'Judul A-Z' },
                            { value: 'title-desc', label: 'Judul Z-A' },
                            { value: 'year-desc', label: 'Tahun Terbaru' },
                            { value: 'year-asc', label: 'Tahun Terlama' },
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
                                        'Judul',
                                        'Penulis',
                                        'Kategori',
                                        'Tahun',
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
                                {paginated.map((book, idx) => (
                                    <tr
                                        key={book.id}
                                        className="transition-colors duration-150 hover:bg-gray-50"
                                    >
                                        <td className="px-3 py-3 text-sm text-text-secondary">
                                            {(safePage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="h-12 w-9 overflow-hidden rounded">
                                                {book.cover ? (
                                                    <img
                                                        src={book.cover}
                                                        alt={book.title}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <BookCoverPlaceholder title={book.title} className="h-full w-full" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-3 py-3 text-sm font-medium text-text-primary whitespace-nowrap">
                                            {book.title}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {book.author}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {book.category}
                                        </td>
                                        <td className="px-3 py-3 text-sm text-text-secondary whitespace-nowrap">
                                            {book.year}
                                        </td>
                                        <td className="px-3 py-3">
                                            <Badge
                                                variant={statusVariant[book.status] || 'default'}
                                                size="sm"
                                            >
                                                {statusLabel[book.status] || book.status}
                                            </Badge>
                                        </td>
                                        <td className="px-3 py-3">
                                            <div className="flex flex-wrap gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => openEditModal(book)}
                                                    aria-label={`Edit ${book.title}`}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setDeleteModal(book)}
                                                    aria-label={`Hapus ${book.title}`}
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
                        {paginated.map((book) => (
                            <div
                                key={book.id}
                                className="rounded-[16px] border border-border bg-white p-4 shadow-card"
                            >
                                <div className="mb-3 flex items-start gap-3">
                                    <div className="h-16 w-12 shrink-0 overflow-hidden rounded-lg">
                                        {book.cover ? (
                                            <img
                                                src={book.cover}
                                                alt={book.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <BookCoverPlaceholder title={book.title} className="h-full w-full" />
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h5 className="text-sm font-semibold text-text-primary">
                                            {book.title}
                                        </h5>
                                        <p className="text-xs text-text-secondary">{book.author}</p>
                                        <p className="text-xs text-text-secondary">
                                            {book.isbn}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={statusVariant[book.status] || 'default'}
                                        size="sm"
                                    >
                                        {statusLabel[book.status] || book.status}
                                    </Badge>
                                </div>
                                <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-text-secondary">
                                    <span>Kategori: {book.category}</span>
                                    <span>Tahun: {book.year}</span>
                                    <span>Halaman: {book.pages}</span>
                                    <span>Bahasa: {book.language || '-'}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        leftIcon={<Edit className="h-3 w-3" />}
                                        onClick={() => openEditModal(book)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        leftIcon={<Trash2 className="h-3 w-3" />}
                                        onClick={() => setDeleteModal(book)}
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
                    title="Belum ada data buku"
                    description="Tidak ada data buku yang sesuai dengan pencarian."
                    actionLabel="Refresh"
                    onAction={handleRetry}
                />
            )}

            <Modal
                isOpen={addModal}
                onClose={() => setAddModal(false)}
                title="Tambah Buku Baru"
                size="lg"
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                        label="Judul"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <Input
                        label="Penulis"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                    <Input
                        label="ISBN"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    />
                    <Input
                        label="Penerbit"
                        value={formData.publisher}
                        onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    />
                    <Input
                        label="Tahun"
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    />
                    <Select
                        label="Kategori"
                        options={[
                            ...categories.map((c) => ({ value: c, label: c })),
                        ]}
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                    <Input
                        label="Halaman"
                        type="number"
                        value={formData.pages}
                        onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })}
                    />
                    <Input
                        label="Bahasa"
                        value={formData.language || ''}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    />
                    <Input
                        label="Edisi"
                        value={formData.edition || ''}
                        onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
                    />
                    <Input
                        label="Lokasi Rak"
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <Input
                        label="Nomor Panggil"
                        value={formData.callNumber || ''}
                        onChange={(e) => setFormData({ ...formData, callNumber: e.target.value })}
                    />
                    <Input
                        label="URL Cover"
                        value={formData.cover}
                        onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                    />
                    <Select
                        label="Status"
                        options={[
                            { value: 'Available', label: 'Tersedia' },
                            { value: 'Borrowed', label: 'Dipinjam' },
                            { value: 'Reserved', label: 'Reservasi' },
                            { value: 'Lost', label: 'Hilang' },
                        ]}
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as Book['status'] })}
                    />
                    <div className="sm:col-span-2">
                        <Textarea
                            label="Deskripsi"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" size="md" onClick={() => setAddModal(false)}>
                        Batal
                    </Button>
                    <Button variant="primary" size="md" onClick={handleAddBook}>
                        Simpan
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={!!editModal}
                onClose={() => setEditModal(null)}
                title="Edit Buku"
                size="lg"
            >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                        label="Judul"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <Input
                        label="Penulis"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    />
                    <Input
                        label="ISBN"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                    />
                    <Input
                        label="Penerbit"
                        value={formData.publisher}
                        onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                    />
                    <Input
                        label="Tahun"
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                    />
                    <Select
                        label="Kategori"
                        options={[
                            ...categories.map((c) => ({ value: c, label: c })),
                        ]}
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                    <Input
                        label="Halaman"
                        type="number"
                        value={formData.pages}
                        onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })}
                    />
                    <Input
                        label="Bahasa"
                        value={formData.language || ''}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    />
                    <Input
                        label="Edisi"
                        value={formData.edition || ''}
                        onChange={(e) => setFormData({ ...formData, edition: e.target.value })}
                    />
                    <Input
                        label="Lokasi Rak"
                        value={formData.location || ''}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                    <Input
                        label="Nomor Panggil"
                        value={formData.callNumber || ''}
                        onChange={(e) => setFormData({ ...formData, callNumber: e.target.value })}
                    />
                    <Input
                        label="URL Cover"
                        value={formData.cover}
                        onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                    />
                    <Select
                        label="Status"
                        options={[
                            { value: 'Available', label: 'Tersedia' },
                            { value: 'Borrowed', label: 'Dipinjam' },
                            { value: 'Reserved', label: 'Reservasi' },
                            { value: 'Lost', label: 'Hilang' },
                        ]}
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as Book['status'] })}
                    />
                    <div className="sm:col-span-2">
                        <Textarea
                            label="Deskripsi"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" size="md" onClick={() => setEditModal(null)}>
                        Batal
                    </Button>
                    <Button variant="primary" size="md" onClick={handleEditBook}>
                        Simpan
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={!!deleteModal}
                onClose={() => setDeleteModal(null)}
                title="Hapus Buku"
                size="sm"
            >
                <p className="text-sm text-text-secondary">
                    Apakah Anda yakin ingin menghapus buku{' '}
                    <strong>{deleteModal?.title}</strong>? Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="mt-6 flex justify-end gap-3">
                    <Button variant="outline" size="md" onClick={() => setDeleteModal(null)}>
                        Batal
                    </Button>
                    <Button variant="danger" size="md" onClick={handleDeleteBook}>
                        Hapus
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default BookManagementPage
