
import { Contest, SponsorTier, Matchup } from '../types';

export const MOCK_CONTESTS: Contest[] = [
  {
    id: 'c1',
    title: 'Super Bowl LX Premier Challenge',
    sponsor: 'Nike',
    tier: SponsorTier.PREMIER,
    sport: 'NFL',
    participants: 45200,
    prizePool: '$50,000 + Custom Sneakers',
    status: 'ACTIVE',
    description: 'The ultimate NFL showdown. Pick the winner, MVP, and props for a chance at glory.',
    deadline: '2026-02-08T18:30:00Z'
  },
  {
    id: 'c2',
    title: 'March Madness Local Legend',
    sponsor: 'Buffalo Wild Wings - Downtown',
    tier: SponsorTier.LOCAL,
    sport: 'MARCH_MADNESS',
    participants: 850,
    prizePool: '$250 Gift Card',
    status: 'ACTIVE',
    description: 'Perfect your bracket and win big at your favorite local wing spot.',
    deadline: '2026-03-19T12:00:00Z'
  },
  {
    id: 'c3',
    title: 'Sales Dept. NBA Playoff Pool',
    sponsor: 'TechCorp HR',
    tier: SponsorTier.OFFICE,
    sport: 'NBA',
    participants: 124,
    prizePool: 'Extra Vacation Day',
    status: 'ACTIVE',
    description: 'Strictly for TechCorp employees. Bragging rights and an extra day off up for grabs!',
    deadline: '2026-04-15T19:00:00Z'
  }
];

export const MOCK_MATCHUPS: Matchup[] = [
  {
    id: 'm1',
    teamA: 'Kansas City Chiefs',
    teamB: 'Philadelphia Eagles',
    oddsA: '-3.5',
    oddsB: '+3.5',
    startTime: 'Sunday 6:30 PM'
  },
  {
    id: 'm2',
    teamA: 'San Francisco 49ers',
    teamB: 'Detroit Lions',
    oddsA: '-7.0',
    oddsB: '+7.0',
    startTime: 'Sunday 3:00 PM'
  },
  {
    id: 'm3',
    teamA: 'Baltimore Ravens',
    teamB: 'Houston Texans',
    oddsA: '-1.5',
    oddsB: '+1.5',
    startTime: 'Saturday 4:30 PM'
  }
];
