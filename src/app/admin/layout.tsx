import AdminLayoutClient from '@/components/admin/AdminLayoutClient';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react';

export const metadata: Metadata = {
    title: 'Admin Dashboard',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get('cfc_admin_auth')?.value === 'true';

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <AdminLoginForm />
            </div>
        );
    }

    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
