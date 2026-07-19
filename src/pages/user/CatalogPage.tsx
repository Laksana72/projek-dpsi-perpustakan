import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, RotateCcw } from 'lucide-react'
import { getAllBooks } from '@/services/book.service'
import type { Book } from '@/types'
import BookCard from '@/components/cards/BookCard'
import Select from '@/components/forms/Select'
import Button from '@/components/ui/Button'
import Pagination from '@/components/navigation/Pagination'
const ITEMS_PER_PAGE = 12

interface Filters {
    search: string
    category: string
    status: string
    year: string
    sort: string
}

function getUniqueValues(books: Book[], key: keyof Book): string[] {
    const values = [...new Set(books.map((b) => String(b[key])))]
    return values.sort()
}

const sortOptions = [
    { value: 'az', label: 'Judul A-Z' },
    { value: 'za', label: 'Judul Z-A' },
    { value: 'newest', label: 'Terbaru' },
    { value: 'oldest', label: 'Terlama' },
]

const statusOptions = [
    { value: 'Available', label: 'Tersedia' },
    { value: 'Borrowed', label: 'Dipinjam' },
    { value: 'Reserved', label: 'Reservasi' },
    { value: 'Lost', label: 'Hilang' },
]

function CatalogPage() {
    const navigate = useNavigate()
    const [books, setBooks] = useState<Book[]>([])
    const [filters, setFilters] = useState<Filters>({
        search: '',
        category: '',
        status: '',
        year: '',
        sort: '',
    })
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        getAllBooks().then(setBooks).catch(() => {})
    }, [])

    const categories = useMemo(() => getUniqueValues(books, 'category'), [books])
    const years = useMemo(() => getUniqueValues(books, 'year'), [books])

    const filteredBooks = useMemo(() => {
        let result = [...books]

        if (filters.search.trim()) {
            const q = filters.search.toLowerCase()
            result = result.filter(
                (b) =>
                    b.title.toLowerCase().includes(q) ||
                    b.author.toLowerCase().includes(q) ||
                    b.isbn.toLowerCase().includes(q),
            )
        }

        if (filters.category) {
            result = result.filter((b) => b.category === filters.category)
        }

        if (filters.status) {
            result = result.filter((b) => b.status === filters.status)
        }

        if (filters.year) {
            result = result.filter((b) => String(b.year) === filters.year)
        }

        switch (filters.sort) {
            case 'az':
                result.sort((a, b) => a.title.localeCompare(b.title))
                break
            case 'za':
                result.sort((a, b) => b.title.localeCompare(a.title))
                break
            case 'newest':
                result.sort((a, b) => b.year - a.year)
                break
            case 'oldest':
                result.sort((a, b) => a.year - b.year)
                break
        }

        return result
    }, [filters, books])

    const totalPages = Math.max(1, Math.ceil(filteredBooks.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginatedBooks = filteredBooks.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const updateFilter = (key: keyof Filters, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }))
        setCurrentPage(1)
    }

    const resetFilters = () => {
        setFilters({ search: '', category: '', status: '', year: '', sort: '' })
        setCurrentPage(1)
    }

    const hasActiveFilters = Object.values(filters).some((v) => v !== '')

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Katalog Buku</h2>
                <p className="text-text-secondary">
                    Temukan berbagai koleksi buku yang tersedia di perpustakaan.
                </p>
            </div>

            <div className="mb-4 flex flex-col gap-4 lg:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-disabled" />
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => updateFilter('search', e.target.value)}
                        placeholder="Cari judul, penulis, atau ISBN..."
                        aria-label="Cari buku"
                        className="h-12 w-full rounded-[12px] border border-border bg-white pl-12 pr-4 text-base text-text-primary placeholder:text-disabled transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
            </div>

            <div className="mb-6 flex flex-wrap items-end gap-3">
                <div className="w-full sm:w-[180px]">
                    <Select
                        label="Kategori"
                        options={[
                            { value: '', label: 'Semua' },
                            ...categories.map((c) => ({ value: c, label: c })),
                        ]}
                        value={filters.category}
                        onChange={(e) => updateFilter('category', e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-[160px]">
                    <Select
                        label="Status"
                        options={[
                            { value: '', label: 'Semua' },
                            ...statusOptions,
                        ]}
                        value={filters.status}
                        onChange={(e) => updateFilter('status', e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-[160px]">
                    <Select
                        label="Tahun Terbit"
                        options={[
                            { value: '', label: 'Semua' },
                            ...years.map((y) => ({ value: y, label: y })),
                        ]}
                        value={filters.year}
                        onChange={(e) => updateFilter('year', e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-[180px]">
                    <Select
                        label="Urutkan"
                        options={[{ value: '', label: 'Default' }, ...sortOptions]}
                        value={filters.sort}
                        onChange={(e) => updateFilter('sort', e.target.value)}
                    />
                </div>
                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        size="md"
                        leftIcon={<RotateCcw className="h-4 w-4" />}
                        onClick={resetFilters}
                        className="sm:mb-0 sm:self-end"
                    >
                        Reset Filter
                    </Button>
                )}
            </div>

            {paginatedBooks.length > 0 ? (
                <>
                    <div className="mb-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {paginatedBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                title={book.title}
                                author={book.author}
                                category={book.category}
                                year={book.year}
                                status={book.status}
                                onDetail={() => navigate(`/book/${book.id}`)}
                            />
                        ))}
                    </div>
                    <Pagination
                        currentPage={safePage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20">
                    <Search className="mb-4 h-16 w-16 text-disabled" />
                    <h4 className="mb-2 text-lg font-semibold text-text-primary">
                        Buku tidak ditemukan
                    </h4>
                    <p className="mb-6 text-text-secondary">
                        Tidak ada buku yang sesuai dengan pencarian atau filter yang dipilih.
                    </p>
                    {hasActiveFilters && (
                        <Button variant="primary" onClick={resetFilters}>
                            Reset Filter
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default CatalogPage
