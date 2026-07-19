import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string
    error?: string
    helperText?: string
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    inputSize?: 'sm' | 'md' | 'lg'
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, id, leftIcon, rightIcon, inputSize = 'md', ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-disabled">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full rounded-[12px] border bg-white text-base text-text-primary placeholder:text-disabled transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
                            error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border',
                            {
                                'h-10 text-sm': inputSize === 'sm',
                                'h-12 text-base': inputSize === 'md',
                                'h-14 text-lg': inputSize === 'lg',
                            },
                            leftIcon && 'pl-10',
                            rightIcon && 'pr-10',
                            className,
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-disabled">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && <span className="text-sm text-danger">{error}</span>}
                {helperText && !error && (
                    <span className="text-sm text-text-secondary">{helperText}</span>
                )}
            </div>
        )
    },
)

Input.displayName = 'Input'

export default Input
