'use client';

import { useState, useEffect } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

interface Shade {
    id: number;
    shadeName: string;
    shadeIcon: string;
    confidenceLevel: string;
    shadeDescription: string;
    shadeContent: string;
    sourceTopics: string[];
}

export default function ShadesPage() {
    const [shades, setShades] = useState<Shade[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchShades = async () => {
            try {
                const res = await fetch('/api/shades');
                const data = await res.json();
                if (data.code === 0 && data.data?.shades) {
                    setShades(data.data.shades);
                }
            } catch (error) {
                console.error('Failed to fetch shades', error);
            } finally {
                setLoading(false);
            }
        };

        fetchShades();
    }, []);

    const getConfidenceColor = (level: string) => {
        switch (level) {
            case 'VERY_HIGH': return 'bg-green-500/20 text-green-300 border-green-500/30';
            case 'HIGH': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
            case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
            default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
        }
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col gap-2 relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 p-8 border border-white/10">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Sparkles className="w-32 h-32 text-indigo-400 rotate-12" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-white relative z-10">User Shades</h1>
                <p className="text-indigo-200 relative z-10 max-w-xl">
                    Visualizing your avatar's personality, interests, and confidence levels. These "Shades" color every interaction.
                </p>
            </header>

            {loading ? (
                <div className="flex bg-transparent h-64 items-center justify-center rounded-2xl border border-white/10">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {shades.length > 0 ? (
                        shades.map((shade) => (
                            <div key={shade.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:shadow-xl hover:shadow-indigo-500/20">
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="bg-white/10 p-3 rounded-xl">
                                            {/* We can use the icon from API, or a default fallback if URL is broken/empty */}
                                            {shade.shadeIcon ? (
                                                <img src={shade.shadeIcon} alt={shade.shadeName} className="w-8 h-8 object-cover rounded-lg" />
                                            ) : (
                                                <Sparkles className="w-8 h-8 text-indigo-400" />
                                            )}
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full border ${getConfidenceColor(shade.confidenceLevel)}`}>
                                            {shade.confidenceLevel.replace('_', ' ')}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-semibold text-white mb-2">{shade.shadeName}</h3>
                                    <p className="text-sm text-gray-400 mb-4 flex-grow">{shade.shadeDescription}</p>

                                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                                        {shade.sourceTopics.map((topic, i) => (
                                            <span key={i} className="text-xs text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">
                                                #{topic}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full flex h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-white/5 text-center p-8">
                            <div className="rounded-full bg-white/5 p-4">
                                <Sparkles className="h-8 w-8 text-white/20" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white">No Shades Detected</h3>
                                <p className="text-sm text-white/40 max-w-sm mt-1">
                                    Your avatar hasn't developed distinct personality shades yet. Keep chatting to build its profile!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
