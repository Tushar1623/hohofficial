/**
 * HOUSE OF HUMOUR (HoH) - Master Demo & Seed Data
 */

export const DEFAULT_EVENT = {
  id: 'ev-kolkata-2026',
  title: 'Kolkata Chapter Finals',
  date: '2 OCTOBER',
  time: '6:30 PM ONWARDS',
  venue: 'THE SATIRE CLUB',
  city: 'KOLKATA',
  prize: '₹15,000',
  prizeLabel: 'WINNER CASH PURSE',
  genCost: 399,
  vipCost: 699,
  seatsLeft: 18,
  totalCapacity: 100,
  targetEpoch: new Date('2026-10-02T18:30:00+05:30').getTime() || (Date.now() + 8 * 86400000),
  bookingUrl: '',
  announcement: 'KOLKATA CHAPTER FINALS: 2 OCT • THE SATIRE CLUB • ₹15,000 CASH PRIZE',
  urgencyTag: 'FAST FILLING',
  circuitCities: 'Kolkata, Mumbai, Delhi NCR, Bengaluru, Pune',
  description: 'Watch ten regional qualifiers test their tightest 5-minute sets under intense stage scrutiny. Audience decibel scores dictate who advances to the National Finals.'
};

export const FEATURED_VIDEO = {
  id: 'vid-feat-01',
  title: 'KOLKATA CHAPTER FINALS: WILDEST CROWD WORK & ROAST ROUNDS',
  episode: 'EPISODE 04 • EAST QUALIFIERS',
  duration: '4K UHD • 21:40',
  category: 'CROWD WORK & ROAST',
  youtubeId: 'dQw4w9WgXcQ',
  embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
  thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgtDelakpz-Xw9NBKRUqe3RzUsBjePEkrOonu9Tgy_sKNA6EEMVLgIJCl9v5pK6pOBDPjosJqMxl9CbI3cpGvuVsRHd6rrnb6yvuAmMrM8wY5PA5euWkLWEY7mMzmXQmBhkgRu-K2yPV81SEU_bciUrrsFWTz8QrQ4IN7CI8OpFyQot2QafHvkaVHXx2xwbR2-cFs2p37Vh4G9zUFiA4m4DQiPm2ILKLmVPId8rx9b',
  publishedAt: 'Oct 2026'
};

export const LATEST_VIDEOS = [
  {
    id: 'vid-01',
    title: 'Ridhima Sen on Bengali Weddings',
    tag: 'DARK HUMOR',
    category: 'Stand-Up Special',
    details: 'Delhi Prelims • 88K Views • Rank: 92 dB',
    youtubeId: 'dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH-fOZO442-VFERNv4SDYP96Egc71XvFXlG-ApLciVjSDnN0b73KyQ62-zt8mEcYZpn4bgyH9V232jtzC_TDgZv1alYRe_nqkkI-YIvM6rGuf7pyasoqLPthQJNbtitlEPlP2Q7J5AYSbAue4M_6viA2is2y68dKB76UlrQJMvOg2SlJJUZKhEwdmkBT7o9vVucAFxepdaHpOavQQOdh70wOfm8sj7PF4oD6FMXBa4'
  },
  {
    id: 'vid-02',
    title: 'Tanmay Joshi Destroys an Investment Banker',
    tag: 'CROWD WORK',
    category: 'Crowd Work',
    details: 'Mumbai Auditions • 210K Views • Rank: 97 dB',
    youtubeId: 'dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNpZgYKj4shh6YFuYbLQqqBi39C4tdiD0ep-t1siBsvvuk75EF_38ZpTVf0yUTGN7WZnZxeBTrtDmKeLBp9egW-2M-AMp9kb-53UMNcDJaI9v7RkD3fh-qniuQlQ-w3okqPExaUU_ymUd-3dgiCTxEmZMkEmo_NCbIMVg8b3L733CwVPbkVFmqhXhbq2dOFsLaI5hi067V7VM-hMXiLmZfReg1Qa1YxitWQ_euTx_n'
  },
  {
    id: 'vid-03',
    title: 'Priya Nair on Tech Startups in Koramangala',
    tag: 'DEADPAN',
    category: 'Observational',
    details: 'Bengaluru Prelims • 64K Views • Rank: 89 dB',
    youtubeId: 'dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiOhqj7RU-tLUjImrkHpoOBvT8bUJgS7KQcj6U5-vhpysTl5PvEkk8lQIGPk-S02pDZohiwB8c_DyBeCJiwHYtR7AmaNgcl9lzgc4oNEvDLqUt9NVm8Dp-DybCeA3VEmMCwTNYEP-srNYTDdqo1HRKON_8q_X2fOJX1HBVwePmtH0ggVvcKR0_g7hts13fwpOPoGz_QVTXkxK6di8onL7dgFQTxP5Uvu3KJTKc4IcB'
  }
];

