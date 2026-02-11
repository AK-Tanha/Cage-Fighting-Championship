import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
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
