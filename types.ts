
export enum SponsorTier {
  PREMIER = 'PREMIER',
  LOCAL = 'LOCAL',
  OFFICE = 'OFFICE',
  FREE = 'FREE'
}

export interface Contest {
  id: string;
  title: string;
  sponsor: string;
  tier: SponsorTier;
  sport: 'NFL' | 'NBA' | 'MLB' | 'MARCH_MADNESS';
  participants: number;
  prizePool: string;
  status: 'ACTIVE' | 'UPCOMING' | 'COMPLETED';
  description: string;
  deadline: string;
}

export interface Matchup {
  id: string;
  teamA: string;
  teamB: string;
  oddsA: string;
  oddsB: string;
  startTime: string;
  selectedTeamId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'PLAYER' | 'SPONSOR' | 'ADMIN';
  tier?: SponsorTier;
  totalPoints: number;
  rank: number;
}
