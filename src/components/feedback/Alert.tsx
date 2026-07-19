import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface AlertProps {
    variant?: 'success' | 'warning' | 'error' | 'info'
    title?: string
    children: React.ReactNode
    onClose?: () => void
    className?: string
}

const variantConfig = {
    success: {
        icon: CheckCircle2,
        containerClass: 'bg-success/10 border-success/20',
        iconClass: 'text-success',
        titleClass: 'text-success',
    },
    warning: {
        icon: AlertTriangle,
        containerClass: 'bg-warning/10 border-warning/20',
        iconClass: 'text-warning',
        titleClass: 'text-warning',
    },
    error: {
        icon: AlertCircle,
        containerClass: 'bg-danger/10 border-danger/20',
        iconClass: 'text-danger',
        titleClass: 'text-danger',
    },
    info: {
        icon: Info,
        containerClass: 'bg-info/10 border-info/20',
        iconClass: 'text-info',
        titleClass: 'text-info',
    },
}

function Alert({ variant = 'info', title, children, onClose, className }: AlertProps) {
    const config = variantConfig[variant]
    const Icon = config.icon

    return (
        <div
            className={cn(
                'flex items-start gap-3 rounded-[12px] border p-4',
                config.containerClass,
                className,
            )}
            role="alert"
        >
            <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', config.iconClass)} />
            <div className="flex-1">
                {title && (
                    <h5 className={cn('mb-1 text-sm font-semibold', config.titleClass)}>
                        {title}
                    </h5>
                )}
                <div className="text-sm text-text-secondary">{children}</div>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-black/5"
                    aria-label="Close alert"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    )
}

Alert.displayName = 'Alert'

export default Alert
