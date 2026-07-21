import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
    requiredRole?: 'user' | 'pustakawan' | 'admin'
}

function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
    const { isAuthenticated, isAdmin, isPustakawan } = useAuth()

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (requiredRole === 'admin' && !isAdmin) {
        return <Navigate to="/dashboard" replace />
    }

    if (requiredRole === 'pustakawan' && !isPustakawan) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}

export default ProtectedRoute
