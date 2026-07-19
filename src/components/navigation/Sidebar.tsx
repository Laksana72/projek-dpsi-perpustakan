import { type ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/utils/cn'

interface SidebarProps {
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    className?: string
}

function Sidebar({ children, isOpen = true, onClose, className }: SidebarProps) {
    useEffect(() => {
        const isMobile = window.innerWidth < 1024
        if (isOpen && isMobile) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen])

    return (
        <>
            <aside
                className={cn(
                    'fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col bg-primary transition-transform duration-300',
                    'max-lg:fixed max-lg:z-50',
                    isOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-full',
                    'lg:translate-x-0',
                    className,
                )}
            >
                <div className="flex items-center justify-between p-4 lg:hidden">
                    <span className="text-lg font-semibold text-white">Menu</span>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10"
                            aria-label="Close sidebar"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    )}
                </div>
                {children}
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}
        </>
    )
}

Sidebar.displayName = 'Sidebar'

export default Sidebar
