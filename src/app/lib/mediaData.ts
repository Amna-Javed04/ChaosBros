// Media data structure for the ChaosBro website
export interface VideoData {
  id: string;
  title: string;
  description: string;
  embedUrl: string;
  thumbnail?: string; // Optional - will auto-generate from YouTube embed if not provided
  duration?: string;
  uploadDate: string;
  category: 'highlight' | 'tournament' | 'bts' | 'training';
  game?: string;
  views?: number;
}

export interface PhotoData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnail: string;
  uploadDate: string;
  category: 'team' | 'tournament' | 'training' | 'event' | 'bts';
  location?: string;
  photographer?: string;
}

export interface MediaCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Video data from requirements
export const VIDEOS_DATA: VideoData[] = [
  {
    id: 'valorant-qualifier-final',
    title: 'Final Killcam - Valorant Qualifier',
    description: 'The clutch moment that secured our spot in the VCT Open Qualifiers. JINX delivers a masterclass in tactical gameplay.',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    duration: '3:42',
    uploadDate: '2024-03-15',
    category: 'highlight',
    game: 'Valorant',
    views: 15420,
  },
  {
    id: 'team-bootcamp-bts',
    title: 'Team Bootcamp BTS',
    description: 'Behind the scenes footage from our intensive training camp. See how ChaosBro prepares for major tournaments.',
    embedUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4',
    duration: '8:15',
    uploadDate: '2024-02-28',
    category: 'bts',
    views: 8930,
  },
  {
    id: 'apex-chaos-cup-highlights',
    title: 'Apex Legends - Chaos Cup Victory',
    description: 'Our journey to the top 10 in the Chaos Cup. High-octane gameplay and strategic team coordination.',
    embedUrl: 'https://www.youtube.com/embed/jZOywn1qArI',
    duration: '5:23',
    uploadDate: '2024-01-20',
    category: 'highlight',
    game: 'Apex Legends',
    views: 12800,
  },
  {
    id: 'cod-spring-lan-finals',
    title: 'Call of Duty - Spring LAN 2024 Finals',
    description: 'The match that made us champions. Every moment from our historic Spring LAN victory.',
    embedUrl: 'https://www.youtube.com/embed/LXb3EKWsInQ',
    duration: '12:07',
    uploadDate: '2024-04-10',
    category: 'tournament',
    game: 'Call of Duty',
    views: 23500,
  },
  {
    id: 'training-routine-deep-dive',
    title: 'Inside ChaosBro Training Routine',
    description: 'A deep dive into our daily training regimen, strategy sessions, and team building exercises.',
    embedUrl: 'https://www.youtube.com/embed/ysz5S6PUM-U',
    duration: '6:30',
    uploadDate: '2024-03-01',
    category: 'training',
    views: 5670,
  },
];

// Photo data
export const PHOTOS_DATA: PhotoData[] = [
  {
    id: 'team-lan-event-2024',
    title: 'Spring LAN Event 2024',
    description: 'The moment we claimed victory at the Spring LAN tournament. Pure joy and team spirit captured.',
    imageUrl: '/assets/media/team-lan-event.jpg',
    thumbnail: '/assets/media/team-lan-event.jpg',
    uploadDate: '2024-04-10',
    category: 'tournament',
    location: 'Gaming Arena, Karachi',
    photographer: 'ESports Photography Pro',
  },
  {
    id: 'hq-training-session',
    title: 'Intensive Training Session',
    description: 'Our state-of-the-art training facility where legends are forged. Focus, dedication, and precision.',
    imageUrl: '/assets/media/hq-training.jpg',
    thumbnail: '/assets/media/hq-training.jpg',
    uploadDate: '2024-03-05',
    category: 'training',
    location: 'ChaosBro HQ',
  },
  {
    id: 'team-photo-official',
    title: 'Official Team Photo 2024',
    description: 'The current ChaosBro roster in our signature gaming setup. Ready to take on any challenge.',
    imageUrl: '/assets/team/team-group-photo.jpg',
    thumbnail: '/assets/team/team-group-photo.jpg',
    uploadDate: '2024-01-15',
    category: 'team',
    location: 'ChaosBro HQ',
    photographer: 'Studio Vision',
  },
  {
    id: 'valorant-strategy-session',
    title: 'Valorant Strategy Planning',
    description: 'Behind the scenes of our tactical preparation. Every detail matters in competitive gaming.',
    imageUrl: '/assets/games/valorant-strat.jpg',
    thumbnail: '/assets/games/valorant-strat.jpg',
    uploadDate: '2024-02-20',
    category: 'bts',
    location: 'Strategy Room',
  },
  {
    id: 'community-event-watchparty',
    title: 'Community Watch Party',
    description: 'Our monthly community gathering where fans and team come together to watch major tournaments.',
    imageUrl: '/assets/events/watchparty.jpg',
    thumbnail: '/assets/events/watchparty.jpg',
    uploadDate: '2024-03-25',
    category: 'event',
    location: 'Gaming Cafe Central',
  },
  {
    id: 'apex-tournament-prep',
    title: 'Apex Legends Tournament Prep',
    description: 'Final preparations before the big tournament. Mental focus and physical readiness in perfect harmony.',
    imageUrl: '/assets/games/apex-banner.jpg',
    thumbnail: '/assets/games/apex-banner.jpg',
    uploadDate: '2024-01-18',
    category: 'tournament',
    location: 'Tournament Venue',
  },
];

// Media categories for filtering
export const MEDIA_CATEGORIES: MediaCategory[] = [
  {
    id: 'all',
    name: 'All Media',
    description: 'View all videos and photos',
    icon: 'Grid3X3',
  },
  {
    id: 'videos',
    name: 'Videos',
    description: 'Match highlights, tournaments, and behind the scenes videos',
    icon: 'Video',
  },
  {
    id: 'photos',
    name: 'Photos',
    description: 'Team photos, event coverage, and training sessions',
    icon: 'Image',
  },
  {
    id: 'bts',
    name: 'Behind the Scenes',
    description: 'Exclusive content showing life behind the competitive scene',
    icon: 'Eye',
  },
];

// Helper functions
export const getVideosByCategory = (category: string): VideoData[] => {
  if (category === 'all') return VIDEOS_DATA;
  return VIDEOS_DATA.filter(video => video.category === category);
};

export const getPhotosByCategory = (category: string): PhotoData[] => {
  if (category === 'all') return PHOTOS_DATA;
  return PHOTOS_DATA.filter(photo => photo.category === category);
};

export const getVideoById = (id: string): VideoData | undefined => {
  return VIDEOS_DATA.find(video => video.id === id);
};

export const getPhotoById = (id: string): PhotoData | undefined => {
  return PHOTOS_DATA.find(photo => photo.id === id);
};

export const getTotalMediaCount = (): { videos: number; photos: number; total: number } => {
  return {
    videos: VIDEOS_DATA.length,
    photos: PHOTOS_DATA.length,
    total: VIDEOS_DATA.length + PHOTOS_DATA.length,
  };
}; 