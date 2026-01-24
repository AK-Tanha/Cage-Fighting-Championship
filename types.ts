
export interface Fighter {
  _id: string
  name: string
  weight_class: string
  record: string
  bio: string
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
