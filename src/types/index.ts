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
    image_url?: string;
}

export interface FighterCreate {
    _id: string
    name: string
    weight_class: string
    record: string
    nationality: string
    club: string
    date_of_birth: string
    style: string[]
    bio: string
    image_url: string
}

export interface FighterUpdate {
    _id: string
    name: string
    weight_class: string
    record: string
    nationality: string
    club: string
    date_of_birth: string
    style: string[]
    bio: string
    image_url: string
}

export interface IndividualFight {
    fighter1: string; // ID
    fighter2: string; // ID
    weight_class: string;
    title_fight?: boolean;
    result?: string;
}

export interface EventCreate {
    _id: string
    name: string
    date: string
    location: string
    image_url: string
    fights: Fight[]
}

export interface Fight {
    fighter1: string
    fighter2: string
    weight_class: string
    title_fight: boolean
    result: string
}


export interface FightEvent {
    _id: string;
    id?: string;
    name: string;
    date: string;
    location: string;
    image?: string;
    isLive?: boolean;
    status?: string;
    fights?: IndividualFight[];
}

export type View = 'home' | 'fighters' | 'events';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}
