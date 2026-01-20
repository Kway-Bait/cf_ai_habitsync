import { Habit, Entry, User } from '@/app/libs/types';
import { fetchHabits, fetchEntries } from './action';
import HabitSummary from './(components)/habit-summary';

export default async function Page() {
    const sample_user: User = {
        id: '1',
    };

    const habits: Habit[] = await fetchHabits({ user: sample_user });
    const entries: Entry[] = await fetchEntries({ habits: habits })

    return (
        <HabitSummary 
            habits={habits}
            entries={entries}
        />
    );
};
