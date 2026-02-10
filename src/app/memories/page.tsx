'use client';

import { useState, useEffect } from 'react';
import MemoryCard from '@/components/MemoryCard';
import AddMemoryModal from '@/components/AddMemoryModal';
import { Loader2, Plus, Sparkles } from 'lucide-react';

interface Memory {
    id: number;
    factObject: string;
    factContent: string;
    createTime: number;
    updateTime: number;
}

export default function MemoriesPage() {
    const [memories, setMemories] = useState<Memory[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchMemories = async (page: number) => {
        try {
            const res = await fetch(`/api/memories?pageNo=${page}&pageSize=20`);
            const data = await res.json();

            if (data.code === 0 && data.data?.list) {
                if (page === 1) {
                    setMemories(data.data.list);
                } else {
                    setMemories(prev => [...prev, ...data.data.list]);
                }

                if (data.data.list.length < 20) {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.error('Failed to fetch memories', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMemories(1);
    }, []);

    const loadMore = () => {
        const nextPage = pageNo + 1;
        setPageNo(nextPage);
        fetchMemories(nextPage);
    };

    const handleMemoryAdded = () => {
        setPageNo(1);
        setLoading(true);
        fetchMemories(1);
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col gap-2 relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 border border-white/10">
                <div className="absolute top-0 right-0 p-8 opacity-20">
                    <Sparkles className="w-32 h-32 text-blue-400 rotate-12" />
                </div>
                <div className="flex justify-between items-center relative z-10">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Soft Memories</h1>
                        <p className="text-blue-200">Explore your avatar's personal knowledge base.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-95"
                    >
                        <Plus size={20} />
                        <span>Add Memory</span>
                    </button>
                </div>
            </header>

            {loading && memories.length === 0 ? (
                <div className="flex bg-transparent h-64 items-center justify-center rounded-2xl border border-white/10">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                </div>
            ) : (
                <>
                    <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 space-y-6">
                        {memories.map((memory) => (
                            <div key={memory.id} className="break-inside-avoid">
                                <MemoryCard memory={memory} />
                            </div>
                        ))}
                    </div>

                    {memories.length > 0 && hasMore && (
                        <div className="flex justify-center pt-8">
                            <button
                                onClick={loadMore}
                                className="group relative rounded-full bg-white/5 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 border border-white/10"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Load More Memories
                                </span>
                            </button>
                        </div>
                    )}

                    {!loading && memories.length === 0 && (
                        <div className="flex h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-white/5 text-center p-8">
                            <div className="rounded-full bg-white/5 p-4">
                                <div className="h-8 w-8 text-white/20">🧠</div>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white">No memories found</h3>
                                <p className="text-sm text-white/40 max-w-sm mt-1">
                                    Your avatar hasn't formed any soft memories yet. Chat with it to build its knowledge base.
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}

            <AddMemoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleMemoryAdded}
            />
        </div>
    );
}
