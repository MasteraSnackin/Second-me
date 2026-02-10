import SideNav from '@/components/SideNav';
import ChatInterface from '@/components/ChatInterface';
import { Sparkles, Brain, Activity, Zap } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
            <SideNav />

            <div className="md:pl-64 p-8 min-h-screen">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        <p className="text-gray-400">Welcome back to your digital command center.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 text-sm font-medium">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            System Online
                        </div>
                    </div>
                </header>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">

                    {/* Main Chat Area - Spans 2 cols, 2 rows */}
                    <div className="md:col-span-2 md:row-span-2 glass-card rounded-3xl p-6 relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <Sparkles className="w-24 h-24 text-blue-500/20 rotate-12" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <MessageIcon /> Live Avatar Stream
                        </h3>
                        <div className="flex-1 min-h-0">
                            <ChatInterface />
                        </div>
                    </div>

                    {/* Stats Card */}
                    <div className="glass-card rounded-3xl p-6 flex flex-col justify-between group">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Brain className="w-6 h-6 text-purple-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-300">Memory Nodes</h3>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white mb-1">1,204</p>
                            <p className="text-sm text-gray-500">+12% from last week</p>
                        </div>
                    </div>

                    {/* Activity Card */}
                    <div className="glass-card rounded-3xl p-6 flex flex-col justify-between group">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Activity className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-300">Interaction Rate</h3>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-white mb-1">98.2%</p>
                            <p className="text-sm text-gray-500">Optimal performance</p>
                        </div>
                    </div>

                    {/* Quick Actions - Wide */}
                    <div className="md:col-span-2 glass-card rounded-3xl p-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-white mb-1">Quick Actions</h3>
                            <p className="text-sm text-gray-400">Calibrate your avatar logic</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-sm transition-colors">View Logs</button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 text-sm font-medium transition-colors">Calibrate</button>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

function MessageIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-400"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg>
    )
}
