import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface NavbarItemProps {
    label: string
    href?: string
    isActive?: boolean
    icon?: ReactNode
    onClick?: () => void
    className?: string
}

function NavbarItem({
    label,
    href,
    isActive = false,
    icon,
    onClick,
    className,
}: NavbarItemProps) {
    const content = (
        <span
            className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg',
                isActive
                    ? 'text-primary bg-primary/5'
                    : 'text-text-secondary hover:text-primary hover:bg-gray-50',
                className,
            )}
        >
            {icon && <span className="flex h-5 w-5 items-center justify-center">{icon}</span>}
            {label}
        </span>
    )

    if (href) {
        return <a href={href}>{content}</a>
    }

    return (
        <button type="button" onClick={onClick}>
            {content}
        </button>
    )
}

NavbarItem.displayName = 'NavbarItem'

export default NavbarItem
