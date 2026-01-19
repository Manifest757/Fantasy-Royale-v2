
import React, { useState } from 'react';
import { Plus, BarChart3, LayoutTemplate, Settings, Zap, Globe, Lock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_ANALYTICS = [
  { name: 'Mon', entries: 400 },
  { name: 'Tue', entries: 1200 },
  { name: 'Wed', entries: 900 },
  { name: 'Thu', entries: 1700 },
  { name: 'Fri', entries: 2400 },
  { name: 'Sat', entries: 3800 },
  { name: 'Sun', entries: 4200 },
];

export const SponsorPortal: React.FC = () => {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="p-4 space-y-6">
      {/* Brand Profile */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-2">
            <img src="https://picsum.photos/48/48?grayscale" alt="Brand Logo" className="rounded-full" />
          </div>
          <div>
            <h2 className="text-xl font-black italic uppercase">NIKE GLOBAL</h2>
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 bg-yellow-500 text-black font-black rounded-full uppercase">Premier Tier</span>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">Active Partner</span>
            </div>
          </div>
        </div>
        <button className="p-2 bg-zinc-900 rounded-full border border-zinc-800 text-zinc-400">
          <Settings size={20} />
        </button>
      </div>

      {/* Stats Dashboard */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-black uppercase text-zinc-500">Global Engagement</h3>
          <span className="text-green-500 text-[10px] font-black uppercase">+12.5% vs Last Week</span>
        </div>
        
        <div className="h-40 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_ANALYTICS}>
              <defs>
                <linearGradient id="colorEntries" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="entries" 
                stroke="#EAB308" 
                fillOpacity={1} 
                fill="url(#colorEntries)" 
                strokeWidth={3}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                itemStyle={{ color: '#EAB308', fontWeight: 'bold' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-800">
          <div>
            <p className="text-[8px] font-black text-zinc-500 uppercase">Total Entries</p>
            <p className="text-xl font-black">45.2K</p>
          </div>
          <div>
            <p className="text-[8px] font-black text-zinc-500 uppercase">Est. Impression</p>
            <p className="text-xl font-black">1.2M</p>
          </div>
        </div>
      </section>

      {/* Action Grid */}
      <section className="grid grid-cols-2 gap-3">
        <PortalAction 
          icon={<Plus className="text-black" />} 
          label="New Contest" 
          sub="Build & Launch" 
          highlight 
          onClick={() => setShowWizard(true)} 
        />
        <PortalAction icon={<LayoutTemplate size={20} />} label="Templates" sub="Pre-built formats" />
        <PortalAction icon={<Globe size={20} />} label="Landing Pages" sub="Public Assets" />
        <PortalAction icon={<Lock size={20} />} label="Office Access" sub="Private Hubs" />
      </section>

      {/* Active Contests List */}
      <section>
        <h3 className="text-xs font-black uppercase text-zinc-500 mb-3">Your Live Events</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-black italic uppercase">Super Bowl Premier</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">Ends Feb 8, 2026</p>
            </div>
          </div>
          <button className="text-[10px] font-black uppercase text-yellow-500 px-3 py-1 bg-yellow-500/10 rounded-lg">Manage</button>
        </div>
      </section>

      {/* Wizard Modal Overlay (Simulated) */}
      {showWizard && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black italic uppercase">Contest Builder</h2>
            <button onClick={() => setShowWizard(false)} className="text-zinc-500 font-bold uppercase">Cancel</button>
          </div>
          
          <div className="flex-1 space-y-8">
            <Step number={1} title="Choose Event" desc="Select from major sports calendars." active />
            <Step number={2} title="Pick Format" desc="Bracket, Pick'em, or Survivor." />
            <Step number={3} title="Brand & Prize" desc="Custom logos & giveaway details." />
          </div>

          <button className="w-full py-5 bg-yellow-500 text-black font-black uppercase rounded-2xl shadow-xl shadow-yellow-500/20">
            Next: Select League
          </button>
        </div>
      )}
    </div>
  );
};

const PortalAction = ({ icon, label, sub, highlight = false, onClick }: { icon: React.ReactNode, label: string, sub: string, highlight?: boolean, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-4 rounded-2xl text-left border flex flex-col gap-1 transition-all active:scale-[0.98] ${
      highlight ? 'bg-yellow-500 border-yellow-400 text-black' : 'bg-zinc-900 border-zinc-800 text-white'
    }`}
  >
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-1 ${highlight ? 'bg-black/10' : 'bg-zinc-800'}`}>
      {icon}
    </div>
    <span className="text-xs font-black uppercase leading-none mt-1">{label}</span>
    <span className={`text-[8px] font-bold uppercase opacity-60`}>{sub}</span>
  </button>
);

const Step = ({ number, title, desc, active = false }: { number: number, title: string, desc: string, active?: boolean }) => (
  <div className={`flex gap-4 items-start ${active ? 'opacity-100' : 'opacity-40'}`}>
    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 font-black ${active ? 'border-yellow-500 text-yellow-500 bg-yellow-500/10' : 'border-zinc-800 text-zinc-500'}`}>
      {number}
    </div>
    <div>
      <h4 className="text-lg font-black italic uppercase leading-tight">{title}</h4>
      <p className="text-sm font-medium text-zinc-500">{desc}</p>
    </div>
  </div>
);
