
export interface Fighter {
  id: string;
  name: string;
  nickname: string;
  weightClass: string;
  record: {
    wins: number;
    losses: number;
    draws: number;
  };
  rank: number;
  image: string;
  fightingStyle: string;
  stats: {
    striking: number;
    grappling: number;
    stamina: number;
    power: number;
  };
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
