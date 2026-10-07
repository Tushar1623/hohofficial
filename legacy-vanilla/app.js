/**
 * HOUSE OF HUMOUR (HoH) - Modern Interactive Controller & Live State Sync
 */

const DEFAULT_HOH_CONFIG = {
  eventDate: '2 OCTOBER',
  eventTime: '6:30 PM ONWARDS',
  venue: 'THE SATIRE CLUB',
  city: 'KOLKATA',
  prize: '₹15,000',
  prizeLabel: 'WINNER CASH PURSE',
  genCost: 399,
  vipCost: 699,
  seatsLeft: 18,
  bookingUrl: '',
  announcement: 'KOLKATA CHAPTER FINALS: 2 OCT • THE SATIRE CLUB • ₹15,000 CASH PRIZE',
  urgencyTag: 'FAST FILLING',
  circuitCities: 'Kolkata, Mumbai, Delhi NCR, Bengaluru, Pune',
  featuredVideo: {
    title: 'KOLKATA CHAPTER FINALS: WILDEST CROWD WORK & ROAST ROUNDS',
    episode: 'EPISODE 04 • EAST QUALIFIERS',
    duration: '4K UHD • 21:40',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
  },
  sponsors: 'SHURE AUDIO, THE SATIRE CLUB, BREW HAVEN CRAFT, SPOTLIGHT MEDIA, COMEDY CHRONICLES',
  submissions: [
    { id: '#HOH-8420', name: 'Arjun Sharma', city: 'Kolkata', phone: '+91 98301 22345', exp: '1+ year regular', tape: 'https://youtube.com/watch?v=sample1', status: 'approved' },
    { id: '#HOH-8421', name: 'Ridhima Sen', city: 'Delhi NCR', phone: '+91 98110 33456', exp: 'Touring comic', tape: 'https://youtube.com/watch?v=sample2', status: 'approved' },
    { id: '#HOH-8422', name: 'Kabir Mehta', city: 'Pune', phone: '+91 98220 44567', exp: 'Open micer', tape: 'https://youtube.com/watch?v=sample3', status: 'pending' },
    { id: '#HOH-8423', name: 'Sneha Roy', city: 'Kolkata', phone: '+91 98311 55678', exp: '1+ year regular', tape: 'https://youtube.com/watch?v=sample4', status: 'shortlisted' }
  ],
  targetEpoch: new Date().getTime() + 8 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
};

