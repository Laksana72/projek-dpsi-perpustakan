import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    footer?: ReactNode
    size?: 'sm' | 'md' | 'lg' | 'xl'
    closeOnOverlayClick?: boolean
    className?: string
}

function Modal({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    closeOnOverlayClick = true,
    className,
}: ModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = ''
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-black/50 animate-fade-in"
                onClick={closeOnOverlayClick ? onClose : undefined}
                aria-hidden="true"
            />
            <div
                className={cn(
                    'relative z-10 w-full animate-scale-in rounded-[20px] bg-white shadow-xl',
                    {
                        'max-w-sm': size === 'sm',
                        'max-w-md': size === 'md',
                        'max-w-lg': size === 'lg',
                        'max-w-xl': size === 'xl',
                    },
                    className,
                )}
                role="dialog"
                aria-modal="true"
            >
                {title && (
                    <div className="flex items-center justify-between border-b border-border px-6 py-4">
                        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-gray-100"
                            aria-label="Close modal"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
                {!title && (
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-gray-100"
                        aria-label="Close modal"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
                <div className="px-6 py-4">{children}</div>
                {footer && (
                    <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}

Modal.displayName = 'Modal'

export default Modal
