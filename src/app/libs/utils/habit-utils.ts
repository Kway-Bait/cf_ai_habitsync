import { 
    Habit, 
    HabitInfo, 
    HabitSummary, 
    Entry, 
    HabitCategory 
} from '@/app/libs/types';

import { 
    add, 
    compareAsc, 
    compareDesc, 
    parseISO, 
    startOfToday, 
    isSameDay 
} from 'date-fns';

export function calculateStreak({
    viewDate,
    habitInfo,
    entries
} : {
    viewDate: Date,
    habitInfo: HabitInfo,
    entries: Entry[]
}): number {
    if (!entries || entries.length === 0) return 0;

    const filteredEntries = entries.filter((e) => (
        e.habitId === habitInfo.id && compareAsc(parseISO(e.date), viewDate) <= 0
    ));

    if (filteredEntries.length === 0) return 0;

    filteredEntries.sort((a: Entry, b: Entry) => {
        return compareDesc(parseISO(a.date), parseISO(b.date));
    })

    const dates = filteredEntries.map(e => ({
        date: parseISO(e.date),
        count: e.count
    }));

    // Insert entry for today if not exists
    const fullDates = (isSameDay(dates[0].date, viewDate))? dates : [ { date: viewDate, count: 0 }, ...dates ]; 

    let streak = 0;
    if (fullDates[0].count === habitInfo.goal) streak++;

    for (let i = 0; i < fullDates.length - 1; i++) {
        const currentDate: Date = fullDates[i].date;
        const previousDate: Date = fullDates[i+1].date;

        const diff = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);

        if (diff === 1 && fullDates[i+1].count === habitInfo.goal) {
            streak++;
        } else { break; }
    }

    return streak;
}

export function calculateHabitSummary({
    viewDate,
    habits,
    entries
} : {
    viewDate: Date,
    habits: Habit[],
    entries: Entry[],
}): HabitSummary {
    let completed: number = 0;
    let progress: number = 0;
    let activeStreak: number = 0;

    // Calculate `completed` and `progress`
    habits.map((h) => {
        const entry = entries.find((e) => (
            e.habitId === h.id && isSameDay(parseISO(e.date), viewDate)
        ));

        if (!entry) return;

        if (entry.count === h.goal) {
            completed++;
        } else {
            const currentProgress = Math.floor(entry.count * 100 / (h.goal * habits.length));
            progress += currentProgress;
        }
    });

    progress += Math.floor(completed * 100 / habits.length);

    // Calculate `activeStreak`
    const pastEntries = entries.filter((e) => compareAsc(parseISO(e.date), viewDate) <= 0);

    if (pastEntries.length > 0){
        pastEntries.sort((a: Entry, b: Entry) => {
            return compareDesc(parseISO(a.date), parseISO(b.date));
        })

        const dates = pastEntries.map(e => ({
            date: parseISO(e.date),
            count: e.count
        }));

        const fullDates = (isSameDay(dates[0].date, viewDate))? dates : [ { date: viewDate, count: 0 }, ...dates ]; 

        var currentDateEntryCount = fullDates[0].count;
        if (currentDateEntryCount > 0) activeStreak++;
        for (let i = 0; i < fullDates.length - 1; i++) {
            const currentDate: Date = fullDates[i].date;
            const previousDate: Date = fullDates[i+1].date;

            if (!isSameDay(currentDate, previousDate)){
                const diff = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);

                // By pass "today no entry" case, to preserve past streak
                if (diff === 1 && (isSameDay(currentDate, startOfToday()) || currentDateEntryCount > 0)) {
                    activeStreak++;
                    currentDateEntryCount = 0; 
                } else { break; }
            }

            currentDateEntryCount += fullDates[i+1].count;
        }
    }

    return { completed, progress, activeStreak };
}

export function calculateHabitReview({
    habits,
    entries
} : {
    habits: Habit[],
    entries: Entry[],
}) : { successRate: number, longestStreak: number } {

    // SuccessRate
    const startDate: Date = add(startOfToday(), { weeks: -1 });
    const totalHabits: number = habits.length * 7;

    const completedEntries: number = entries.filter((e) => {
        const habit: Habit = habits.find((h) => h.id === e.habitId) as Habit;
        return compareAsc(e.date, startDate) >= 0 && e.count === habit.goal;
    }).length;

    // longestStreak
    const sortedEntries = entries.sort((a: Entry, b: Entry) => {
        return compareDesc(parseISO(a.date), parseISO(b.date));
    })

    let streak = 1, longestStreak = 1;
    for (let i = 0; i < sortedEntries.length - 1; i++) {
        const currentDate: Date = parseISO(sortedEntries[i].date);
        const previousDate: Date = parseISO(sortedEntries[i+1].date);

        if (!isSameDay(currentDate, previousDate)){
            const diff = (currentDate.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24);

            streak = (diff === 1)? streak + 1 : 1;
            longestStreak = Math.max(longestStreak, streak);
        }
    }

    return {
        successRate: Math.round(completedEntries * 100 / totalHabits),
        longestStreak: longestStreak,
    }
}

export function calculateRecentPerformance({
    habits,
    entries,
    weeks,
} : {
    habits: Habit[],
    entries: Entry[],
    weeks: number,
}): string {
    const startDate: Date = add(startOfToday(), { weeks: -weeks });
    const filteredEntries = entries.filter((e) => compareAsc(e.date, startDate) >= 0);

    const results: { 
        id: string,
        name: string,
        category: HabitCategory,
        goal: number,
        completedDays: number,
        totalEntries: number,
    }[] = habits.map(habit => {
        const completedDays: number = filteredEntries.filter((e) => (
            e.habitId === habit.id && e.count === habit.goal
        )).length;

        const totalEntries: number = filteredEntries.map((e) => (
            (e.habitId === habit.id)? e.count : 0
        )).reduce((acc, cur) => acc + cur, 0);

        return {
            ...habit,
            completedDays: completedDays,
            totalEntries: totalEntries,
        };
    });

    let summary = `Recent Habit Performance (last ${weeks * 7} days):`;
    results.map(({ name, category, goal, completedDays, totalEntries }) => {
        summary = summary.concat(`\n - ${name} (${category}): ${completedDays}/${weeks * 7} [totalEntries: ${totalEntries}/${goal * weeks * 7}]`)
    })

    return summary;
}
