/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'
import Spinner from '@/components/feedback/Spinner'

interface LoadingContextType {
    isLoading: boolean
    setLoading: (loading: boolean) => void
    withLoading: <T>(fn: () => Promise<T>) => Promise<T>
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setLoading] = useState(false)

    const withLoading = async <T,>(fn: () => Promise<T>): Promise<T> => {
        setLoading(true)
        try {
            return await fn()
        } finally {
            setLoading(false)
        }
    }

    return (
        <LoadingContext.Provider value={{ isLoading, setLoading, withLoading }}>
            {isLoading && (
                <div
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/20 backdrop-blur-sm"
                    role="alert"
                    aria-busy="true"
                    aria-label="Memuat..."
                >
                    <div className="rounded-[20px] bg-white p-8 shadow-xl">
                        <Spinner size="lg" />
                        <p className="mt-4 text-sm font-medium text-text-secondary">Memuat...</p>
                    </div>
                </div>
            )}
            {children}
        </LoadingContext.Provider>
    )
}

function useLoading(): LoadingContextType {
    const context = useContext(LoadingContext)
    if (!context) throw new Error('useLoading must be used within a LoadingProvider')
    return context
}

export { LoadingProvider, useLoading }
