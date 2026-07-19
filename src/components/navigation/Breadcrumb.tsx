import { ChevronRight, Home } from 'lucide-react'
import { cn } from '@/utils/cn'

interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbProps {
    items: BreadcrumbItem[]
    className?: string
}

function Breadcrumb({ items, className }: BreadcrumbProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1', className)}>
            <a
                href="/dashboard"
                className="flex items-center text-sm text-text-secondary transition-colors hover:text-primary"
            >
                <Home className="h-4 w-4" />
            </a>
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-1">
                    <ChevronRight className="h-4 w-4 text-disabled" />
                    {item.href ? (
                        <a
                            href={item.href}
                            className="text-sm text-text-secondary transition-colors hover:text-primary"
                        >
                            {item.label}
                        </a>
                    ) : (
                        <span className="text-sm font-medium text-text-primary">{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    )
}

Breadcrumb.displayName = 'Breadcrumb'

export default Breadcrumb
