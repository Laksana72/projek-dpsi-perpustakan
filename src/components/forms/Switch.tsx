import { type InputHTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
    label?: string
}

function Switch({ className, label, id, checked, disabled, onChange, ...props }: SwitchProps) {
    const switchId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
        <label
            htmlFor={switchId}
            className={cn(
                'flex cursor-pointer items-center gap-3',
                disabled && 'cursor-not-allowed opacity-50',
                className,
            )}
        >
            <div className="relative">
                <input
                    type="checkbox"
                    id={switchId}
                    checked={checked}
                    disabled={disabled}
                    onChange={onChange}
                    className="peer sr-only"
                    {...props}
                />
                <div
                    className={cn(
                        'h-6 w-11 rounded-full border-2 border-border bg-gray-200 transition-colors duration-200',
                        'peer-checked:border-primary peer-checked:bg-primary',
                        'peer-focus-visible:ring-2 peer-focus-visible:ring-primary/20',
                    )}
                >
                    <div
                        className={cn(
                            'h-5 w-5 translate-x-0 rounded-full bg-white shadow-sm transition-transform duration-200',
                            'peer-checked:translate-x-5',
                        )}
                    />
                </div>
            </div>
            {label && <span className="text-sm text-text-primary">{label}</span>}
        </label>
    )
}

Switch.displayName = 'Switch'

export default Switch
