import { useContext } from 'react'
import { AuthContext } from '@/contexts/auth-context'
import type { AuthContextType } from '@/contexts/auth-context'

function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export { useAuth }
