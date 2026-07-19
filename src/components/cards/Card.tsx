import { type HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: 'default' | 'outlined' | 'elevated' | 'interactive'
    padding?: 'none' | 'sm' | 'md' | 'lg'
}

function Card({ className, variant = 'default', padding = 'md', children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-[16px] bg-white transition-all duration-200',
                {
                    'shadow-card': variant === 'default',
                    'border border-border shadow-none': variant === 'outlined',
                    'shadow-lg': variant === 'elevated',
                    'shadow-card cursor-pointer hover:-translate-y-0.5 hover:shadow-lg': variant === 'interactive',
                },
                {
                    'p-0': padding === 'none',
                    'p-4': padding === 'sm',
                    'p-6': padding === 'md',
                    'p-8': padding === 'lg',
                },
                className,
            )}
            {...props}
        >
            {children}
        </div>
    )
}

Card.displayName = 'Card'

export default Card
