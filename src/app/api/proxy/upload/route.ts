import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const BACKEND_URL = (process.env.BACKEND_URL || 'https://cfc-backend-ten.vercel.app').replace(/\/$/, '');

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const cookieStore = await cookies();
        const token = cookieStore.get('cfc_access_token')?.value;

        const response = await fetch(`${BACKEND_URL}/upload/`, {
            method: 'POST',
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            return NextResponse.json({ error: errorText || 'Backend Error' }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
