import { useState, useEffect, type ReactNode } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import uadLogo from '@/assets/logo/logo-uad.png'

interface NavLink {
    label: string
    href: string
}

interface NavbarProps {
    variant?: 'default' | 'primary' | 'transparent'
    links?: NavLink[]
    activeHref?: string
    loginLabel?: string
    className?: string
    logo?: ReactNode
    buttonClassName?: string
}

const defaultLinks: NavLink[] = [
    { label: 'Beranda', href: '/' },
    { label: 'Koleksi', href: '/koleksi' },
    { label: 'Tentang', href: '/tentang' },
    { label: 'Bantuan', href: '/bantuan' },
]

function Navbar({
    variant = 'default',
    links = defaultLinks,
    activeHref,
    loginLabel = 'Masuk',
    className,
    logo,
    buttonClassName,
}: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        if (variant !== 'transparent') return

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [variant])

    const isPrimary = variant === 'primary'
    const isTransparent = variant === 'transparent'
    const isTransparentNotScrolled = isTransparent && !isScrolled
    const isTransparentScrolled = isTransparent && isScrolled

    const navBg = isTransparentNotScrolled
        ? 'bg-transparent'
        : isTransparentScrolled
            ? 'bg-white shadow-md'
            : isPrimary
                ? 'bg-primary'
                : 'border-b border-border bg-white/95 backdrop-blur-sm'

    const lightText = isTransparentNotScrolled || isPrimary
    const brandIconColor = lightText ? 'text-white' : 'text-primary'
    const brandTextColor = lightText ? 'text-white' : 'text-text-primary'

    const mobileBg = isTransparentNotScrolled ? 'bg-primary' : isTransparentScrolled ? 'bg-white border-t border-border' : isPrimary ? 'bg-primary' : 'border-t border-border bg-white'
    const mobileDivider = isTransparent || isPrimary ? 'border-white/10' : 'border-border'
    const burgerColor = isTransparentNotScrolled ? 'text-white' : isTransparentScrolled ? 'text-text-secondary' : isPrimary ? 'text-white' : 'text-text-secondary'
    const burgerHover = isTransparentNotScrolled ? 'hover:bg-white/10' : isTransparentScrolled ? 'hover:bg-gray-100' : isPrimary ? 'hover:bg-white/10' : 'hover:bg-gray-100'

    return (
        <nav
            className={cn(
                'fixed top-0 z-50 w-full transition-all duration-300',
                navBg,
                className,
            )}
        >
            <div className="container-custom flex h-[88px] items-center justify-between">
                <a href="/" className="flex items-center gap-2">
                    {logo || (
                        <>
                            <img src={uadLogo} alt="UAD" className="h-10 w-auto" />
                            <span className={cn('text-xl font-bold', brandTextColor)}>
                                Perpustakaan UAD
                            </span>
                        </>
                    )}
                </a>

                                <div className="hidden items-center gap-10 md:flex">
                                    {links.map((link) => {
                                        const isActive = link.href === activeHref
                                        return (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                className={cn(
                                                    'px-2 py-1 text-base font-medium',
                                    'rounded-lg transition-all duration-300',
                                    isActive && 'font-semibold underline underline-offset-4 decoration-2',
                                    isTransparent
                                        ? isScrolled
                                            ? isActive
                                                ? 'text-primary'
                                                : 'text-text-secondary hover:text-primary hover:underline underline-offset-4 decoration-2'
                                            : isActive
                                                ? 'text-white'
                                                : 'text-white/80 hover:text-white hover:underline underline-offset-4 decoration-2'
                                        : isPrimary
                                            ? isActive
                                                ? 'text-white'
                                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                            : isActive
                                                ? 'text-primary'
                                                : 'text-text-secondary hover:bg-gray-100 hover:text-primary',
                                )}
                            >
                                {link.label}
                            </a>
                        )
                    })}
                </div>

                <div className="hidden items-center gap-4 md:flex">
                    <Button
                        variant={isTransparentScrolled ? 'primary' : isPrimary ? 'secondary' : 'primary'}
                        size="md"
                        className={cn(
                            isTransparentNotScrolled ? 'border-white bg-transparent text-white hover:bg-white/10' : '',
                            buttonClassName,
                        )}
                        onClick={() => (window.location.href = '/login')}
                    >
                        {loginLabel}
                    </Button>
                </div>

                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-lg md:hidden transition-colors',
                        burgerColor,
                        burgerHover,
                    )}
                    aria-label="Toggle navigation menu"
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className={cn('px-4 pb-4 pt-2 md:hidden', mobileBg)}>
                    {links.map((link) => {
                        const isActive = link.href === activeHref
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    'block px-4 py-3 text-base font-medium transition-colors',
                                    isActive && 'font-semibold underline underline-offset-4 decoration-2',
                                    isTransparent
                                        ? isScrolled
                                            ? isActive
                                                ? 'text-primary'
                                                : 'text-text-secondary hover:text-primary hover:underline underline-offset-4 decoration-2'
                                            : isActive
                                                ? 'text-white'
                                                : 'text-white/80 hover:text-white hover:underline underline-offset-4 decoration-2'
                                        : isPrimary
                                            ? isActive
                                                ? 'text-white'
                                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                            : isActive
                                                ? 'text-primary'
                                                : 'text-text-secondary hover:bg-gray-100 hover:text-primary',
                                )}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </a>
                        )
                    })}
                    <div className={cn('mt-3 border-t pt-3', mobileDivider)}>
                        <Button
                            variant={isTransparentScrolled ? 'primary' : isPrimary ? 'secondary' : 'primary'}
                            className={cn(
                                'w-full',
                                isTransparentNotScrolled ? 'border-white/30 bg-white/10 text-white hover:bg-white/20' : '',
                                buttonClassName,
                            )}
                            onClick={() => (window.location.href = '/login')}
                        >
                            {loginLabel}
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    )
}

Navbar.displayName = 'Navbar'

export default Navbar
