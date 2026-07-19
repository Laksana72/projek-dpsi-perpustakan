import { type ReactNode } from 'react'
import { Menu, Bell, Search } from 'lucide-react'
import Avatar from '@/components/ui/Avatar'
import { cn } from '@/utils/cn'

interface HeaderProps {
    title?: string
    onMenuToggle?: () => void
    showSearch?: boolean
    searchValue?: string
    onSearchChange?: (value: string) => void
    notificationCount?: number
    userAvatar?: string
    userName?: string
    children?: ReactNode
    className?: string
}

function Header({
    title,
    onMenuToggle,
    showSearch,
    searchValue,
    onSearchChange,
    notificationCount,
    userAvatar,
    userName,
    children,
    className,
}: HeaderProps) {
    return (
        <header
            className={cn(
                'sticky top-0 z-30 flex h-[72px] items-center justify-between gap-4 bg-white px-4 shadow-sm lg:px-8',
                className,
            )}
        >
            <div className="flex items-center gap-4">
                {onMenuToggle && (
                    <button
                        onClick={onMenuToggle}
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary hover:bg-gray-100 lg:hidden"
                        aria-label="Toggle menu"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                )}
                {title && (
                    <h1 className="text-lg font-semibold text-text-primary lg:text-xl">
                        {title}
                    </h1>
                )}
            </div>

            <div className="flex items-center gap-3">
                {showSearch && (
                    <div className="relative hidden md:block">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-disabled" />
                        <input
                            type="text"
                            value={searchValue || ''}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            placeholder="Search..."
                            className="h-10 w-[200px] rounded-lg border border-border bg-white pl-9 pr-3 text-sm text-text-primary placeholder:text-disabled transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 lg:w-[320px]"
                        />
                    </div>
                )}

                <button
                    className="relative flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary hover:bg-gray-100"
                    aria-label="Notifications"
                >
                    <Bell className="h-5 w-5" />
                    {notificationCount && notificationCount > 0 ? (
                        <span className="absolute right-2 top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
                            {notificationCount > 99 ? '99+' : notificationCount}
                        </span>
                    ) : null}
                </button>

                {userName && (
                    <div className="flex items-center gap-2">
                        <Avatar
                            src={userAvatar}
                            name={userName}
                            size="sm"
                        />
                        <span className="hidden text-sm font-medium text-text-primary md:block">
                            {userName}
                        </span>
                    </div>
                )}

                {children}
            </div>
        </header>
    )
}

Header.displayName = 'Header'

export default Header
