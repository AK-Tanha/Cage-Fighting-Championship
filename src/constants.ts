import { Fighter, FightEvent } from './types/index';

export const FIGHTERS: Fighter[] = [
    {
        _id: '1',
        name: 'Alex Silva',
        nick_name: 'The Titan',
        weight_class: 'Lightweight',
        weight_class_history: [],
        record: '18-2-0',
        image_url: 'https://picsum.photos/seed/fighter1/600/800',
        style: ['Muay Thai'],
        bio: '',
        nationality: 'Brazil',
        club: 'Silva MMA',
        date_of_birth: '1990-01-15'
    },
    {
        _id: '2',
        name: 'Jaxson Forge',
        nick_name: 'Iron',
        weight_class: 'Lightweight',
        weight_class_history: [],
        record: '15-4-1',
        image_url: 'https://picsum.photos/seed/fighter2/600/800',
        style: ['Brazilian Jiu-Jitsu'],
        bio: '',
        nationality: 'USA',
        club: 'Forge Gym',
        date_of_birth: '1992-03-22'
    },
    {
        _id: '3',
        name: 'Marcus "Viper" Vance',
        nick_name: 'Viper',
        weight_class: 'Welterweight',
        weight_class_history: [],
        record: '22-0-0',
        image_url: 'https://picsum.photos/seed/fighter3/600/800',
        style: ['Wrestling'],
        bio: '',
        nationality: 'USA',
        club: 'Viper Wrestling Academy',
        date_of_birth: '1991-07-10'
    },
    {
        _id: '4',
        name: 'Lena "Storm" Richter',
        nick_name: 'Storm',
        weight_class: 'Bantamweight',
        weight_class_history: [],
        record: '14-1-0',
        image_url: 'https://picsum.photos/seed/fighter4/600/800',
        style: ['Kickboxing'],
        bio: '',
        nationality: 'Germany',
        club: 'Storm Gym',
        date_of_birth: '1993-05-30'
    },
    {
        _id: '5',
        name: 'Dante King',
        nick_name: 'The Reaper',
        weight_class: 'Heavyweight',
        weight_class_history: [],
        record: '10-2-0',
        image_url: 'https://picsum.photos/seed/fighter5/600/800',
        style: ['Boxing'],
        bio: '',
        nationality: 'USA',
        club: 'King Boxing',
        date_of_birth: '1988-12-05'
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