export const TALENT_ROSTER = [
  {
    id: 'talent-01',
    rank: '#01',
    name: 'ARJUN SHARMA',
    city: 'KOLKATA',
    zone: 'EAST • KOLKATA',
    category: 'Observational Storytelling',
    score: '9.4/10',
    status: 'approved',
    statusLabel: 'QUALIFIED FINALS',
    quote: 'Razor sharp observational wit capturing Kolkata street life and corporate chaos.',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4VfI6G1e8_y231v4-4rJ6kXh5T4r5Hq2-G8F-qT1P7U9L_k2J4-H9kF2-1r7X4r8V-1s4kG2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4kF2H-6F4'
  },
  {
    id: 'talent-02',
    rank: '#02',
    name: 'RIDHIMA SEN',
    city: 'DELHI NCR',
    zone: 'NORTH • DELHI NCR',
    category: 'Dark Humor & Satire',
    score: '9.2/10',
    status: 'approved',
    statusLabel: 'QUALIFIED FINALS',
    quote: 'Brutally honest cultural commentary delivered with deadpan charisma.',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDH-fOZO442-VFERNv4SDYP96Egc71XvFXlG-ApLciVjSDnN0b73KyQ62-zt8mEcYZpn4bgyH9V232jtzC_TDgZv1alYRe_nqkkI-YIvM6rGuf7pyasoqLPthQJNbtitlEPlP2Q7J5AYSbAue4M_6viA2is2y68dKB76UlrQJMvOg2SlJJUZKhEwdmkBT7o9vVucAFxepdaHpOavQQOdh70wOfm8sj7PF4oD6FMXBa4'
  },
  {
    id: 'talent-03',
    rank: '#03',
    name: 'TANMAY JOSHI',
    city: 'MUMBAI',
    zone: 'WEST • MUMBAI',
    category: 'Crowd Work Specialist',
    score: '9.1/10',
    status: 'approved',
    statusLabel: 'QUALIFIED FINALS',
    quote: 'High energy spontaneity, instantly flipping hecklers into punchline gold.',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNpZgYKj4shh6YFuYbLQqqBi39C4tdiD0ep-t1siBsvvuk75EF_38ZpTVf0yUTGN7WZnZxeBTrtDmKeLBp9egW-2M-AMp9kb-53UMNcDJaI9v7RkD3fh-qniuQlQ-w3okqPExaUU_ymUd-3dgiCTxEmZMkEmo_NCbIMVg8b3L733CwVPbkVFmqhXhbq2dOFsLaI5hi067V7VM-hMXiLmZfReg1Qa1YxitWQ_euTx_n'
  },
  {
    id: 'talent-04',
    rank: '#04',
    name: 'PRIYA NAIR',
    city: 'BENGALURU',
    zone: 'SOUTH • BENGALURU',
    category: 'Deadpan Anecdotes',
    score: '8.9/10',
    status: 'shortlisted',
    statusLabel: 'SEMIFINALIST',
    quote: 'Unemotional delivery with explosive, carefully engineered tech-world punchlines.',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiOhqj7RU-tLUjImrkHpoOBvT8bUJgS7KQcj6U5-vhpysTl5PvEkk8lQIGPk-S02pDZohiwB8c_DyBeCJiwHYtR7AmaNgcl9lzgc4oNEvDLqUt9NVm8Dp-DybCeA3VEmMCwTNYEP-srNYTDdqo1HRKON_8q_X2fOJX1HBVwePmtH0ggVvcKR0_g7hts13fwpOPoGz_QVTXkxK6di8onL7dgFQTxP5Uvu3KJTKc4IcB'
  }
];

