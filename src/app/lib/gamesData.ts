import { COLORS } from './constants';

export interface TournamentEntry {
  name: string;
  date: string;
  placement: string;
  prize?: string;
  status: 'won' | 'runner-up' | 'top-5' | 'qualified' | 'participating';
}

export interface GameStats {
  ranking?: string;
  tournaments?: number;
  winRate?: string;
  specialNote?: string;
  totalEarnings?: string;
  currentStreak?: string;
  bestPlacement?: string;
}

export interface StrategyDocument {
  name: string;
  type: 'map-guide' | 'team-strategy' | 'playbook' | 'analysis';
  description: string;
  downloadUrl: string;
  size?: string;
  lastUpdated: string;
}

export interface Game {
  id: string;
  name: string;
  tagline: string;
  description: string;
  expandedDescription: string;
  logo: string;
  banner: string;
  color: string;
  gradient: string;
  achievements: string[];
  stats?: GameStats;
  features?: string[];
  tournamentHistory?: TournamentEntry[];
  strategyDocuments?: StrategyDocument[];
  primaryColor: string;
  secondaryColor: string;
}

export const GAMES_DATA: Game[] = [
  {
    id: 'cod',
    name: 'Call of Duty',
    tagline: 'First-person dominance.',
    description: 'ChaosBros has dominated every local CoD tournament since 2023. Our tactical approach and lightning-fast reflexes make us a force to be reckoned with in the competitive scene.',
    expandedDescription: 'Our Call of Duty division represents the pinnacle of tactical FPS gaming. Since establishing our CoD roster in early 2023, we\'ve built a reputation for strategic excellence and individual skill that sets us apart from the competition. Our team specializes in both Search & Destroy and respawn game modes, with particular strength in map control and objective-based gameplay. The squad\'s chemistry developed through countless hours of practice has resulted in seamless execution of complex strategies and clutch performances under pressure. With our current win streak and consistent tournament victories, ChaosBros CoD continues to raise the bar for competitive excellence in the region.',
    logo: '/assets/games/cod-logo.png',
    banner: '/assets/games/cod-banner.jpg',
    color: COLORS.games.cod,
    gradient: 'from-orange-500 to-red-600',
    primaryColor: '#f97316',
    secondaryColor: '#dc2626',
    achievements: [
      'Winners of Spring \'24 Regional LAN',
      'Redzone Clash Champions',
      'Undefeated Local Tournament Streak'
    ],
    stats: {
      ranking: '#1 Regional',
      tournaments: 8,
      winRate: '92%',
      specialNote: 'Dominant since 2023',
      totalEarnings: '$15,000',
      currentStreak: '12 wins',
      bestPlacement: '1st Place Regional'
    },
    features: [
      'Expert Map Control',
      'Coordinated Team Plays',
      'Clutch Performance'
    ],
    strategyDocuments: [
      {
        name: 'CoD Domination Strategy Guide',
        type: 'team-strategy',
        description: 'Complete guide to domination tactics and map control strategies',
        downloadUrl: '/assets/downloads/cod-domination-strategy.pdf',
        size: '2.4 MB',
        lastUpdated: '2024-03-15'
      },
      {
        name: 'Search & Destroy Playbook',
        type: 'playbook',
        description: 'Detailed playbook covering all SnD maps and site executions',
        downloadUrl: '/assets/downloads/cod-snd-playbook.pdf',
        size: '1.8 MB',
        lastUpdated: '2024-02-28'
      },
      {
        name: 'Respawn Mode Analysis',
        type: 'analysis',
        description: 'Statistical analysis of respawn patterns and positioning',
        downloadUrl: '/assets/downloads/cod-respawn-analysis.pdf',
        size: '1.2 MB',
        lastUpdated: '2024-01-20'
      }
    ],
    tournamentHistory: [
      {
        name: 'Spring \'24 Regional LAN',
        date: '2024-04-15',
        placement: '1st',
        prize: '$5,000',
        status: 'won'
      },
      {
        name: 'Redzone Clash',
        date: '2024-03-22',
        placement: '1st',
        prize: '$3,000',
        status: 'won'
      },
      {
        name: 'Winter Championships',
        date: '2024-01-10',
        placement: '1st',
        prize: '$2,500',
        status: 'won'
      },
      {
        name: 'Local Circuit Finals',
        date: '2023-12-05',
        placement: '1st',
        prize: '$2,000',
        status: 'won'
      },
      {
        name: 'Autumn Showdown',
        date: '2023-10-18',
        placement: '2nd',
        prize: '$1,500',
        status: 'runner-up'
      }
    ]
  },
  {
    id: 'valorant',
    name: 'Valorant',
    tagline: 'Precision meets teamwork.',
    description: 'Top-tier utility usage and crisp aim define our Valorant gameplay. Currently competing in VCT Open Qualifiers with strategic excellence and individual skill.',
    expandedDescription: 'ChaosBros\'s Valorant division embodies the perfect fusion of individual mechanical skill and coordinated team strategy. Our roster features some of the region\'s most talented duelists, controllers, and support players, each bringing unique strengths that complement our tactical approach. We\'ve developed signature strategies on key maps like Haven, Bind, and Ascent that have become our calling cards in competitive play. The team\'s ability to adapt mid-round and execute complex utility combinations has earned recognition from analysts and competitors alike. Currently grinding through VCT Open Qualifiers, our goal is to establish ChaosBros as a consistent threat in the highest levels of competitive Valorant.',
    logo: '/assets/games/valorant-logo.png',
    banner: '/assets/games/valorant-strat.jpg',
    color: COLORS.games.valorant,
    gradient: 'from-red-500 to-pink-600',
    primaryColor: '#ef4444',
    secondaryColor: '#ec4899',
    achievements: [
      'Competing in VCT Open Qualifiers',
      'Regional Semi-Finals 2024',
      'Best Utility Usage Award'
    ],
    stats: {
      ranking: 'Immortal+',
      tournaments: 12,
      winRate: '78%',
      specialNote: 'VCT Qualifying Team',
      totalEarnings: '$8,500',
      currentStreak: '7 wins',
      bestPlacement: 'VCT Qualifier Semi-Final'
    },
    features: [
      'Perfect Utility Timing',
      'Strategic Map Control',
      'Individual Skill Excellence'
    ],
    strategyDocuments: [
      {
        name: 'Valorant Map Control Guide',
        type: 'map-guide',
        description: 'Comprehensive guide to map control on Haven, Bind, and Ascent',
        downloadUrl: '/assets/downloads/valorant-map-control.pdf',
        size: '3.1 MB',
        lastUpdated: '2024-04-10'
      },
      {
        name: 'Utility Usage Masterclass',
        type: 'team-strategy',
        description: 'Advanced utility combinations and timing strategies',
        downloadUrl: '/assets/downloads/valorant-utility-guide.pdf',
        size: '2.7 MB',
        lastUpdated: '2024-03-25'
      },
      {
        name: 'Anti-Eco & Force Buy Analysis',
        type: 'analysis',
        description: 'Economic strategy and anti-eco round optimization',
        downloadUrl: '/assets/downloads/valorant-economy-analysis.pdf',
        size: '1.5 MB',
        lastUpdated: '2024-02-15'
      }
    ],
    tournamentHistory: [
      {
        name: 'VCT Open Qualifier #3',
        date: '2024-05-20',
        placement: 'Semi-Final',
        status: 'qualified'
      },
      {
        name: 'Regional Championship',
        date: '2024-04-28',
        placement: '2nd',
        prize: '$3,000',
        status: 'runner-up'
      },
      {
        name: 'Spring Valorant Cup',
        date: '2024-03-15',
        placement: '3rd',
        prize: '$1,500',
        status: 'top-5'
      },
      {
        name: 'Utility Masters',
        date: '2024-02-10',
        placement: '1st',
        prize: '$2,000',
        status: 'won'
      },
      {
        name: 'Winter Valorant League',
        date: '2024-01-25',
        placement: '4th',
        prize: '$500',
        status: 'top-5'
      }
    ]
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    tagline: 'Survival of the sharpest.',
    description: 'High-octane drop-ins and coordinated chaos. Our squad excels at fast-paced decision making and securing high-placement finishes in competitive tournaments.',
    expandedDescription: 'In the fast-paced world of Apex Legends, ChaosBros\'s squad has carved out a reputation for intelligent positioning and explosive team fights. Our three-player roster brings together complementary legends and playstyles that maximize both survival and elimination potential. We specialize in third-party engagements and late-game positioning, consistently securing high placements even in the most competitive lobbies. The team\'s communication and split-second decision making under pressure have led to memorable clutch moments and steady climb up the competitive rankings. While relatively new to the Apex scene compared to our other divisions, the rapid improvement and tournament consistency show tremendous promise for future success.',
    logo: '/assets/games/apex-logo.png',
    banner: '/assets/games/apex-banner.jpg',
    color: COLORS.games.apex,
    gradient: 'from-orange-500 to-yellow-600',
    primaryColor: '#f97316',
    secondaryColor: '#eab308',
    achievements: [
      'Top 10 in Chaos Cup',
      'Multiple High-Placement Finishes',
      'Squad Coordination Masters'
    ],
    stats: {
      ranking: 'Top 10',
      tournaments: 6,
      winRate: '65%',
      specialNote: 'Rising in Competitive Scene',
      totalEarnings: '$4,200',
      currentStreak: '5 top-10 finishes',
      bestPlacement: '3rd Place Chaos Cup'
    },
    features: [
      'Fast Decision Making',
      'Perfect Squad Coordination',
      'High-Pressure Performance'
    ],
    strategyDocuments: [
      {
        name: 'Apex Legends Positioning Guide',
        type: 'team-strategy',
        description: 'Advanced positioning and rotation strategies for battle royale',
        downloadUrl: '/assets/downloads/apex-positioning-guide.pdf',
        size: '2.8 MB',
        lastUpdated: '2024-04-05'
      },
      {
        name: 'Third-Party Engagement Manual',
        type: 'playbook',
        description: 'Timing and execution of third-party attacks',
        downloadUrl: '/assets/downloads/apex-third-party-manual.pdf',
        size: '2.1 MB',
        lastUpdated: '2024-03-20'
      },
      {
        name: 'Legend Composition Analysis',
        type: 'analysis',
        description: 'Meta analysis and optimal legend combinations',
        downloadUrl: '/assets/downloads/apex-legend-analysis.pdf',
        size: '1.6 MB',
        lastUpdated: '2024-02-10'
      }
    ],
    tournamentHistory: [
      {
        name: 'Chaos Cup 2024',
        date: '2024-05-12',
        placement: '3rd',
        prize: '$2,000',
        status: 'top-5'
      },
      {
        name: 'Legends Tournament',
        date: '2024-04-08',
        placement: '5th',
        prize: '$800',
        status: 'top-5'
      },
      {
        name: 'Battle Royale Masters',
        date: '2024-03-18',
        placement: '7th',
        prize: '$400',
        status: 'top-5'
      },
      {
        name: 'Spring BR Championship',
        date: '2024-02-28',
        placement: '8th',
        status: 'top-5'
      },
      {
        name: 'Apex Invitational',
        date: '2024-01-20',
        placement: '12th',
        status: 'participating'
      }
    ]
  },
  {
    id: 'halo',
    name: 'Halo',
    tagline: 'Classic arena combat.',
    description: 'Returning to our roots with classic Halo gameplay. Precision shooting and map control define our approach to this legendary franchise.',
    expandedDescription: 'ChaosBros honors the legacy of arena shooters through our Halo division. Drawing from years of FPS experience across multiple titles, our team brings tactical sophistication to classic arena combat. We excel at weapon control, map positioning, and the precise timing that makes Halo unique among competitive shooters. While our Halo presence is growing, the fundamentals that drive our success in other titles translate perfectly to Master Chief\'s domain. From Team Slayer to Capture the Flag, we approach each game mode with the strategic depth that defines ChaosBros gameplay.',
    logo: '/assets/games/halo-logo.png', // Placeholder
    banner: '/assets/games/halo-banner.png', // Placeholder  
    color: COLORS.games.halo,
    gradient: 'from-blue-500 to-cyan-600',
    primaryColor: '#0066cc',
    secondaryColor: '#0891b2',
    achievements: [
      'Arena Masters',
      'Classic FPS Expertise',
      'Weapon Control Specialists'
    ],
    stats: {
      ranking: 'Rising',
      tournaments: 3,
      winRate: '72%',
      specialNote: 'Classic Arena Excellence',
      totalEarnings: '$1,800',
      currentStreak: '4 wins',
      bestPlacement: '2nd Place Regional'
    },
    features: [
      'Classic Arena Combat',
      'Weapon Control Mastery',
      'Map Positioning Excellence'
    ],
    strategyDocuments: [
      {
        name: 'Halo Arena Control Guide',
        type: 'map-guide',
        description: 'Classic arena map control and weapon timing strategies',
        downloadUrl: '/assets/downloads/halo-arena-guide.pdf',
        size: '2.2 MB',
        lastUpdated: '2024-03-30'
      },
      {
        name: 'Weapon Spawn Timing Manual',
        type: 'team-strategy',
        description: 'Power weapon control and timing optimization',
        downloadUrl: '/assets/downloads/halo-weapon-timing.pdf',
        size: '1.9 MB',
        lastUpdated: '2024-03-15'
      }
    ],
    tournamentHistory: [
      {
        name: 'Regional Arena Championship',
        date: '2024-04-22',
        placement: '2nd',
        prize: '$1,000',
        status: 'runner-up'
      },
      {
        name: 'Classic FPS Tournament',
        date: '2024-03-12',
        placement: '1st',
        prize: '$800',
        status: 'won'
      },
      {
        name: 'Halo Masters Cup',
        date: '2024-02-18',
        placement: '3rd',
        status: 'top-5'
      }
    ]
  }
];

// Helper functions for games data
export const getGameById = (id: string): Game | undefined => {
  return GAMES_DATA.find(game => game.id === id);
};

export const getGamesByFeature = (feature: string): Game[] => {
  return GAMES_DATA.filter(game => 
    game.features?.some(f => f.toLowerCase().includes(feature.toLowerCase()))
  );
};

export const getAllGameNames = (): string[] => {
  return GAMES_DATA.map(game => game.name);
}; 