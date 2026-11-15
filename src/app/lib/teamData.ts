import { TEAM_ROLES, SOCIAL_LINKS } from './constants';

export interface TeamMember {
  id: string;
  gamerTag: string;
  realName: string;
  role: string;
  specialty?: string;
  favoriteClassicGame?: string;
  bio: string;
  avatar: string;
  socials: {
    twitch?: string;
    twitter?: string;
    instagram?: string;
  };
  achievements?: string[];
  stats?: {
    kd?: number;
    winRate?: string;
    favoriteGame?: string;
  };
}

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'shadowzero',
    gamerTag: 'ShadowZero',
    realName: 'Marcus Rodriguez',
    role: TEAM_ROLES.sniper, // Entry Fragger
    specialty: 'Close-quarters elimination',
    favoriteClassicGame: 'GoldenEye 007',
    bio: 'Master of entry fragging with lightning-fast reflexes and tactical precision. ShadowZero specializes in opening up sites and creating opportunities for the team with aggressive yet calculated plays.',
    avatar: '/assets/team/jinx.jpg', // Reusing existing image
    socials: {
      twitch: `${SOCIAL_LINKS.twitch}/shadowzero`,
      twitter: `${SOCIAL_LINKS.twitter}/shadowzero_chaos`,
      instagram: `${SOCIAL_LINKS.instagram}/shadowzero.chaos`,
    },
    achievements: [
      'Entry Frag Master 2024',
      'Fastest Site Takes Record',
      'Tournament Opener x5'
    ],
    stats: {
      kd: 2.3,
      winRate: '81%',
      favoriteGame: 'Call of Duty'
    }
  },
  {
    id: 'volt',
    gamerTag: 'VOLT',
    realName: 'Ryan Chen',
    role: TEAM_ROLES.sniper,
    specialty: 'Long-range precision',
    favoriteClassicGame: 'Counter-Strike 1.6',
    bio: 'Precision personified. Lightning-fast reflexes and deadly accuracy make VOLT our go-to sharpshooter in any high-stakes situation.',
    avatar: '/assets/team/volt.jpg',
    socials: {
      twitch: `${SOCIAL_LINKS.twitch}/volt`,
      twitter: `${SOCIAL_LINKS.twitter}/volt_snipes`,
      instagram: `${SOCIAL_LINKS.instagram}/volt.gaming`,
    },
    achievements: [
      'Highest K/D Ratio 2024',
      'Ace Master (50+ aces)',
      'Sniper Elite Award'
    ],
    stats: {
      kd: 2.1,
      winRate: '68%',
      favoriteGame: 'Call of Duty'
    }
  },
  {
    id: 'raze',
    gamerTag: 'RAZE',
    realName: 'Tariq Qureshi',
    role: TEAM_ROLES.support,
    specialty: 'Tactical utility',
    favoriteClassicGame: 'Quake III Arena',
    bio: 'The backbone of ChaosBros. Expert at utility usage and team support, always ensuring the team has what they need to secure the win.',
    avatar: '/assets/team/raze.jpg',
    socials: {
      twitch: `${SOCIAL_LINKS.twitch}/raze`,
      twitter: `${SOCIAL_LINKS.twitter}/raze_support`,
      instagram: `${SOCIAL_LINKS.instagram}/raze.chaos`,
    },
    achievements: [
      'Best Support Player 2024',
      'Team Player Award',
      'Clutch Master x15'
    ],
    stats: {
      kd: 1.4,
      winRate: '71%',
      favoriteGame: 'Apex Legends'
    }
  },
  {
    id: 'sage',
    gamerTag: 'SAGE',
    realName: 'Emily Nguyen',
    role: TEAM_ROLES.coach,
    specialty: 'Strategic analysis',
    favoriteClassicGame: 'StarCraft: Brood War',
    bio: 'Former pro player turned strategic coach. Brings years of competitive experience and analytical expertise to guide ChaosBros to victory.',
    avatar: '/assets/team/sage.jpg',
    socials: {
      twitch: `${SOCIAL_LINKS.twitch}/sage`,
      twitter: `${SOCIAL_LINKS.twitter}/sage_coach`,
      instagram: `${SOCIAL_LINKS.instagram}/sage.strategy`,
    },
    achievements: [
      'Former Pro Player',
      'Coach of the Year 2023',
      'Strategy Innovation Award'
    ],
    stats: {
      winRate: '85%',
      favoriteGame: 'Strategy Analysis'
    }
  }
];

// Helper functions for team data
export const getTeamMemberById = (id: string): TeamMember | undefined => {
  return TEAM_DATA.find(member => member.id === id);
};

export const getTeamMembersByRole = (role: string): TeamMember[] => {
  return TEAM_DATA.filter(member => member.role === role);
};

export const getAllRoles = (): string[] => {
  return Array.from(new Set(TEAM_DATA.map(member => member.role)));
}; 