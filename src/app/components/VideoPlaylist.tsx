"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, List, SkipForward, SkipBack, Shuffle, X, Eye, Calendar } from 'lucide-react';
import { VideoData } from '../lib/mediaData';
import { VideoModal } from './VideoPlayer';
import { getYouTubeVideoId, getYouTubeThumbnail } from '../lib/youtubeUtils';
import { cn } from '../lib/utils';

interface VideoPlaylistProps {
  videos: VideoData[];
  title?: string;
  className?: string;
  showShuffle?: boolean;
}

interface PlaylistModalProps {
  videos: VideoData[];
  initialVideoIndex: number;
  isOpen: boolean;
  onClose: () => void;
  showShuffle?: boolean;
}

// Video thumbnail component for playlist items
const PlaylistVideoThumbnail: React.FC<{ video: VideoData; className?: string }> = ({ 
  video, 
  className 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState<string | null>(null);

  // Initialize thumbnail URL
  const initializeThumbnailUrl = useMemo(() => {
    const videoId = getYouTubeVideoId(video.embedUrl);
    if (videoId) {
      return getYouTubeThumbnail(videoId, 'mq'); // Use medium quality for playlist thumbnails
    }
    return video.thumbnail || null;
  }, [video.embedUrl, video.thumbnail]);

  React.useEffect(() => {
    setCurrentThumbnailUrl(initializeThumbnailUrl);
    setImageLoaded(false);
    setImageError(false);
  }, [initializeThumbnailUrl]);

  const handleImageError = useCallback(() => {
    setImageLoaded(false);
    
    const videoId = getYouTubeVideoId(video.embedUrl);
    const currentSrc = currentThumbnailUrl;
    
    if (videoId && currentSrc?.includes('mqdefault')) {
      // Try standard quality fallback
      const newUrl = getYouTubeThumbnail(videoId, 'sd');
      setCurrentThumbnailUrl(newUrl);
    } else if (videoId && currentSrc?.includes('sddefault')) {
      // Try default quality fallback
      const newUrl = getYouTubeThumbnail(videoId, 'default');
      setCurrentThumbnailUrl(newUrl);
    } else if (video.thumbnail && currentSrc !== video.thumbnail) {
      // Final fallback to provided thumbnail
      setCurrentThumbnailUrl(video.thumbnail);
    } else {
      // All fallbacks failed
      setImageError(true);
      setImageLoaded(true);
    }
  }, [video.embedUrl, video.thumbnail, currentThumbnailUrl]);

  return (
    <div className={cn("relative overflow-hidden aspect-[16/10]", className)}>
      {!imageError && currentThumbnailUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentThumbnailUrl}
          alt={video.title}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            "group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <Play size={16} className="text-gray-500" />
        </div>
      )}

      {/* Loading skeleton */}
      {!imageLoaded && currentThumbnailUrl && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse" />
      )}

      {/* Duration overlay */}
      {video.duration && (
        <div className="absolute bottom-1 right-1 bg-black/80 px-1 text-xs text-white rounded">
          {video.duration}
        </div>
      )}

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="bg-emerald-500/90 rounded-full p-2">
          <Play size={12} className="text-white ml-0.5" fill="currentColor" />
        </div>
      </div>
    </div>
  );
};

