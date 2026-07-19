export interface Publisher {
    id: string
    name: string
    address: string
    phone: string
    email: string
    bookCount: number
}

export const publishers: Publisher[] = [
    { id: 'pub-1', name: 'Penerbit Teknologi', address: 'Jl. Merdeka No. 45, Jakarta', phone: '021-1234567', email: 'info@penerbitteknologi.com', bookCount: 1 },
    { id: 'pub-2', name: 'Penerbit Ilmu Komputer', address: 'Jl. Sudirman No. 78, Bandung', phone: '022-2345678', email: 'contact@ilkompublisher.com', bookCount: 1 },
    { id: 'pub-3', name: 'Penerbit Data Science', address: 'Jl. Gatot Subroto No. 12, Surabaya', phone: '031-3456789', email: 'hello@datasciencepub.com', bookCount: 1 },
    { id: 'pub-4', name: 'Penerbit Informatika', address: 'Jl. Diponegoro No. 56, Yogyakarta', phone: '0274-4567890', email: 'admin@informatikapub.com', bookCount: 1 },
    { id: 'pub-5', name: 'Penerbit Jaringan', address: 'Jl. Ahmad Yani No. 90, Semarang', phone: '024-5678901', email: 'support@jaringanpub.com', bookCount: 1 },
    { id: 'pub-6', name: 'Penerbit Keamanan', address: 'Jl. Pahlawan No. 34, Medan', phone: '061-6789012', email: 'info@keamananpub.com', bookCount: 1 },
    { id: 'pub-7', name: 'Penerbit DevOps', address: 'Jl. Veteran No. 23, Makassar', phone: '0411-7890123', email: 'contact@devopspub.com', bookCount: 1 },
    { id: 'pub-8', name: 'Penerbit Desain', address: 'Jl. Sumatra No. 67, Denpasar', phone: '0361-8901234', email: 'hello@desainpub.com', bookCount: 1 },
]
