import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BookOpen, Eye, EyeOff, LogIn, User, Shield, BookMarked } from 'lucide-react'
import Card from '@/components/cards/Card'
import Input from '@/components/forms/Input'
import Checkbox from '@/components/forms/Checkbox'
import Button from '@/components/ui/Button'
import Alert from '@/components/feedback/Alert'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/utils/cn'

const loginSchema = z.object({
    username: z.string().min(1, 'Username wajib diisi.'),
    password: z.string().min(1, 'Password wajib diisi.'),
})

type LoginFormData = z.infer<typeof loginSchema>

function LoginPage() {
    const { login } = useAuth()
    const [role, setRole] = useState<'user' | 'pustakawan' | 'admin'>('user')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [rememberMe, setRememberMe] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        setError(null)
        setIsLoading(true)
        try {
            const success = await login(data.username, data.password, role)
            if (!success) {
                setError(
                    role === 'admin'
                        ? 'Login admin gagal. Periksa kembali username dan password.'
                        : role === 'pustakawan'
                            ? 'Login pustakawan gagal. Periksa kembali username dan password.'
                            : 'Username atau password salah.',
                )
            }
        } catch {
            setError('Terjadi kesalahan. Silakan coba lagi.')
        } finally {
            setIsLoading(false)
        }
    }

    const roleLabel = role === 'admin' ? 'Admin' : 'Mahasiswa / User'

    return (
        <section className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/80 to-primary">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1600&q=80')",
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 w-full px-4 py-12">
                <Card
                    variant="elevated"
                    padding="lg"
                    className="mx-auto w-full animate-fade-in sm:w-[420px]"
                >
                    <div className="mb-8 flex flex-col items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <BookOpen className="h-8 w-8 text-primary" />
                        </div>

                        <h2 className="mb-1 text-[28px] font-bold text-text-primary">
                            Selamat Datang
                        </h2>
                        <p className="text-text-secondary">
                            Silakan login untuk mengakses layanan perpustakaan.
                        </p>
                    </div>

                    <div className="mb-6 flex rounded-lg bg-gray-100 p-1">
                        <button
                            type="button"
                            onClick={() => setRole('user')}
                            className={cn(
                                'flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200',
                                role === 'user'
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-text-secondary hover:text-text-primary',
                            )}
                        >
                            <User className="h-4 w-4" />
                            Mahasiswa
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('pustakawan')}
                            className={cn(
                                'flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200',
                                role === 'pustakawan'
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-text-secondary hover:text-text-primary',
                            )}
                        >
                            <BookMarked className="h-4 w-4" />
                            Pustakawan
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            className={cn(
                                'flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-all duration-200',
                                role === 'admin'
                                    ? 'bg-white text-primary shadow-sm'
                                    : 'text-text-secondary hover:text-text-primary',
                            )}
                        >
                            <Shield className="h-4 w-4" />
                            Admin
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <Input
                            label="Username atau Email"
                            placeholder="Masukkan Username atau Email"
                            error={errors.username?.message}
                            {...register('username')}
                        />

                        <div className="relative">
                            <Input
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Masukkan Password"
                                error={errors.password?.message}
                                {...register('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-[38px] flex items-center justify-center text-disabled transition-colors hover:text-text-secondary"
                                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                tabIndex={-1}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <Checkbox
                                label="Ingat Saya"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <button
                                type="button"
                                className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                                tabIndex={-1}
                            >
                                Lupa Password?
                            </button>
                        </div>

                        {error && (
                            <Alert variant="error" onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            isLoading={isLoading}
                            rightIcon={<LogIn className="h-5 w-5" />}
                        >
                            Masuk
                        </Button>
                    </form>
                </Card>
            </div>
        </section>
    )
}

export default LoginPage
