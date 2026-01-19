
import React from 'react';
import { Contest, SponsorTier } from '../types';
import { Users, Clock, Zap } from 'lucide-react';

interface ContestCardProps {
  contest: Contest;
  onClick: () => void;
}

export const ContestCard: React.FC<ContestCardProps> = ({ contest, onClick }) => {
  const isPremier = contest.tier === SponsorTier.PREMIER;

  return (
    <button 
      onClick={onClick}
      className={`w-full text-left relative overflow-hidden rounded-2xl border transition-all active:scale-[0.98] ${
        isPremier 
        ? 'bg-gradient-to-br from-zinc-900 to-black border-yellow-500/30' 
        : 'bg-zinc-900 border-zinc-800'
      }`}
    >
      {isPremier && (
        <div className="absolute top-0 right-0 p-3">
          <Zap className="text-yellow-500 fill-yellow-500 animate-pulse" size={16} />
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-tight ${
            isPremier ? 'bg-yellow-500 text-black' : 'bg-zinc-800 text-zinc-400'
          }`}>
            {contest.sport}
          </span>
          <span className="text-zinc-500 text-[10px] font-bold uppercase">• {contest.sponsor}</span>
        </div>

        <h3 className="text-lg font-black leading-tight mb-2 pr-4">{contest.title}</h3>

        <div className="flex items-center gap-4 text-xs font-bold text-zinc-400">
          <div className="flex items-center gap-1">
            <Users size={14} className="text-zinc-500" />
            <span>{contest.participants.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-zinc-500" />
            <span>Starts in 2h</span>
          </div>
        </div>
      </div>

      <div className={`px-5 py-3 flex items-center justify-between border-t ${
        isPremier ? 'bg-yellow-500/5 border-yellow-500/10' : 'bg-zinc-800/20 border-zinc-800'
      }`}>
        <div className="flex flex-col">
          <span className="text-[8px] text-zinc-500 uppercase font-black">Prize Pool</span>
          <span className={`text-sm font-black ${isPremier ? 'text-yellow-500' : 'text-white'}`}>{contest.prizePool}</span>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase ${
          isPremier ? 'bg-yellow-500 text-black' : 'bg-white text-black'
        }`}>
          Enter Free
        </div>
      </div>
    </button>
  );
};
