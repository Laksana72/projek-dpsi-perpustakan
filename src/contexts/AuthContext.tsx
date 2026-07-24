import { useState, useEffect, type ReactNode } from 'react'
import { loginService, logoutService } from '@/services/auth.service'
import { AuthContext } from './auth-context'
import type { AuthUser } from './auth-context'

export type { AuthContextType } from './auth-context'

const STORAGE_KEY_USER = 'library_user'
const STORAGE_KEY_TOKEN = 'token'

function loadStoredUser(): AuthUser | null {
    try {
        const stored = localStorage.getItem(STORAGE_KEY_USER)
        if (stored) return JSON.parse(stored) as AuthUser
    } catch {
        localStorage.removeItem(STORAGE_KEY_USER)
    }
    return null
}

function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(loadStoredUser)
    const [token, setToken] = useState<string | null>(() => {
        return loadStoredUser() ? localStorage.getItem(STORAGE_KEY_TOKEN) : null
    })

    useEffect(() => {
        if (user && token) {
            localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user))
            localStorage.setItem(STORAGE_KEY_TOKEN, token)
        } else {
            localStorage.removeItem(STORAGE_KEY_USER)
            localStorage.removeItem(STORAGE_KEY_TOKEN)
        }
    }, [user, token])

    const login = async (
        usernameOrEmail: string,
        password: string,
        role?: 'user' | 'pustakawan' | 'admin',
    ): Promise<boolean> => {
        const result = await loginService(usernameOrEmail, password)
        if (!result.success || !result.user || !result.token) return false

        const authUser = result.user as AuthUser
        if (role && authUser.role !== role) return false

        setUser(authUser)
        setToken(result.token)
        localStorage.setItem(STORAGE_KEY_TOKEN, result.token)
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(authUser))
        return true
    }

    const logout = () => {
        logoutService()
        setUser(null)
        setToken(null)
        localStorage.removeItem(STORAGE_KEY_USER)
        localStorage.removeItem(STORAGE_KEY_TOKEN)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isAdmin: user?.role === 'admin',
                isPustakawan: user?.role === 'pustakawan',
                token,
                login,
                logout,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
