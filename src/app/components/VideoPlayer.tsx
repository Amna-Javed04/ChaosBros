"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Calendar, Eye, Clock, ExternalLink, Loader2 } from 'lucide-react';
import { VideoData } from '../lib/mediaData';
import { cn } from '../lib/utils';

interface VideoPlayerProps {
  video: VideoData;
  autoplay?: boolean;
  className?: string;
  lazyLoad?: boolean; // New prop for lazy loading
}

interface VideoModalProps {
  video: VideoData;
  isOpen: boolean;
  onClose: () => void;
}

// Custom hook for intersection observer (lazy loading)
const useIntersectionObserver = (
  elementRef: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return isIntersecting;
};

// Video thumbnail with play overlay and lazy loading
export const VideoThumbnail: React.FC<VideoPlayerProps> = ({ 
  video, 
  className,
  lazyLoad = true // Enable lazy loading by default
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentThumbnailUrl, setCurrentThumbnailUrl] = useState<string | null>(null);
  
  // Refs for lazy loading
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(containerRef, { threshold: 0.1 });

  const handlePlayClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  // Extract YouTube video ID from embed URL
  const getYouTubeVideoId = useCallback((url: string): string | null => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }, []);

  // Generate YouTube thumbnail URL from video ID
  const getYouTubeThumbnail = useCallback((videoId: string, quality: 'maxres' | 'hq' | 'mq' | 'sd' = 'maxres'): string => {
    const qualityMap = {
      maxres: 'maxresdefault.jpg',
      hq: 'hqdefault.jpg',
      mq: 'mqdefault.jpg',
      sd: 'sddefault.jpg'
    };
    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
  }, []);

  // Initialize thumbnail URL only once or when in view (for lazy loading)
  const initializeThumbnailUrl = useMemo(() => {
    if (lazyLoad && !isInView) return null; // Don't load until in view
    
    const videoId = getYouTubeVideoId(video.embedUrl);
    if (videoId) {
      return getYouTubeThumbnail(videoId, 'maxres'); // Start with highest quality
    }
    return video.thumbnail || null;
  }, [video.embedUrl, video.thumbnail, getYouTubeVideoId, getYouTubeThumbnail, lazyLoad, isInView]);

  // Set initial thumbnail URL when component mounts or comes into view
  useEffect(() => {
    setCurrentThumbnailUrl(initializeThumbnailUrl);
    setImageLoaded(false);
    setImageError(false);
  }, [initializeThumbnailUrl]);

  // Reset loading state when thumbnail URL changes (for fallbacks)
  useEffect(() => {
    if (currentThumbnailUrl) {
      setImageLoaded(false);
      setImageError(false);
    }
  }, [currentThumbnailUrl]);

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

  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    // Reset loading state for next attempt
    setImageLoaded(false);
    
    const videoId = getYouTubeVideoId(video.embedUrl);
    const currentSrc = e.currentTarget.src;
    
    if (videoId && currentSrc.includes('maxresdefault')) {
      // Try high quality fallback
      const newUrl = getYouTubeThumbnail(videoId, 'hq');
      setCurrentThumbnailUrl(newUrl);
    } else if (videoId && currentSrc.includes('hqdefault')) {
      // Try medium quality fallback
      const newUrl = getYouTubeThumbnail(videoId, 'mq');
      setCurrentThumbnailUrl(newUrl);
    } else if (videoId && currentSrc.includes('mqdefault')) {
      // Try standard quality fallback
      const newUrl = getYouTubeThumbnail(videoId, 'sd');
      setCurrentThumbnailUrl(newUrl);
    } else if (video.thumbnail && currentSrc !== video.thumbnail) {
      // Final fallback to provided thumbnail
      setCurrentThumbnailUrl(video.thumbnail);
    } else {
      // All fallbacks failed
      setImageError(true);
      setImageLoaded(true);
    }
  }, [video.embedUrl, video.thumbnail, getYouTubeVideoId, getYouTubeThumbnail]);

  return (
    <>
      <motion.div 
        ref={containerRef}
        className={cn(
          "relative group cursor-pointer overflow-hidden rounded-xl bg-gray-900 border border-gray-800",
          "hover:border-emerald-500/50 transition-all duration-300",
          "hover:shadow-lg hover:shadow-emerald-500/20",
          className
        )}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        onClick={handlePlayClick}
      >
        {/* Thumbnail Image */}
        <div className="aspect-[16/10] relative overflow-hidden">
          {lazyLoad && !isInView ? (
            // Lazy loading placeholder
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center">
                <Loader2 size={32} className="text-gray-600 animate-spin mb-2" />
                <p className="text-gray-600 text-sm">Loading...</p>
              </div>
            </div>
          ) : !imageError && currentThumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={currentThumbnailUrl}
              alt={video.title}
              className={cn(
                "w-full h-full object-cover transition-all duration-500",
                "group-hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              onError={handleImageError}
              loading={lazyLoad ? "lazy" : "eager"}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <Play size={48} className="text-gray-600" />
            </div>
          )}

          {/* Loading skeleton */}
          {!imageLoaded && currentThumbnailUrl && !imageError && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
          )}

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <motion.div
              className="bg-emerald-500/90 backdrop-blur-sm rounded-full p-4 shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play size={32} className="text-white ml-1" fill="currentColor" />
            </motion.div>
          </div>

          {/* Duration Badge */}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
              {video.duration}
            </div>
          )}

          {/* Category Badge */}
          <div className={cn(
            "absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium capitalize",
            "bg-emerald-500/90 text-white backdrop-blur-sm"
          )}>
            {video.category}
          </div>
        </div>

        {/* Video Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-emerald-400 transition-colors">
            {video.title}
          </h3>
          
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {video.description}
          </p>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              {video.views && (
                <div className="flex items-center gap-1">
                  <Eye size={12} />
                  <span>{formatViews(video.views)}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{formatDate(video.uploadDate)}</span>
              </div>
            </div>
            
            {video.game && (
              <div className="text-emerald-400 font-medium">
                {video.game}
              </div>
            )}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </motion.div>

      {/* Video Modal */}
      <VideoModal 
        video={video} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

