import { lazy } from 'react'
import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import GuestLayout from '@/layouts/GuestLayout'
import UserLayout from '@/layouts/UserLayout'
import AdminLayout from '@/layouts/AdminLayout'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import PublicRoute from '@/components/layout/PublicRoute'

const LandingPage = lazy(() => import('@/pages/landing/LandingPage'))
const CollectionPage = lazy(() => import('@/pages/collection/CollectionPage'))
const AboutPage = lazy(() => import('@/pages/about/AboutPage'))
const HelpPage = lazy(() => import('@/pages/help/HelpPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const DashboardPage = lazy(() => import('@/pages/user/DashboardPage'))
const CatalogPage = lazy(() => import('@/pages/user/CatalogPage'))
const DetailBookPage = lazy(() => import('@/pages/user/DetailBookPage'))
const BorrowingsPage = lazy(() => import('@/pages/user/BorrowingsPage'))
const HistoryPage = lazy(() => import('@/pages/user/HistoryPage'))
const UserFinePage = lazy(() => import('@/pages/user/UserFinePage'))
const ProfilePage = lazy(() => import('@/pages/user/ProfilePage'))
const PustakawanDashboardPage = lazy(() => import('@/pages/pustakawan/PustakawanDashboardPage'))
const ValidasiReservasiPage = lazy(() => import('@/pages/pustakawan/ValidasiReservasiPage'))
const PustakawanLayout = lazy(() => import('@/layouts/PustakawanLayout'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const BookManagementPage = lazy(() => import('@/pages/admin/BookManagementPage'))
const BorrowingManagementPage = lazy(() => import('@/pages/admin/BorrowingManagementPage'))
const ReturnManagementPage = lazy(() => import('@/pages/admin/ReturnManagementPage'))
const AdminHistoryPage = lazy(() => import('@/pages/admin/AdminHistoryPage'))
const AdminProfilePage = lazy(() => import('@/pages/admin/AdminProfilePage'))
const MemberManagementPage = lazy(() => import('@/pages/admin/MemberManagementPage'))
const CategoryManagementPage = lazy(() => import('@/pages/admin/CategoryManagementPage'))
const PublisherManagementPage = lazy(() => import('@/pages/admin/PublisherManagementPage'))
const FineManagementPage = lazy(() => import('@/pages/admin/FineManagementPage'))
const ReportPage = lazy(() => import('@/pages/admin/ReportPage'))
const NotFoundPage = lazy(() => import('@/pages/shared/NotFoundPage'))

const routes: RouteObject[] = [
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            { index: true, element: <LandingPage /> },
            { path: 'koleksi', element: <CollectionPage /> },
            { path: 'tentang', element: <AboutPage /> },
            { path: 'bantuan', element: <HelpPage /> },
            {
                element: <PublicRoute />,
                children: [
                    { path: 'login', element: <LoginPage /> },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/dashboard',
                element: <UserLayout />,
                children: [{ index: true, element: <DashboardPage /> }],
            },
            {
                path: '/catalog',
                element: <UserLayout />,
                children: [{ index: true, element: <CatalogPage /> }],
            },
            {
                path: '/book/:id',
                element: <UserLayout />,
                children: [{ index: true, element: <DetailBookPage /> }],
            },
            {
                path: '/borrowings',
                element: <UserLayout />,
                children: [{ index: true, element: <BorrowingsPage /> }],
            },
            {
                path: '/history',
                element: <UserLayout />,
                children: [{ index: true, element: <HistoryPage /> }],
            },
            {
                path: '/fine',
                element: <UserLayout />,
                children: [{ index: true, element: <UserFinePage /> }],
            },
            {
                path: '/profile',
                element: <UserLayout />,
                children: [{ index: true, element: <ProfilePage /> }],
            },
        ],
    },
    {
        element: <ProtectedRoute requiredRole="admin" />,
        children: [
            {
                path: '/admin/dashboard',
                element: <AdminLayout />,
                children: [{ index: true, element: <AdminDashboardPage /> }],
            },
            {
                path: '/admin/books',
                element: <AdminLayout />,
                children: [{ index: true, element: <BookManagementPage /> }],
            },
            {
                path: '/admin/borrowings',
                element: <AdminLayout />,
                children: [{ index: true, element: <BorrowingManagementPage /> }],
            },
            {
                path: '/admin/returns',
                element: <AdminLayout />,
                children: [{ index: true, element: <ReturnManagementPage /> }],
            },
            {
                path: '/admin/history',
                element: <AdminLayout />,
                children: [{ index: true, element: <AdminHistoryPage /> }],
            },
            {
                path: '/admin/profile',
                element: <AdminLayout />,
                children: [{ index: true, element: <AdminProfilePage /> }],
            },
            {
                path: '/admin/members',
                element: <AdminLayout />,
                children: [{ index: true, element: <MemberManagementPage /> }],
            },
            {
                path: '/admin/categories',
                element: <AdminLayout />,
                children: [{ index: true, element: <CategoryManagementPage /> }],
            },
            {
                path: '/admin/publishers',
                element: <AdminLayout />,
                children: [{ index: true, element: <PublisherManagementPage /> }],
            },
            {
                path: '/admin/fines',
                element: <AdminLayout />,
                children: [{ index: true, element: <FineManagementPage /> }],
            },
            {
                path: '/admin/reports',
                element: <AdminLayout />,
                children: [{ index: true, element: <ReportPage /> }],
            },
        ],
    },
    {
        element: <ProtectedRoute requiredRole="pustakawan" />,
        children: [
            {
                path: '/pustakawan/dashboard',
                element: <PustakawanLayout />,
                children: [{ index: true, element: <PustakawanDashboardPage /> }],
            },
            {
                path: '/pustakawan/reservations',
                element: <PustakawanLayout />,
                children: [{ index: true, element: <ValidasiReservasiPage /> }],
            },
            {
                path: '/pustakawan/books',
                element: <PustakawanLayout />,
                children: [{ index: true, element: <BookManagementPage /> }],
            },
            {
                path: '/pustakawan/borrowings',
                element: <PustakawanLayout />,
                children: [{ index: true, element: <BorrowingManagementPage /> }],
            },
            {
                path: '/pustakawan/returns',
                element: <PustakawanLayout />,
                children: [{ index: true, element: <ReturnManagementPage /> }],
            },
            {
                path: '/pustakawan/profile',
                element: <PustakawanLayout />,
                children: [{ index: true, element: <AdminProfilePage /> }],
            },
        ],
    },
    {
        path: '*',
        element: <NotFoundPage />,
    },
]

const router = createBrowserRouter(routes)

export default router
