import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites() {
        const apiUrl = (process.env.NEXT_PUBLIC_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
        return [
            {
                source: '/api/fighters/:path*',
                destination: `${apiUrl}/fighters/:path*`,
            },
            {
                source: '/api/events/:path*',
                destination: `${apiUrl}/events/:path*`,
            },
        ];
    },
};


export default nextConfig;
