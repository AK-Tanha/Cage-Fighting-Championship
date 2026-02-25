import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://cfc-backend-ten.vercel.app';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Login with backend
        const searchParams = new URLSearchParams();
        searchParams.append('username', email);
        searchParams.append('password', password);

        const response = await fetch(`${BACKEND_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: searchParams.toString(),
            cache: 'no-store'
        });

        if (response.ok) {
            const data = await response.json();
            const cookieStore = await cookies();

            // Set layout admin auth check cookie
            cookieStore.set('cfc_admin_auth', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 // 1 day
            });

            if (data.access_token) {
                cookieStore.set('cfc_access_token', data.access_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 60 * 60 * 24 // 1 day
                });
            }

            return NextResponse.json({ success: true });
        } else {
            const errorData = await response.json().catch(() => ({}));
            return NextResponse.json(
                { success: false, message: errorData.detail || 'Invalid credentials' },
                { status: response.status === 401 || response.status === 422 ? response.status : 401 }
            );
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
