
import React from 'react';
import { MOCK_CONTESTS } from '../data/mockData';
import { ContestCard } from './ContestCard';
import { Contest, SponsorTier } from '../types';

interface PlayerDashboardProps {
  onSelectContest: (contest: Contest) => void;
}

export const PlayerDashboard: React.FC<PlayerDashboardProps> = ({ onSelectContest }) => {
  const premierContests = MOCK_CONTESTS.filter(c => c.tier === SponsorTier.PREMIER);
  const otherContests = MOCK_CONTESTS.filter(c => c.tier !== SponsorTier.PREMIER);

  return (
    <div className="space-y-6 px-4 pt-4">
      {/* Featured Tier 1 section */}
      <section>
        <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-1 h-4 bg-yellow-500 rounded-full"></span>
          Featured Premier Royale
        </h2>
        <div className="space-y-4">
          {premierContests.map(contest => (
            <ContestCard 
              key={contest.id} 
              contest={contest} 
              onClick={() => onSelectContest(contest)} 
            />
          ))}
        </div>
      </section>

      {/* Discover More section */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <span className="w-1 h-4 bg-zinc-700 rounded-full"></span>
            Discover Contests
          </h2>
          <button className="text-[10px] text-yellow-500 font-bold uppercase hover:underline">See All</button>
        </div>
        <div className="space-y-4">
          {otherContests.map(contest => (
            <ContestCard 
              key={contest.id} 
              contest={contest} 
              onClick={() => onSelectContest(contest)} 
            />
          ))}
        </div>
      </section>

      {/* User Stats Snapshot */}
      <div className="bg-zinc-900/50 rounded-2xl p-5 border border-zinc-800">
        <h3 className="text-xs font-bold text-zinc-500 mb-4 uppercase">My Season Progress</h3>
        <div className="grid grid-cols-3 gap-4">
          <StatBox label="Rank" value="#1,240" color="text-white" />
          <StatBox label="Points" value="4,850" color="text-yellow-500" />
          <StatBox label="Wins" value="12" color="text-green-500" />
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, color }: { label: string, value: string, color: string }) => (
  <div className="text-center">
    <p className="text-[10px] font-bold text-zinc-600 uppercase mb-1">{label}</p>
    <p className={`text-xl font-black ${color}`}>{value}</p>
  </div>
);
