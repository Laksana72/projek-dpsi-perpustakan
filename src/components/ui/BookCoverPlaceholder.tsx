import { BookOpen } from 'lucide-react'

const gradients = [
    'from-blue-500 to-cyan-400',
    'from-purple-500 to-pink-400',
    'from-emerald-500 to-teal-400',
    'from-orange-500 to-red-400',
    'from-indigo-500 to-violet-400',
    'from-rose-500 to-pink-400',
    'from-amber-500 to-yellow-400',
    'from-teal-500 to-emerald-400',
    'from-sky-500 to-blue-400',
    'from-fuchsia-500 to-purple-400',
]

function hashColor(title: string): string {
    let hash = 0
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash)
    }
    return gradients[Math.abs(hash) % gradients.length]
}

function initials(title: string): string {
    return title
        .split(' ')
        .map((w) => w[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase()
}

interface Props {
    title: string
    className?: string
}

function BookCoverPlaceholder({ title, className = '' }: Props) {
    return (
        <div
            className={`flex items-center justify-center bg-gradient-to-br ${hashColor(title)} ${className}`}
        >
            <span className="select-none text-2xl font-bold text-white/90 drop-shadow-sm">
                {initials(title) || <BookOpen className="h-8 w-8 text-white/70" />}
            </span>
        </div>
    )
}

export default BookCoverPlaceholder
