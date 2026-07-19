import { cn } from '@/utils/cn'

interface SkeletonProps {
    className?: string
    variant?: 'text' | 'circular' | 'rectangular'
    width?: string | number
    height?: string | number
}

function Skeleton({ className, variant = 'text', width, height }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse bg-gray-200',
                {
                    'h-4 w-full rounded': variant === 'text',
                    'rounded-full': variant === 'circular',
                    'rounded-[16px]': variant === 'rectangular',
                },
                className,
            )}
            style={{ width, height }}
        />
    )
}

Skeleton.displayName = 'Skeleton'

export default Skeleton
