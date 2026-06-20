import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL!.replace(/\/$/, '');

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('cfc_access_token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: 'No authentication token found' },
                { status: 401 }
            );
        }

        const response = await fetch(`${BACKEND_URL}/auth/me/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to get user info' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message || 'Request failed' },
            { status: 500 }
        );
    }
}
