import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
    BookOpen, Search,
    Instagram, Youtube, Facebook, Twitter,
} from 'lucide-react'
import { api } from '@/services/api'
import type { Book } from '@/types'
import Button from '@/components/ui/Button'
import BookCard from '@/components/cards/BookCard'
import Navbar from '@/components/layout/Navbar'
import Pagination from '@/components/navigation/Pagination'
import uadLogo from '@/assets/logo/logo-uad.png'
import heroImg from '@/assets/images/landing.jpg'

const categories = ['Semua', 'Teknologi', 'Sosial', 'Pendidikan', 'Ekonomi', 'Lainnya']

const mainCategories = ['Teknologi', 'Sosial', 'Pendidikan', 'Ekonomi']

const ITEMS_PER_PAGE = 10

interface ApiBook {
    id: number
    title: string
    author: string
    isbn: string
    publisher: { id: number; name: string }
    year: number
    category: { id: number; name: string }
    description: string
    cover: string | null
    status: string
    pages: number
    language: string
    edition: string
    added_date: string
    location: string
    call_number: string
}

function parseBook(item: ApiBook): Book {
    return {
        id: String(item.id),
        title: item.title,
        author: item.author,
        isbn: item.isbn,
        publisher: item.publisher?.name ?? '',
        year: item.year,
        category: item.category?.name ?? '',
        description: item.description ?? '',
        cover: item.cover ?? '',
        status: item.status as Book['status'],
        pages: item.pages ?? 0,
        language: item.language,
        edition: item.edition,
        addedDate: item.added_date,
        location: item.location,
        callNumber: item.call_number,
    }
}

