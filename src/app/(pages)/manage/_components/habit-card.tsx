import Link from 'next/link';
import { Habit } from '@/app/libs/types';
import { CATEGORY_ICONS } from '@/app/libs/constants';
import {
    SquarePen, 
    CircleCheck,
} from 'lucide-react';

export default function HabitCard({
    habit,
} : {
    habit: Habit,
}) {
    const icon = CATEGORY_ICONS[habit.category];
    const CategoryIcon = icon.icon;

    return (
        <div 
            className={`group relative p-5 rounded-[2rem] transition-all duration-300 border-2 h-full flex flex-col justify-between bg-white dark:bg-slate-900 border-gray-50 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-900 shadow-sm' }`}
        >
            <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                    <div className="p-4 rounded-2xl transition-colors bg-slate-50 dark:bg-slate-800 text-gray-600">
                        <CategoryIcon className={`size-5 ${icon.color}`} />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg leading-tight transition-all text-gray-900 dark:text-white group-hover:text-indigo-600">
                            {habit.name}
                        </h3>
                        <div className="flex items-center mt-1 space-x-3">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500">
                                {habit.category}
                            </span>
                        </div>
                    </div>
                </div>
                <Link
                    href={`/manage/edit/${habit.id}`}
                    className="focus:outline-none transition-transform active:scale-75 cursor-pointer"
                >
                    <div className="relative group">
                        <SquarePen className="size-10 text-indigo-300 dark:text-indigo-800 group-hover:text-indigo-200 transition-colors" />
                    </div>
                </Link>
            </div>
            <div className="flex items-center space-x-2 ml-2 mt-3">
                <CircleCheck className="size-5 ml-1 text-lime-500" />
                <span className="text-md font-black text-gray-500 dark:text-gray-400">
                    {(habit.goal > 1)? `${habit.goal} times` : `${habit.goal} time`} per day
                </span>
            </div>
        </div>
    );
};
