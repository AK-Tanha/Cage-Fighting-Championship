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

export interface IndividualFight {
    fighter1: string; // ID
    fighter2: string; // ID
    weight_class: string;
    title_fight?: boolean;
    result?: string;
}

export interface FightEvent {
    _id: string;
    name: string;
    date: string;
    location: string;
    image?: string;
    isLive?: boolean;
    fights?: IndividualFight[];
}

export type View = 'home' | 'fighters' | 'events';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
