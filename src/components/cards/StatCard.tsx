import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface StatCardProps {
    icon?: ReactNode
    title: string
    value: string | number
    description?: string
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
    trend?: 'up' | 'down'
    trendValue?: string
    className?: string
}

const variantStyles = {
    default: { iconBg: 'bg-gray-100', iconColor: 'text-text-secondary' },
    primary: { iconBg: 'bg-primary/10', iconColor: 'text-primary' },
    success: { iconBg: 'bg-success/10', iconColor: 'text-success' },
    warning: { iconBg: 'bg-warning/10', iconColor: 'text-warning' },
    danger: { iconBg: 'bg-danger/10', iconColor: 'text-danger' },
    info: { iconBg: 'bg-info/10', iconColor: 'text-info' },
}

function StatCard({
    icon,
    title,
    value,
    description,
    variant = 'default',
    trend,
    trendValue,
    className,
}: StatCardProps) {
    const styles = variantStyles[variant]

    return (
        <div className={cn('rounded-[16px] bg-white p-6 shadow-card', className)}>
            <div className="flex items-start justify-between">
                {icon && (
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', styles.iconBg)}>
                        <span className={cn('h-8 w-8', styles.iconColor)}>{icon}</span>
                    </div>
                )}
                {trend && trendValue && (
                    <span
                        className={cn(
                            'flex items-center gap-1 text-xs font-medium',
                            trend === 'up' ? 'text-success' : 'text-danger',
                        )}
                    >
                        {trend === 'up' ? '\u2191' : '\u2193'} {trendValue}
                    </span>
                )}
            </div>
            <div className="mt-4">
                <p className="text-sm text-text-secondary">{title}</p>
                <p className="mt-1 text-2xl font-bold text-text-primary">{value}</p>
                {description && (
                    <p className="mt-1 text-xs text-text-secondary">{description}</p>
                )}
            </div>
        </div>
    )
}

StatCard.displayName = 'StatCard'

export default StatCard
