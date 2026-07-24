import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { BookOpen, CheckCircle2, Clock, Wallet, Edit3, Lock, LogOut, Mail, Phone, MapPin, GraduationCap, Building, User, Hash, Calendar, Camera } from 'lucide-react'
import { getProfile } from '@/services/profile.service'
import { getAllBorrowings } from '@/services/borrowing.service'
import { updateProfile, changePassword, uploadAvatar } from '@/services/auth.service'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import type { Profile, Borrowing } from '@/types'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import StatCard from '@/components/cards/StatCard'
import Modal from '@/components/feedback/Modal'
import Input from '@/components/forms/Input'
import Skeleton from '@/components/feedback/Skeleton'
import EmptyState from '@/components/feedback/EmptyState'
import ErrorState from '@/components/feedback/ErrorState'

const membershipBadge: Record<string, 'success' | 'danger'> = {
    Active: 'success',
    Expired: 'danger',
}

function ProfilePage() {
    const navigate = useNavigate()
    const { logout, setUser } = useAuth()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [borrowings, setBorrowings] = useState<Borrowing[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [logoutModal, setLogoutModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)
    const [editForm, setEditForm] = useState({ name: '', email: '', nim: '', programStudi: '' })
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        setLoading(true)
        Promise.all([getProfile(), getAllBorrowings()])
            .then(([profileData, borrowingsData]) => {
                setProfile(profileData)
                setBorrowings(borrowingsData)
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, [])

    const currentlyBorrowed = useMemo(() => {
        return borrowings.filter((b) => b.status !== 'Returned').length
    }, [borrowings])

    const handleRetry = () => {
        setError(false)
        setLoading(true)
        setTimeout(() => setLoading(false), 500)
    }

    const handleLogout = () => {
        setLogoutModal(false)
        logout()
        navigate('/')
    }

    const handleEditChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

    const handlePasswordChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm((prev) => ({ ...prev, [field]: e.target.value }))
    }

    const handleSaveProfile = async () => {
        if (!profile) return
        setSaving(true)
        try {
            await updateProfile(editForm)
            const refreshed = await getProfile()
            setProfile(refreshed)
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
                <Skeleton variant="text" className="mb-2 h-8 w-48" />
                <Skeleton variant="text" className="mb-8 h-4 w-72" />
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <Skeleton variant="rectangular" className="h-96" />
                    <div className="space-y-6 lg:col-span-2">
                        <Skeleton variant="rectangular" className="h-48" />
                        <div className="grid gap-6 sm:grid-cols-2">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} variant="rectangular" className="h-32" />
                            ))}
                        </div>
                        <Skeleton variant="rectangular" className="h-24" />
                    </div>
                </div>
            </div>
        )
    }

    if (!profile) {
        return (
            <div className="animate-fade-in">
                <EmptyState
                    title="Data profil tidak tersedia"
                    description="Data profil pengguna tidak dapat ditemukan."
                    actionLabel="Refresh"
                    onAction={handleRetry}
                />
            </div>
        )
    }

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h2 className="mb-1 text-2xl font-bold text-text-primary">Profil Saya</h2>
                <p className="text-text-secondary">
                    Lihat informasi akun dan keanggotaan perpustakaan.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <div className="rounded-[16px] bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-md">
                        <div className="mb-6 flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <Avatar
                                    src={profile.user.avatar}
                                    name={profile.user.name}
                                    size="xl"
                                />
                                <button
                                    onClick={() => document.getElementById('upload-avatar')?.click()}
                                    className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white shadow-md transition-colors hover:bg-primary/90"
                                    aria-label="Upload foto profil"
                                >
                                    <Camera className="h-4 w-4" />
                                </button>
                                <input
                                    id="upload-avatar"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0]
                                        if (!file) return
                                        try {
                                            await uploadAvatar(file)
                                            toast.success('Foto profil berhasil diperbarui')
                                            const refreshed = await getProfile()
                                            setProfile(refreshed)
                                            setUser(refreshed.user)
                                        } catch {
                                            toast.error('Gagal upload foto')
                                        }
                                        e.target.value = ''
                                    }}
                                />
                            </div>
                            <h3 className="text-xl font-bold text-text-primary">{profile.user.name}</h3>
                            <Badge variant="primary" size="sm" className="mt-1">
                                {profile.membership.id}
                            </Badge>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-disabled" />
                                <div>
                                    <p className="text-xs text-text-secondary">Email</p>
                                    <p className="text-sm text-text-primary">{profile.user.email}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-disabled" />
                                <div>
                                    <p className="text-xs text-text-secondary">Nomor Telepon</p>
                                    <p className="text-sm text-text-primary">{profile.phoneNumber || '-'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-disabled" />
                                <div>
                                    <p className="text-xs text-text-secondary">Program Studi</p>
                                    <p className="text-sm text-text-primary">{profile.user.programStudi}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Building className="mt-0.5 h-5 w-5 shrink-0 text-disabled" />
                                <div>
                                    <p className="text-xs text-text-secondary">Fakultas</p>
                                    <p className="text-sm text-text-primary">{profile.faculty || '-'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-disabled" />
                                <div>
                                    <p className="text-xs text-text-secondary">Alamat</p>
                                    <p className="text-sm text-text-primary">{profile.address || '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:col-span-2">
                    <div className="rounded-[16px] bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-md">
                        <h4 className="mb-4 text-lg font-semibold text-text-primary">
                            Informasi Keanggotaan
                        </h4>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="flex items-start gap-3">
                                <Hash className="mt-0.5 h-5 w-5 shrink-0 text-disabled" />
                                <div>
                                    <p className="text-xs text-text-secondary">Nomor Anggota</p>
                                    <p className="text-sm font-medium text-text-primary">{profile.membership.id}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <User className="mt-0.5 h-5 w-5 shrink-0 text-disabled" />
                                <div>
                                    <p className="text-xs text-text-secondary">Jenis Anggota</p>
                                    <p className="text-sm font-medium text-text-primary">{profile.membership.type}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-disabled" />
                                <div>
                                    <p className="text-xs text-text-secondary">Tanggal Bergabung</p>
                                    <p className="text-sm font-medium text-text-primary">
                                        {new Date(profile.membership.startDate).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-disabled" />
                                <div>
                                    <p className="text-xs text-text-secondary">Masa Berlaku</p>
                                    <p className="text-sm font-medium text-text-primary">
                                        {new Date(profile.membership.expiryDate).toLocaleDateString('id-ID')}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Badge
                                    variant={membershipBadge[profile.membership.status] || 'success'}
                                    size="md"
                                >
                                    {profile.membership.status === 'Active' ? 'Aktif' : 'Kedaluwarsa'}
                                </Badge>
                                <div>
                                    <p className="text-xs text-text-secondary">Status Keanggotaan</p>
                                    <p className="text-sm font-medium text-text-primary">
                                        {profile.membership.status}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 text-lg font-semibold text-text-primary">
                            Statistik Peminjaman
                        </h4>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <StatCard
                                icon={<BookOpen className="h-8 w-8" />}
                                title="Total Dipinjam"
                                value={profile.statistics.totalBorrowed}
                                description="Total buku dipinjam"
                                variant="primary"
                            />
                            <StatCard
                                icon={<Clock className="h-8 w-8" />}
                                title="Sedang Dipinjam"
                                value={currentlyBorrowed}
                                description="Buku dalam peminjaman"
                                variant="warning"
                            />
                            <StatCard
                                icon={<CheckCircle2 className="h-8 w-8" />}
                                title="Sudah Dikembalikan"
                                value={profile.statistics.totalReturned}
                                description="Telah dikembalikan"
                                variant="success"
                            />
                            <StatCard
                                icon={<Wallet className="h-8 w-8" />}
                                title="Total Denda"
                                value={`Rp${profile.statistics.totalFines.toLocaleString('id-ID')}`}
                                description="Akumulasi denda"
                                variant="danger"
                            />
                        </div>
                    </div>

                    <div className="rounded-[16px] bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-md">
                        <h4 className="mb-4 text-lg font-semibold text-text-primary">
                            Pengaturan Akun
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            <Button
                                variant="primary"
                                size="md"
                                leftIcon={<Edit3 className="h-5 w-5" />}
                                onClick={() => {
                                    setEditForm({
                                        name: profile.user.name,
                                        email: profile.user.email,
                                        nim: profile.user.nim,
                                        programStudi: profile.user.programStudi,
                                    })
                                    setEditModal(true)
                                }}
                                aria-label="Edit profil"
                            >
                                Edit Profil
                            </Button>
                            <Button
                                variant="outline"
                                size="md"
                                leftIcon={<Lock className="h-5 w-5" />}
                                onClick={() => {
                                    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
                                    setPasswordModal(true)
                                }}
                                aria-label="Ubah password"
                            >
                                Ubah Password
                            </Button>
                            <Button
                                variant="outline"
                                size="md"
                                leftIcon={<LogOut className="h-5 w-5" />}
                                onClick={() => setLogoutModal(true)}
                                aria-label="Keluar"
                            >
                                Keluar
                            </Button>
                        </div>
                    </div>
                </div>
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
                    <Input
                        label="NIM"
                        value={editForm.nim}
                        onChange={handleEditChange('nim')}
                        placeholder="Masukkan NIM"
                    />
                    <Input
                        label="Program Studi"
                        value={editForm.programStudi}
                        onChange={handleEditChange('programStudi')}
                        placeholder="Masukkan program studi"
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
                        placeholder="Masukkan password baru (min. 6 karakter)"
                    />
                    <Input
                        label="Konfirmasi Password Baru"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange('confirmPassword')}
                        placeholder="Konfirmasi password baru"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                        <Button variant="outline" size="md" onClick={() => setPasswordModal(false)}>
                            Batal
                        </Button>
                        <Button variant="primary" size="md" onClick={handleSavePassword} disabled={saving}>
                            {saving ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={logoutModal}
                onClose={() => setLogoutModal(false)}
                title="Konfirmasi Keluar"
                size="sm"
                footer={
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            size="md"
                            onClick={() => setLogoutModal(false)}
                        >
                            Batal
                        </Button>
                        <Button
                            variant="danger"
                            size="md"
                            onClick={handleLogout}
                        >
                            Keluar
                        </Button>
                    </div>
                }
            >
                <p className="text-sm text-text-secondary">
                    Apakah Anda yakin ingin keluar dari akun ini?
                </p>
            </Modal>
        </div>
    )
}

export default ProfilePage
