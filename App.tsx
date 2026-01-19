
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { PlayerDashboard } from './components/PlayerDashboard';
import { SponsorPortal } from './components/SponsorPortal';
import { ContestView } from './components/ContestView';
import { Contest } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'PLAYER' | 'SPONSOR'>('PLAYER');
  const [activeContest, setActiveContest] = useState<Contest | null>(null);

  const renderContent = () => {
    if (activeContest) {
      return (
        <ContestView 
          contest={activeContest} 
          onBack={() => setActiveContest(null)} 
        />
      );
    }

    return view === 'PLAYER' ? (
      <PlayerDashboard onSelectContest={setActiveContest} />
    ) : (
      <SponsorPortal />
    );
  };

  return (
    <Layout currentRole={view} onRoleChange={setView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
