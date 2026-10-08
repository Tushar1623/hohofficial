/**
 * HOUSE OF HUMOUR (HoH) - Seed & Default Data
 * Clean, production-ready defaults without placeholder spam or Rickrolls.
 */

// Current date offset helpers
const now = Date.now();
const DAY_MS = 86400000;

export const DEFAULT_EVENTS = [
  {
    id: 'ev-kolkata-2026',
    title: 'Kolkata Chapter Finals',
    date: '24 OCTOBER 2026',
    time: '6:30 PM ONWARDS',
    venue: 'The Satire Club',
    city: 'KOLKATA',
    prize: '₹15,000',
    prizeLabel: 'WINNER SPOT PURSE',
    genCost: 399,
    vipCost: 699,
    seatsLeft: 18,
    totalCapacity: 100,
    targetEpoch: now + (17 * DAY_MS),
    published: true,
    urgencyTag: 'FAST FILLING',
    circuitCities: 'Kolkata, Mumbai, Delhi NCR, Bengaluru, Pune',
    description: 'Watch regional qualifiers test their tightest 5-minute sets under club spotlights. Audience decibel scores dictate who advances to the National Finals.'
  },
  {
    id: 'ev-mumbai-2026',
    title: 'Mumbai Stand-Up Qualifier',
    date: '14 NOVEMBER 2026',
    time: '7:00 PM ONWARDS',
    venue: 'Canvas Comedy Room',
    city: 'MUMBAI',
    prize: '₹20,000',
    prizeLabel: 'WINNER SPOT PURSE',
    genCost: 499,
    vipCost: 799,
    seatsLeft: 42,
    totalCapacity: 120,
    targetEpoch: now + (38 * DAY_MS),
    published: true,
    urgencyTag: 'EARLY BIRD',
    circuitCities: 'Mumbai, Pune, Goa',
    description: 'West zone comedy clash featuring high-octane crowd work and roast rounds.'
  },
  {
    id: 'ev-delhi-2026',
    title: 'Delhi NCR Roast Special',
    date: '28 NOVEMBER 2026',
    time: '6:00 PM ONWARDS',
    venue: 'The Habitat Auditorium',
    city: 'DELHI NCR',
    prize: '₹25,000',
    prizeLabel: 'WINNER SPOT PURSE',
    genCost: 449,
    vipCost: 849,
    seatsLeft: 65,
    totalCapacity: 150,
    targetEpoch: now + (52 * DAY_MS),
    published: true,
    urgencyTag: 'REGISTRATIONS OPEN',
    circuitCities: 'Delhi NCR, Chandigarh, Jaipur',
    description: 'North zone comedy battle where no topic is taboo and crowd interaction is relentless.'
  }
];

export const DEFAULT_VIDEOS = [
  {
    id: 'vid-01',
    title: 'East Qualifiers: Crowd Work & Stage Roasts',
    tag: 'CROWD WORK',
    category: 'Chapter Showcase',
    duration: '18:40',
    youtubeUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
    youtubeId: '5qap5aO4i9A',
    thumbnail: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=640&q=80'
  },
  {
    id: 'vid-02',
    title: 'Dark Humor & Satire: Corporate Life In Tech',
    tag: 'SATIRE',
    category: 'Stand-Up Special',
    duration: '12:15',
    youtubeUrl: 'https://www.youtube.com/watch?v=kXYiU_JCYtU',
    youtubeId: 'kXYiU_JCYtU',
    thumbnail: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=640&q=80'
  },
  {
    id: 'vid-03',
    title: 'Deadpan Anecdotes: Kolkata Street Life',
    tag: 'DEADPAN',
    category: 'Observational',
    duration: '14:50',
    youtubeUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    youtubeId: 'kJQP7kiw5Fk',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=640&q=80'
  }
];

