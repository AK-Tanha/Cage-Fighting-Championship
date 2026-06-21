import { Fighter, FightEvent } from './types/index';

export const FIGHTERS: Fighter[] = [
    {
        _id: '1',
        personal_info: {
            full_name: 'Alex Silva',
            nickname: 'The Titan',
            nationality: 'Brazil',
            date_of_birth: '1990-01-15',
        },
        physical_attributes: {
            weight_class: 'Lightweight',
        },
        career: {
            gym: 'Silva MMA',
            styles: ['Muay Thai'],
        },
        record: { wins: 18, losses: 2, draws: 0 },
        status: 'active',
        media: {
            profile_image: 'https://picsum.photos/seed/fighter1/600/800',
        },
        last_fights: [],
    },
    {
        _id: '2',
        personal_info: {
            full_name: 'Jaxson Forge',
            nickname: 'Iron',
            nationality: 'USA',
            date_of_birth: '1992-03-22',
        },
        physical_attributes: {
            weight_class: 'Lightweight',
        },
        career: {
            gym: 'Forge Gym',
            styles: ['Brazilian Jiu-Jitsu'],
        },
        record: { wins: 15, losses: 4, draws: 1 },
        status: 'active',
        media: {
            profile_image: 'https://picsum.photos/seed/fighter2/600/800',
        },
        last_fights: [],
    },
    {
        _id: '3',
        personal_info: {
            full_name: 'Marcus "Viper" Vance',
            nickname: 'Viper',
            nationality: 'USA',
            date_of_birth: '1991-07-10',
        },
        physical_attributes: {
            weight_class: 'Welterweight',
        },
        career: {
            gym: 'Viper Wrestling Academy',
            styles: ['Wrestling'],
        },
        record: { wins: 22, losses: 0, draws: 0 },
        status: 'active',
        media: {
            profile_image: 'https://picsum.photos/seed/fighter3/600/800',
        },
        last_fights: [],
    },
    {
        _id: '4',
        personal_info: {
            full_name: 'Lena "Storm" Richter',
            nickname: 'Storm',
            nationality: 'Germany',
            date_of_birth: '1993-05-30',
        },
        physical_attributes: {
            weight_class: 'Bantamweight',
        },
        career: {
            gym: 'Storm Gym',
            styles: ['Kickboxing'],
        },
        record: { wins: 14, losses: 1, draws: 0 },
        status: 'active',
        media: {
            profile_image: 'https://picsum.photos/seed/fighter4/600/800',
        },
        last_fights: [],
    },
    {
        _id: '5',
        personal_info: {
            full_name: 'Dante King',
            nickname: 'The Reaper',
            nationality: 'USA',
            date_of_birth: '1988-12-05',
        },
        physical_attributes: {
            weight_class: 'Heavyweight',
        },
        career: {
            gym: 'King Boxing',
            styles: ['Boxing'],
        },
        record: { wins: 10, losses: 2, draws: 0 },
        status: 'active',
        media: {
            profile_image: 'https://picsum.photos/seed/fighter5/600/800',
        },
        last_fights: [],
    }
];

export const EVENTS: FightEvent[] = [
    {
        _id: 'cfc-101',
        name: 'CFC 101: SILVA vs FORGE',
        subtitle: 'Championship Bout',
        date: '2024-12-15T20:00:00',
        location: 'Las Vegas, NV',
        image_url: 'https://picsum.photos/seed/event1/1200/600',
        fights: []
    },
    {
        _id: 'cfc-102',
        name: 'CFC 102: CHAMPIONS NIGHT',
        subtitle: 'Multiple Title Fights',
        date: '2025-01-20T19:00:00',
        location: 'Miami, FL',
        image_url: 'https://picsum.photos/seed/event2/1200/600',
        fights: []
    },
    {
        _id: 'cfc-fight-night',
        name: 'CFC Fight Night: TOKYO',
        subtitle: 'International Showcase',
        date: '2025-02-10T18:00:00',
        location: 'Tokyo, Japan',
        image_url: 'https://picsum.photos/seed/event3/1200/600',
        fights: []
    }
];
