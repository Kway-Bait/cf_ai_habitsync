import Link from 'next/link';
import LoginBtn from '@/app/components/ui/login-btn';
import { auth } from '@/app/libs/auth';
import { 
    Sparkles, 
    ArrowRight, 
    LogIn, 
    Zap, 
    BarChart3, 
    Bot, 
    LayoutDashboard, 
    CheckCircle2, 
    Trophy, 
    ArrowUpRight, 
} from 'lucide-react';

export default async function Page() {
    const session = await auth();

    // return <pre>{JSON.stringify(session)}</pre>;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">
            {/* Sticky Glass Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-3 group cursor-pointer">
                        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none group-hover:rotate-6 transition-transform">
                            <LayoutDashboard className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">HabitSync</span>
                    </div>
                    <LoginBtn session={session} />
                    {/* <Link  */}
                    {/*     // href="/login" */}
                    {/*     href="/dashboard" */}
                    {/*     className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-xl shadow-indigo-100 dark:shadow-none transition-all hover:scale-105 active:scale-95" */}
                    {/* > */}
                    {/*     <LogIn className="w-4 h-4" /> */}
                    {/*     <span>Sign In</span> */}
                    {/* </Link> */}
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-48 pb-32 px-6 overflow-hidden">
                {/* Dynamic Background Elements */}
                <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
                <div className="absolute top-40 right-0 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] -z-10" />

                <div className="max-w-7xl mx-auto text-center space-y-12">
                    <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 rounded-full border border-indigo-100 dark:border-indigo-800/50 animate-bounce">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Level up your daily rituals</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] max-w-5xl mx-auto">
                        Your life is a <span className="text-indigo-600">habit.</span> <br />
                        Make it a <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">masterpiece.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Stop tracking. Start evolving. HabitSync combines behavioral science with Gemini AI to help you build rituals that stick.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link 
                            // href="/login"
                            href="/dashboard"
                            className="w-full sm:w-auto flex items-center justify-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-6 rounded-[2.5rem] font-black text-lg shadow-2xl shadow-indigo-100 dark:shadow-none transition-all hover:scale-105 active:scale-95"
                        >
                            <span>Start Your Journey</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center space-x-4 px-6 py-4 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-800 overflow-hidden">
                                        <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-start leading-none">
                                <span className="text-lg font-black text-slate-900 dark:text-white">12k+</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Performers</span>
                            </div>
                        </div>
                    </div>

                    {/* Visualization Section */}
                    <div className="mt-24 max-w-5xl mx-auto p-4 bg-slate-100/50 dark:bg-slate-900/50 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl relative">
                        <div className="absolute -top-10 -right-10 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 hidden lg:block animate-float">
                            <div className="flex items-center space-x-4">
                                <div className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-xl">
                                    <Trophy className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase">Longest Streak</p>
                                    <p className="text-xl font-black text-slate-900 dark:text-white">42 Days</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-[3rem] bg-white dark:bg-slate-950 overflow-hidden border border-slate-100 dark:border-slate-800 shadow-inner">
                            <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="h-12 w-48 bg-slate-100 dark:bg-slate-900 rounded-2xl" />
                                    <div className="space-y-3">
                                        <div className="h-20 w-full bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100/50 dark:border-indigo-800/50 p-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center">
                                                    <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                                                </div>
                                                <div className="h-4 w-32 bg-indigo-200/50 dark:bg-indigo-800/50 rounded-full" />
                                            </div>
                                            <div className="w-8 h-8 rounded-full border-2 border-indigo-200 dark:border-indigo-800" />
                                        </div>
                                        <div className="h-20 w-full bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 flex items-center justify-between opacity-50">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center" />
                                                <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 flex flex-col justify-between">
                                    <div className="flex items-center space-x-3 mb-8">
                                        <Bot className="w-6 h-6 text-indigo-600" />
                                        <span className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase">AI Coach Insights</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="h-4 w-full bg-indigo-100 dark:bg-indigo-800/50 rounded-full" />
                                        <div className="h-4 w-5/6 bg-indigo-100 dark:bg-indigo-800/50 rounded-full" />
                                        <div className="h-4 w-4/6 bg-indigo-100 dark:bg-indigo-800/50 rounded-full" />
                                    </div>
                                    <button className="mt-12 w-full py-4 bg-white dark:bg-slate-800 rounded-2xl text-[10px] font-black text-indigo-600 uppercase tracking-widest shadow-sm">
                                        Explore Intelligence
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { 
                                title: 'Smart Rituals', 
                                icon: Zap, 
                                desc: 'Define habits that adapt to your lifestyle. Goal-based tracking with automatic streak protection.',
                                color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20'
                            },
                            { 
                                title: 'Gemini AI Coach', 
                                icon: Bot, 
                                desc: '24/7 personalized coaching that analyzes your data to provide motivation when you need it most.',
                                color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                            },
                            { 
                                title: 'Flow Analytics', 
                                icon: BarChart3, 
                                desc: 'Deep dives into your consistency with heatmaps, trend lines, and behavioral insights.',
                                color: 'text-purple-600 bg-purple-50 dark:bg-purple-900/20'
                            },
                        ].map((f, i) => (
                                <div key={i} className="group p-10 bg-slate-50 dark:bg-slate-900/30 rounded-[3rem] border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/50 transition-all">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform ${f.color}`}>
                                        <f.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{f.title}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                                    <div className="mt-8 flex items-center text-indigo-600 font-bold text-sm cursor-pointer hover:translate-x-1 transition-transform">
                                        Learn More <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-48 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Ready to become the <br /> <span className="text-indigo-600">next version</span> of you?
                    </h2>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">
                        Join thousands of users today. No credit card required. Just results.
                    </p>
                    <div className="pt-8">
                        <button 
                            // onClick={onLogin}
                            className="group bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-12 py-6 rounded-[2.5rem] font-black text-xl shadow-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center mx-auto space-x-4"
                        >
                            <span>Join HabitSync Free</span>
                            <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="py-20 px-6 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center space-x-3 grayscale opacity-30">
                        <LayoutDashboard className="text-slate-900 dark:text-white w-5 h-5" />
                        <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight">HabitSync AI</span>
                    </div>
                    <div className="flex space-x-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">GitHub</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 dark:text-slate-700">© 2025 Crafted for Excellence</p>
                </div>
            </footer>
        </div>
    );
};
