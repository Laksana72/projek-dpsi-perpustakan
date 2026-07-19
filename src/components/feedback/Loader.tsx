import { cn } from '@/utils/cn'

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

function Loader({ size = 'md', className }: LoaderProps) {
    return (
        <div className={cn('flex items-center justify-center p-8', className)}>
            <div
                className={cn(
                    'animate-spin rounded-full border-2 border-border border-t-primary',
                    {
                        'h-6 w-6': size === 'sm',
                        'h-10 w-10': size === 'md',
                        'h-14 w-14': size === 'lg',
                    },
                )}
            />
        </div>
    )
}

Loader.displayName = 'Loader'

export default Loader
