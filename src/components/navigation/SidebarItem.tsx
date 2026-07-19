import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface SidebarItemProps {
    icon?: ReactNode
    label: string
    isActive?: boolean
    onClick?: () => void
    badge?: string | number
    disabled?: boolean
    className?: string
}

function SidebarItem({
    icon,
    label,
    isActive = false,
    onClick,
    badge,
    disabled = false,
    className,
}: SidebarItemProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className={cn(
                'flex h-12 w-full items-center gap-3 rounded-xl px-4 text-sm transition-all duration-200',
                isActive
                    ? 'bg-primary-dark text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white',
                disabled && 'cursor-not-allowed opacity-50',
                className,
            )}
        >
            {icon && (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">{icon}</span>
            )}
            <span className="flex-1 text-left">{label}</span>
            {badge !== undefined && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/20 px-1.5 text-[10px] font-medium text-white">
                    {badge}
                </span>
            )}
        </button>
    )
}

SidebarItem.displayName = 'SidebarItem'

export default SidebarItem
