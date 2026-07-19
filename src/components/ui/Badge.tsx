import { cn } from '@/utils/cn'

interface BadgeProps {
    variant?: 'success' | 'danger' | 'warning' | 'info' | 'default' | 'primary'
    size?: 'sm' | 'md'
    outline?: boolean
    children: React.ReactNode
    className?: string
}

function Badge({
    variant = 'default',
    size = 'md',
    outline = false,
    children,
    className,
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center rounded-full font-medium',
                {
                    'px-2 py-0.5 text-[10px]': size === 'sm',
                    'px-3 py-0.5 text-xs': size === 'md',
                },
                outline
                    ? 'border bg-transparent'
                    : {
                          'bg-success/10 text-success': variant === 'success',
                          'bg-danger/10 text-danger': variant === 'danger',
                          'bg-warning/10 text-warning': variant === 'warning',
                          'bg-info/10 text-info': variant === 'info',
                          'bg-gray-100 text-text-secondary': variant === 'default',
                          'bg-primary/10 text-primary': variant === 'primary',
                      },
                outline && {
                    'border-success text-success': variant === 'success',
                    'border-danger text-danger': variant === 'danger',
                    'border-warning text-warning': variant === 'warning',
                    'border-info text-info': variant === 'info',
                    'border-border text-text-secondary': variant === 'default',
                    'border-primary text-primary': variant === 'primary',
                },
                className,
            )}
        >
            {children}
        </span>
    )
}

Badge.displayName = 'Badge'

export default Badge
