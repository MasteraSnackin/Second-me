import React from 'react';

interface Memory {
    id: number;
    factObject: string;
    factContent: string;
    createTime: number;
}

interface MemoryCardProps {
    memory: Memory;
}

const MemoryCard: React.FC<MemoryCardProps> = ({ memory }) => {
    const date = new Date(memory.createTime).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-purple-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div className="relative z-10">
                <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-300 border border-purple-500/20">
                        {memory.factObject}
                    </span>
                    <span className="text-xs text-white/40">{date}</span>
                </div>

                <p className="text-sm font-light leading-relaxed text-white/80">
                    {memory.factContent}
                </p>
            </div>
        </div>
    );
};

export default MemoryCard;
