export type HabitCategory = 'Health' | 'Productivity' | 'Mindfulness' | 'Personal' | 'Social';

export interface User {
    id: string;
}

export interface Habit {
    id: string;
    name: string;
    description: string;
    category: HabitCategory;
    goal: number; // times per day
    createdAt: string;
}

export interface HabitCardType extends Habit {
    streak: number;
}

// ----- (START) Habit UI DTO ------- //
export interface HabitInfo {
    id: string;
    goal: number;
}

export interface HabitSummary {
    progress: number;
    completed: number;
    activeStreak: number;
}

// ------ (END) Habit UI DTO -------- //

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
