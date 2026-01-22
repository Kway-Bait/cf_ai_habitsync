import { HabitCardType, Entry } from '@/app/libs/types';
import { CATEGORY_ICONS } from '@/app/libs/constants';
import { createEntry, deleteEntriesByDate } from '../action';
import {
    CheckCircle2, 
    Circle, 
    Trophy 
} from 'lucide-react';
import clsx from 'clsx';

export default function HabitCard({
    habit,
    entry,
    viewDate,
} : {
    habit: HabitCardType,
    entry: Entry,
    viewDate: Date,
}) {
    const isCompleted = (entry?.count ?? 0) >= habit.goal;
    const progress = entry?.count ?? 0;

    async function onToggle(habitId: string) : Promise<void> {
        const props = { habitId: habitId, date: viewDate };
        if (entry.count == habit.goal) {
            await deleteEntriesByDate(props);
        }else {
            await createEntry(props);
        }
    }

    const icon = CATEGORY_ICONS[habit.category];
    const CategoryIcon = icon.icon;

    return (
        <div 
            onClick={() => onToggle(habit.id)}
            className={`group relative p-5 rounded-[2rem] transition-all duration-300 cursor-pointer border-2 h-full flex flex-col justify-between ${
                isCompleted 
                ? 'bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-800' 
                : 'bg-white dark:bg-slate-900 border-gray-50 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-900 shadow-sm'
            }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <div className={clsx(
                        "p-4 rounded-2xl transition-colors",
                        {
                            'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400': isCompleted,
                            'bg-slate-50 dark:bg-slate-800 text-gray-600': !isCompleted,
                        }
                    )}>
                        <CategoryIcon className={`size-5 ${icon.color}`} />
                    </div>
                    <div>
                        <h3 className={clsx(
                            "font-bold text-lg leading-tight transition-all", 
                            {
                                'text-indigo-900 dark:text-indigo-200 line-through opacity-60': isCompleted,
                                'text-gray-900 dark:text-white group-hover:text-indigo-600': !isCompleted,
                            }
                        )}>
                            {habit.name}
                        </h3>
                        <div className="flex items-center mt-1 space-x-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                {habit.category}
                            </span>
                            {habit.streak > 0 && (
                                <span className={clsx(
                                    "flex items-center text-[10px] font-bold text-orange-500",
                                    {
                                        "brightness-75 italic": entry.count < habit.goal,
                                    }
                                )}>
                                    <Trophy className="w-2.5 h-2.5 mr-1" /> {habit.streak}d streak
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <button 
                    className="focus:outline-none transition-transform active:scale-75"
                >
                    {isCompleted ? (
                        <>
                            <CheckCircle2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 fill-indigo-50 dark:fill-indigo-900/20" />
                        </>
                    ) : (
                            <div className="relative group">
                                <Circle className="w-10 h-10 text-gray-200 dark:text-slate-800 group-hover:text-indigo-200 transition-colors" />
                                {progress > 0 && (
                                    <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-indigo-600 dark:text-indigo-400">
                                        {progress}
                                    </span>
                                )}
                            </div>
                        )}
                </button>
            </div>

            {!isCompleted && habit.goal > 1 && (
                <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-gray-400">
                        <span>PROGRESS</span>
                        <span>{progress} / {habit.goal}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-indigo-500 transition-all duration-700 ease-out shadow-[0_0_8px_rgba(99,102,241,0.4)]" 
                            style={{ width: `${(progress / habit.goal) * 100}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
