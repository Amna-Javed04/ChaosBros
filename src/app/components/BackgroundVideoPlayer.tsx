"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Eye, Calendar } from 'lucide-react';
import { VideoData } from '../lib/mediaData';
import { getYouTubeVideoId, getYouTubeThumbnail } from '../lib/youtubeUtils';
import { cn } from '../lib/utils';

interface BackgroundVideoPlayerProps {
  video: VideoData;
  className?: string;
  showControls?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export const BackgroundVideoPlayer: React.FC<BackgroundVideoPlayerProps> = ({
  video,
  className,
  showControls = true,
  autoplay = true,
  muted = true,
  loop = true
}) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(muted);
  const [showOverlay, setShowOverlay] = useState(true);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Generate thumbnail URL
  useEffect(() => {
    const videoId = getYouTubeVideoId(video.embedUrl);
    if (videoId) {
      setThumbnailUrl(getYouTubeThumbnail(videoId, 'maxres'));
    } else if (video.thumbnail) {
      setThumbnailUrl(video.thumbnail);
    }
  }, [video.embedUrl, video.thumbnail]);

  const formatViews = (views?: number): string => {
    if (!views) return '0 views';
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
    return `${views} views`;
  };

  const formatDate = (dateString: string): string => {
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
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    setShowOverlay(false);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const videoId = getYouTubeVideoId(video.embedUrl);
  const embedUrl = videoId 
    ? `https://www.youtube.com/embed/${videoId}?autoplay=${isPlaying ? 1 : 0}&mute=${isMuted ? 1 : 0}&loop=${loop ? 1 : 0}&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`
    : video.embedUrl;
  return (
    <div className={cn("relative overflow-hidden bg-gray-900 rounded-xl", className)}>
      {/* Background Video or Thumbnail */}
      <div className="relative aspect-[16/10] w-full h-full">
        {isPlaying ? (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title={video.title}
            className="absolute inset-0 w-full h-full object-cover"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // Show custom gaming background for featured videos
          <div className="absolute inset-0">
            {/* Custom gaming background based on video category/game */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br",
              video.game === 'Valorant' ? "from-red-900/80 via-purple-900/60 to-blue-900/80" :
              video.game === 'Apex Legends' ? "from-orange-900/80 via-red-900/60 to-yellow-900/80" :
              video.game === 'Call of Duty' ? "from-green-900/80 via-gray-900/60 to-black/80" :
              "from-emerald-900/80 via-gray-900/60 to-cyan-900/80"
            )} />
            
            {/* Gaming pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-repeat bg-center" 
                   style={{
                     backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                   }} />
            </div>
            
            {/* Game logo or icon overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/20 text-8xl font-bold transform rotate-12">
                {video.game === 'Valorant' ? 'V' :
                 video.game === 'Apex Legends' ? 'A' :
                 video.game === 'Call of Duty' ? 'C' :
                 'CB'}
              </div>
            </div>

            {/* Thumbnail overlay if available */}
            {thumbnailUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnailUrl}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
            )}
          </div>
        )}

        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Video Information Overlay */}
        {showOverlay && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col justify-end p-6"
          >
            {/* Category Badge */}
            <div className="mb-4">
              <span className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize",
                "bg-emerald-500/90 text-white backdrop-blur-sm"
              )}>
                {video.category}
                {video.game && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                    {video.game}
                  </span>
                )}
              </span>
            </div>

            {/* Video Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-orbitron line-clamp-2">
              {video.title}
            </h3>

            {/* Video Description */}
            <p className="text-gray-200 mb-4 line-clamp-2 max-w-2xl">
              {video.description}
            </p>

            {/* Video Metadata */}
            <div className="flex items-center gap-6 text-sm text-gray-300 mb-6">
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
                  <span>{video.duration}</span>
                </div>
              )}
            </div>

            {/* Controls */}
            {showControls && (
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={handlePlayPause}
                  className="flex items-center gap-3 px-6 py-3 bg-emerald-500/90 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isPlaying ? (
                    <>
                      <Pause size={20} fill="currentColor" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play size={20} fill="currentColor" />
                      <span>Play</span>
                    </>
                  )}
                </motion.button>

                <button
                  onClick={handleMuteToggle}
                  className="p-3 bg-gray-800/70 hover:bg-gray-700/70 text-white rounded-lg transition-all duration-300 backdrop-blur-sm"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Play button overlay when paused */}
        {!isPlaying && !showOverlay && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <button
              onClick={handlePlayPause}
              className="bg-emerald-500/90 hover:bg-emerald-500 rounded-full p-6 transition-all duration-300 backdrop-blur-sm"
            >
              <Play size={32} className="text-white ml-1" fill="currentColor" />
            </button>
          </motion.div>
        )}

        {/* Hide overlay controls when playing */}
        {isPlaying && showControls && (
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setShowOverlay(!showOverlay)}
              className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-all duration-300 backdrop-blur-sm"
              title="Toggle overlay"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={handleMuteToggle}
              className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-all duration-300 backdrop-blur-sm"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}; 