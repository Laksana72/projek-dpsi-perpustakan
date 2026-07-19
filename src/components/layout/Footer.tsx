import { Mail, MapPin, Phone, Globe } from 'lucide-react'
import { cn } from '@/utils/cn'
import uadLogo from '@/assets/logo/logo-uad.png'

interface FooterProps {
    variant?: 'default' | 'primary'
    className?: string
}

function Footer({ variant = 'default', className }: FooterProps) {
    const isPrimary = variant === 'primary'

    const linkClass = isPrimary
        ? 'text-white/70 hover:text-white transition-colors'
        : 'text-text-secondary hover:text-primary transition-colors'
    const textClass = isPrimary ? 'text-white/70' : 'text-text-secondary'

    return (
        <footer
            className={cn(
                isPrimary ? 'bg-primary text-white' : 'border-t border-border bg-white',
                className,
            )}
        >
            <div className="container-custom py-16">
                <div className={cn('grid gap-8', isPrimary ? 'sm:grid-cols-2 lg:grid-cols-5' : 'sm:grid-cols-2 lg:grid-cols-4')}>
                    {/* Logo & Description */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <img src={uadLogo} alt="UAD" className="h-10 w-auto" />
                            <span className={cn('text-lg font-semibold', isPrimary ? 'text-white' : 'text-text-primary')}>
                                Perpustakaan UAD
                            </span>
                        </div>
                        <p className={cn('text-sm leading-relaxed', textClass)}>
                            Sistem Informasi Perpustakaan Universitas Ahmad Dahlan untuk memudahkan pengelolaan perpustakaan secara digital.
                        </p>
                    </div>

                    {/* Navigasi */}
                    <div>
                        <h5 className={cn('mb-4 text-sm font-semibold', isPrimary ? 'text-white' : 'text-text-primary')}>
                            Navigasi
                        </h5>
                        <ul className="space-y-2">
                            {[
                                { label: 'Beranda', href: '/' },
                                { label: 'Koleksi', href: '/koleksi' },
                                { label: 'Tentang', href: '/tentang' },
                                { label: 'Bantuan', href: '/bantuan' },
                            ].map((item) => (
                                <li key={item.href}>
                                    <a href={item.href} className={linkClass}>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {isPrimary ? (
                        <>
                            {/* Layanan */}
                            <div>
                                <h5 className="mb-4 text-sm font-semibold text-white">Layanan</h5>
                                <ul className="space-y-2 text-sm text-white/70">
                                    <li><a href="/koleksi" className={linkClass}>Koleksi Buku</a></li>
                                    <li><span>Reservasi Online</span></li>
                                    <li><span>Bantuan</span></li>
                                    <li><span>FAQ</span></li>
                                </ul>
                            </div>

                            {/* Informasi */}
                            <div>
                                <h5 className="mb-4 text-sm font-semibold text-white">Informasi</h5>
                                <ul className="space-y-2 text-sm text-white/70">
                                    <li><span>Tentang Kami</span></li>
                                    <li><span>Kebijakan Privasi</span></li>
                                    <li><span>Syarat & Ketentuan</span></li>
                                    <li className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 shrink-0" />
                                        library@email.com
                                    </li>
                                </ul>
                            </div>

                            {/* Ikuti Kami */}
                            <div>
                                <h5 className="mb-4 text-sm font-semibold text-white">Ikuti Kami</h5>
                                <ul className="space-y-3 text-sm text-white/70">
                                    <li>
                                        <a href="#" className={cn('flex items-center gap-2', linkClass)}>
                                            <Globe className="h-4 w-4" />
                                            Facebook
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className={cn('flex items-center gap-2', linkClass)}>
                                            <Globe className="h-4 w-4" />
                                            Instagram
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className={cn('flex items-center gap-2', linkClass)}>
                                            <Globe className="h-4 w-4" />
                                            YouTube
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Kontak */}
                            <div>
                                <h5 className="mb-4 text-sm font-semibold text-text-primary">Kontak</h5>
                                <ul className="space-y-3">
                                    {[
                                        { icon: MapPin, text: 'Jl. Merdeka No. 123, Jakarta' },
                                        { icon: Mail, text: 'library@email.com' },
                                        { icon: Phone, text: '(021) 1234-5678' },
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                                            <item.icon className="h-4 w-4 shrink-0" />
                                            {item.text}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Jam Operasional */}
                            <div>
                                <h5 className="mb-4 text-sm font-semibold text-text-primary">Jam Operasional</h5>
                                <ul className="space-y-2 text-sm text-text-secondary">
                                    <li>Senin - Jumat: 08:00 - 20:00</li>
                                    <li>Sabtu: 09:00 - 17:00</li>
                                    <li>Minggu: Tutup</li>
                                </ul>
                            </div>
                        </>
                    )}
                </div>

                <div
                    className={cn(
                        'mt-8 border-t pt-6 text-center text-sm',
                        isPrimary ? 'border-white/20 text-white/60' : 'border-border text-text-secondary',
                    )}
                >
                    <p>&copy; {new Date().getFullYear()} Perpustakaan UAD. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

Footer.displayName = 'Footer'

export default Footer
