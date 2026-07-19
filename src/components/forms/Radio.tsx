import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
    error?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, error, id, disabled, ...props }, ref) => {
        const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className="flex flex-col gap-1">
                <label
                    htmlFor={inputId}
                    className={cn(
                        'flex cursor-pointer items-center gap-3',
                        disabled && 'cursor-not-allowed opacity-50',
                    )}
                >
                    <div className="relative flex items-center justify-center">
                        <input
                            ref={ref}
                            type="radio"
                            id={inputId}
                            disabled={disabled}
                            className="peer sr-only"
                            {...props}
                        />
                        <div
                            className={cn(
                                'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-border transition-all duration-200',
                                'peer-checked:border-primary',
                                'peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20',
                                error && 'border-danger',
                            )}
                        >
                            <div className="h-2.5 w-2.5 scale-0 rounded-full bg-primary transition-transform duration-200 peer-checked:scale-100" />
                        </div>
                        {label && <span className="text-sm text-text-primary">{label}</span>}
                    </div>
                </label>
                {error && <span className="text-sm text-danger">{error}</span>}
            </div>
        )
    },
)

Radio.displayName = 'Radio'

export default Radio
