'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, User, Settings, LogOut, Sparkles } from 'lucide-react';

export default function SideNav() {
    const pathname = usePathname();

    return (
        <div className="hidden md:flex flex-col w-64 h-screen p-4 fixed left-0 top-0 glass border-r-0 rounded-r-2xl z-50">
            <div className="mb-10 px-4">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                    SecondMe
                </h1>
                <p className="text-xs text-gray-400 mt-1">Digital Avatar Interface</p>
            </div>

            <nav className="flex-1 space-y-2">
                <NavItem href="/" icon={<Home size={20} />} label="Dashboard" active={pathname === '/'} />
                <NavItem href="/chat" icon={<MessageSquare size={20} />} label="Chat" active={pathname === '/chat'} />
                <NavItem href="/memories" icon={<User size={20} />} label="Memories" active={pathname === '/memories'} />
                <NavItem href="/shades" icon={<Sparkles size={20} />} label="Shades" active={pathname === '/shades'} />
                <NavItem href="/settings" icon={<Settings size={20} />} label="Settings" active={pathname === '/settings'} />
            </nav>

            <div className="mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 px-4 py-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Disconnect</span>
                </div>
            </div>
        </div>
    );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
                ? 'bg-blue-500/20 text-blue-300 shadow-inner border border-blue-500/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </Link>
    );
}
