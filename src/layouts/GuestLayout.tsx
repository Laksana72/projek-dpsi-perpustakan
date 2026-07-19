import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const guestPages = ['/', '/koleksi', '/tentang', '/bantuan']

function GuestLayout() {
    const location = useLocation()
    const isGuestPage = guestPages.includes(location.pathname)

    return (
        <div className="flex min-h-screen flex-col bg-background">
            {!isGuestPage && <Navbar variant="default" />}
            <main className={isGuestPage ? '' : 'flex-1'}>
                <Outlet />
            </main>
            {!isGuestPage && <Footer variant="default" />}
        </div>
    )
}

export default GuestLayout
