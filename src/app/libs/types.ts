export type HabitCategory = 'Health' | 'Productivity' | 'Mindfulness' | 'Personal' | 'Social';

export interface Habit {
    id: string;
    name: string;
    description: string;
    category: HabitCategory;
    goal: number; // times per day
    streak: number;
    icon: string;
    createdAt: string;
}

export interface Entry {
    habitId: string;
    date: string; // ISO string (YYYY-MM-DD)
    count: number;
}

export interface Message {
    role: 'user' | 'model';
    content: string;
    timestamp: Date;
}

export enum Tab {
    DASHBOARD = '/dashboard',
    DAILY = '/daily',
    REVIEW = '/review',
    CHAT = '/chatbot'
}
