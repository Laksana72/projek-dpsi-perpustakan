import { BookOpen } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface BookCardProps {
    cover?: string
    title: string
    author: string
    category: string
    year?: number
    status: 'Available' | 'Borrowed' | 'Reserved' | 'Lost'
    onDetail?: () => void
    className?: string
}

const statusVariant: Record<string, 'success' | 'danger' | 'warning' | 'default'> = {
    Available: 'success',
    Borrowed: 'danger',
    Reserved: 'warning',
    Lost: 'default',
}

const statusLabel: Record<string, string> = {
    Available: 'Tersedia',
    Borrowed: 'Dipinjam',
    Reserved: 'Reservasi',
    Lost: 'Hilang',
}

function BookCard({ cover, title, author, category, year, status, onDetail, className }: BookCardProps) {
    return (
        <div
            className={cn(
                'group w-full rounded-[16px] bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg',
                className,
            )}
        >
            <div className="mb-4 flex aspect-[3/4] items-center justify-center overflow-hidden rounded-[12px] bg-gray-100">
                {cover ? (
                    <img
                        src={cover}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                ) : (
                    <BookOpen className="h-12 w-12 text-disabled" />
                )}
            </div>
            <h5 className="mb-1 text-sm font-semibold text-text-primary line-clamp-2">{title}</h5>
            <p className="mb-2 text-xs text-text-secondary">{author}</p>
            <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-text-secondary">
                    {category}
                </span>
                {year && (
                    <span className="text-[10px] text-text-secondary">{year}</span>
                )}
            </div>
            <div className="mb-3">
                <Badge variant={statusVariant[status] || 'default'} size="sm">
                    {statusLabel[status] || status}
                </Badge>
            </div>
            <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={onDetail}
            >
                Detail
            </Button>
        </div>
    )
}

BookCard.displayName = 'BookCard'

export default BookCard
