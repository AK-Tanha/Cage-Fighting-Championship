export interface PersonalInfo {
    full_name: string
    nickname?: string
    date_of_birth?: string
    nationality?: string
}

export interface PhysicalAttributes {
    weight_class: string
    weight_kg?: number
    height_cm?: number
    reach_cm?: number
}

export interface YearsActive {
    start?: number
    end?: number
}

export interface Career {
    gym?: string
    styles?: string[]
    bio?: string
    years_active?: YearsActive
}

export interface Record {
    wins: number
    losses: number
    draws: number
    no_contests?: number
}

export interface Stats {
    win_streak: number
    finish_rate?: number
}

export interface Ranking {
    global?: number
    national?: number
}

export interface Media {
    profile_image?: string
    banner_image?: string
}

export interface Fighter {
    _id: string
    personal_info: PersonalInfo
    physical_attributes: PhysicalAttributes
    career?: Career
    record?: Record
    stats?: Stats
    status: string
    ranking?: Ranking
    media?: Media
    last_fights: string[]
    slug?: string
    created_at?: string
    updated_at?: string
}

export interface FighterCreate {
    personal_info: PersonalInfo
    physical_attributes: PhysicalAttributes
    career?: Career
    record?: Record
    status?: string
    ranking?: Ranking
    media?: Media
    slug?: string
}

export interface FighterUpdate {
    personal_info?: PersonalInfo
    physical_attributes?: PhysicalAttributes
    career?: Career
    record?: Record
    stats?: Stats
    status?: string
    ranking?: Ranking
    media?: Media
    last_fights?: string[]
    slug?: string
}

export function formatRecord(record?: Record): string {
    if (!record) return "0-0-0"
    return `${record.wins}-${record.losses}-${record.draws}`
}

export function parseRecord(str: string): Record {
    const parts = str.split("-").map(Number)
    return {
        wins: parts[0] || 0,
        losses: parts[1] || 0,
        draws: parts[2] || 0,
    }
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
