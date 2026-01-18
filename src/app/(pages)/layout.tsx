'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import clsx from 'clsx';
import { 
    CheckSquare, 
    BarChart3, 
    MessageCircle, 
    Plus, 
    Settings, 
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    Sun,
    Moon,
    LayoutDashboard,
    Home as HomeIcon,
    User,
    LogOut
} from 'lucide-react';
import { Habit, Entry, Tab, HabitCategory } from '@/app/libs/types';

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    const [habits, setHabits] = useState<Habit[]>(() => {
        const saved = localStorage.getItem('habits');
        return saved ? JSON.parse(saved) : [];
    });
    const [entries, setEntries] = useState<Entry[]>(() => {
        const saved = localStorage.getItem('habit_entries');
        return saved ? JSON.parse(saved) : [];
    });
    const [currentDate, setCurrentDate] = useState(new Date());

    // FIX: darkMode not working
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const dateStr = format(currentDate, 'yyyy-MM-dd');


    const navList = [
        { href: Tab.DASHBOARD, icon: HomeIcon, label: "Dashboard", mobile_label: "Dashboard"},
        { href: Tab.DAILY, icon: CheckSquare, label: "Daily Habits", mobile_label: "Daily" },
        { href: Tab.REVIEW, icon: BarChart3, label: "Progress Review", mobile_label: "Review" },
        { href: Tab.CHAT, icon: MessageCircle, label: "AI Habit Coach", mobile_label: "Chatbot" },
    ];

    const NavItem = ({ tab, icon: Icon, label }: { tab: Tab, icon: any, label: string }) => (
        <Link 
            href={tab}
            className={clsx(
                "flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200",
                {
                    'bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none': pathname === tab,
                    'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800': pathname !== tab,
                }
            )}
        >
            <Icon className="w-5 h-5" />
            <span className="font-semibold text-sm">{label}</span>
        </Link>
    );

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            {/* Sidebar - Desktop Navigation */}
            <aside className="hidden lg:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 p-6 fixed h-full z-20">
                <div className="flex items-center space-x-3 mb-12">
                    <div className="bg-indigo-600 p-2 rounded-xl">
                        <LayoutDashboard className="text-white w-6 h-6" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">HabitSync</h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {navList.map((tab, i)  => (
                        <NavItem key={i} tab={tab.href} icon={tab.icon} label={tab.label} />
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-800 space-y-2">
                    <div className="px-4 py-3 flex items-center justify-between group">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/40 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-indigo-600" />
                            </div>
                            <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Alex J.</span>
                        </div>
                        <button 
                            onClick={() => {}} // TODO: Handle Logout
                            className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 rounded-lg transition-all"
                            title="Sign Out"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                    <button 
                        onClick={() => setDarkMode(!darkMode)}
                        className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        <span className="font-semibold text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                    <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                        <Settings className="w-5 h-5" />
                        <span className="font-semibold text-sm">Settings</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">HabitSync</h1>
                <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg"
                >
                    {darkMode ? <Sun className="w-5 h-5 text-gray-400" /> : <Moon className="w-5 h-5 text-gray-400" />}
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-72 min-h-screen relative p-6 lg:p-12 pt-24 lg:pt-12">
                {children}
            </main>

            {/* Mobile Navigation */}
            <nav className="lg:hidden fixed bottom-4 left-4 right-4 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-100 dark:border-slate-800 rounded-2xl flex items-center justify-around px-2 shadow-2xl z-40">
                {navList.map(({ href, icon: Icon, mobile_label}, i) => (
                    <Link
                        key={i}
                        href={href}
                        className={`flex-1 flex flex-col items-center justify-center space-y-1 py-1 ${pathname === href ? 'text-indigo-600' : 'text-gray-400'}`}
                    >
                        <Icon className="w-5 h-5" />
                        <span className="text-[10px] font-bold uppercase">{mobile_label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
};
