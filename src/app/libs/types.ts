export type HabitCategory = 'Health' | 'Productivity' | 'Mindfulness' | 'Personal' | 'Social';

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Habit {
    id: string;
    name: string;
    category: HabitCategory;
    goal: number; // times per day
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
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface HabitWeekSummary {
    periodStart: string;
    periodEnd: string;
    summary: string;
}

export interface ProfileSummary {
    summary: string;
    updatedAt: string;
}

export enum Tab {
    DASHBOARD = '/dashboard',
    DAILY = '/daily',
    MANAGE = '/manage',
    REVIEW = '/review',
    CHAT = '/chatbot'
}
