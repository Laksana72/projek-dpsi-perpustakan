import { forwardRef, type SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SelectOption {
    value: string
    label: string
    disabled?: boolean
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string
    error?: string
    options: SelectOption[]
    placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, label, error, options, placeholder, id, ...props }, ref) => {
        const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

        return (
            <div className="flex flex-col gap-1.5">
                {label && (
                    <label htmlFor={selectId} className="text-sm font-medium text-text-primary">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        id={selectId}
                        className={cn(
                            'h-12 w-full appearance-none rounded-[12px] border bg-white px-4 pr-10 text-base text-text-primary transition-all duration-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50',
                            error ? 'border-danger focus:border-danger focus:ring-danger/20' : 'border-border',
                            className,
                        )}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled>
                                {placeholder}
                            </option>
                        )}
                        {options.map((option) => (
                            <option key={option.value} value={option.value} disabled={option.disabled}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
                </div>
                {error && <span className="text-sm text-danger">{error}</span>}
            </div>
        )
    },
)

Select.displayName = 'Select'

export default Select
