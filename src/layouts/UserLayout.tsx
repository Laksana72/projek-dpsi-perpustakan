import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    BookOpen,
    BookMarked,
    History,
    Timer,
    User,
    LogOut,
    Sun,
    Moon,
} from 'lucide-react'
import Sidebar from '@/components/navigation/Sidebar'
import SidebarItem from '@/components/navigation/SidebarItem'
import Header from '@/components/layout/Header'
import ContentContainer from '@/components/layout/ContentContainer'
import { useAuth } from '@/hooks/useAuth'
import { useTheme } from '@/contexts/ThemeContext'
import uadLogo from '@/assets/logo/logo-uad.png'

const userMenuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Katalog Buku', icon: BookOpen, path: '/catalog' },
    { label: 'Peminjaman Saya', icon: BookMarked, path: '/borrowings' },
    { label: 'Riwayat', icon: History, path: '/history' },
    { label: 'Denda', icon: Timer, path: '/fine' },
    { label: 'Profil', icon: User, path: '/profile' },
]

const pageTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/catalog': 'Katalog Buku',
    '/borrowings': 'Peminjaman Saya',
    '/history': 'Riwayat',
    '/fine': 'Denda',
    '/profile': 'Profil',
}

function UserLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()

    const currentTitle = pageTitles[location.pathname] || 'Dashboard'

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}>
                <div className="flex flex-col gap-2 p-4">
                    <div className="mb-4 flex items-center gap-3 px-2">
                        <img
                            src={uadLogo}
                            alt="UAD"
                            className="h-10 w-auto"
                        />
                        <span className="text-sm font-semibold leading-tight text-white">
                            Perpustakaan<br />UAD
                        </span>
                    </div>
                    <nav className="flex flex-col gap-1">
                        {userMenuItems.map((item) => (
                            <SidebarItem
                                key={item.path}
                                icon={<item.icon className="h-5 w-5" />}
                                label={item.label}
                                isActive={location.pathname === item.path}
                                onClick={() => {
                                    navigate(item.path)
                                    setSidebarOpen(false)
                                }}
                            />
                        ))}
                    </nav>
                    <div className="mt-auto border-t border-white/10 pt-4">
                        <SidebarItem
                            icon={<LogOut className="h-5 w-5" />}
                            label="Keluar"
                            onClick={handleLogout}
                        />
                    </div>
                </div>
            </Sidebar>

            <div className="flex flex-1 flex-col lg:ml-[260px]">
                <Header
                    title={currentTitle}
                    onMenuToggle={() => setSidebarOpen(true)}
                    userName={user?.name}
                    userAvatar={user?.avatar}
                >
                    <button
                        onClick={toggleTheme}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-gray-100"
                        aria-label={theme === 'light' ? 'Mode Gelap' : 'Mode Terang'}
                    >
                        {theme === 'light' ? (
                            <Moon className="h-5 w-5" />
                        ) : (
                            <Sun className="h-5 w-5" />
                        )}
                    </button>
                </Header>
                <ContentContainer>
                    <Outlet />
                </ContentContainer>
            </div>
        </div>
    )
}

export default UserLayout
