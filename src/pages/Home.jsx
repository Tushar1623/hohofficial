import React from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { Hero } from '../components/Hero/Hero';
import { NextEvent } from '../components/NextEvent/NextEvent';
import { ContestantCTA } from '../components/ContestantCTA/ContestantCTA';
import { HowItWorks } from '../components/HowItWorks/HowItWorks';
import { FeaturedVideo } from '../components/FeaturedVideo/FeaturedVideo';
import { LatestVideos } from '../components/LatestVideos/LatestVideos';
import { TalentSection } from '../components/TalentSection/TalentSection';
import { GuestsSection } from '../components/GuestsSection/GuestsSection';
import { AboutSection } from '../components/AboutSection/AboutSection';
import { Sponsors } from '../components/Sponsors/Sponsors';
import { SocialCTA } from '../components/SocialCTA/SocialCTA';
import { Footer } from '../components/Footer/Footer';

export const Home = () => {
  return (
    <div className="page-home-root">
      <Navbar />
      <main id="main-content">
        <Hero />
        <NextEvent />
        <ContestantCTA />
        <HowItWorks />
        <FeaturedVideo />
        <LatestVideos />
        <TalentSection />
        <GuestsSection />
        <AboutSection />
        <Sponsors />
        <SocialCTA />
      </main>
      <Footer />
    </div>
  );
};
