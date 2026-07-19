import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    ChevronDown, Mail, MapPin, Phone, MessageCircle,
    Instagram, Youtube, Facebook, Twitter,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Navbar from '@/components/layout/Navbar'
import uadLogo from '@/assets/logo/logo-uad.png'
import heroImg from '@/assets/images/landing.jpg'

interface FaqItem {
    question: string
    answer: string
}

const faqData: FaqItem[] = [
    {
        question: 'Bagaimana cara mendaftar menjadi anggota perpustakaan?',
        answer: 'Untuk mendaftar menjadi anggota perpustakaan, Anda dapat mengunjungi halaman login dan memilih opsi "Daftar". Isi data diri Anda dengan lengkap dan tunggu verifikasi dari admin perpustakaan.',
    },
    {
        question: 'Berapa lama masa peminjaman buku?',
        answer: 'Masa peminjaman buku adalah 7 hari untuk mahasiswa dan 14 hari untuk dosen. Peminjaman dapat diperpanjang maksimal 2 kali jika tidak ada reservasi dari anggota lain.',
    },
    {
        question: 'Bagaimana cara memperpanjang peminjaman buku?',
        answer: 'Anda dapat memperpanjang peminjaman melalui menu "Peminjaman Saya" di dashboard. Pilih buku yang ingin diperpanjang dan klik tombol "Perpanjang". Perpanjangan hanya dapat dilakukan sebelum tanggal jatuh tempo.',
    },
    {
        question: 'Apa yang harus dilakukan jika buku hilang atau rusak?',
        answer: 'Segera laporkan ke petugas perpustakaan. Anda akan dikenakan denda sesuai dengan ketentuan yang berlaku, yaitu mengganti buku yang sama atau membayar sebesar harga buku tersebut.',
    },
    {
        question: 'Bagaimana cara reservasi buku secara online?',
        answer: 'Cari buku yang ingin Anda pinjam melalui halaman Koleksi, lalu klik tombol "Detail" pada buku yang tersedia. Jika status buku "Tersedia", Anda dapat langsung melakukan reservasi.',
    },
    {
        question: 'Berapa besar denda keterlambatan pengembalian?',
        answer: 'Denda keterlambatan adalah Rp1.000 per buku per hari. Denda akan diakumulasi dan harus dibayarkan sebelum Anda dapat meminjam buku kembali.',
    },
    {
        question: 'Apakah saya bisa mengakses perpustakaan dari luar kampus?',
        answer: 'Ya, perpustakaan digital UAD dapat diakses 24 jam dari mana saja selama Anda terhubung dengan internet. Anda hanya perlu login menggunakan akun yang sudah terdaftar.',
    },
    {
        question: 'Bagaimana cara menghubungi petugas perpustakaan?',
        answer: 'Anda dapat menghubungi petugas perpustakaan melalui nomor telepon yang tersedia, email, atau datang langsung ke perpustakaan UAD pada jam operasional.',
    },
]

function HelpPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null)

    const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <div className="bg-[#F5F5F5]">
            <Navbar
                variant="transparent"
                activeHref="/bantuan"
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
                                Pusat Bantuan
                        </motion.h1>
                        <motion.p
                            className="mt-6 max-w-[560px] text-[20px] leading-relaxed text-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Temukan jawaban untuk pertanyaan yang sering diajukan.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Accordion */}
            <section className="bg-white">
                <div className="mx-auto max-w-[1280px] rounded-t-[24px] bg-white px-8 py-16">
                    <div className="mb-12">
                        <h2 className="text-[36px] font-bold text-[#0B1B3D]">Pertanyaan Umum</h2>
                        <p className="mt-2 text-base text-gray-500">
                            Berikut adalah pertanyaan yang sering diajukan oleh pengguna
                        </p>
                    </div>
                    <div className="mx-auto max-w-[860px] space-y-4">
                        {faqData.map((faq, index) => {
                            const isOpen = openIndex === index
                            return (
                                <div
                                    key={index}
                                    className={`overflow-hidden rounded-[16px] border transition-all duration-200 ${
                                        isOpen ? 'border-[#0B1B3D]/20 shadow-sm' : 'border-gray-100'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-gray-50"
                                    >
                                        <span className="pr-4 text-[15px] font-medium text-[#0B1B3D]">
                                            {faq.question}
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
                                                isOpen ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <p className="border-t border-gray-100 px-6 py-5 text-base leading-relaxed text-gray-600">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="bg-[#F5F5F5] py-16">
                <div className="mx-auto max-w-[1280px] px-8">
                    <div className="mb-12">
                        <h2 className="text-[36px] font-bold text-[#0B1B3D]">Hubungi Kami</h2>
                        <p className="mt-2 text-base text-gray-500">
                            Jika Anda memerlukan bantuan lebih lanjut, silakan hubungi kami melalui kontak di bawah ini
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-[16px] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#0B1B3D]/10 text-[#0B1B3D]">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <h4 className="mt-4 text-base font-semibold text-[#0B1B3D]">Alamat</h4>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                Jl. Ahmad Yani, Tamanan, Kec. Banguntapan, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55191
                            </p>
                        </div>

                        <div className="rounded-[16px] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#0B1B3D]/10 text-[#0B1B3D]">
                                <Mail className="h-6 w-6" />
                            </div>
                            <h4 className="mt-4 text-base font-semibold text-[#0B1B3D]">Email</h4>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                perpustakaan@uad.ac.id
                            </p>
                        </div>

                        <div className="rounded-[16px] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#0B1B3D]/10 text-[#0B1B3D]">
                                <Phone className="h-6 w-6" />
                            </div>
                            <h4 className="mt-4 text-base font-semibold text-[#0B1B3D]">Telepon</h4>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                (0274) 563515 ext. 123
                            </p>
                        </div>

                        <div className="rounded-[16px] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
                            <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-[#0B1B3D]/10 text-[#0B1B3D]">
                                <MessageCircle className="h-6 w-6" />
                            </div>
                            <h4 className="mt-4 text-base font-semibold text-[#0B1B3D]">WhatsApp</h4>
                            <p className="mt-2 text-sm leading-relaxed text-gray-500">
                                +62 812-3456-7890
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 text-center">
                        <Button
                            variant="primary"
                            size="lg"
                            className="rounded-[12px] bg-[#1D63ED] text-white hover:bg-[#1D63ED]/90"
                        >
                            Hubungi Kami
                        </Button>
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

export default HelpPage
