import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ContentContainerProps {
    children: ReactNode
    className?: string
}

function ContentContainer({ children, className }: ContentContainerProps) {
    return (
        <main className={cn('flex-1 p-4 lg:p-8', className)}>
            <div className="mx-auto w-full max-w-[1440px]">{children}</div>
        </main>
    )
}

ContentContainer.displayName = 'ContentContainer'

export default ContentContainer
