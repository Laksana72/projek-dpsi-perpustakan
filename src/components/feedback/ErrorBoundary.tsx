import { Component, type ReactNode, type ErrorInfo } from 'react'
import Button from '@/components/ui/Button'

interface ErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught:', error, errorInfo)
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) return this.props.fallback

            return (
                <div className="flex min-h-[400px] items-center justify-center p-8">
                    <div className="max-w-md text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-danger/10">
                                <svg
                                    className="h-10 w-10 text-danger"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold text-text-primary">
                            Terjadi Kesalahan
                        </h2>
                        <p className="mb-6 text-text-secondary">
                            Maaf, terjadi kesalahan yang tidak terduga. Silakan muat ulang halaman.
                        </p>
                        <div className="flex justify-center gap-3">
                            <Button variant="primary" onClick={this.handleReset}>
                                Muat Ulang
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.location.href = '/'}
                            >
                                Beranda
                            </Button>
                        </div>
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <pre className="mt-6 overflow-auto rounded-lg bg-gray-100 p-4 text-left text-xs text-text-secondary">
                                {this.state.error.message}
                                {this.state.error.stack}
                            </pre>
                        )}
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
