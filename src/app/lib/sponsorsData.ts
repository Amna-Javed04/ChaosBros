export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  tier: 'title' | 'presenting' | 'official' | 'supporting';
  description: string;
  sponsorSince: string;
  testimonial?: {
    quote: string;
    author: string;
    position: string;
  };
}

export interface SponsorTier {
  id: string;
  name: string;
  color: string;
  benefits: string[];
  price: string;
  popular?: boolean;
}

export interface SponsorTestimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  avatar?: string;
}

// Current Sponsors Data
export const currentSponsors: Sponsor[] = [
  {
    id: 'alienware',
    name: 'Alienware',
    logo: '/assets/sponsors/alienware.svg',
    website: 'https://www.alienware.com',
    tier: 'title',
    description: 'Powering our gaming setups with cutting-edge technology and unmatched performance.',
    sponsorSince: '2023',
    testimonial: {
      quote: "ChaosBro represents the future of competitive gaming. Their dedication and skill level aligns perfectly with our commitment to excellence.",
      author: "Sarah Chen",
      position: "Gaming Partnership Manager"
    }
  },
  {
    id: 'redbull',
    name: 'Red Bull',
    logo: '/assets/sponsors/redbull.svg',
    website: 'https://www.redbull.com',
    tier: 'presenting',
    description: 'Fueling our energy and focus during intense training sessions and tournaments.',
    sponsorSince: '2024',
    testimonial: {
      quote: "The team's explosive playstyle and creative strategies embody the Red Bull spirit. They give wings to esports.",
      author: "Marcus Rodriguez",
      position: "Esports Director"
    }
  }
];

// Sponsor Tier System
export const sponsorTiers: SponsorTier[] = [
  {
    id: 'title',
    name: 'Title Sponsor',
    color: 'from-yellow-400 to-orange-500',
    benefits: [
      'Logo on team jerseys and all equipment',
      'Naming rights for major tournaments',
      'Exclusive content creation partnerships',
      'Custom product integrations',
      'VIP access to all events',
      'Monthly strategy meetings',
      'Co-branded merchandise opportunities',
      'Social media takeover events'
    ],
    price: 'Custom Package',
    popular: false
  },
  {
    id: 'presenting',
    name: 'Presenting Sponsor',
    color: 'from-emerald-400 to-teal-500',
    benefits: [
      'Logo placement on team gear',
      'Stream overlay integration',
      'Tournament presenting rights',
      'Quarterly content collaborations',
      'Event hospitality packages',
      'Product showcase opportunities',
      'Community engagement campaigns'
    ],
    price: '$25,000/year',
    popular: true
  },
  {
    id: 'official',
    name: 'Official Partner',
    color: 'from-blue-400 to-indigo-500',
    benefits: [
      'Website logo placement',
      'Social media mentions',
      'Monthly highlight reels',
      'Event booth space',
      'Team meet & greet access',
      'Newsletter features'
    ],
    price: '$10,000/year',
    popular: false
  },
  {
    id: 'supporting',
    name: 'Supporting Partner',
    color: 'from-purple-400 to-pink-500',
    benefits: [
      'Social media shoutouts',
      'Website partner listing',
      'Event program inclusion',
      'Community Discord access',
      'Annual appreciation event'
    ],
    price: '$5,000/year',
    popular: false
  }
];

// Sponsor Testimonials
export const sponsorTestimonials: SponsorTestimonial[] = [
  {
    id: '1',
    quote: "Partnering with ChaosBro has been incredible. Their professionalism and fan engagement exceed our expectations every tournament.",
    author: "David Kim",
    position: "Marketing Director",
    company: "TechGear Pro",
    avatar: "/assets/testimonials/david-kim.jpg"
  },
  {
    id: '2',
    quote: "The ROI on our sponsorship has been outstanding. ChaosBro delivers authentic brand integration that resonates with the gaming community.",
    author: "Lisa Zhang",
    position: "Brand Manager",
    company: "Energy Plus",
    avatar: "/assets/testimonials/lisa-zhang.jpg"
  },
  {
    id: '3',
    quote: "Working with ChaosBro is seamless. They understand sponsor needs and consistently deliver creative campaigns that drive results.",
    author: "James Mitchell",
    position: "Partnerships Lead",
    company: "Gaming Accessories Co",
    avatar: "/assets/testimonials/james-mitchell.jpg"
  }
];

