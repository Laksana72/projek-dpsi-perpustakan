import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
    if (totalPages <= 1) return null

    const pages: number[] = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }

    return (
        <nav className={cn('flex items-center justify-end gap-1', className)} aria-label="Pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Previous page"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors duration-200',
                        page === currentPage
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:bg-gray-100',
                    )}
                    aria-current={page === currentPage ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors duration-200 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Next page"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
        </nav>
    )
}

Pagination.displayName = 'Pagination'

export default Pagination
