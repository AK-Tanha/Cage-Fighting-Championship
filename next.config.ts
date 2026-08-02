import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        qualities: [75, 80, 90, 100],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "1xqqldzervmhzdjz.public.blob.vercel-storage.com",
            },
        ],
    },
};

export default nextConfig;