export const JURY_GUESTS = [
  {
    id: 'jury-01',
    name: 'KUNAL KHANNA',
    role: 'HEAD OF JURY',
    tag: '14 YRS TOURING',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyTUWi8ys-8QC7yj-k01pMq4VEb41UgONb7IAe8Z67ZJOIqKtBL978eKAG-2taKUHZDanW4X6wuv7cKVBOOcaxncW2WG64DNO_MFACahph1GTFFfqCOuAMpSmbRrEyzV2K3X2bKmQbdFLhU2oyF2Uo5oewcBYegmtS3iffLOQ4kObRSLNcnH0UwUfPs_kq5EyGfinV7SOKfnty_VJMXsh8-S7xEdL7IGRCv2Dsi4hK',
    description: 'Veteran comedy headliner who evaluated over 500 open mic spots across India.'
  },
  {
    id: 'jury-02',
    name: 'SHREYA BOSE',
    role: 'WRITERS ROOM HEAD',
    tag: 'OTT PRODUCER',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhCCkniTuRUzKT8ETT6NRwLytzBkH8KfLZWQasDXuktcnelIJmdiYY4cnz2wAL5qJQAiJ092ccrlNacZh0h2fsYnF2hRCW_wrN32-3_zHtHtUyRSLuUOaqQk5EGq_teGksjmTMtIS29Waym01keVO0SEEfA-0q7qgoyJMz6yd-OHbLa12EXvcbAR7Ko4oWVyEHFf5CzE5d6tBd1TuTbehfvTO_YRpU11OthgkLu7vu',
    description: 'Lead script consultant and series creator for top streaming comedy specials.'
  },
  {
    id: 'jury-03',
    name: 'DEV ROY',
    role: 'SATIRE CLUB CURATOR',
    tag: 'PROMOTER',
    photo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrfG-8XYQSZgtU-aw4ROG6Mh9JzjDwTBD3kxS7gprC1iIOMEqDH4QFuIlz0LlmCV7TvzjRF_XeRBfjiAJ5KI9NNs3TmAVXK6yenvAjsM9NL8kdp4tH5QvCcWUZXzVmI1s4WXqnZ1ifi5FWtu6cp2UN-kCF-JGcdAVlSv0Fn9QqNq4gUI8Bef4Xbyo-Rkf7_JF_FKezYObN7se4L4g6-va3p_p_A0LEEphxkDpVDc1h',
    description: 'Pioneer of the Kolkata live stand-up circuit with 10+ years of comedy curation.'
  }
];

export const PERKS_LIST = [
  {
    id: 'perk-01',
    icon: 'mic_external_on',
    title: 'PRIME STAGE TIME',
    desc: 'Uncut, guaranteed 5-minute set recorded under broadcast studio lighting.'
  },
  {
    id: 'perk-02',
    icon: 'groups',
    title: 'CURATED CROWDS',
    desc: 'Perform before paying comedy lovers who actually buy tickets to laugh.'
  },
  {
    id: 'perk-03',
    icon: 'smart_display',
    title: '4K YOUTUBE RELEASE',
    desc: 'Top 3 sets of the night professionally edited and published to the HoH channel.'
  },
  {
    id: 'perk-04',
    icon: 'payments',
    title: 'SPOT CASH PURSE',
    desc: 'Nightly ₹15,000 cash purse handed over directly on stage before the encore.'
  }
];

export const ROADMAP_STEPS = [
  {
    step: '01',
    title: 'APPLY ONLINE',
    desc: 'Submit your 3-minute video link and stage style via the digital portal.'
  },
  {
    step: '02',
    title: 'CURATORIAL CUT',
    desc: 'Editorial scouts shortlist 10 comics per regional city qualifier.'
  },
  {
    step: '03',
    title: 'THE LIVE STAGE',
    desc: 'Perform under live club spotlights in front of packed audiences.'
  },
  {
    step: '04',
    title: 'DECIBEL VERDICT',
    desc: 'Audience roar dictates rankings on the live digital sound meter.'
  },
  {
    step: '05',
    title: 'ADVANCE & WIN',
    desc: 'Winner takes home ₹15,000 cash and advances to National Finals.'
  }
];

export const SPONSORS_LIST = [
  { id: 'sp-1', name: 'SHURE AUDIO', tier: 'Official Audio Partner', website: 'https://shure.com' },
  { id: 'sp-2', name: 'THE SATIRE CLUB', tier: 'Official Venue Partner', website: '#' },
  { id: 'sp-3', name: 'BREW HAVEN CRAFT', tier: 'Beverage Partner', website: '#' },
  { id: 'sp-4', name: 'SPOTLIGHT MEDIA', tier: 'Broadcast Partner', website: '#' },
  { id: 'sp-5', name: 'COMEDY CHRONICLES', tier: 'Media Partner', website: '#' }
];

export const INITIAL_SUBMISSIONS = [
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
    exp: 'Touring / Solo comic',
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
  },
  {
    id: '#HOH-8423',
    name: 'Sneha Roy',
    city: 'Kolkata',
    phone: '+91 98311 55678',
    email: 'sneha@comedy.in',
    age: '25',
    exp: '1+ year regular spots',
    tape: 'https://youtube.com/watch?v=sample4',
    bio: 'Subtle deadpan commentary on Bengali families and modern dating.',
    status: 'shortlisted',
    timestamp: '2026-10-04T09:20:00Z'
  }
];

export const BENTO_STATS = [
  { number: '45+', title: 'LIVE SHOWCASES', desc: 'Across 6 Tier-1 circuits.', color: 'primary' },
  { number: '180+', title: 'COMICS LAUNCHED', desc: 'From open mics to solo acts.', color: 'secondary' },
  { number: '2.5M', title: 'DIGITAL LAUGHS', desc: 'Organic online views.', color: 'white' },
  { number: '4', title: 'ZONAL FINALS', desc: '₹2,00,000 Grand Trophy.', color: 'secondary' }
];