// Form Configuration
export const sponsorFormFields = {
  company: {
    label: 'Company Name',
    type: 'text',
    required: true,
    placeholder: 'Your company name'
  },
  contactName: {
    label: 'Contact Person',
    type: 'text',
    required: true,
    placeholder: 'Your full name'
  },
  email: {
    label: 'Email Address',
    type: 'email',
    required: true,
    placeholder: 'your.email@company.com'
  },
  phone: {
    label: 'Phone Number',
    type: 'tel',
    required: false,
    placeholder: '+1 (555) 123-4567'
  },
  website: {
    label: 'Company Website',
    type: 'url',
    required: false,
    placeholder: 'https://yourcompany.com'
  },
  sponsorshipTier: {
    label: 'Interested Sponsorship Tier',
    type: 'select',
    required: true,
    options: [
      { value: '', label: 'Select a tier' },
      { value: 'title', label: 'Title Sponsor' },
      { value: 'presenting', label: 'Presenting Sponsor' },
      { value: 'official', label: 'Official Partner' },
      { value: 'supporting', label: 'Supporting Partner' },
      { value: 'custom', label: 'Custom Package' }
    ]
  },
  budget: {
    label: 'Estimated Budget Range',
    type: 'select',
    required: false,
    options: [
      { value: '', label: 'Select budget range' },
      { value: 'under-5k', label: 'Under $5,000' },
      { value: '5k-10k', label: '$5,000 - $10,000' },
      { value: '10k-25k', label: '$10,000 - $25,000' },
      { value: '25k-50k', label: '$25,000 - $50,000' },
      { value: 'over-50k', label: 'Over $50,000' },
      { value: 'discuss', label: 'Let\'s Discuss' }
    ]
  },
  goals: {
    label: 'Partnership Goals',
    type: 'textarea',
    required: true,
    placeholder: 'Tell us about your marketing goals and what you hope to achieve through this partnership...',
    rows: 4
  },
  timeline: {
    label: 'Preferred Start Timeline',
    type: 'select',
    required: false,
    options: [
      { value: '', label: 'Select timeline' },
      { value: 'immediate', label: 'Immediate' },
      { value: '1-month', label: 'Within 1 month' },
      { value: '3-months', label: 'Within 3 months' },
      { value: '6-months', label: 'Within 6 months' },
      { value: 'flexible', label: 'Flexible' }
    ]
  },
  message: {
    label: 'Additional Message',
    type: 'textarea',
    required: false,
    placeholder: 'Any additional information or questions you\'d like to share...',
    rows: 3
  }
};

// Package Downloads
export const sponsorPackageDownloads = {
  sponsorDeck: {
    title: 'Sponsorship Information Deck',
    description: 'Complete overview of partnership opportunities, audience demographics, and ROI metrics',
    fileUrl: '/assets/downloads/chaosbro-sponsor-pack.pdf',
    fileSize: '2.4 MB',
    lastUpdated: '2024-12-15'
  },
  mediaKit: {
    title: 'Media Kit & Brand Assets',
    description: 'Logos, brand guidelines, and marketing materials for co-branded campaigns',
    fileUrl: '/assets/downloads/chaosbro-media-kit.zip',
    fileSize: '15.8 MB',
    lastUpdated: '2024-12-10'
  },
  audienceReport: {
    title: 'Audience Analytics Report',
    description: 'Detailed demographics, engagement metrics, and reach statistics',
    fileUrl: '/assets/downloads/chaosbro-audience-report.pdf',
    fileSize: '1.2 MB',
    lastUpdated: '2024-12-12'
  }
}; 