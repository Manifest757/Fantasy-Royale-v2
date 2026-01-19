
import React, { useState } from 'react';
import { Contest, Matchup } from '../types';
import { ChevronLeft, Info, BrainCircuit, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_MATCHUPS } from '../data/mockData';
import { getPickInsights } from '../services/geminiService';

interface ContestViewProps {
  contest: Contest;
  onBack: () => void;
}

export const ContestView: React.FC<ContestViewProps> = ({ contest, onBack }) => {
  const [matchups, setMatchups] = useState<Matchup[]>(MOCK_MATCHUPS);
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectTeam = (matchupId: string, teamId: string) => {
    setMatchups(prev => prev.map(m => 
      m.id === matchupId ? { ...m, selectedTeamId: teamId } : m
    ));
  };

  const showInsight = async (m: Matchup) => {
    setLoadingInsight(m.id);
    const text = await getPickInsights(m.teamA, m.teamB);
    setActiveInsight(text || null);
    setLoadingInsight(null);
  };

  const picksMade = matchups.filter(m => m.selectedTeamId).length;
  const allPicksDone = picksMade === matchups.length;

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 pt-20">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <CheckCircle2 size={48} className="text-black" />
        </div>
        <h2 className="text-3xl font-black italic uppercase">Picks Locked!</h2>
        <p className="text-zinc-400 font-medium">Your entry for {contest.title} has been received. Good luck, Royale!</p>
        <button 
          onClick={onBack}
          className="mt-6 w-full py-4 bg-zinc-800 rounded-2xl font-black uppercase"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-black">
      {/* Top Banner */}
      <div className="bg-gradient-to-b from-zinc-800 to-black p-4 pb-8 relative">
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-black/50 rounded-full border border-zinc-700">
          <ChevronLeft size={20} />
        </button>
        <div className="mt-12 text-center">
          <span className="text-xs font-black text-yellow-500 uppercase tracking-widest">{contest.sponsor} presents</span>
          <h2 className="text-2xl font-black italic uppercase leading-tight mt-1">{contest.title}</h2>
          <div className="mt-4 flex justify-center gap-2">
            <span className="bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-[10px] font-black uppercase text-zinc-400">
              {picksMade}/{matchups.length} Picks Made
            </span>
          </div>
        </div>
      </div>

      {/* Matchups List */}
      <div className="px-4 -mt-4 space-y-4 pb-32">
        {matchups.map(m => (
          <div key={m.id} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4 shadow-xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black text-zinc-500 uppercase">{m.startTime}</span>
              <button 
                onClick={() => showInsight(m)}
                className="flex items-center gap-1 text-[10px] font-black uppercase text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20"
              >
                {loadingInsight === m.id ? (
                  <div className="w-3 h-3 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <BrainCircuit size={12} />
                )}
                AI Insights
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <TeamButton 
                name={m.teamA} 
                odds={m.oddsA} 
                selected={m.selectedTeamId === 'A'} 
                onClick={() => handleSelectTeam(m.id, 'A')}
              />
              <TeamButton 
                name={m.teamB} 
                odds={m.oddsB} 
                selected={m.selectedTeamId === 'B'} 
                onClick={() => handleSelectTeam(m.id, 'B')}
              />
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight Overlay */}
      {activeInsight && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-yellow-500/30 rounded-3xl p-6 max-w-xs relative shadow-[0_0_50px_rgba(234,179,8,0.1)]">
            <div className="w-12 h-12 bg-yellow-500 rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(234,179,8,0.4)]">
              <Sparkles size={24} className="text-black" />
            </div>
            <h3 className="text-xl font-black italic uppercase mb-2">Gemini Analysis</h3>
            <p className="text-zinc-300 text-sm leading-relaxed mb-6 italic">"{activeInsight}"</p>
            <button 
              onClick={() => setActiveInsight(null)}
              className="w-full py-3 bg-yellow-500 rounded-xl text-black font-black uppercase tracking-tight"
            >
              Got it, Coach
            </button>
          </div>
        </div>
      )}

      {/* Sticky CTA */}
      <div className="fixed bottom-24 left-0 right-0 max-w-md mx-auto px-4 z-40">
        <button 
          disabled={!allPicksDone}
          onClick={() => setIsSubmitted(true)}
          className={`w-full py-5 rounded-2xl font-black text-lg uppercase transition-all shadow-2xl ${
            allPicksDone 
            ? 'bg-yellow-500 text-black shadow-yellow-500/20 active:scale-[0.98]' 
            : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          {allPicksDone ? 'Submit Picks & Join' : 'Complete All Picks'}
        </button>
      </div>
    </div>
  );
};

const TeamButton = ({ name, odds, selected, onClick }: { name: string, odds: string, selected: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-xl border flex flex-col items-center gap-1 transition-all ${
      selected 
      ? 'bg-yellow-500 border-yellow-400 text-black' 
      : 'bg-zinc-800 border-zinc-700 text-white'
    }`}
  >
    <span className="text-xs font-black uppercase text-center line-clamp-1">{name}</span>
    <span className={`text-[10px] font-bold ${selected ? 'text-black/60' : 'text-zinc-500'}`}>{odds}</span>
  </button>
);
