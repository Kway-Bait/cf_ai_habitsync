import { Habit, Entry } from '@/app/libs/types';

export const chatWithAI = async (
    message: string,
    habits: Habit[],
    entries: Entry[],
    history: { role: 'user' | 'model', content: string }[]
) => {
    return "This is a response";
};

