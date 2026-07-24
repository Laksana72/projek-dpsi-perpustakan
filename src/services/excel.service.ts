import { api } from './api'

export function exportBooks() {
    window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/export/books?token=${localStorage.getItem('token')}`, '_blank')
}

export function exportMembers() {
    window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/export/members?token=${localStorage.getItem('token')}`, '_blank')
}

export function exportBorrowings() {
    window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/export/borrowings?token=${localStorage.getItem('token')}`, '_blank')
}

export function exportReturns() {
    window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/export/returns?token=${localStorage.getItem('token')}`, '_blank')
}

export function exportFines() {
    window.open(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/export/fines?token=${localStorage.getItem('token')}`, '_blank')
}

export async function importBooks(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/import/books`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({ message: 'Gagal mengimpor' }))
        throw new Error(err.message || 'Gagal mengimpor')
    }
    return response.json()
}

export async function importMembers(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const token = localStorage.getItem('token')
    const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000/api'}/import/members`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: formData,
    })
    if (!response.ok) {
        const err = await response.json().catch(() => ({ message: 'Gagal mengimpor' }))
        throw new Error(err.message || 'Gagal mengimpor')
    }
    return response.json()
}
