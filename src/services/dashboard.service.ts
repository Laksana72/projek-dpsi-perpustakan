import { api } from './api'

export async function getAdminDashboard(): Promise<Record<string, unknown>> {
    const response = await api.get<Record<string, unknown>>('/dashboard/admin')
    return response
}

export async function getUserDashboard(): Promise<Record<string, unknown>> {
    const response = await api.get<Record<string, unknown>>('/dashboard/user')
    return response
}
