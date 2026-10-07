import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { DEFAULT_EVENT, FEATURED_VIDEO, LATEST_VIDEOS, TALENT_ROSTER, JURY_GUESTS, SPONSORS_LIST } from '../data/demoData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Events
  const [events, setEvents] = useState([DEFAULT_EVENT]);
  const [activeEvent, setActiveEvent] = useState(DEFAULT_EVENT);

  // Applications
  const [applications, setApplications] = useState([]);

  // Videos
  const [featuredVideo, setFeaturedVideo] = useState(FEATURED_VIDEO);
  const [videos, setVideos] = useState(LATEST_VIDEOS);

  // Talent & Guests & Sponsors
  const [talent, setTalent] = useState(TALENT_ROSTER);
  const [guests, setGuests] = useState(JURY_GUESTS);
  const [sponsors, setSponsors] = useState(SPONSORS_LIST);

  // Site Settings
  const [settings, setSettings] = useState({
    siteName: 'House of Humour',
    tagline: "India's Biggest Stand-Up Comedy Talent Hunt",
    contactEmail: 'auditions@houseofhumour.in',
    supportPhone: '+91 98301 22345',
    circuitCities: 'Kolkata, Mumbai, Delhi NCR, Bengaluru, Pune',
    auditionStatus: 'OPEN'
  });

  // Ticket Modal State
  const [ticketModalState, setTicketModalState] = useState({
    isOpen: false,
    event: null
  });

  // Video Modal State
  const [videoModalState, setVideoModalState] = useState({
    isOpen: false,
    video: null
  });

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Initialize data on mount
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const [loadedEvents, loadedActiveEvent, loadedApps, loadedFeatVid, loadedVids, loadedTalent, loadedGuests, loadedSponsors, loadedSettings] =
          await Promise.all([
            api.getEvents(),
            api.getActiveEvent(),
            api.getApplications(),
            api.getFeaturedVideo(),
            api.getVideos(),
            api.getTalent(),
            api.getGuests(),
            api.getSponsors(),
            api.getSettings()
          ]);

        if (isMounted) {
          if (loadedEvents?.length) setEvents(loadedEvents);
          if (loadedActiveEvent) setActiveEvent(loadedActiveEvent);
          if (loadedApps?.length) setApplications(loadedApps);
          if (loadedFeatVid) setFeaturedVideo(loadedFeatVid);
          if (loadedVids?.length) setVideos(loadedVids);
          if (loadedTalent?.length) setTalent(loadedTalent);
          if (loadedGuests?.length) setGuests(loadedGuests);
          if (loadedSponsors?.length) setSponsors(loadedSponsors);
          if (loadedSettings) setSettings(loadedSettings);
        }
      } catch (err) {
        console.error('[HoH Context] Error bootstrapping store:', err);
      }
    }

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Ticket Modal controls
  const openTicketModal = useCallback((event = null) => {
    setTicketModalState({
      isOpen: true,
      event: event || activeEvent
    });
    document.body.style.overflow = 'hidden';
  }, [activeEvent]);

  const closeTicketModal = useCallback(() => {
    setTicketModalState({ isOpen: false, event: null });
    document.body.style.overflow = '';
  }, []);

  // Video Modal controls
  const openVideoModal = useCallback((video = null) => {
    setVideoModalState({
      isOpen: true,
      video: video || featuredVideo
    });
    document.body.style.overflow = 'hidden';
  }, [featuredVideo]);

  const closeVideoModal = useCallback(() => {
    setVideoModalState({ isOpen: false, video: null });
    document.body.style.overflow = '';
  }, []);

  // Application actions
  const submitApplication = useCallback(async (formData) => {
    const created = await api.submitApplication(formData);
    setApplications((prev) => [created, ...prev]);
    showToast(`Audition Pass ${created.id} generated! Welcome to HoH.`, 'success');
    return created;
  }, [showToast]);

  const updateApplicationStatus = useCallback(async (id, status) => {
    const updated = await api.updateApplication(id, { status });
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? updated : app))
    );
    showToast(`Application ${id} status updated to ${status}.`, 'info');
    return updated;
  }, [showToast]);

  const deleteApplication = useCallback(async (id) => {
    await api.deleteApplication(id);
    setApplications((prev) => prev.filter((app) => app.id !== id));
    showToast(`Application ${id} deleted.`, 'info');
  }, [showToast]);

  // Event update actions
  const updateEvent = useCallback(async (eventData) => {
    const updated = await api.updateActiveEvent(eventData);
    setActiveEvent(updated);
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    showToast('Event details updated successfully!', 'success');
    return updated;
  }, [showToast]);

  // Video update actions
  const updateFeaturedVideoData = useCallback(async (videoData) => {
    const updated = await api.updateFeaturedVideo(videoData);
    setFeaturedVideo(updated);
    showToast('Featured video updated!', 'success');
    return updated;
  }, [showToast]);

  const addVideoItem = useCallback(async (videoData) => {
    const created = await api.addVideo(videoData);
    setVideos((prev) => [created, ...prev]);
    showToast('Video added to lineup!', 'success');
    return created;
  }, [showToast]);

  const deleteVideoItem = useCallback(async (id) => {
    await api.deleteVideo(id);
    setVideos((prev) => prev.filter((v) => v.id !== id));
    showToast('Video removed.', 'info');
  }, [showToast]);

  // Settings update action
  const updateSettings = useCallback(async (newSettings) => {
    const updated = await api.updateSettings(newSettings);
    setSettings(updated);
    showToast('Site settings saved!', 'success');
    return updated;
  }, [showToast]);

  const value = {
    events,
    activeEvent,
    setActiveEvent,
    updateEvent,
    applications,
    submitApplication,
    updateApplicationStatus,
    deleteApplication,
    featuredVideo,
    updateFeaturedVideoData,
    videos,
    addVideoItem,
    deleteVideoItem,
    talent,
    setTalent,
    guests,
    setGuests,
    sponsors,
    setSponsors,
    settings,
    updateSettings,
    ticketModalState,
    openTicketModal,
    closeTicketModal,
    videoModalState,
    openVideoModal,
    closeVideoModal,
    toast,
    showToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
