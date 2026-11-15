"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Image, Eye, Grid3X3, Play, Camera, Film } from 'lucide-react';
// import { VideoThumbnail } from '../VideoPlayer';
import { VideoPlaylist } from '../VideoPlaylist';
import { BackgroundVideoPlayer } from '../BackgroundVideoPlayer';
import { PhotoGallery } from '../PhotoGallery';
import { VIDEOS_DATA, PHOTOS_DATA, getTotalMediaCount } from '../../lib/mediaData';
import { cn } from '../../lib/utils';

// Tab interface
interface MediaTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  count: number;
}

// Section heading animation variants
const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.4,
      staggerChildren: 0.1,
    },
  },
};

export const Media: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const mediaCounts = getTotalMediaCount();

  // Define tabs with counts
  const tabs: MediaTab[] = useMemo(() => [
    {
      id: 'all',
      label: 'All Media',
      icon: <Grid3X3 size={20} />,
      description: 'View all videos and photos',
      count: mediaCounts.total,
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: <Video size={20} />,
      description: 'Match highlights, tournaments, and behind the scenes',
      count: mediaCounts.videos,
    },
    {
      id: 'photos',
      label: 'Photos',
      icon: <Image size={20} />,
      description: 'Team photos, events, and training sessions',
      count: mediaCounts.photos,
    },
    {
      id: 'bts',
      label: 'Behind the Scenes',
      icon: <Eye size={20} />,
      description: 'Exclusive content from behind the competitive scene',
      count: [...VIDEOS_DATA, ...PHOTOS_DATA].filter(item => 
        ('category' in item && item.category === 'bts')
      ).length,
    },
  ], [mediaCounts]);

  // Filter content based on active tab and category
  const filteredVideos = useMemo(() => {
    let videos = VIDEOS_DATA;
    
    if (activeTab === 'photos') return [];
    if (activeTab === 'bts') {
      videos = videos.filter(video => video.category === 'bts');
    }
    
    if (filterCategory !== 'all') {
      videos = videos.filter(video => video.category === filterCategory);
    }
    
    return videos;
  }, [activeTab, filterCategory]);

  const filteredPhotos = useMemo(() => {
    let photos = PHOTOS_DATA;
    
    if (activeTab === 'videos') return [];
    if (activeTab === 'bts') {
      photos = photos.filter(photo => photo.category === 'bts');
    }
    
    if (filterCategory !== 'all') {
      photos = photos.filter(photo => photo.category === filterCategory);
    }
    
    return photos;
  }, [activeTab, filterCategory]);

  // Get unique categories for filtering based on active tab
  const availableCategories = useMemo(() => {
    let relevantVideos = VIDEOS_DATA;
    let relevantPhotos = PHOTOS_DATA;
    
    // Filter based on active tab to show correct counts
    if (activeTab === 'videos') {
      relevantPhotos = []; // Don't count photos when on videos tab
    } else if (activeTab === 'photos') {
      relevantVideos = []; // Don't count videos when on photos tab
    } else if (activeTab === 'bts') {
      relevantVideos = VIDEOS_DATA.filter(v => v.category === 'bts');
      relevantPhotos = PHOTOS_DATA.filter(p => p.category === 'bts');
    }
    
    const videoCategories = [...new Set(relevantVideos.map(v => v.category))];
    const photoCategories = [...new Set(relevantPhotos.map(p => p.category))];
    const allCategories = [...new Set([...videoCategories, ...photoCategories])];
    
    return [
      { 
        id: 'all', 
        name: 'All Categories', 
        count: relevantVideos.length + relevantPhotos.length 
      },
      ...allCategories.map(cat => ({
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: [
          ...relevantVideos.filter(v => v.category === cat),
          ...relevantPhotos.filter(p => p.category === cat)
        ].length,
      }))
    ];
  }, [activeTab]); // Add activeTab as dependency

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setFilterCategory('all'); // Reset filter when changing tabs
  };

  const getTabButtonClass = (tabId: string) => {
    return cn(
      "flex items-center gap-3 px-6 py-4 rounded-xl font-medium transition-all duration-300",
      "border border-gray-700 hover:border-emerald-500/50 hover:bg-gray-800/50",
      "focus:outline-none focus:ring-2 focus:ring-emerald-500/50",
      activeTab === tabId
        ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-500/50 text-emerald-400"
        : "bg-gray-800/30 text-gray-400 hover:text-white"
    );
  };

  const getCategoryButtonClass = (catId: string) => {
    return cn(
      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      "border border-gray-700 hover:border-emerald-500/50",
      filterCategory === catId
        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
        : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
    );
  };
  return (
    <section
      id="media"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-orbitron"
          >
            <span className="bg-gradient-to-r from-red-400 via-red-500 to-blue-400 bg-clip-text text-transparent">
              Locked. Loaded.
            </span>
            <br />
            <span className="text-white">Livestreamed.</span>
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            Dive into our collection of epic gaming moments, team highlights, and 
            behind-the-scenes content. Experience the journey of ChaosBros through 
            our lens.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-cyan-400 mx-auto mt-8 rounded-full"
          />
        </div>

        {/* Media Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2 font-orbitron flex items-center justify-center gap-2">
              <Video size={24} />
              {mediaCounts.videos}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Total Videos</div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2 font-orbitron flex items-center justify-center gap-2">
              <Camera size={24} />
              {mediaCounts.photos}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Total Photos</div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2 font-orbitron flex items-center justify-center gap-2">
              <Film size={24} />
              {VIDEOS_DATA.filter(v => v.category === 'highlight').length}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Highlights</div>
          </div>

          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2 font-orbitron flex items-center justify-center gap-2">
              <Eye size={24} />
              {[...VIDEOS_DATA, ...PHOTOS_DATA].filter(item => 
                ('category' in item && item.category === 'bts')
              ).length}
            </div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Behind Scenes</div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={getTabButtonClass(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  {tab.icon}
                </div>
                <div className="text-left">
                  <div className="font-semibold flex items-center gap-2">
                    {tab.label}
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  </div>
                  <div className="text-xs opacity-75 hidden sm:block">
                    {tab.description}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Category Filter (shown when not on "all" tab) */}
        {activeTab !== 'all' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {availableCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilterCategory(category.id)}
                  className={getCategoryButtonClass(category.id)}
                >
                  {category.name}
                  <span className="ml-2 text-xs opacity-75">
                    ({category.count})
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Content Area */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="min-h-[600px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + filterCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Videos Section */}
              {(activeTab === 'all' || activeTab === 'videos' || activeTab === 'bts') && filteredVideos.length > 0 && (
                <div className="mb-12">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <Play size={24} className="text-emerald-400" />
                    <h3 className="text-2xl font-bold text-white font-orbitron">
                      Videos
                    </h3>
                    <span className="text-emerald-400 text-sm bg-emerald-500/20 px-2 py-1 rounded-full">
                      {filteredVideos.length}
                    </span>
                  </div>

                  {/* Featured Video and Playlist Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Featured Background Video */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className="h-full"
                    >
                      <BackgroundVideoPlayer 
                        video={filteredVideos[0]} // Use first video as featured
                        className="h-full min-h-[400px]"
                        autoplay={false} // Don't autoplay by default
                        muted={true}
                        showControls={true}
                      />
                    </motion.div>

                    {/* All Videos Playlist */}
                    {filteredVideos.length > 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-full"
                      >
                        <VideoPlaylist 
                          videos={filteredVideos} 
                          title={activeTab === 'all' ? 'All Videos' : activeTab === 'videos' ? 'Video Playlist' : 'Behind the Scenes'}
                          className="h-full min-h-[400px]"
                        />
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Video Grid */}
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredVideos.map((video, index) => (
                      <motion.div
                        key={video.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="h-fit"
                      >
                        <VideoThumbnail video={video} lazyLoad={true} />
                      </motion.div>
                    ))}
                  </div> */}


                </div>
              )}

              {/* Photos Section */}
              {(activeTab === 'all' || activeTab === 'photos' || activeTab === 'bts') && filteredPhotos.length > 0 && (
                <div>
                  {activeTab === 'all' && (
                    <div className="flex items-center gap-3 mb-6">
                      <Camera size={24} className="text-emerald-400" />
                      <h3 className="text-2xl font-bold text-white font-orbitron">
                        Photos
                      </h3>
                      <span className="text-emerald-400 text-sm bg-emerald-500/20 px-2 py-1 rounded-full">
                        {filteredPhotos.length}
                      </span>
                    </div>
                  )}
                  
                  <PhotoGallery photos={filteredPhotos} />
                </div>
              )}

              {/* Empty State */}
              {filteredVideos.length === 0 && filteredPhotos.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-gray-400 mb-6">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                      <Image size={32} className="opacity-50" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">No Content Found</h3>
                    <p className="text-gray-500">
                      We&apos;re working on adding more amazing content. Check back soon!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
            
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 font-orbitron">
                Want More Content?
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
                Follow us on social media for daily updates, live streams, and exclusive 
                behind-the-scenes content from the ChaosBro team.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-semibold hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 shadow-lg hover:shadow-emerald-500/25">
                  Follow on Instagram
                </button>
                <button className="px-6 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-600 hover:border-gray-500">
                  Subscribe to YouTube
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 