export const DEFAULT_TALENT = [
  {
    id: 'talent-01',
    rank: '#01',
    name: 'Arjun Sharma',
    city: 'KOLKATA',
    zone: 'EAST • KOLKATA',
    category: 'Observational Storytelling',
    score: '9.4 dB',
    statusLabel: 'QUALIFIED FOR FINALS',
    quote: 'Sharp observational wit capturing Kolkata street life and corporate chaos.',
    instagram: '@arjuncomedy'
  },
  {
    id: 'talent-02',
    rank: '#02',
    name: 'Ridhima Sen',
    city: 'DELHI NCR',
    zone: 'NORTH • DELHI NCR',
    category: 'Dark Humor & Satire',
    score: '9.2 dB',
    statusLabel: 'QUALIFIED FOR FINALS',
    quote: 'Brutally honest cultural commentary delivered with deadpan charisma.',
    instagram: '@ridhimasen'
  },
  {
    id: 'talent-03',
    rank: '#03',
    name: 'Tanmay Joshi',
    city: 'MUMBAI',
    zone: 'WEST • MUMBAI',
    category: 'Crowd Work Specialist',
    score: '9.1 dB',
    statusLabel: 'QUALIFIED FOR FINALS',
    quote: 'High energy spontaneity, instantly flipping hecklers into punchline gold.',
    instagram: '@tanmayj'
  },
  {
    id: 'talent-04',
    rank: '#04',
    name: 'Priya Nair',
    city: 'BENGALURU',
    zone: 'SOUTH • BENGALURU',
    category: 'Deadpan Anecdotes',
    score: '8.9 dB',
    statusLabel: 'SEMIFINALIST',
    quote: 'Unemotional delivery with explosive tech-world punchlines.',
    instagram: '@priyanair'
  }
];

export const DEFAULT_GUESTS = [
  {
    id: 'jury-01',
    name: 'Kunal Khanna',
    role: 'HEAD OF JURY',
    tag: '14 YRS TOURING',
    description: 'Veteran comedy headliner who evaluated over 500 open mic spots across India.'
  },
  {
    id: 'jury-02',
    name: 'Shreya Bose',
    role: 'WRITERS ROOM HEAD',
    tag: 'OTT PRODUCER',
    description: 'Lead script consultant and series creator for top streaming comedy specials.'
  },
  {
    id: 'jury-03',
    name: 'Dev Roy',
    role: 'CURATOR',
    tag: 'CLUB PROMOTER',
    description: 'Pioneer of the live stand-up circuit with 10+ years of comedy curation.'
  }
];

export const DEFAULT_SPONSORS = [
  { id: 'sp-1', name: 'Shure Audio', tier: 'Official Audio Partner', website: 'https://shure.com' },
  { id: 'sp-2', name: 'The Satire Club', tier: 'Official Venue Partner', website: '#' },
  { id: 'sp-3', name: 'Brew Haven Craft', tier: 'Beverage Partner', website: '#' },
  { id: 'sp-4', name: 'Spotlight Media', tier: 'Broadcast Partner', website: '#' }
];

export const DEFAULT_APPLICATIONS = [
  {
    id: '#HOH-8420',
    name: 'Arjun Sharma',
    city: 'Kolkata',
    phone: '+91 98301 22345',
    email: 'arjun@comedy.in',
    age: '24',
    exp: '1+ year regular spots',
    tape: 'https://youtube.com/watch?v=sample1',
    bio: 'Observational storytelling revolving around Kolkata tram journeys and IT startup nightmares.',
    status: 'approved',
    timestamp: '2026-10-01T10:14:00Z'
  },
  {
    id: '#HOH-8421',
    name: 'Ridhima Sen',
    city: 'Delhi NCR',
    phone: '+91 98110 33456',
    email: 'ridhima@standup.in',
    age: '26',
    exp: 'Touring comic',
    tape: 'https://youtube.com/watch?v=sample2',
    bio: 'Dark satire and self-deprecating relationship comedy.',
    status: 'approved',
    timestamp: '2026-10-02T14:30:00Z'
  },
  {
    id: '#HOH-8422',
    name: 'Kabir Mehta',
    city: 'Pune',
    phone: '+91 98220 44567',
    email: 'kabir@openmic.in',
    age: '22',
    exp: 'Open micer',
    tape: 'https://youtube.com/watch?v=sample3',
    bio: 'High energy crowd work and college hostel misadventures.',
    status: 'pending',
    timestamp: '2026-10-03T18:45:00Z'
  }
];

export const DEFAULT_SETTINGS = {
  siteName: 'House of Humour',
  tagline: "India's Biggest Stand-Up Comedy Talent Hunt",
  contactEmail: 'auditions@houseofhumour.in',
  supportPhone: '+91 98301 22345',
  circuitCities: 'Kolkata, Mumbai, Delhi NCR, Bengaluru, Pune',
  auditionStatus: 'OPEN'
};
