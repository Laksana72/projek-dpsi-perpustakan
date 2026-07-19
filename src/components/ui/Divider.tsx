import { cn } from '@/utils/cn'

interface DividerProps {
    orientation?: 'horizontal' | 'vertical'
    label?: string
    className?: string
}

function Divider({ orientation = 'horizontal', label, className }: DividerProps) {
    if (orientation === 'vertical') {
        return (
            <div
                className={cn('mx-2 h-full min-h-[16px] w-px bg-border', className)}
                aria-orientation="vertical"
                role="separator"
            />
        )
    }

    if (label) {
        return (
            <div className={cn('flex items-center gap-3', className)} role="separator">
                <div className="flex-1 border-t border-border" />
                <span className="text-xs font-medium text-text-secondary">{label}</span>
                <div className="flex-1 border-t border-border" />
            </div>
        )
    }

    return (
        <div
            className={cn('my-2 h-px w-full bg-border', className)}
            aria-orientation="horizontal"
            role="separator"
        />
    )
}

Divider.displayName = 'Divider'

export default Divider