function CollectionPage() {
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeCategory, setActiveCategory] = useState('Semua')
    const [currentPage, setCurrentPage] = useState(1)

    const fetchBooks = useCallback(async () => {
        setLoading(true)
        try {
            const params: Record<string, string> = { per_page: '100' }
            if (searchQuery.trim()) {
                params.q = searchQuery.trim()
                const res = await api.get<{ data: ApiBook[] }>('/books/search', params)
                setBooks(res.data.map(parseBook))
            } else {
                const res = await api.get<{ data: ApiBook[] }>('/books', params)
                setBooks(res.data.map(parseBook))
            }
        } catch {
            setBooks([])
        } finally {
            setLoading(false)
        }
    }, [searchQuery])

    useEffect(() => {
        fetchBooks()
    }, [searchQuery, fetchBooks])

    const filteredBooks = books.filter((b) => {
        if (activeCategory === 'Semua') return true
        if (activeCategory === 'Lainnya') return !mainCategories.includes(b.category)
        return b.category === activeCategory
    })

    const totalPages = Math.max(1, Math.ceil(filteredBooks.length / ITEMS_PER_PAGE))
    const safePage = Math.min(currentPage, totalPages)
    const paginatedBooks = filteredBooks.slice(
        (safePage - 1) * ITEMS_PER_PAGE,
        safePage * ITEMS_PER_PAGE,
    )

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat)
        setCurrentPage(1)
    }

    const handleSearch = () => {
        setCurrentPage(1)
    }

    return (
        <div className="bg-[#F5F5F5]">
            <Navbar
                variant="transparent"
                activeHref="/koleksi"
                logo={
                    <div className="flex items-center gap-3">
                        <img src={uadLogo} alt="UAD" className="h-11 w-11 rounded-full object-cover" />
                        <div className="leading-none">
                            <p className="text-[18px] font-bold leading-tight text-white">PERPUSTAKAAN</p>
                            <p className="mt-[2px] text-[11px] tracking-[0.08em] text-white/80">UNIVERSITAS AHMAD DAHLAN</p>
                        </div>
                    </div>
                }
                loginLabel="Masuk"
                buttonClassName="h-9 w-[90px] rounded-[8px] border border-white bg-transparent text-sm text-white hover:bg-white/10"
                className="absolute top-0 left-0 right-0 pt-7 z-50"
            />

            {/* Hero */}
            <section className="relative flex min-h-[500px] items-center overflow-hidden bg-[#0B1B3D] pt-32 pb-16">
                <img
                    src={heroImg}
                    alt="Gedung Universitas Ahmad Dahlan"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(11,27,61,0.85)] to-[#0B1B3D]" />

                <div className="relative z-10 mx-auto w-full max-w-[1280px] px-8 mt-8">
                    <motion.div
                        className="max-w-[620px]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <motion.h1
                            className="text-[48px] font-extrabold leading-[1.1] tracking-tight text-white lg:text-[52px]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                        >
                                Koleksi Perpustakaan
                        </motion.h1>
                        <motion.p
                            className="mt-6 max-w-[560px] text-[20px] leading-relaxed text-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Temukan ribuan koleksi buku digital yang tersedia untuk dipinjam.
                        </motion.p>
                        <motion.div
                            className="mt-[45px] flex h-[62px] w-full max-w-[560px] items-center rounded-[18px] bg-white shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <div className="flex flex-1 items-center gap-3 pl-5">
                                <Search className="h-5 w-5 shrink-0 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari buku berdasarkan judul, penulis, atau kategori."
                                    aria-label="Cari buku"
                                    className="h-full w-full bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-400"
                                />
                            </div>
                            <Button
                                variant="primary"
                                size="md"
                                onClick={handleSearch}
                                className="mr-2 h-[52px] w-[120px] rounded-[12px] bg-[#1D63ED] text-[15px] text-white hover:bg-[#1D63ED]/90"
                            >
                                Cari
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Category Filter + Book Grid */}
            <section className="bg-white">
                <div className="mx-auto max-w-[1280px] rounded-t-[24px] bg-white px-8 pb-16 pt-12">
                    {/* Category Filter */}
                    <div className="mb-10 flex flex-wrap items-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200 ${
                                    activeCategory === cat
                                        ? 'bg-[#0B1B3D] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Results count */}
                    <p className="mb-8 text-sm text-gray-500">
                        {loading
                            ? 'Memuat data...'
                            : `Menampilkan ${filteredBooks.length} buku`
                        }
                        {activeCategory !== 'Semua' && ` di kategori "${activeCategory}"`}
                        {searchQuery && ` untuk pencarian "${searchQuery}"`}
                    </p>

                    {/* Book Grid */}
                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1D63ED] border-t-transparent" />
                        </div>
                    ) : paginatedBooks.length > 0 ? (
                        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                            {paginatedBooks.map((book) => (
                                <BookCard
                                    key={book.id}
                                    cover={book.cover}
                                    title={book.title}
                                    author={book.author}
                                    category={book.category}
                                    year={book.year}
                                    status={book.status}
                                    onDetail={() => (window.location.href = `/book/${book.id}`)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <BookOpen className="mx-auto mb-4 h-16 w-16 text-disabled" />
                            <h4 className="mb-2 text-lg font-semibold text-[#0B1B3D]">
                                Buku tidak ditemukan
                            </h4>
                            <p className="text-gray-500">
                                Tidak ada buku yang cocok dengan kriteria yang dipilih.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    <div className="mt-10">
                        <Pagination
                            currentPage={safePage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#07132E] pt-16 pb-8 text-white">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="grid gap-10 lg:grid-cols-6">
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3">
                                <img src={uadLogo} alt="UAD" className="h-11 w-11 rounded-full object-cover" />
                                <div className="leading-none">
                                    <p className="text-[18px] font-bold leading-tight text-white">PERPUSTAKAAN</p>
                                    <p className="mt-[2px] text-[11px] tracking-[0.08em] text-white/80">UNIVERSITAS AHMAD DAHLAN</p>
                                </div>
                            </div>
                            <p className="mt-6 pr-4 text-[14px] leading-relaxed text-gray-400">
                                Perpustakaan digital Universitas Ahmad Dahlan hadir untuk menyediakan kemudahan akses ilmu pengetahuan untuk seluruh civitas akademika.
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-5 text-[16px] font-semibold text-white">Navigasi</h3>
                            <ul className="space-y-3 text-[14px] text-gray-400">
                                <li><a href="/" className="transition-colors hover:text-white">Beranda</a></li>
                                <li><a href="/koleksi" className="transition-colors hover:text-white">Koleksi</a></li>
                                <li><a href="/tentang" className="transition-colors hover:text-white">Tentang Kami</a></li>
                                <li><a href="/bantuan" className="transition-colors hover:text-white">Bantuan</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-5 text-[16px] font-semibold text-white">Layanan</h3>
                            <ul className="space-y-3 text-[14px] text-gray-400">
                                <li><a href="/koleksi" className="transition-colors hover:text-white">Koleksi Buku</a></li>
                                <li><span className="transition-colors hover:text-white">Reservasi Online</span></li>
                                <li><span className="transition-colors hover:text-white">Bantuan</span></li>
                                <li><span className="transition-colors hover:text-white">FAQ</span></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-5 text-[16px] font-semibold text-white">Informasi</h3>
                            <ul className="space-y-3 text-[14px] text-gray-400">
                                <li><a href="/tentang" className="transition-colors hover:text-white">Tentang Kami</a></li>
                                <li><span className="transition-colors hover:text-white">Kebijakan Privasi</span></li>
                                <li><span className="transition-colors hover:text-white">Syarat & Ketentuan</span></li>
                                <li><span className="transition-colors hover:text-white">Jam Operasional</span></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-5 text-[16px] font-semibold text-white">Ikuti Kami</h3>
                            <div className="flex items-center gap-4 text-gray-400">
                                <a href="#" aria-label="Instagram" className="transition-colors hover:text-white">
                                    <Instagram className="h-[18px] w-[18px]" />
                                </a>
                                <a href="#" aria-label="YouTube" className="transition-colors hover:text-white">
                                    <Youtube className="h-[18px] w-[18px]" />
                                </a>
                                <a href="#" aria-label="Facebook" className="transition-colors hover:text-white">
                                    <Facebook className="h-[18px] w-[18px]" />
                                </a>
                                <a href="#" aria-label="Twitter / X" className="transition-colors hover:text-white">
                                    <Twitter className="h-[18px] w-[18px]" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-white/10 pt-8 text-center">
                        <p className="text-[14px] text-gray-400">
                            &copy; 2026 U-Library Perpustakaan UAD. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default CollectionPage
