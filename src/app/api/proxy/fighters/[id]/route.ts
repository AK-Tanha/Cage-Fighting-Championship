import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'https://cfc-backend-ten.vercel.app';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Remove trailing slash for ID routes if backend is strict
        const response = await fetch(`${BACKEND_URL}/fighters/${id}`, {
            headers: { 'Accept': 'application/json' },
            cache: 'no-store'
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Backend returned ${response.status}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
