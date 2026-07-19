import { AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface ErrorStateProps {
    title?: string
    description?: string
    retryLabel?: string
    onRetry?: () => void
    className?: string
}

function ErrorState({
    title = 'Something went wrong',
    description = 'An error occurred while loading the data. Please try again.',
    retryLabel = 'Try Again',
    onRetry,
    className,
}: ErrorStateProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
            <AlertCircle className="mb-4 h-16 w-16 text-danger" />
            <h4 className="mb-2 text-lg font-semibold text-text-primary">{title}</h4>
            <p className="mb-6 max-w-sm text-sm text-text-secondary">{description}</p>
            {onRetry && (
                <Button variant="primary" onClick={onRetry}>
                    {retryLabel}
                </Button>
            )}
        </div>
    )
}

ErrorState.displayName = 'ErrorState'

export default ErrorState
