import FighterProfile from "@/components/FighterProfile";
import { getFighterById } from "@/lib/api";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    try {
        const fighter = await getFighterById(params.id);

        const record = typeof fighter.record === 'string'
            ? fighter.record
            : `${fighter.record?.wins ?? 0}-${fighter.record?.losses ?? 0}-${fighter.record?.draws ?? 0}`;

        const title = `${fighter.name} "${fighter.nickname || 'The Fighter'}" | CFC Fighter Profile`;
        const description = `${fighter.name} - ${fighter.weight_class} division fighter with a ${record} record. ${fighter.bio ? fighter.bio.substring(0, 150) + '...' : 'Elite MMA athlete competing in the Cage Fighting Championship.'}`;

        return {
            title: fighter.name,
            description,
            openGraph: {
                title,
                description,
                url: `/fighters/${params.id}`,
                type: 'profile',
                images: [
                    {
                        url: fighter.image_url || fighter.image || `/og-fighter-default.jpg`,
                        width: 1200,
                        height: 630,
                        alt: `${fighter.name} - CFC Fighter`,
                    }
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [fighter.image_url || fighter.image || `/og-fighter-default.jpg`],
            },
        };
    } catch (error) {
        return {
            title: "Fighter Profile",
            description: "View fighter profile and stats on Cage Fighting Championship",
        };
    }
}

export default function FighterProfilePage() {
    return <FighterProfile />;
}
