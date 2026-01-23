'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Home, LogIn, FileExclamationPoint } from 'lucide-react';

export default function Unauthorized() {
    return (
        <main className="flex justify-center items-center min-w-full h-screen text-center">
            <div className="flex flex-col space-y-4 max-h-min justify-center items-center p-7 border-indigo-400 shadow-sm shadow-white border-3 rounded-3xl duration-300">
                <FileExclamationPoint className="mb-6 size-13 text-red-500"/>
                <h1 className="text-3xl uppercase font-bold tracking-widest">Unauthorized</h1>
                <h2 className="text-xl italic">
                    You need to login in order to access this page.
                </h2>
                <div className="flex space-x-5">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-indigo-100 dark:shadow-none transition-all hover:scale-105 active:scale-95"
                    >
                        <Home className="w-4 h-4" />
                        <span>Home</span>
                    </Link>
                    <button
                        onClick={() => signIn()}
                        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-indigo-100 dark:shadow-none transition-all hover:scale-105 active:scale-95"
                    >
                        <LogIn className="w-4 h-4" />
                        <span>Sign In</span>
                    </button>
                </div>
            </div>
        </main>
    )
}

