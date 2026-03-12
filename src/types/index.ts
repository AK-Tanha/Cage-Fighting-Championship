export interface Fighter {
    _id: string
    name: string
    weight_class: string
    record: string | {
        wins?: number;
        losses?: number;
        draws?: number;
    };
    nationality?: any
    club?: any
    date_of_birth?: any
    style?: any
    bio?: string
    image_url?: string
    image?: string;
    nickname?: string;
    rank?: number;
    fightingStyle?: string;
    stats?: {
        striking?: number;
        grappling?: number;
        stamina?: number;
        power?: number;
    };
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
    image?: string;
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
    image?: string;
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
    image_url?: string;
    isLive?: boolean;
    status?: string;
    fights?: IndividualFight[];
}

export type View = 'home' | 'fighters' | 'events';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

export interface HeroSlide {
    _id: string,
    image_url: string,
    title: string,
    subtitle: string,
    link: string,
    is_active: boolean,
    order: number
}