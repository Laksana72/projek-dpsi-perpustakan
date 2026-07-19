import { useState, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface TooltipProps {
    content: ReactNode
    children: ReactNode
    position?: 'top' | 'bottom' | 'left' | 'right'
    className?: string
}

function Tooltip({ content, children, position = 'top', className }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false)

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    }

    return (
        <div
            className="relative inline-flex"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}
            <div
                role="tooltip"
                className={cn(
                    'pointer-events-none absolute z-80 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg transition-all duration-200',
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
                    positionClasses[position],
                    className,
                )}
            >
                {content}
            </div>
        </div>
    )
}

Tooltip.displayName = 'Tooltip'

export default Tooltip
