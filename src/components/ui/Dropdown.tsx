import { useState, useRef, useEffect, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface DropdownItem {
    key: string
    label: string
    icon?: ReactNode
    onClick?: () => void
    disabled?: boolean
    divider?: boolean
    variant?: 'default' | 'danger'
}

interface DropdownProps {
    trigger: ReactNode
    items: DropdownItem[]
    align?: 'start' | 'end'
    className?: string
}

function Dropdown({ trigger, items, align = 'start', className }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isOpen])

    return (
        <div ref={dropdownRef} className={cn('relative inline-block', className)}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                {trigger}
            </button>

            {isOpen && (
                <div
                    className={cn(
                        'absolute top-full z-70 mt-1 min-w-[180px] overflow-hidden rounded-[12px] border border-border bg-white py-1 shadow-lg animate-fade-in',
                        align === 'end' ? 'right-0' : 'left-0',
                    )}
                    role="menu"
                >
                    {items.map((item) => (
                        <div key={item.key}>
                            {item.divider && <div className="my-1 h-px bg-border" />}
                            <button
                                type="button"
                                onClick={() => {
                                    item.onClick?.()
                                    setIsOpen(false)
                                }}
                                disabled={item.disabled}
                                className={cn(
                                    'flex w-full items-center gap-2 px-4 py-2 text-sm transition-colors duration-150',
                                    item.variant === 'danger'
                                        ? 'text-danger hover:bg-danger/5'
                                        : 'text-text-primary hover:bg-gray-50',
                                    item.disabled && 'cursor-not-allowed opacity-50',
                                )}
                                role="menuitem"
                            >
                                {item.icon && <span className="h-5 w-5">{item.icon}</span>}
                                {item.label}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

Dropdown.displayName = 'Dropdown'

export default Dropdown
