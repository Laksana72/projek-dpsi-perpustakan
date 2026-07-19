import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface QuickActionCardProps {
    icon: ReactNode
    title: string
    onClick?: () => void
    className?: string
}

function QuickActionCard({ icon, title, onClick, className }: QuickActionCardProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                'flex items-center gap-4 rounded-[16px] bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
                className,
            )}
            aria-label={title}
        >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] bg-primary/10 text-primary">
                {icon}
            </div>
            <span className="text-left text-sm font-semibold text-text-primary">{title}</span>
        </button>
    )
}

QuickActionCard.displayName = 'QuickActionCard'

export default QuickActionCard
