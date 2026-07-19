import { motion } from 'framer-motion'
import {
    Target, Check, Library, Zap, Clock, Layers,
    Instagram, Youtube, Facebook, Twitter,
} from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import uadLogo from '@/assets/logo/logo-uad.png'
import heroImg from '@/assets/images/landing.jpg'

const visiData = {
    icon: <Target className="h-8 w-8" />,
    title: 'Visi',
    description:
        'Menjadi pusat informasi dan pengetahuan yang unggul dalam mendukung pendidikan, penelitian, dan pengabdian kepada masyarakat di tingkat nasional dan internasional.',
}

const misiList = [
    'Menyediakan akses informasi yang cepat, tepat, dan akurat bagi seluruh civitas akademika.',
    'Mengembangkan sistem perpustakaan digital yang terintegrasi dengan teknologi terkini.',
    'Meningkatkan budaya literasi dan minat baca di lingkungan Universitas Ahmad Dahlan.',
    'Menjalin kerja sama dengan berbagai institusi untuk pengembangan koleksi dan layanan.',
    'Menyelenggarakan layanan perpustakaan yang profesional dan ramah pengguna.',
]

const keunggulanAbout = [
    {
        icon: <Library className="h-7 w-7" />,
        title: 'Koleksi Lengkap',
        description: 'Lebih dari 100.000 judul buku, jurnal, dan referensi akademik.',
    },
    {
        icon: <Zap className="h-7 w-7" />,
        title: 'Reservasi Online',
        description: 'Pesan buku secara online dan ambil di perpustakaan.',
    },
    {
        icon: <Clock className="h-7 w-7" />,
        title: 'Layanan Cepat',
        description: 'Proses peminjaman dan pengembalian yang efisien.',
    },
    {
        icon: <Layers className="h-7 w-7" />,
        title: 'Terintegrasi Kampus',
        description: 'Terhubung dengan sistem informasi akademik kampus.',
    },
]

function AboutPage() {
    return (
        <div className="bg-[#F5F5F5]">
            <Navbar
                variant="transparent"
                activeHref="/tentang"
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
                                Tentang Perpustakaan UAD
                        </motion.h1>
                        <motion.p
                            className="mt-6 max-w-[560px] text-[20px] leading-relaxed text-white/90"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Mengenal lebih dekat perpustakaan digital Universitas Ahmad Dahlan.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Tentang Perpustakaan - 2 Kolom */}
            <motion.section
                className="bg-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="mx-auto max-w-[1280px] rounded-t-[24px] bg-white px-8 py-16">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <h2 className="text-[36px] font-bold text-[#0B1B3D]">Tentang Perpustakaan</h2>
                            <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600">
                                <p>
                                    Perpustakaan Universitas Ahmad Dahlan (UAD) merupakan pusat sumber belajar yang
                                    menyediakan berbagai koleksi bahan pustaka baik cetak maupun digital untuk mendukung
                                    kegiatan tridharma perguruan tinggi.
                                </p>
                                <p>
                                    Dengan sistem manajemen perpustakaan digital terbaru, kami hadir untuk memberikan
                                    kemudahan akses bagi mahasiswa, dosen, dan tenaga kependidikan dalam menemukan dan
                                    memanfaatkan sumber informasi yang dibutuhkan.
                                </p>
                                <p>
                                    Perpustakaan UAD terus berkembang mengikuti perkembangan teknologi informasi untuk
                                    memberikan layanan yang terbaik bagi pengguna.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="overflow-hidden rounded-[20px]"
                            initial={{ opacity: 0, x: 30, scale: 0.95 }}
                            whileInView={{ opacity: 1, x: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                        >
                            <img
                                src={heroImg}
                                alt="Perpustakaan Universitas Ahmad Dahlan"
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Visi */}
            <motion.section
                className="bg-[#F5F5F5] py-16"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
            >
                <div className="mx-auto max-w-[1280px] px-8">
                    <motion.div
                        className="rounded-[20px] bg-[#0B1B3D] px-12 py-14 text-center text-white"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white">
                            {visiData.icon}
                        </div>
                        <h3 className="text-[28px] font-bold">{visiData.title}</h3>
                        <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-white/80">
                            {visiData.description}
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Misi */}
            <motion.section
                className="bg-white py-16"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
            >
                <div className="mx-auto max-w-[1280px] px-8">
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-[36px] font-bold text-[#0B1B3D]">Misi</h2>
                        <p className="mt-2 text-base text-gray-500">
                            Langkah nyata untuk mewujudkan visi perpustakaan
                        </p>
                    </motion.div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {misiList.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-4 rounded-[16px] bg-gray-50 p-5 transition-all duration-200 hover:bg-gray-100"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, duration: 0.4 }}
                            >
                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B1B3D] text-white">
                                    <Check className="h-4 w-4" />
                                </div>
                                <p className="text-base text-gray-700">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Keunggulan */}
            <motion.section
                className="bg-[#F5F5F5] py-16"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
            >
                <div className="mx-auto max-w-[1280px] px-8">
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-[36px] font-bold text-[#0B1B3D]">Keunggulan</h2>
                        <p className="mt-2 text-base text-gray-500">
                            Berbagai kemudahan yang kami tawarkan untuk Anda
                        </p>
                    </motion.div>
                    <motion.div
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                    >
                        {keunggulanAbout.map((item) => (
                            <motion.div
                                key={item.title}
                                className="rounded-[16px] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                                }}
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-[12px] bg-[#0B1B3D]/10 text-[#0B1B3D]">
                                    {item.icon}
                                </div>
                                <h4 className="mt-5 text-lg font-semibold text-[#0B1B3D]">{item.title}</h4>
                                <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

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

export default AboutPage
