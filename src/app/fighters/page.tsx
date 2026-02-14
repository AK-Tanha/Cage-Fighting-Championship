import Fighters from "@/components/Fighters";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fighters",
    description: "Meet the elite fighters of CFC. Browse profiles, stats, records, and highlights of the world's best MMA athletes competing in the octagon.",
    openGraph: {
        title: "CFC Fighters - Elite MMA Athletes",
        description: "Meet the elite fighters of CFC. Browse profiles, stats, records, and highlights of the world's best MMA athletes.",
        url: "/fighters",
        images: [
            {
                url: "/og-fighters.jpg",
                width: 1200,
                height: 630,
                alt: "CFC Fighters - Elite MMA Athletes",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CFC Fighters - Elite MMA Athletes",
        description: "Meet the elite fighters of CFC. Browse profiles, stats, records, and highlights of the world's best MMA athletes.",
        images: ["/og-fighters.jpg"],
    },
};

export default function FightersPage() {
    return <Fighters />;
}
