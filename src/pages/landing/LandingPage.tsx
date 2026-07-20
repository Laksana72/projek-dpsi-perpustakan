import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    BookOpen, Library, Bell, Zap, ThumbsUp, Shield, Layers,
    Instagram, Youtube, Facebook, Twitter
} from 'lucide-react'
import { api } from '@/services/api'
import type { Book as BookType } from '@/types'
import Button from '@/components/ui/Button'
import BookCard from '@/components/cards/BookCard'
import Navbar from '@/components/layout/Navbar'
import uadLogo from '@/assets/logo/logo-uad.png'
import heroImg from '@/assets/images/landing.jpg'

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

function parseBook(item: ApiBook): BookType {
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
        status: item.status as BookType['status'],
        pages: item.pages ?? 0,
        language: item.language,
        edition: item.edition,
        addedDate: item.added_date,
        location: item.location,
        callNumber: item.call_number,
    }
}

const heroFeatures = [
    {
        icon: <Library className="h-7 w-7" />,
        title: 'Koleksi Lengkap',
        description: '100K Buku tersedia',
    },
    {
        icon: <Zap className="h-7 w-7" />,
        title: 'Reservasi Online',
        description: 'Pesan Buku Lebih Mudah',
    },
    {
        icon: <Bell className="h-7 w-7" />,
        title: 'Notifikasi Pintar',
        description: 'Pengingat Kembalian',
    },
    {
        icon: <BookOpen className="h-7 w-7" />,
        title: 'Akses kapan Saja',
        description: '24/7 di semua perangkat',
    },
]

const keunggulan = [
    {
        icon: <ThumbsUp className="h-7 w-7" />,
        title: 'Mudah Digunakan',
        description: 'Antar muka yang sederhana',
    },
    {
        icon: <Zap className="h-7 w-7" />,
        title: 'Cepat Dan Real time',
        description: 'Informasi ketersediaan buku secara Real time',
    },
    {
        icon: <Shield className="h-7 w-7" />,
        title: 'Aman dan Terpercaya',
        description: 'Data anda aman bersama kami',
    },
    {
        icon: <Layers className="h-7 w-7" />,
        title: 'Terintegrasi',
        description: 'Terintegrasi dengan sistem Kampus UAD',
    },
]

