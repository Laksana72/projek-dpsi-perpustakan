import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

function PublicRoute() {
    const { isAuthenticated, isAdmin } = useAuth()

    if (isAuthenticated) {
        return <Navigate to={isAdmin ? '/admin/dashboard' : '/dashboard'} replace />
    }

    return <Outlet />
}

export default PublicRoute
