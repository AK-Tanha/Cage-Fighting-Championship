export interface Fighter {
    _id: string
    name: string
    weight_class: string
    record: string | { wins: number; losses: number; draws: number };
    bio: string
    image?: string;
    nickname?: string;
    rank?: number;
    stats?: {
        striking?: number;
        grappling?: number;
        stamina?: number;
        power?: number;
    };
    fightingStyle?: string;
}

export interface FightEvent {
    id: string;
    title: string;
    date: string;
    location: string;
    mainEvent: string;
    image: string;
    isLive?: boolean;
}

export type View = 'home' | 'fighters' | 'events';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
