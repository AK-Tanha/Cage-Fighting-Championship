export interface Fighter {
    _id: string
    name: string
    nick_name?: string
    weight_class: string
    weight_class_history?: string[]
    record: string
    nationality?: string
    club?: string
    date_of_birth?: string
    style?: string[]
    bio?: string
    image_url?: string
}

export interface FighterCreate {
    name: string
    weight_class: string
    record: string
    nationality?: string
    club?: string
    date_of_birth?: string
    style?: string[]
    bio?: string
    image_url?: string
}

export interface FighterUpdate {
    name?: string
    weight_class?: string
    weight_class_history?: string[]
    record?: string
    nationality?: string
    club?: string
    date_of_birth?: string
    style?: string[]
    bio?: string
    image_url?: string
}

export interface Referee {
    _id: string
    name: string
    record: string
    nationality?: string
    date_of_birth?: string
    bio?: string
    image_url?: string
}

export interface RefereeCreate {
    name: string
    record: string
    nationality?: string
    date_of_birth?: string
    bio?: string
    image_url?: string
}

export interface RefereeUpdate {
    name?: string
    record?: string
    nationality?: string
    date_of_birth?: string
    bio?: string
    image_url?: string
}

export interface Fight {
    fighter1: string
    fighter2: string
    referee?: string
    weight_class: string
    weight_limit_lbs?: number
    title_fight?: boolean
    title_name?: string
    is_main_event?: boolean
    is_co_main_event?: boolean
    rounds?: number
    round_time_minutes?: number
    is_championship_rounds?: boolean
    result?: string
    winner_id?: string
    method?: "KO/TKO" | "Submission" | "Decision" | "Disqualification" | "No Contest" | "Draw"
    round_ended?: number
    time_ended?: string
    order?: number
    fight_type?: "Professional" | "Amateur" | "Exhibition"
}

export interface FightEvent {
    _id: string
    name: string
    subtitle?: string
    date: string
    location: string
    image_url?: string
    fights?: Fight[]
}

export interface FightEventCreate {
    name: string
    subtitle?: string
    date: string
    location: string
    image_url?: string
    fights?: Fight[]
}

export interface FightRecord {
    event_id: string
    event_name: string
    event_date: string
    event_location?: string
    opponent_id: string
    opponent_name: string
    opponent_image?: string
    weight_class: string
    is_title_fight: boolean
    title_name?: string
    result?: "win" | "loss"
    method?: string
    round_ended?: number
    time_ended?: string
    is_main_event: boolean
    is_co_main_event: boolean
    fight_type?: string
    fight_order: number
}

export interface FighterProfile extends Fighter {
    latest_fight?: FightRecord
    upcoming_fight?: FightRecord
    events?: FightEvent[]
}

export interface HeroSlide {
    _id: string
    image_url: string
    title?: string
    subtitle?: string
    link?: string
    is_active: boolean
    order: number
}

export interface HeroSlideCreate {
    image_url: string
    title?: string
    subtitle?: string
    link?: string
    is_active?: boolean
    order?: number
}

export type View = 'home' | 'fighters' | 'events'

export interface ChatMessage {
    role: 'user' | 'model'
    text: string
}