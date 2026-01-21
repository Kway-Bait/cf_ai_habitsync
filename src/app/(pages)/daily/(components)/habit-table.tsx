'use client';

import { useHabitContext } from '@/app/context/habit-context';
import { Habit } from '@/app/libs/types';
import { calculateStreak } from '@/app/libs/utils/habit-utils';
import { parseISO, isSameDay } from 'date-fns';
import HabitCard from './habit-card';

export default function HabitTable({
    viewDate,
} : {
    viewDate: Date,
}) {
    const { habits, entries } = useHabitContext();

    function HabitCardWrapper({ habit } : { habit: Habit }) {
        const entry = entries.find((e) => e.habitId === habit.id && isSameDay(parseISO(e.date), viewDate)) ??
                { habitId: habit.id, date: viewDate.toDateString(), count: 0 };

        const streak = calculateStreak({
            viewDate: viewDate,
            habitInfo: { id: habit.id, goal: habit.goal },
            entries: entries
        });

        return (
            <HabitCard
                viewDate={viewDate}
                habit={{ ...habit, streak: streak }}
                entry={entry}
            />
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {habits.map((habit, idx) => (
                <HabitCardWrapper
                    key={idx}
                    habit={habit} 
                />
            ))}
        </div>
    );
}
