import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function PublicRoute() {
    const { isAuthenticated, isAdmin, isPustakawan, user } = useAuth()

    if (isAuthenticated) {
        if (isAdmin) return <Navigate to="/admin/dashboard" replace />
        if (isPustakawan) return <Navigate to="/pustakawan/dashboard" replace />
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}

export default PublicRoute
