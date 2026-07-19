import { useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'

function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="mb-2 text-6xl font-bold text-primary">404</h1>
                <h2 className="mb-4 text-2xl font-semibold text-text-primary">Page Not Found</h2>
                <p className="mb-8 text-text-secondary">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Button variant="primary" onClick={() => navigate('/')}>
                    Back to Home
                </Button>
            </div>
        </div>
    )
}

export default NotFoundPage
