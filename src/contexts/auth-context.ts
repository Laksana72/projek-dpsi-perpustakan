import { createContext } from 'react'
import type { User } from '@/types'

export type AuthUser = User & { role: 'user' | 'admin' }

export interface AuthContextType {
    user: AuthUser | null
    isAuthenticated: boolean
    isAdmin: boolean
    token: string | null
    login: (usernameOrEmail: string, password: string, role?: 'user' | 'admin') => Promise<boolean>
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
