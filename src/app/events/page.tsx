import Events from "@/components/Events";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Events",
    description: "Upcoming CFC events, fight cards, and championship battles. Don't miss the action - see when and where the world's best fighters compete.",
    openGraph: {
        title: "CFC Events - Upcoming Fights & Championships",
        description: "Upcoming CFC events, fight cards, and championship battles. Don't miss the action in the octagon.",
        url: "/events",
        images: [
            {
                url: "/og-events.jpg",
                width: 1200,
                height: 630,
                alt: "CFC Events - Upcoming Fights",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "CFC Events - Upcoming Fights & Championships",
        description: "Upcoming CFC events, fight cards, and championship battles. Don't miss the action in the octagon.",
        images: ["/og-events.jpg"],
    },
};

export default function EventsPage() {
    return <Events />;
}
