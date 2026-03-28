import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BACKEND_URL = (process.env.BACKEND_URL || 'https://cfc-backend-ten.vercel.app').replace(/\/$/, '');

export async function POST(request: Request) {
    try {
        let loginData: URLSearchParams;
        const contentType = request.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            const body = await request.json();
            loginData = new URLSearchParams();
            loginData.append('username', body.username || '');
            loginData.append('password', body.password || '');
        } else {
            // Parse FormData
            const formData = await request.formData();
            loginData = new URLSearchParams(formData as any);
        }

        const response = await fetch(`${BACKEND_URL}/auth/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: loginData.toString(),
            cache: 'no-store'
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json(
                { error: errorText || 'Authentication failed' },
                { status: response.status }
            );
        }

        const data = await response.json();
        
        // Set access token cookie
        if (data.access_token) {
            const cookieStore = await cookies();
            cookieStore.set('cfc_access_token', data.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            });
        }

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Login failed' },
            { status: 500 }
        );
    }
}
