import { useState, useEffect, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ChevronDown, ChevronUp, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { getAllBooks, getBookById } from '@/services/book.service'
import { createBorrowing } from '@/services/borrowing.service'
import { useAuth } from '@/hooks/useAuth'
import type { Book } from '@/types'
import BookCoverPlaceholder from '@/components/ui/BookCoverPlaceholder'
import Breadcrumb from '@/components/navigation/Breadcrumb'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

const statusVariant: Record<string, 'success' | 'danger' | 'warning' | 'default'> = {
    Available: 'success',
    Borrowed: 'danger',
    Reserved: 'warning',
    Lost: 'default',
}

const statusLabel: Record<string, string> = {
    Available: 'Tersedia',
    Borrowed: 'Dipinjam',
    Reserved: 'Reservasi',
    Lost: 'Hilang',
}

function DetailBookPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [book, setBook] = useState<Book | undefined>()
    const [allBooks, setAllBooks] = useState<Book[]>([])
    const [showFullSynopsis, setShowFullSynopsis] = useState(false)
    const [borrowing, setBorrowing] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    useEffect(() => {
        if (!id) return
        Promise.all([getBookById(id), getAllBooks()])
            .then(([bookData, booksData]) => {
                setBook(bookData)
                setAllBooks(booksData)
            })
            .catch(() => {})
    }, [id])

    const relatedBooks = useMemo(() => {
        if (!book) return []
        return allBooks
            .filter((b) => b.id !== book.id && b.category === book.category)
            .slice(0, 4)
    }, [book, allBooks])

    const handleBorrow = async () => {
        if (!user || !book) return
        if (book.status !== 'Available') {
            setMessage({ type: 'error', text: 'Maaf, buku ini sedang tidak tersedia untuk dipinjam.' })
            return
        }
        setBorrowing(true)
        setMessage(null)
        try {
            await createBorrowing({ user_id: Number(user.id), book_id: Number(book.id) })
            setMessage({ type: 'success', text: 'Peminjaman berhasil diajukan! Menunggu persetujuan admin.' })
            setTimeout(() => navigate('/borrowings'), 1500)
        } catch {
            setMessage({ type: 'error', text: 'Gagal meminjam buku. Silakan coba lagi.' })
        } finally {
            setBorrowing(false)
        }
    }

    if (!book) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <BookOpen className="mb-4 h-20 w-20 text-disabled" />
                <h3 className="mb-2 text-xl font-semibold text-text-primary">
                    Buku tidak ditemukan
                </h3>
                <p className="mb-6 text-text-secondary">
                    Buku yang Anda cari tidak tersedia atau telah dihapus.
                </p>
                <Button variant="primary" onClick={() => navigate('/catalog')}>
                    Kembali ke Katalog
                </Button>
            </div>
        )
    }

    const isLongSynopsis = book.description.length > 300

    return (
        <div className="animate-fade-in">
            <Breadcrumb
                className="mb-6"
                items={[
                    { label: 'Katalog Buku', href: '/catalog' },
                    { label: 'Detail Buku' },
                ]}
            />

            {message && (
                <div
                    className={`mb-6 flex items-center gap-3 rounded-[12px] border p-4 text-sm ${
                        message.type === 'success'
                            ? 'border-success/30 bg-success/10 text-success'
                            : 'border-danger/30 bg-danger/10 text-danger'
                    }`}
                >
                    {message.type === 'success' ? (
                        <CheckCircle className="h-5 w-5 shrink-0" />
                    ) : (
                        <AlertCircle className="h-5 w-5 shrink-0" />
                    )}
                    {message.text}
                </div>
            )}

            <div className="mb-10 grid gap-8 lg:grid-cols-[300px_1fr] xl:gap-12">
                <div className="flex justify-center lg:justify-start">
                    <div className="h-[420px] w-[300px] overflow-hidden rounded-[16px] shadow-md">
                        {book.cover ? (
                            <img
                                src={book.cover}
                                alt={book.title}
                                className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                            />
                        ) : (
                            <BookCoverPlaceholder title={book.title} className="h-full w-full" />
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-text-primary">{book.title}</h2>

                    <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                        {[
                            { label: 'Penulis', value: book.author },
                            { label: 'Kategori', value: book.category },
                            { label: 'ISBN', value: book.isbn },
                            { label: 'Penerbit', value: book.publisher },
                            { label: 'Tahun Terbit', value: String(book.year) },
                            { label: 'Jumlah Halaman', value: `${book.pages} halaman` },
                            { label: 'Bahasa', value: book.language || 'Indonesia' },
                            { label: 'Edisi', value: book.edition || '-' },
                            { label: 'Lokasi Rak', value: book.location || '-' },
                            { label: 'Call Number', value: book.callNumber || '-' },
                            {
                                label: 'Ditambahkan',
                                value: book.addedDate
                                    ? new Date(book.addedDate).toLocaleDateString('id-ID', {
                                          year: 'numeric',
                                          month: 'long',
                                          day: 'numeric',
                                      })
                                    : '-',
                            },
                        ].map((item) => (
                            <div key={item.label}>
                                <span className="text-sm text-text-secondary">{item.label}</span>
                                <p className="text-sm font-medium text-text-primary">{item.value}</p>
                            </div>
                        ))}
                        <div>
                            <span className="text-sm text-text-secondary">Status</span>
                            <div className="mt-0.5">
                                <Badge variant={statusVariant[book.status] || 'default'} size="sm">
                                    {statusLabel[book.status] || book.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-10">
                <h3 className="mb-3 text-lg font-semibold text-text-primary">Sinopsis</h3>
                <div className="text-sm leading-relaxed text-text-secondary">
                    {isLongSynopsis && !showFullSynopsis
                        ? book.description.slice(0, 300) + '...'
                        : book.description}
                </div>
                {isLongSynopsis && (
                    <button
                        onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                        className="mt-2 flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                    >
                        {showFullSynopsis ? (
                            <>
                                Tutup <ChevronUp className="h-4 w-4" />
                            </>
                        ) : (
                            <>
                                Lihat Selengkapnya <ChevronDown className="h-4 w-4" />
                            </>
                        )}
                    </button>
                )}
            </div>

            <div className="mb-8 flex flex-wrap gap-4">
                <Button
                    variant="primary"
                    size="md"
                    disabled={borrowing || book.status !== 'Available'}
                    onClick={handleBorrow}
                >
                    {borrowing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Memproses...
                        </>
                    ) : (
                        'Pinjam Buku'
                    )}
                </Button>
                <Button
                    variant="outline"
                    size="md"
                    onClick={() => navigate('/catalog')}
                >
                    Kembali ke Katalog
                </Button>
            </div>

            {relatedBooks.length > 0 && (
                <div>
                    <h3 className="mb-4 text-lg font-semibold text-text-primary">Buku Serupa</h3>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedBooks.map((rb) => (
                            <div
                                key={rb.id}
                                className="cursor-pointer rounded-[16px] border border-border bg-white p-4 shadow-card transition-all duration-200 hover:shadow-md"
                                onClick={() => navigate(`/book/${rb.id}`)}
                            >
                                <div className="mb-3 flex items-center gap-3">
                                    <div className="flex h-12 w-10 items-center justify-center rounded-lg bg-gray-100">
                                        <BookOpen className="h-6 w-6 text-disabled" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h5 className="truncate text-sm font-semibold text-text-primary">
                                            {rb.title}
                                        </h5>
                                        <p className="text-xs text-text-secondary">{rb.author}</p>
                                    </div>
                                </div>
                                <Badge
                                    variant={statusVariant[rb.status] || 'default'}
                                    size="sm"
                                >
                                    {statusLabel[rb.status] || rb.status}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default DetailBookPage
