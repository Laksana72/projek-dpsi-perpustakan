import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string
    error?: string
    helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, id, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label htmlFor={inputId} className="text-sm font-medium text-text-primary">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={inputId}
                    className={cn(
                        'min-h-[120px] w-full rounded-[12px] border bg-white px-4 py-3 text-base text-text-primary placeholder:text-disabled transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-y',
                        error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border',
                        className,
                    )}
                    {...props}
                />
                {error && <span className="text-sm text-danger">{error}</span>}
                {helperText && !error && (
                    <span className="text-sm text-text-secondary">{helperText}</span>
                )}
            </div>
        )
    },
)

Textarea.displayName = 'Textarea'

export default Textarea
