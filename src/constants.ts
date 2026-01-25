import { Fighter, FightEvent } from './types/index';

export const FIGHTERS: Fighter[] = [
    {
        _id: '1',
        name: 'Alex Silva',
        nickname: 'The Titan',
        weight_class: 'Lightweight',
        record: { wins: 18, losses: 2, draws: 0 },
        rank: 1,
        image: 'https://picsum.photos/seed/fighter1/600/800',
        fightingStyle: 'Muay Thai',
        stats: { striking: 95, grappling: 70, stamina: 85, power: 90 },
        bio: ''
    },
    {
        _id: '2',
        name: 'Jaxson Forge',
        nickname: 'Iron',
        weight_class: 'Lightweight',
        record: { wins: 15, losses: 4, draws: 1 },
        rank: 3,
        image: 'https://picsum.photos/seed/fighter2/600/800',
        fightingStyle: 'Brazilian Jiu-Jitsu',
        stats: { striking: 65, grappling: 98, stamina: 88, power: 75 },
        bio: ''
    },
    {
        _id: '3',
        name: 'Marcus "Viper" Vance',
        nickname: 'Viper',
        weight_class: 'Welterweight',
        record: { wins: 22, losses: 0, draws: 0 },
        rank: 1,
        image: 'https://picsum.photos/seed/fighter3/600/800',
        fightingStyle: 'Wrestling',
        stats: { striking: 75, grappling: 92, stamina: 95, power: 82 },
        bio: ''
    },
    {
        _id: '4',
        name: 'Lena "Storm" Richter',
        nickname: 'Storm',
        weight_class: 'Bantamweight',
        record: { wins: 14, losses: 1, draws: 0 },
        rank: 2,
        image: 'https://picsum.photos/seed/fighter4/600/800',
        fightingStyle: 'Kickboxing',
        stats: { striking: 92, grappling: 60, stamina: 80, power: 85 },
        bio: ''
    },
    {
        _id: '5',
        name: 'Dante King',
        nickname: 'The Reaper',
        weight_class: 'Heavyweight',
        record: { wins: 10, losses: 2, draws: 0 },
        rank: 4,
        image: 'https://picsum.photos/seed/fighter5/600/800',
        fightingStyle: 'Boxing',
        stats: { striking: 88, grappling: 50, stamina: 65, power: 99 },
        bio: ''
    }
];

export const EVENTS: FightEvent[] = [
    {
        id: 'cfc-101',
        title: 'CFC 101: SILVA vs FORGE',
        date: '2024-12-15T20:00:00',
        location: 'Las Vegas, NV',
        mainEvent: 'Alex Silva vs Jaxson Forge',
        image: 'https://picsum.photos/seed/event1/1200/600',
        isLive: true
    },
    {
        id: 'cfc-102',
        title: 'CFC 102: CHAMPIONS NIGHT',
        date: '2025-01-20T19:00:00',
        location: 'Miami, FL',
        mainEvent: 'Marcus Vance vs TBA',
        image: 'https://picsum.photos/seed/event2/1200/600'
    },
    {
        id: 'cfc-fight-night',
        title: 'CFC Fight Night: TOKYO',
        date: '2025-02-10T18:00:00',
        location: 'Tokyo, Japan',
        mainEvent: 'Richter vs Tanaka',
        image: 'https://picsum.photos/seed/event3/1200/600'
    }
];