export const VideoPlaylist: React.FC<VideoPlaylistProps> = ({
  videos,
  title = "Video Playlist",
  className,
  showShuffle = true
}) => {
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  const totalDuration = useMemo(() => {
    const durations = videos.map(video => {
      if (!video.duration) return 0;
      const [minutes, seconds] = video.duration.split(':').map(Number);
      return minutes * 60 + seconds;
    });
    const total = durations.reduce((sum, duration) => sum + duration, 0);
    const totalMinutes = Math.floor(total / 60);
    const remainingSeconds = total % 60;
    return `${totalMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, [videos]);

  const handleVideoSelect = useCallback((index: number) => {
    setSelectedVideoIndex(index);
    setIsPlaylistOpen(true);
  }, []);

  const formatViews = useCallback((views?: number): string => {
    if (!views) return '0 views';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
    return `${views} views`;
  }, []);

  const formatDate = useCallback((dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }, []);

  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <List size={48} className="mx-auto mb-4 opacity-50" />
        <p>No videos available in this playlist</p>
      </div>
    );
  }

  return (
    <>
      <div className={cn("bg-gray-900/50 rounded-xl border border-gray-800", className)}>
        {/* Playlist Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-1 font-orbitron">{title}</h3>
              <p className="text-gray-400 text-sm">
                {videos.length} videos • {totalDuration} total
              </p>
            </div>
            <div className="flex items-center gap-3">
              {showShuffle && (
                <button
                  onClick={() => {
                    const randomIndex = Math.floor(Math.random() * videos.length);
                    handleVideoSelect(randomIndex);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  title="Shuffle play"
                >
                  <Shuffle size={16} />
                  <span className="hidden sm:inline">Shuffle</span>
                </button>
              )}
              <button
                onClick={() => handleVideoSelect(0)}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
              >
                <Play size={16} fill="currentColor" />
                <span>Play All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Video List */}
        <div className="max-h-96 overflow-y-auto">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className="flex items-center gap-4 p-4 hover:bg-gray-800/50 cursor-pointer border-b border-gray-800/50 last:border-b-0"
              whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.5)" }}
              onClick={() => handleVideoSelect(index)}
            >
              {/* Video Number */}
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-400 font-medium">
                {index + 1}
              </div>

              {/* Video Thumbnail */}
              <div className="flex-shrink-0 relative">
                <div className="w-20 h-12 bg-gray-800 rounded overflow-hidden group">
                  <PlaylistVideoThumbnail 
                    video={video} 
                    className="w-full h-full rounded"
                  />
                </div>
              </div>

              {/* Video Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium line-clamp-1 group-hover:text-emerald-400 transition-colors">
                  {video.title}
                </h4>
                <p className="text-gray-400 text-sm line-clamp-1 mt-1">
                  {video.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  {video.views && (
                    <div className="flex items-center gap-1">
                      <Eye size={10} />
                      <span>{formatViews(video.views)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar size={10} />
                    <span>{formatDate(video.uploadDate)}</span>
                  </div>
                  {video.game && (
                    <span className="text-emerald-400 font-medium">
                      {video.game}
                    </span>
                  )}
                </div>
              </div>

              {/* Category Badge */}
              <div className="flex-shrink-0">
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium capitalize",
                  "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                )}>
                  {video.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Playlist Modal */}
      <PlaylistModal
        videos={videos}
        initialVideoIndex={selectedVideoIndex}
        isOpen={isPlaylistOpen}
        onClose={() => setIsPlaylistOpen(false)}
        showShuffle={showShuffle}
      />
    </>
  );
};

// Playlist Modal with video player and navigation
const PlaylistModal: React.FC<PlaylistModalProps> = ({
  videos,
  initialVideoIndex,
  isOpen,
  onClose,
  showShuffle = true
}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(initialVideoIndex);
  const [showPlaylist, setShowPlaylist] = useState(false);

  // Update current video when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCurrentVideoIndex(initialVideoIndex);
    }
  }, [isOpen, initialVideoIndex]);

  const currentVideo = videos[currentVideoIndex];
  
  const goToNext = useCallback(() => {
    setCurrentVideoIndex(prev => (prev + 1) % videos.length);
  }, [videos.length]);

  const goToPrevious = useCallback(() => {
    setCurrentVideoIndex(prev => (prev - 1 + videos.length) % videos.length);
  }, [videos.length]);

  const goToRandom = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setCurrentVideoIndex(randomIndex);
  }, [videos.length]);

  const selectVideo = useCallback((index: number) => {
    setCurrentVideoIndex(index);
    setShowPlaylist(false);
  }, []);

  if (!currentVideo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex-1 flex flex-col">
            {/* Header Controls */}
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <div className="flex items-center gap-4">
                <button
                  onClick={goToPrevious}
                  className="p-2 text-white hover:text-emerald-400 transition-colors"
                  title="Previous video"
                  disabled={videos.length <= 1}
                >
                  <SkipBack size={24} />
                </button>
                <button
                  onClick={goToNext}
                  className="p-2 text-white hover:text-emerald-400 transition-colors"
                  title="Next video"
                  disabled={videos.length <= 1}
                >
                  <SkipForward size={24} />
                </button>
                {showShuffle && (
                  <button
                    onClick={goToRandom}
                    className="p-2 text-white hover:text-emerald-400 transition-colors"
                    title="Random video"
                    disabled={videos.length <= 1}
                  >
                    <Shuffle size={24} />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                    showPlaylist 
                      ? "bg-emerald-500 text-white" 
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  )}
                >
                  <List size={16} />
                  <span className="hidden sm:inline">Playlist</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-white hover:text-emerald-400 transition-colors"
                  title="Close playlist"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex">
              {/* Video Player Area */}
              <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-6xl">
                  <VideoModal 
                    video={currentVideo}
                    isOpen={true}
                    onClose={onClose} // Allow closing the entire playlist from video modal
                  />
                </div>
              </div>

              {/* Playlist Sidebar */}
              <AnimatePresence>
                {showPlaylist && (
                  <motion.div
                    className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col"
                    initial={{ x: 320 }}
                    animate={{ x: 0 }}
                    exit={{ x: 320 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-4 border-b border-gray-800">
                      <h3 className="text-white font-semibold">
                        Playlist ({videos.length} videos)
                      </h3>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                      {videos.map((video, index) => (
                        <div
                          key={video.id}
                          className={cn(
                            "flex items-center gap-3 p-3 cursor-pointer border-b border-gray-800/50",
                            "hover:bg-gray-800/50 transition-colors group",
                            index === currentVideoIndex ? "bg-emerald-500/20 border-emerald-500/30" : ""
                          )}
                          onClick={() => selectVideo(index)}
                        >
                          <div className="flex-shrink-0 w-6 text-center">
                            <span className={cn(
                              "text-sm font-medium",
                              index === currentVideoIndex ? "text-emerald-400" : "text-gray-400"
                            )}>
                              {index + 1}
                            </span>
                          </div>

                          {/* Video Thumbnail */}
                          <div className="flex-shrink-0 relative">
                            <div className="w-16 h-10 bg-gray-800 rounded overflow-hidden">
                              <PlaylistVideoThumbnail 
                                video={video} 
                                className="w-full h-full rounded"
                              />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h4 className={cn(
                              "text-sm font-medium line-clamp-2",
                              index === currentVideoIndex ? "text-emerald-400" : "text-white"
                            )}>
                              {video.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">
                              {video.duration}
                            </p>
                          </div>
                          
                          {index === currentVideoIndex && (
                            <div className="flex-shrink-0">
                              <Play size={12} className="text-emerald-400" fill="currentColor" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 