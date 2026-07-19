import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import { cn } from '@/utils/cn'

interface ProfileCardProps {
    name: string
    email: string
    avatar?: string
    programStudi?: string
    membershipStatus?: string
    membershipId?: string
    className?: string
}

function ProfileCard({
    name,
    email,
    avatar,
    programStudi,
    membershipStatus = 'Active',
    membershipId,
    className,
}: ProfileCardProps) {
    return (
        <div className={cn('rounded-[16px] bg-white p-6 shadow-card', className)}>
            <div className="flex flex-col items-center text-center">
                <Avatar src={avatar} name={name} size="lg" className="mb-4" />
                <h4 className="text-lg font-semibold text-text-primary">{name}</h4>
                <p className="mb-1 text-sm text-text-secondary">{email}</p>
                {programStudi && (
                    <p className="mb-4 text-xs text-text-secondary">{programStudi}</p>
                )}
                <div className="flex items-center gap-2">
                    <Badge
                        variant={membershipStatus === 'Active' ? 'success' : 'warning'}
                    >
                        {membershipStatus}
                    </Badge>
                    {membershipId && (
                        <span className="text-xs text-text-secondary">ID: {membershipId}</span>
                    )}
                </div>
            </div>
        </div>
    )
}

ProfileCard.displayName = 'ProfileCard'

export default ProfileCard
