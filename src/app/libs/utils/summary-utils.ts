'use server';

import { dbCreateProfileSummary, dbGetProfileSummary, dbUpdateProfileSummary } from '@/app/libs/db/profile-summary';
import { dbGetHabitSummaries, dbGetLatestHabitSummary, dbCreateHabitSummary } from '@/app/libs/db/habit-summary';
import { dbGetHabits } from '@/app/libs/db/habit';
import { dbGetEntries } from '@/app/libs/db/entry';

import { ProfileSummary, HabitWeekSummary } from '@/app/libs/types';
import { calculateRecentPerformance } from '@/app/libs/utils/habit-utils';
import { format, add, startOfToday, differenceInCalendarWeeks, parseISO } from 'date-fns';
import { generateProfileSummary, generateWeekSummary } from '@/app/services/summary-service';

export async function updateProfileSummary({
    userId,
} : {
    userId: string,
}): Promise<void> {
    var profileSummary: ProfileSummary = await dbGetProfileSummary({ userId });

    if (!profileSummary.updatedAt){
        await dbCreateProfileSummary({ userId });
        profileSummary = await dbGetProfileSummary({ userId });
    }

    const lastUpdatedTime = ((typeof profileSummary.updatedAt === 'string')? parseISO(profileSummary.updatedAt) : profileSummary.updatedAt);

    if (differenceInCalendarWeeks(Date(), lastUpdatedTime) >= 2){
        const habits = await dbGetHabits({ userId });
        const entries = (await Promise.all(habits.map(async (habit) => {
            const entry = await dbGetEntries({ habitId: habit.id });
            return entry;
        }))).flat();

        const weekSummary: HabitWeekSummary[] = await dbGetHabitSummaries({ userId });
        const recentPerformance: string = calculateRecentPerformance({ habits, entries, weeks: 2 });

        let weekSummaryString: string = "";
        weekSummary.map(({ periodStart, periodEnd, summary }) => {
            weekSummaryString.concat(`${periodStart} ~ ${periodEnd}: ${summary}\n`);
        })

        const newProfileSummary = await generateProfileSummary({ 
            currentProfileSummary: profileSummary.summary,
            weekSummary: weekSummaryString,
            recentPerformance,
        });

        await dbUpdateProfileSummary({ userId, summary: newProfileSummary });
    }
}

export async function updateWeekSummary({
    userId,
} : {
    userId: string,
}): Promise<void> {
    const lastHabitSummary: HabitWeekSummary = await dbGetLatestHabitSummary({ userId });

    if (!lastHabitSummary.periodStart || differenceInCalendarWeeks(Date(), parseISO(lastHabitSummary.periodEnd)) >= 1) {
        const habits = await dbGetHabits({ userId });
        const entries = (await Promise.all(habits.map(async (habit) => {
            const entry = await dbGetEntries({ habitId: habit.id });
            return entry;
        }))).flat();

        const recentPerformance: string = calculateRecentPerformance({ habits, entries, weeks: 1 });
        const weekSummary = await generateWeekSummary({ recentPerformance });

        await dbCreateHabitSummary({ 
            userId, 
            periodStart: format(add(startOfToday(), { weeks: -1 }), 'yyyy-MM-dd'),
            periodEnd: format(startOfToday(), 'yyyy-MM-dd'),
            summary: weekSummary,
        });
    }
}
