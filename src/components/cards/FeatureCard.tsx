import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface FeatureCardProps {
    icon: ReactNode
    title: string
    description: string
    className?: string
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
    return (
        <div
            className={cn(
                'group rounded-[16px] bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lg',
                className,
            )}
        >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-[12px] bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                {icon}
            </div>
            <h5 className="mb-2 text-lg font-semibold text-text-primary">{title}</h5>
            <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
        </div>
    )
}

FeatureCard.displayName = 'FeatureCard'

export default FeatureCard
