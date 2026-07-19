/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react'
import { toast } from 'sonner'
import Toast from '@/components/feedback/Toast'

interface NotificationContextType {
    success: (message: string, description?: string) => void
    error: (message: string, description?: string) => void
    info: (message: string, description?: string) => void
    warning: (message: string, description?: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

function NotificationProvider({ children }: { children: ReactNode }) {
    const success = (message: string, description?: string) => {
        toast.success(message, { description })
    }

    const error = (message: string, description?: string) => {
        toast.error(message, { description })
    }

    const info = (message: string, description?: string) => {
        toast.info(message, { description })
    }

    const warning = (message: string, description?: string) => {
        toast.warning(message, { description })
    }

    return (
        <NotificationContext.Provider value={{ success, error, info, warning }}>
            {children}
            <Toast />
        </NotificationContext.Provider>
    )
}

function useNotification(): NotificationContextType {
    const context = useContext(NotificationContext)
    if (!context) throw new Error('useNotification must be used within a NotificationProvider')
    return context
}

export { NotificationProvider, useNotification }
