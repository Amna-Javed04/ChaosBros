// ChaosBro Brand Colors - Updated for new brand identity
export const COLORS = {
  // Primary brand colors - Updated to match new theme
  primary: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
  
  // Dark theme colors - matte black, gunmetal theme
  dark: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#3f3f46',
    300: '#27272a',
    400: '#18181b',
    500: '#0f0f0f',
    600: '#0a0a0a',
    700: '#070707',
    800: '#050505',
    900: '#000000',
    950: '#000000',
  },
  
  // Accent colors - bold red/blue accents as specified
  accent: {
    blue: '#0066ff',
    purple: '#8b5cf6',
    pink: '#ec4899',
    orange: '#f97316',
    red: '#ff0000',
    yellow: '#eab308',
    chaos_red: '#ff0033',
    chaos_blue: '#0066ff',
    gunmetal: '#2c3539',
    crt_green: '#00ff41',
  },
  
  // Game-specific colors
  games: {
    cod: '#ff6b35',
    valorant: '#ff4655',
    apex: '#ff6600',
    halo: '#0066cc',
  },
} as const;

// Spacing scale for consistent layouts
export const SPACING = {
  xs: '0.25rem', // 4px
  sm: '0.5rem',  // 8px
  md: '1rem',    // 16px
  lg: '1.5rem',  // 24px
  xl: '2rem',    // 32px
  '2xl': '3rem', // 48px
  '3xl': '4rem', // 64px
  '4xl': '6rem', // 96px
  '5xl': '8rem', // 128px
} as const;

// Consistent border radius values
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

// Box shadow presets
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  
  // Neon glow effects
  neon: {
    sm: '0 0 10px rgba(0, 255, 170, 0.3)',
    md: '0 0 20px rgba(0, 255, 170, 0.4)',
    lg: '0 0 30px rgba(0, 255, 170, 0.5)',
    xl: '0 0 40px rgba(0, 255, 170, 0.6)',
  },
  
  // Colored shadows
  colored: {
    primary: '0 0 20px rgba(0, 255, 170, 0.3)',
    blue: '0 0 20px rgba(0, 212, 255, 0.3)',
    purple: '0 0 20px rgba(139, 92, 246, 0.3)',
    pink: '0 0 20px rgba(236, 72, 153, 0.3)',
  },
} as const;

// Responsive breakpoints
export const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  '3xl': '1600px',
} as const;

// Font weights
export const FONT_WEIGHTS = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

// Z-index scale
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Animation durations
export const ANIMATION = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms',
  },
  easing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Common CSS class combinations
export const COMMON_CLASSES = {
  // Flex layouts
  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexStart: 'flex items-center justify-start',
  flexEnd: 'flex items-center justify-end',
  flexCol: 'flex flex-col',
  flexColCenter: 'flex flex-col items-center justify-center',
  
  // Positioning
  absolute: 'absolute',
  relative: 'relative',
  fixed: 'fixed',
  sticky: 'sticky',
  
  // Sizing
  fullWidth: 'w-full',
  fullHeight: 'h-full',
  fullSize: 'w-full h-full',
  
  // Transitions
  transition: 'transition-all duration-300 ease-in-out',
  transitionFast: 'transition-all duration-150 ease-in-out',
  transitionSlow: 'transition-all duration-500 ease-in-out',
  
  // Hover effects
  hoverScale: 'hover:scale-105 transition-transform duration-200',
  hoverLift: 'hover:-translate-y-1 transition-transform duration-200',
  hoverGlow: 'hover:shadow-lg hover:shadow-primary-500/20 transition-shadow duration-200',
} as const;

// API endpoints (for future use)
export const API_ENDPOINTS = {
  contact: '/api/contact',
  newsletter: '/api/newsletter',
  volunteer: '/api/volunteer',
  careers: '/api/careers',
} as const;

// Company information - Updated based on content.md
export const COMPANY_INFO = {
  name: 'ChaosBros',
  tagline: 'From the arcade to the arena – Chaos never dies. DFW\'s elite esports strike squad.',
  motto: 'Precision. Power. Brotherhood.',
  description: 'ChaosBros began in LAN cafés and local arcades, rising from controller-clashing brawls to dominating the digital battlefield. We\'re not just players—we\'re tacticians, engineers of win conditions, and protectors of gamer code.',
  location: 'Dallas–Fort Worth, Texas',
  founded: '2023',
  coreGames: ['CoD', 'Valorant', 'Apex', 'Halo'],
  email: 'contact@chaosbros.gg',
  phone: '+1 (214) 555-CHAOS',
} as const;

// Social media links - Updated
export const SOCIAL_LINKS = {
  discord: process.env.NEXT_PUBLIC_DISCORD_INVITE_URL || 'https://discord.gg/chaosbros',
  twitch: process.env.NEXT_PUBLIC_TWITCH_URL || 'https://twitch.tv/chaosbros',
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@chaosbros',
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com/chaos_bros',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/chaosbros_esports',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@chaosbros',
} as const;

// Team roles - Updated
export const TEAM_ROLES = {
  leader: 'Team Captain',
  sniper: 'Entry Fragger',
  support: 'Support Specialist', 
  coach: 'Strategic Coach',
  igl: 'In-Game Leader',
  fragger: 'Fragger',
  anchor: 'Anchor',
} as const;

// Navigation items - Updated
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'Team', href: '#team' },
  { label: 'Games', href: '#games' },
  { label: 'Media', href: '#media' },
  { label: 'Shop', href: '#shop' },
  { label: 'Contact', href: '#contact' },
] as const;

// Games configuration
export const GAMES = {
  cod: {
    name: 'Call of Duty',
    color: COLORS.games.cod,
    icon: '🎯',
  },
  valorant: {
    name: 'Valorant',
    color: COLORS.games.valorant,
    icon: '🔥',
  },
  apex: {
    name: 'Apex Legends',
    color: COLORS.games.apex,
    icon: '⚡',
  },
} as const; 