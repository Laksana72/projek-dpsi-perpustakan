import { cn } from '@/utils/cn'

interface ProgressItem {
    label: string
    value: number
    total: number
    color: string
}

interface ProgressCardProps {
    title?: string
    items: ProgressItem[]
    className?: string
}

function ProgressCard({ title, items, className }: ProgressCardProps) {
    return (
        <div className={cn('rounded-[16px] bg-white p-6 shadow-card', className)}>
            {title && (
                <h4 className="mb-4 text-lg font-semibold text-text-primary">{title}</h4>
            )}
            <div className="space-y-4">
                {items.map((item) => {
                    const percentage = item.total > 0 ? Math.round((item.value / item.total) * 100) : 0
                    return (
                        <div key={item.label}>
                            <div className="mb-1.5 flex items-center justify-between">
                                <span className="text-sm font-medium text-text-primary">
                                    {item.label}
                                </span>
                                <span className="text-sm text-text-secondary">
                                    {item.value} ({percentage}%)
                                </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className={cn('h-full rounded-full transition-all duration-500', item.color)}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

ProgressCard.displayName = 'ProgressCard'

export default ProgressCard
