'use server';

import { dbGetHabits } from '@/app/libs/db/habit';
import { dbGetEntries } from '@/app/libs/db/entry';
import { dbCreateMessage, dbGetMessages } from '@/app/libs/db/messages';
import { dbGetProfileSummary } from '@/app/libs/db/profile-summary';
import { dbGetHabitSummaries } from '@/app/libs/db/habit-summary';

import { calculateRecentPerformance } from '@/app/libs/utils/habit-utils';
import { chatWithAIService } from '@/app/services/chatbot-service';
import { Message } from '@/app/libs/types';
import { refresh } from 'next/cache';

export async function fetchMessages({
    userId,
} : {
    userId: string,
}): Promise<Message[]> {
    const data = await dbGetMessages({ userId, numberOfMessages: 5 });
    return data;
}

export async function chatWithAI({
    userId,
    message,
    messages,
} : {
    userId: string,
    message: string,
    messages: Message[],
}): Promise<void> {
    await dbCreateMessage({ userId, role: 'user', content: message });

    const habits = await dbGetHabits({ userId });
    const entries = await dbGetEntries({ userId });

    const profileSummary = await dbGetProfileSummary({ userId });
    const weekSummary = await dbGetHabitSummaries({ userId });
    const recentPerformance = calculateRecentPerformance({ habits, entries, weeks: 1 });

    let weekSummaryString: string = "";
    weekSummary.map(({ periodStart, periodEnd, summary }) => {
        weekSummaryString.concat(`${periodStart} ~ ${periodEnd}: ${summary}\n`);
    })

    try {
        const response = await chatWithAIService({
            userMessage: message,
            pastMessages: messages,
            profileSummary: profileSummary.summary,
            weekSummary: weekSummaryString,
            recentPerformance
        });

        await dbCreateMessage({ userId, role: 'assistant', content: response });
        refresh();
    } catch (e: any) {
        console.error(e);
    }
}
