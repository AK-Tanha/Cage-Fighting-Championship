import FighterProfile from "@/components/FighterProfile";
import { getFighterById } from "@/lib/api";
import { formatRecord } from "@/types";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    try {
        const { id } = await params;
        const fighter = await getFighterById(id);

        const pi = fighter.personal_info || {}
        const pa = fighter.physical_attributes || {}
        const media = fighter.media || {}
        const career = fighter.career || {}
        const recordStr = formatRecord(fighter.record)

        const title = `${pi.full_name} ${pi.nickname ? `"${pi.nickname}"` : ''} | CFC Fighter Profile`;
        const description = `${pi.full_name} - ${pa.weight_class} division fighter with a ${recordStr} record. ${career.bio ? career.bio.substring(0, 150) + '...' : 'Elite MMA athlete competing in the Cage Fighting Championship.'}`;

        return {
            title: pi.full_name,
            description,
            openGraph: {
                title,
                description,
                url: `/fighters/${id}`,
                type: 'profile',
                images: [
                    {
                        url: media.profile_image || `/og-fighter-default.jpg`,
                        width: 1200,
                        height: 630,
                        alt: `${pi.full_name} - CFC Fighter`,
                    }
                ],
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [media.profile_image || `/og-fighter-default.jpg`],
            },
        };
    } catch (error) {
        return {
            title: "Fighter Profile",
            description: "View fighter profile and stats on Cage Fighting Championship",
        };
    }
}

export default async function FighterProfilePage({ params }: { params: Promise<{ id: string }> }) {
    await params;
    return <FighterProfile />;
}
