import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
    error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
                            type="checkbox"
                            id={inputId}
                            disabled={disabled}
                            className="peer sr-only"
                            {...props}
                        />
                        <div
                            className={cn(
                                'flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-2 border-border transition-all duration-200',
                                'peer-checked:border-primary peer-checked:bg-primary',
                                'peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20',
                                error && 'border-danger',
                            )}
                        >
                            <svg
                                className="h-3 w-3 scale-0 text-white transition-transform duration-200 peer-checked:scale-100"
                                viewBox="0 0 12 12"
                                fill="none"
                            >
                                <path
                                    d="M2.5 6L5 8.5L9.5 3.5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        {label && <span className="text-sm text-text-primary">{label}</span>}
                    </div>
                </label>
                {error && <span className="text-sm text-danger">{error}</span>}
            </div>
        )
    },
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
