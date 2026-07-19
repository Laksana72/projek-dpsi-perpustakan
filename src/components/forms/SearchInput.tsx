import { forwardRef } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
    disabled?: boolean
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
    ({ value, onChange, placeholder = 'Search...', className, disabled }, ref) => {
        return (
            <div className={cn('relative w-full max-w-[320px]', className)}>
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-disabled" />
                <input
                    ref={ref}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        'h-12 w-full rounded-[12px] border border-border bg-white pl-10 pr-4 text-base text-text-primary placeholder:text-disabled transition-all duration-200',
                        'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                    )}
                />
            </div>
        )
    },
)

SearchInput.displayName = 'SearchInput'

export default SearchInput
