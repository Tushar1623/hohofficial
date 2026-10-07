import React, { useState } from 'react';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Footer/Footer';
import { FeaturedVideo } from '../components/FeaturedVideo/FeaturedVideo';
import { VideoGrid } from '../components/VideoGrid/VideoGrid';
import { useApp } from '../context/AppContext';

export const Watch = () => {
  const { videos } = useApp();
  const [selectedTag, setSelectedTag] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const tags = ['ALL', 'CROWD WORK', 'DARK HUMOR', 'DEADPAN', 'OBSERVATIONAL', 'ROAST'];

  const filteredVideos = videos.filter((vid) => {
    const matchesTag = selectedTag === 'ALL' || (vid.tag && vid.tag.toUpperCase() === selectedTag);
    const matchesSearch =
      searchQuery.trim() === '' ||
      vid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (vid.category && vid.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  return (
    <div className="page-watch-root">
      <Navbar />

      <main className="section page-main-content">
        <div className="container">
          {/* Header Banner */}
          <div className="page-banner text-center">
            <div className="section-badge">
              <span className="material-symbols-outlined">smart_display</span>
              <span>BROADCAST THEATER</span>
            </div>
            <h1 className="page-title">
              WATCH <span className="text-gradient">UNCENSORED SETS</span>
            </h1>
            <p className="page-subtitle mx-auto">
              Raw punchlines, crowd roasts, and full qualifier episodes filmed in 4K UHD across Indian comedy clubs.
            </p>
          </div>

          {/* Featured Episode Showcase */}
          <FeaturedVideo />

          {/* Video Filter & Search Controls */}
          <div className="watch-controls-bar">
            <div className="filter-pills">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  className={`filter-pill ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="watch-search-input-wrap">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                type="text"
                placeholder="Search comedian sets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input watch-search-input"
              />
            </div>
          </div>

          {/* Grid of Videos */}
          <div className="watch-archive-heading">
            <h2 className="watch-section-title">ALL PUBLISHED COMEDY TAPES ({filteredVideos.length})</h2>
          </div>

          <VideoGrid videos={filteredVideos} />
        </div>
      </main>

      <Footer />
    </div>
  );
};
