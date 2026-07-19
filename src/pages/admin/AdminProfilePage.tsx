import { useState, useEffect } from 'react'
import {
    Mail,
    BookOpen,
    MapPin,
    Edit,
    Lock,
} from 'lucide-react'
import { api } from '@/services/api'
import { updateProfile, changePassword } from '@/services/auth.service'
import type { User } from '@/types'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/feedback/Modal'
import Input from '@/components/forms/Input'
import Skeleton from '@/components/feedback/Skeleton'
import ErrorState from '@/components/feedback/ErrorState'

function transformUser(item: Record<string, unknown>): User {
    return {
        id: String(item.id),
        name: item.name as string,
        email: item.email as string,
        nim: (item.nim as string) ?? '',
        programStudi: (item.program_studi as string) ?? '',
        avatar: (item.avatar as string) ?? '',
        role: item.role as User['role'],
        membershipStatus: (item.membership_status as string) ?? '',
        membershipExpiry: (item.membership_expiry as string) ?? '',
    }
}

function AdminProfilePage() {
    const [adminUser, setAdminUser] = useState<User>({} as User)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)
    const [editForm, setEditForm] = useState({ name: '', email: '' })

    useEffect(() => {
        fetchProfile()
    }, [])
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [saving, setSaving] = useState(false)

    const handleEditChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

    const handlePasswordChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

    const handleSaveProfile = async () => {
        setSaving(true)
        try {
            await updateProfile(editForm)
            const res = await api.get<Record<string, unknown>>('/user')
            setAdminUser(transformUser(res))
            setEditModal(false)
        } catch {
            // error handled by api service
        } finally {
            setSaving(false)
        }
    }

    const handleSavePassword = async () => {
        setSaving(true)
        try {
            await changePassword({
                current_password: passwordForm.currentPassword,
                new_password: passwordForm.newPassword,
                new_password_confirmation: passwordForm.confirmPassword,
            })
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
            setPasswordModal(false)
        } catch {
            // error handled by api service
        } finally {
            setSaving(false)
        }
    }

    function fetchProfile() {
        setError(false)
        setLoading(true)
        api.get<Record<string, unknown>>('/user')
            .then((res) => setAdminUser(transformUser(res)))
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }

    const handleRetry = fetchProfile

    if (error) {
        return (
            <div className="animate-fade-in">
                <ErrorState
                    title="Gagal Memuat Data"
                    description="Terjadi kesalahan saat memuat data profil. Silakan coba lagi."
                    retryLabel="Coba Lagi"
                    onRetry={handleRetry}
                />
            </div>
        )
    }

    if (loading) {
        return (
            <div className="animate-fade-in">
                <Skeleton variant="text" className="mb-2 h-8 w-64" />
                <Skeleton variant="text" className="mb-8 h-4 w-96" />
                <div className="mb-6 flex flex-col items-center gap-4">
                    <Skeleton variant="circular" className="h-24 w-24" />
                    <Skeleton variant="text" className="h-6 w-48" />
                    <Skeleton variant="text" className="h-4 w-64" />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} variant="rectangular" className="h-24" />
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Profil Admin</h2>
                <p className="text-text-secondary">
                    Kelola informasi profil admin perpustakaan.
                </p>
            </div>

            <div className="mb-8 flex flex-col items-center gap-4">
                <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100">
                    {adminUser.avatar ? (
                        <img
                            src={adminUser.avatar}
                            alt={adminUser.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-disabled">
                            {adminUser.name.charAt(0)}
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold text-text-primary">{adminUser.name}</h3>
                    <p className="text-sm text-text-secondary">{adminUser.email}</p>
                    <Badge variant="primary" size="sm" className="mt-1">
                        {adminUser.role === 'admin' ? 'Admin' : 'User'}
                    </Badge>
                </div>
            </div>

            <div className="mb-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-[16px] border border-border bg-white p-5 shadow-card">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wider text-disabled">
                        Nama
                    </div>
                    <div className="text-sm font-medium text-text-primary">{adminUser.name}</div>
                </div>
                <div className="rounded-[16px] border border-border bg-white p-5 shadow-card">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wider text-disabled">
                        Email
                    </div>
                    <div className="text-sm font-medium text-text-primary">{adminUser.email}</div>
                </div>
                <div className="rounded-[16px] border border-border bg-white p-5 shadow-card">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wider text-disabled">
                        NIP/NIM
                    </div>
                    <div className="text-sm font-medium text-text-primary">{adminUser.nim}</div>
                </div>
                <div className="rounded-[16px] border border-border bg-white p-5 shadow-card">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wider text-disabled">
                        Program Studi
                    </div>
                    <div className="text-sm font-medium text-text-primary">
                        {adminUser.programStudi}
                    </div>
                </div>
                <div className="rounded-[16px] border border-border bg-white p-5 shadow-card">
                    <div className="mb-1 text-xs font-medium uppercase tracking-wider text-disabled">
                        Status
                    </div>
                    <Badge
                        variant={
                            adminUser.membershipStatus === 'Active' ? 'success' : 'danger'
                        }
                        size="sm"
                    >
                        {adminUser.membershipStatus === 'Active'
                            ? 'Aktif'
                            : adminUser.membershipStatus}
                    </Badge>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                <Button
                    variant="primary"
                    size="md"
                    leftIcon={<Edit className="h-4 w-4" />}
                    onClick={() => {
                        setEditForm({ name: adminUser.name, email: adminUser.email })
                        setEditModal(true)
                    }}
                >
                    Edit Profil
                </Button>
                <Button
                    variant="outline"
                    size="md"
                    leftIcon={<Lock className="h-4 w-4" />}
                    onClick={() => {
                        setPasswordForm({
                            currentPassword: '',
                            newPassword: '',
                            confirmPassword: '',
                        })
                        setPasswordModal(true)
                    }}
                >
                    Ubah Password
                </Button>
            </div>

            <Modal
                isOpen={editModal}
                onClose={() => setEditModal(false)}
                title="Edit Profil"
                size="sm"
            >
                <div className="flex flex-col gap-4">
                    <Input
                        label="Nama"
                        value={editForm.name}
                        onChange={handleEditChange('name')}
                        placeholder="Masukkan nama"
                    />
                    <Input
                        label="Email"
                        type="email"
                        value={editForm.email}
                        onChange={handleEditChange('email')}
                        placeholder="Masukkan email"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" size="md" onClick={() => setEditModal(false)}>
                            Batal
                        </Button>
                        <Button variant="primary" size="md" onClick={handleSaveProfile} disabled={saving}>
                            {saving ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={passwordModal}
                onClose={() => setPasswordModal(false)}
                title="Ubah Password"
                size="sm"
            >
                <div className="flex flex-col gap-4">
                    <Input
                        label="Password Saat Ini"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange('currentPassword')}
                        placeholder="Masukkan password saat ini"
                    />
                    <Input
                        label="Password Baru"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange('newPassword')}
                        placeholder="Masukkan password baru"
                    />
                    <Input
                        label="Konfirmasi Password Baru"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange('confirmPassword')}
                        placeholder="Konfirmasi password baru"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            variant="outline"
                            size="md"
                            onClick={() => setPasswordModal(false)}
                        >
                            Batal
                        </Button>
                        <Button variant="primary" size="md" onClick={handleSavePassword} disabled={saving}>
                            {saving ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default AdminProfilePage
