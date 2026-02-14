import Hero from "@/components/Hero";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Experience the ultimate in cage fighting. Watch elite MMA fighters battle for championship glory in the octagon.",
    openGraph: {
        title: "CFC | Cage Fighting Championship - Home",
        description: "Experience the ultimate in cage fighting. Watch elite MMA fighters battle for championship glory in the octagon.",
        url: "/",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Cage Fighting Championship - Elite MMA Competition",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CFC | Cage Fighting Championship - Home",
        description: "Experience the ultimate in cage fighting. Watch elite MMA fighters battle for championship glory in the octagon.",
        images: ["/og-image.jpg"],
    },
};

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SportsOrganization",
                        "name": "Cage Fighting Championship",
                        "alternateName": "CFC",
                        "url": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
                        "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/favicon.ico`,
                        "description": "The global leader in elite MMA competition",
                        "sport": "Mixed Martial Arts",
                        "sameAs": [
                            // Add your social media URLs here
                            // "https://www.facebook.com/CFC",
                            // "https://twitter.com/CFC",
                            // "https://www.instagram.com/CFC",
                        ]
                    })
                }}
            />
            <Hero />
        </>
    );
}
