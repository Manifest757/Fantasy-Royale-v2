
import React from 'react';
import { Trophy, Users, BarChart3, User, ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentRole: 'PLAYER' | 'SPONSOR';
  onRoleChange: (role: 'PLAYER' | 'SPONSOR') => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, currentRole, onRoleChange }) => {
  return (
    <div className="min-h-screen bg-black flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-zinc-800 bg-black sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-tr from-yellow-500 to-yellow-200 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(234,179,8,0.3)]">
            <Trophy className="text-black w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight italic">FANTASY ROYALE</h1>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-[0.2em]">Play for Glory</p>
          </div>
        </div>
        
        <button 
          onClick={() => onRoleChange(currentRole === 'PLAYER' ? 'SPONSOR' : 'PLAYER')}
          className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-bold text-zinc-300 hover:bg-zinc-700 transition-colors flex items-center gap-2"
        >
          {currentRole === 'PLAYER' ? <Users size={14} /> : <ShieldCheck size={14} />}
          {currentRole === 'PLAYER' ? 'Partner Mode' : 'Switch to Fan'}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-zinc-950 border-t border-zinc-800 py-4 px-6 flex justify-between items-center z-50">
        <NavItem icon={<Trophy size={24} />} label="Home" active />
        <NavItem icon={<BarChart3 size={24} />} label="Stats" />
        <NavItem icon={<Users size={24} />} label="Social" />
        <NavItem icon={<User size={24} />} label="Profile" />
      </nav>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-yellow-500' : 'text-zinc-500 hover:text-white'}`}>
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);
