import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from '@/contexts/AuthContext'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { LoadingProvider } from '@/contexts/LoadingContext'
import { NotificationProvider } from '@/contexts/NotificationContext'
import ErrorBoundary from '@/components/feedback/ErrorBoundary'
import Spinner from '@/components/feedback/Spinner'
import router from '@/router'

function App() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <AuthProvider>
                    <LoadingProvider>
                        <NotificationProvider>
                            <Suspense
                                fallback={
                                    <div className="flex min-h-screen items-center justify-center bg-background">
                                        <Spinner size="lg" />
                                    </div>
                                }
                            >
                                <RouterProvider router={router} />
                            </Suspense>
                            <Toaster
                                position="top-right"
                                richColors
                                closeButton
                            />
                        </NotificationProvider>
                    </LoadingProvider>
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundary>
    )
}

export default App
