import Avatar from '@/components/ui/Avatar'
import { cn } from '@/utils/cn'

interface ActivityCardProps {
    avatar?: string
    name: string
    action: string
    time: string
    className?: string
}

function ActivityCard({ avatar, name, action, time, className }: ActivityCardProps) {
    return (
        <div className={cn('flex items-start gap-3', className)}>
            <Avatar src={avatar} name={name} size="sm" className="mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
                <p className="text-sm text-text-primary">
                    <span className="font-medium">{name}</span>
                    {' '}{action}
                </p>
                <p className="mt-0.5 text-xs text-text-secondary">{time}</p>
            </div>
        </div>
    )
}

ActivityCard.displayName = 'ActivityCard'

export default ActivityCard