const HOH = {
  data: JSON.parse(JSON.stringify(DEFAULT_HOH_CONFIG)),

  init() {
    this.restoreState();
    this.initCountdown();
    this.refreshDOM();
    this.initDecibelMeter();
    this.bindStorageListener();
  },

  restoreState() {
    try {
      const stored = localStorage.getItem('hoh_config_store');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.data = { ...this.data, ...parsed };
      }
    } catch (e) {
      console.warn('Storage restore error:', e);
    }
  },

  persistState() {
    try {
      localStorage.setItem('hoh_config_store', JSON.stringify(this.data));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.warn('Persist error:', e);
    }
  },

  bindStorageListener() {
    window.addEventListener('storage', () => {
      this.restoreState();
      this.refreshDOM();
    });
  },

  refreshDOM() {
    const bindText = (id, text) => {
      const el = document.getElementById(id);
      if (el && text !== undefined) el.innerText = text;
    };

    const bindHtml = (id, html) => {
      const el = document.getElementById(id);
      if (el && html !== undefined) el.innerHTML = html;
    };

    // Event & Tickets
    bindText('evDate', this.data.eventDate);
    bindText('evTime', this.data.eventTime);
    bindText('evVenue', this.data.venue);
    bindText('evCity', this.data.city);
    bindText('evPrizeText', `${this.data.prize} ${this.data.prizeLabel || 'WINNER CASH PURSE'}`);
    bindText('evGenCost', `₹${this.data.genCost}`);
    bindText('evVipCost', `₹${this.data.vipCost}`);
    bindText('evSeatsLeft', `ONLY ${this.data.seatsLeft} SEATS REMAIN IN CLUB TIER`);
    bindText('heroEventBadge', `${this.data.eventDate} • ${this.data.venue}, ${this.data.city}`);

    // Modal prices
    bindText('modalTicketPassVenue', `${this.data.venue}, ${this.data.city}`);
    bindText('modalTicketPassDate', `${this.data.eventDate} • ${this.data.eventTime}`);
    bindText('tierPriceGen', `₹${this.data.genCost}`);
    bindText('tierPriceVip', `₹${this.data.vipCost}`);

    // Announcements
    if (this.data.announcement) {
      bindText('topAnnouncementText', this.data.announcement);
    }
    if (this.data.urgencyTag) {
      bindHtml('topUrgencyTag', `<span class="pulse-dot"></span> ${this.data.urgencyTag}`);
    }

    // Circuit tour cities
    if (this.data.circuitCities) {
      bindText('heroCircuitBanner', `ALL-INDIA TOURING CIRCUIT: ${this.data.circuitCities.toUpperCase()}`);
    }

    // Featured video details
    if (this.data.featuredVideo) {
      bindText('featuredVideoStageTitle', this.data.featuredVideo.title);
      bindText('featuredVideoStageEpisode', this.data.featuredVideo.episode);
      bindText('featuredVideoStageDuration', this.data.featuredVideo.duration);
    }
  },

  initCountdown() {
    const tick = () => {
      const delta = (this.data.targetEpoch || (new Date().getTime() + 8 * 86400000)) - new Date().getTime();
      if (delta <= 0) return;

      const days = Math.floor(delta / (1000 * 60 * 60 * 24));
      const hours = Math.floor((delta / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((delta / (1000 * 60)) % 60);
      const secs = Math.floor((delta / 1000) % 60);

      const dEl = document.getElementById('cdDays');
      const hEl = document.getElementById('cdHours');
      const mEl = document.getElementById('cdMins');
      const sEl = document.getElementById('cdSecs');

      if (dEl) dEl.innerText = String(days).padStart(2, '0');
      if (hEl) hEl.innerText = String(hours).padStart(2, '0');
      if (mEl) mEl.innerText = String(mins).padStart(2, '0');
      if (secs && sEl) sEl.innerText = String(secs).padStart(2, '0');
    };
    tick();
    setInterval(tick, 1000);
  },

  initDecibelMeter() {
    const dbVal = document.getElementById('decibelMeterValue');
    if (!dbVal) return;
    setInterval(() => {
      const jitter = (Math.random() * 4 - 2).toFixed(1);
      const current = (94.8 + parseFloat(jitter)).toFixed(1);
      dbVal.innerText = `${current} dB`;
    }, 2400);
  }
};

// Interactive Mic Test / Cheer Simulator
function cheerMic() {
  const dbVal = document.getElementById('decibelMeterValue');
  const cheerBtn = document.getElementById('cheerBtn');
  if (dbVal) dbVal.innerText = '98.6 dB (ROAR!)';
  if (cheerBtn) {
    cheerBtn.innerText = '🔥 CROWD ROARING!';
    setTimeout(() => {
      cheerBtn.innerText = '🎤 Test Mic / Cheer';
    }, 2000);
  }
}

// Ticket Reservation Modal & Pricing
let currentTier = 'general';
let passQty = 1;

function openTicketModal(tier) {
  if (tier) currentTier = tier.toLowerCase();
  recalculateTickets();
  const modal = document.getElementById('modalTicketPass');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeTicketModal() {
  const modal = document.getElementById('modalTicketPass');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function selectTicketTier(tier) {
  currentTier = tier;
  recalculateTickets();
}

function adjustTicketQuantity(amount) {
  passQty = Math.max(1, Math.min(8, passQty + amount));
  recalculateTickets();
}

function recalculateTickets() {
  const isVip = currentTier === 'vip';
  const genBtn = document.getElementById('tierBtnGen');
  const vipBtn = document.getElementById('tierBtnVip');
  
  if (genBtn && vipBtn) {
    genBtn.classList.toggle('selected', !isVip);
    vipBtn.classList.toggle('selected', isVip);
  }

  const rate = isVip ? HOH.data.vipCost : HOH.data.genCost;
  const grandTotal = rate * passQty;

  const countEl = document.getElementById('passCountDisplay');
  const sumEl = document.getElementById('passTotalDisplay');
  const ticketTierTag = document.getElementById('ticketTierTag');

  if (countEl) countEl.innerText = passQty;
  if (sumEl) sumEl.innerText = `₹${grandTotal}`;
  if (ticketTierTag) ticketTierTag.innerText = isVip ? 'VIP FRONT ROW (SPLASH ZONE)' : 'GENERAL ADMISSION';
}

function executeBooking() {
  // If custom booking link is set in Admin CMS, open it
  if (HOH.data.bookingUrl && HOH.data.bookingUrl.startsWith('http')) {
    window.open(HOH.data.bookingUrl, '_blank');
    closeTicketModal();
    return;
  }

  // Decrement remaining seats
  HOH.data.seatsLeft = Math.max(0, (HOH.data.seatsLeft || 18) - passQty);
  HOH.persistState();
  HOH.refreshDOM();

  closeTicketModal();
  alert(`🎟️ Booking Confirmed!\n${passQty}x ${currentTier.toUpperCase()} pass(es) reserved for House of Humour at ${HOH.data.venue}, ${HOH.data.city}.\nOnly ${HOH.data.seatsLeft} tickets remaining.\nConfirmation message dispatched.`);
}

// Comedian Application Flow with Instant Digital Contestant Pass & Sync to Admin Inbox
function submitAudition(event) {
  event.preventDefault();

  const name = document.getElementById('artistName').value.trim();
  const phone = document.getElementById('artistPhone') ? document.getElementById('artistPhone').value.trim() : '+91 98000 00000';
  const email = document.getElementById('artistEmail') ? document.getElementById('artistEmail').value.trim() : '';
  const citySelect = document.getElementById('artistCity');
  const rawCity = citySelect ? citySelect.value : 'Kolkata';
  const cleanCity = rawCity.split('(')[0].trim();
  const exp = document.getElementById('artistExp') ? document.getElementById('artistExp').value : 'Open micer';
  const tape = document.getElementById('artistTape').value.trim();
  const bio = document.getElementById('artistBio') ? document.getElementById('artistBio').value.trim() : '';

  if (!name || !tape) {
    alert('Please enter your name and performance video link.');
    return;
  }

  const generatedId = `#HOH-${Math.floor(1000 + Math.random() * 9000)}`;

  // Populate digital contestant pass on the homepage
  const passName = document.getElementById('badgeName');
  const passCity = document.getElementById('badgeCity');
  const passId = document.getElementById('badgeId');

  if (passName) passName.innerText = name.toUpperCase();
  if (passCity) passCity.innerText = cleanCity.toUpperCase();
  if (passId) passId.innerText = generatedId;

  // Append new candidate to Admin submissions inbox
  if (!Array.isArray(HOH.data.submissions)) {
    HOH.data.submissions = [];
  }
  HOH.data.submissions.unshift({
    id: generatedId,
    name: name,
    city: cleanCity,
    phone: phone,
    email: email,
    exp: exp,
    tape: tape,
    bio: bio,
    status: 'pending',
    timestamp: new Date().toISOString()
  });
  HOH.persistState();

  // Show digital pass view
  const formWrap = document.getElementById('auditionForm');
  const badgeWrap = document.getElementById('badgeWrap');
  if (formWrap) formWrap.style.display = 'none';
  if (badgeWrap) badgeWrap.style.display = 'flex';
}

function resetAuditionForm() {
  const formWrap = document.getElementById('auditionForm');
  const badgeWrap = document.getElementById('badgeWrap');
  if (formWrap) {
    formWrap.style.display = 'grid';
    formWrap.reset();
  }
  if (badgeWrap) badgeWrap.style.display = 'none';
}

// Video Theater Modal
function playVideoSpecial(title, embedUrl) {
  const modal = document.getElementById('modalVideoSpecial');
  const iframe = document.getElementById('videoTheaterFrame');
  const titleEl = document.getElementById('videoTheaterTitle');
  
  if (titleEl) titleEl.innerText = title;
  if (iframe) iframe.src = embedUrl || (HOH.data.featuredVideo ? HOH.data.featuredVideo.embedUrl : 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoSpecial() {
  const modal = document.getElementById('modalVideoSpecial');
  const iframe = document.getElementById('videoTheaterFrame');
  if (iframe) iframe.src = '';
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Quick Admin CMS Modal (Inline)
function openAdminCMS() {
  document.getElementById('cmsDate').value = HOH.data.eventDate;
  document.getElementById('cmsVenue').value = HOH.data.venue;
  document.getElementById('cmsCity').value = HOH.data.city;
  document.getElementById('cmsPrize').value = HOH.data.prize;
  document.getElementById('cmsGenCost').value = HOH.data.genCost;
  document.getElementById('cmsVipCost').value = HOH.data.vipCost;
  const modal = document.getElementById('modalAdminCMS');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAdminCMS() {
  const modal = document.getElementById('modalAdminCMS');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function saveAdminCMS(e) {
  e.preventDefault();
  HOH.data.eventDate = document.getElementById('cmsDate').value.trim() || HOH.data.eventDate;
  HOH.data.venue = document.getElementById('cmsVenue').value.trim() || HOH.data.venue;
  HOH.data.city = document.getElementById('cmsCity').value.trim() || HOH.data.city;
  HOH.data.prize = document.getElementById('cmsPrize').value.trim() || HOH.data.prize;
  HOH.data.genCost = parseInt(document.getElementById('cmsGenCost').value, 10) || 399;
  HOH.data.vipCost = parseInt(document.getElementById('cmsVipCost').value, 10) || 699;

  HOH.persistState();
  HOH.refreshDOM();
  closeAdminCMS();
  alert('⚡ Event updates deployed live across the site!');
}

// Mobile Menu Drawer with Body Scroll Lock and ARIA sync
function toggleMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const toggleBtn = document.getElementById('mobileMenuToggle');
  if (!drawer) return;
  const isOpen = drawer.classList.toggle('open');
  if (backdrop) backdrop.classList.toggle('open', isOpen);
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  const drawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const toggleBtn = document.getElementById('mobileMenuToggle');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
  if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

// Escape key listener for all modals and drawer
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeTicketModal();
    closeVideoSpecial();
    closeAdminCMS();
    closeMobileMenu();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  HOH.init();
  // Auto-close mobile drawer when tapping links inside it
  document.querySelectorAll('#mobileNavDrawer a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
});
