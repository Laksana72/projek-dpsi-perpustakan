import { Inbox } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface EmptyStateProps {
    title?: string
    description?: string
    actionLabel?: string
    onAction?: () => void
    className?: string
}

function EmptyState({
    title = 'No data found',
    description = 'There is no data to display at the moment.',
    actionLabel,
    onAction,
    className,
}: EmptyStateProps) {
    return (
        <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
            <Inbox className="mb-4 h-16 w-16 text-disabled" />
            <h4 className="mb-2 text-lg font-semibold text-text-primary">{title}</h4>
            <p className="mb-6 max-w-sm text-sm text-text-secondary">{description}</p>
            {actionLabel && onAction && (
                <Button variant="primary" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}

EmptyState.displayName = 'EmptyState'

export default EmptyState
