import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'ghost' | 'outline'
    size?: 'sm' | 'md' | 'lg'
    isLoading?: boolean
    fullWidth?: boolean
    leftIcon?: ReactNode
    rightIcon?: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading,
            fullWidth,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    'inline-flex items-center justify-center gap-2 rounded-[12px] font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]',
                    {
                        'bg-primary text-white hover:bg-primary/90': variant === 'primary',
                        'border border-primary bg-white text-primary hover:bg-primary/5': variant === 'secondary',
                        'border border-border bg-white text-text-primary hover:bg-gray-50': variant === 'outline',
                        'bg-danger text-white hover:bg-danger/90': variant === 'danger',
                        'bg-success text-white hover:bg-success/90': variant === 'success',
                        'bg-transparent text-text-secondary hover:bg-gray-100': variant === 'ghost',
                    },
                    {
                        'h-10 px-4 text-sm': size === 'sm',
                        'h-12 px-6 text-base': size === 'md',
                        'h-14 px-8 text-lg': size === 'lg',
                    },
                    fullWidth && 'w-full',
                    className,
                )}
                {...props}
            >
                {isLoading ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                    <>
                        {leftIcon && <span className="flex shrink-0 items-center">{leftIcon}</span>}
                        {children}
                        {rightIcon && <span className="flex shrink-0 items-center">{rightIcon}</span>}
                    </>
                )}
            </button>
        )
    },
)

Button.displayName = 'Button'

export default Button
