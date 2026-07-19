import { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    BookOpen,
    BookMarked,
    RefreshCw,
    History,
    User,
    Users,
    FolderTree,
    Building2,
    Wallet,
    FileBarChart,
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

const adminMenuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Kelola Buku', icon: BookOpen, path: '/admin/books' },
    { label: 'Anggota', icon: Users, path: '/admin/members' },
    { label: 'Kategori', icon: FolderTree, path: '/admin/categories' },
    { label: 'Penerbit', icon: Building2, path: '/admin/publishers' },
    { label: 'Data Peminjaman', icon: BookMarked, path: '/admin/borrowings' },
    { label: 'Data Pengembalian', icon: RefreshCw, path: '/admin/returns' },
    { label: 'Denda', icon: Wallet, path: '/admin/fines' },
    { label: 'Laporan', icon: FileBarChart, path: '/admin/reports' },
    { label: 'Riwayat', icon: History, path: '/admin/history' },
    { label: 'Profil', icon: User, path: '/admin/profile' },
]

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()

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
                        {adminMenuItems.map((item) => (
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
                    title=""
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

export default AdminLayout