// Full-screen video modal with lazy loading for iframe
const VideoModal: React.FC<VideoModalProps> = ({ video, isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
      // Load iframe only when modal opens
      setShouldLoadIframe(true);
    } else {
      // Reset iframe loading when modal closes
      setShouldLoadIframe(false);
      setIsLoading(true);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
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
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  }, []);

  const getYouTubeVideoId = useCallback((url: string): string | null => {
    const match = url.match(/embed\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  }, []);

  const videoId = useMemo(() => getYouTubeVideoId(video.embedUrl), [video.embedUrl, getYouTubeVideoId]);
  const autoplayEmbedUrl = useMemo(() => {
    return videoId 
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
      : video.embedUrl;
  }, [videoId, video.embedUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-6xl mx-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 text-white hover:text-emerald-400 transition-colors z-10"
              aria-label="Close video"
            >
              <X size={32} />
            </button>

            {/* Video Container */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              {/* Video Player */}
              <div className="relative aspect-video bg-black">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <Loader2 size={48} className="text-emerald-500 animate-spin mb-4" />
                      <p className="text-white text-lg">Loading video...</p>
                    </div>
                  </div>
                )}
                
                {shouldLoadIframe && (
                  <iframe
                    ref={iframeRef}
                    src={autoplayEmbedUrl}
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={handleIframeLoad}
                  />
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium capitalize",
                        "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      )}>
                        {video.category}
                      </span>
                      {video.game && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                          {video.game}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3 font-orbitron">
                      {video.title}
                    </h2>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {video.description}
                    </p>

                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      {video.views && (
                        <div className="flex items-center gap-2">
                          <Eye size={16} />
                          <span>{formatViews(video.views)}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{formatDate(video.uploadDate)}</span>
                      </div>
                      {video.duration && (
                        <div className="flex items-center gap-2">
                          <Clock size={16} />
                          <span>{video.duration}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* External Link */}
                  {videoId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>Watch on YouTube</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { VideoModal }; 