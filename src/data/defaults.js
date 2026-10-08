/**
 * HOUSE OF HUMOUR (HoH) - Seed & Default Data
 * Streamlined around the core product: Events, Contestant Applications, Featured Video, Tickets, and Settings.
 */

// Machine-readable future dates
const now = Date.now();
const DAY_MS = 86400000;

export const DEFAULT_EVENTS = [
  {
    id: 'ev-kolkata-2026',
    title: 'Kolkata Chapter Finals',
    city: 'Kolkata',
    venue: 'The Satire Club, Park Street',
    dateTime: new Date(now + 16 * DAY_MS).toISOString(),
    prize: '₹20,000',
    generalPrice: 399,
    vipPrice: 699,
    bookingUrl: '',
    published: true,
    status: 'UPCOMING',
    description: 'Regional qualifiers test their tightest 5-minute sets under club spotlights. Audience laughter decibels dictate who advances to the National Finals.'
  },
  {
    id: 'ev-mumbai-2026',
    title: 'Mumbai Stand-Up Qualifier',
    city: 'Mumbai',
    venue: 'Canvas Comedy Room, Bandra West',
    dateTime: new Date(now + 36 * DAY_MS).toISOString(),
    prize: '₹25,000',
    generalPrice: 499,
    vipPrice: 799,
    bookingUrl: '',
    published: true,
    status: 'UPCOMING',
    description: 'West zone comedy clash featuring high-octane crowd work and original stand-up comedy sets.'
  },
  {
    id: 'ev-delhi-2026',
    title: 'Delhi NCR Roast Special',
    city: 'Delhi NCR',
    venue: 'The Habitat Auditorium, Hauz Khas',
    dateTime: new Date(now + 50 * DAY_MS).toISOString(),
    prize: '₹25,000',
    generalPrice: 449,
    vipPrice: 849,
    bookingUrl: '',
    published: true,
    status: 'UPCOMING',
    description: 'North zone comedy battle where no topic is taboo and punchline delivery is ruthless.'
  }
];

export const DEFAULT_FEATURED_VIDEO = {
  title: 'East Qualifiers: Raw Crowd Work & Stage Roasts',
  youtubeUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
  thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80'
};

export const DEFAULT_TICKETS = {
  generalPrice: 399,
  vipPrice: 699,
  bookingUrl: '',
  availability: 'OPEN'
};

export const DEFAULT_SETTINGS = {
  siteName: 'House of Humour',
  tagline: "India's Biggest Stand-Up Comedy Talent Hunt",
  contactNumber: '+91 98301 22345',
  email: 'auditions@houseofhumour.in',
  instagram: 'https://instagram.com/houseofhumourofficial',
  youtube: 'https://youtube.com/@houseofhumour',
  adminPasscode: 'hoh2026'
};

export const DEFAULT_APPLICATIONS = [
  {
    id: 'HOH-8420',
    name: 'Arjun Sharma',
    phone: '+91 98301 22345',
    email: 'arjun@comedy.in',
    city: 'Kolkata',
    tape: 'https://youtube.com/watch?v=sample1',
    bio: 'Observational storytelling revolving around Kolkata tram journeys and IT startup life.',
    instagram: '@arjuncomedy',
    youtube: '',
    exp: '1+ year regular spots',
    status: 'SHORTLISTED',
    timestamp: '2026-10-06T10:14:00Z'
  },
  {
    id: 'HOH-8421',
    name: 'Ridhima Sen',
    phone: '+91 98110 33456',
    email: 'ridhima@standup.in',
    city: 'Delhi NCR',
    tape: 'https://youtube.com/watch?v=sample2',
    bio: 'Dark satire and self-deprecating relationship comedy.',
    instagram: '@ridhimasen',
    youtube: '',
    exp: 'Touring comic',
    status: 'PENDING',
    timestamp: '2026-10-07T14:30:00Z'
  }
];
