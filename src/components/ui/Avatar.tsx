import { cn } from '@/utils/cn'

interface AvatarProps {
    src?: string
    alt?: string
    name?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    status?: 'online' | 'offline' | 'away'
    className?: string
}

const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
}

const statusClasses = {
    online: 'bg-success',
    offline: 'bg-disabled',
    away: 'bg-warning',
}

function Avatar({ src, alt = '', name, size = 'md', status, className }: AvatarProps) {
    const initials = name
        ? name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)
        : '?'

    return (
        <div className="relative inline-flex shrink-0">
            <div
                className={cn(
                    'flex items-center justify-center overflow-hidden rounded-full bg-primary/10 font-medium text-primary',
                    sizeClasses[size],
                    className,
                )}
            >
                {src ? (
                    <img src={src} alt={alt} className="h-full w-full object-cover" />
                ) : (
                    <span>{initials}</span>
                )}
            </div>
            {status && (
                <span
                    className={cn(
                        'absolute bottom-0 right-0 block rounded-full ring-2 ring-white',
                        statusClasses[status],
                        size === 'sm' ? 'h-2 w-2' : 'h-3 w-3',
                    )}
                />
            )}
        </div>
    )
}

Avatar.displayName = 'Avatar'

export default Avatar