function LandingPage() {
    const [books, setBooks] = useState<BookType[]>([])

    useEffect(() => {
        api.get<{ data: ApiBook[] }>('/books?per_page=8')
            .then((res) => setBooks(res.data.map(parseBook)))
            .catch(() => setBooks([]))
    }, [])

    const displayBooks = books

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    }

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    }

    return (
        <div className="bg-[#F5F5F5]">
            <Navbar
                variant="transparent"
                logo={
                    <div className="flex items-center gap-3">
                        <img src={uadLogo} alt="UAD" className="h-10 w-10 rounded-full object-cover" />
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
            <section className="relative flex min-h-[750px] items-center overflow-hidden bg-[#0B1B3D] pt-32 pb-16">
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
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 variants={itemVariants} className="text-[72px] font-extrabold leading-[1.1] tracking-tight text-white lg:text-[80px]">
                            Temukan Ilmu<br />
                            Raih Masa Depan
                        </motion.h1>
                        <motion.p variants={itemVariants} className="mt-8 max-w-[620px] text-[24px] leading-relaxed text-white/90">
                            Akses ribuan koleksi Buku, jurnal dan referensi<br />
                            kapan saja dimana saja
                        </motion.p>
                        <motion.div variants={itemVariants} className="mt-[60px] flex items-center gap-x-[50px] gap-y-5 max-lg:flex-wrap">
                            {heroFeatures.map((item) => (
                                <div key={item.title} className="flex shrink-0 items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/15 text-white">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-base font-semibold text-white">{item.title}</p>
                                        <p className="text-sm text-white/70">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Keunggulan */}
            <motion.section
                className="bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
            >
                <div className="mx-auto max-w-[1280px] rounded-t-[24px] bg-white px-8 pb-16 pt-12">
                    <motion.div
                        className="mb-14"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-[38px] font-bold text-[#0B1B3D]">Keunggulan</h2>
                        <p className="mt-2 max-w-xl text-base text-gray-500">
                            Nikmati berbagai kemudahan dan keunggulan yang kami tawarkan
                        </p>
                    </motion.div>
                    <motion.div
                        className="grid gap-[45px] sm:grid-cols-2 lg:grid-cols-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                    >
                        {keunggulan.map((item) => (
                            <motion.div
                                key={item.title}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                                }}
                            >
                                <div className="text-[#0B1B3D]">{item.icon}</div>
                                <h5 className="mt-5 text-lg font-semibold text-[#0B1B3D]">{item.title}</h5>
                                <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Book Collection Preview */}
            <motion.section
                id="book-preview"
                className="bg-[#F5F5F5] py-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
            >
                <div className="mx-auto max-w-[1280px] px-8">
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-[36px] font-bold text-[#0B1B3D]">Koleksi Perpustakaan</h2>
                        <p className="mt-3 text-base text-gray-500">
                            Berikut adalah koleksi buku terbaru yang tersedia
                        </p>
                    </motion.div>
                    {displayBooks.length > 0 ? (
                        <motion.div
                            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-50px' }}
                            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                        >
                            {displayBooks.map((book) => (
                                <motion.div
                                    key={book.id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                                    }}
                                >
                                    <BookCard
                                        cover={book.cover}
                                        title={book.title}
                                        author={book.author}
                                        category={book.category}
                                        year={book.year}
                                        status={book.status}
                                        onDetail={() => (window.location.href = `/book/${book.id}`)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="py-16 text-center">
                            <BookOpen className="mx-auto mb-4 h-16 w-16 text-disabled" />
                            <h4 className="mb-2 text-lg font-semibold text-[#0B1B3D]">
                                Belum ada koleksi
                            </h4>
                            <p className="text-gray-500">
                                Koleksi buku belum tersedia saat ini.
                            </p>
                        </div>
                    )}
                </div>
            </motion.section>
            <motion.section
                className="bg-[#F5F5F5] pb-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
            >
                <div className="mx-auto max-w-[1280px] px-8">
                    <motion.div
                        className="rounded-[20px] bg-[#0B1B3D] px-16 py-20 text-center"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        <motion.h2
                            className="text-[42px] font-bold text-white"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Siap Menjelajahi tanpa batas?
                        </motion.h2>
                        <motion.p
                            className="mt-4 text-[20px] text-white/70"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Mulai Perjalananmu Sekarang!
                        </motion.p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Footer Custom */}
            <footer className="bg-[#07132E] pt-16 pb-8 text-white">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="grid gap-10 lg:grid-cols-6">

                        {/* Kolom 1: Logo & Deskripsi */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3">
                                <img src={uadLogo} alt="UAD" className="h-10 w-10 rounded-full object-cover" />
                                <div className="leading-none">
                                    <p className="text-[18px] font-bold leading-tight text-white">PERPUSTAKAAN</p>
                                    <p className="mt-[2px] text-[11px] tracking-[0.08em] text-white/80">UNIVERSITAS AHMAD DAHLAN</p>
                                </div>
                            </div>
                            <p className="mt-6 pr-4 text-[14px] leading-relaxed text-gray-400">
                                Perpustakaan digital Universitas Ahmad Dahlan hadir untuk menyediakan kemudahan akses ilmu pengetahuan untuk seluruh civitas akademika.
                            </p>
                        </div>

                        {/* Kolom 2: Navigasi */}
                        <div>
                            <h3 className="mb-5 text-[16px] font-semibold text-white">Navigasi</h3>
                            <ul className="space-y-3 text-[14px] text-gray-400">
                                <li><a href="#" className="transition-colors hover:text-white">Beranda</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Koleksi</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Fitur</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Tentang Kami</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Bantuan</a></li>
                            </ul>
                        </div>

                        {/* Kolom 3: Layanan */}
                        <div>
                            <h3 className="mb-5 text-[16px] font-semibold text-white">Layanan</h3>
                            <ul className="space-y-3 text-[14px] text-gray-400">
                                <li><a href="#" className="transition-colors hover:text-white">Reservasi</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Peminjaman</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Denda</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Riwayat</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Notifikasi</a></li>
                            </ul>
                        </div>

                        {/* Kolom 4: Informasi */}
                        <div>
                            <h3 className="mb-5 text-[16px] font-semibold text-white">Informasi</h3>
                            <ul className="space-y-3 text-[14px] text-gray-400">
                                <li><a href="#" className="transition-colors hover:text-white">Jam Operasional</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Kontak</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Kebijakan Privasi</a></li>
                                <li><a href="#" className="transition-colors hover:text-white">Syarat & Ketentuan</a></li>
                            </ul>
                        </div>

                        {/* Kolom 5: Ikuti Kami (Sosial Media) */}
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

                    {/* Separator & Copyright */}
                    <div className="mt-16 border-t border-white/10 pt-8 text-center">
                        <p className="text-[14px] text-gray-400">
                            © 2026 U-Library Perpustakaan UAD. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage
