import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ChipProps {
    children: React.ReactNode
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
    size?: 'sm' | 'md'
    onRemove?: () => void
    className?: string
}

function Chip({ children, variant = 'default', size = 'md', onRemove, className }: ChipProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200',
                {
                    'bg-gray-100 text-text-secondary': variant === 'default',
                    'bg-primary/10 text-primary': variant === 'primary',
                    'bg-success/10 text-success': variant === 'success',
                    'bg-warning/10 text-warning': variant === 'warning',
                    'bg-danger/10 text-danger': variant === 'danger',
                    'bg-info/10 text-info': variant === 'info',
                },
                {
                    'px-2 py-0.5 text-xs': size === 'sm',
                    'px-3 py-1 text-sm': size === 'md',
                },
                className,
            )}
        >
            {children}
            {onRemove && (
                <button
                    onClick={onRemove}
                    className="ml-0.5 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                    aria-label="Remove"
                >
                    <X className={cn(size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
                </button>
            )}
        </span>
    )
}

Chip.displayName = 'Chip'

export default Chip
