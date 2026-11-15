// YouTube utility functions for handling video embeds and thumbnails

export type ThumbnailQuality = 'maxres' | 'hq' | 'mq' | 'sd' | 'default';

/**
 * Extract YouTube video ID from various YouTube URL formats
 * Supports embed URLs, watch URLs, and short URLs
 */
export function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /embed\/([a-zA-Z0-9_-]+)/,      // https://www.youtube.com/embed/VIDEO_ID
    /watch\?v=([a-zA-Z0-9_-]+)/,    // https://www.youtube.com/watch?v=VIDEO_ID
    /youtu\.be\/([a-zA-Z0-9_-]+)/,  // https://youtu.be/VIDEO_ID
    /\/v\/([a-zA-Z0-9_-]+)/,        // https://www.youtube.com/v/VIDEO_ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

/**
 * Generate YouTube thumbnail URL from video ID
 * @param videoId - YouTube video ID
 * @param quality - Thumbnail quality (maxres, hq, mq, sd, default)
 * @returns YouTube thumbnail URL
 */
export function getYouTubeThumbnail(videoId: string, quality: ThumbnailQuality = 'maxres'): string {
  const qualityMap: Record<ThumbnailQuality, string> = {
    maxres: 'maxresdefault.jpg',    // 1280x720 (if available)
    hq: 'hqdefault.jpg',            // 480x360
    mq: 'mqdefault.jpg',            // 320x180
    sd: 'sddefault.jpg',            // 640x480
    default: 'default.jpg',         // 120x90
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
}

/**
 * Get multiple thumbnail qualities for a video ID
 * Useful for providing fallback options
 */
export function getYouTubeThumbnails(videoId: string): Record<ThumbnailQuality, string> {
  return {
    maxres: getYouTubeThumbnail(videoId, 'maxres'),
    hq: getYouTubeThumbnail(videoId, 'hq'),
    mq: getYouTubeThumbnail(videoId, 'mq'),
    sd: getYouTubeThumbnail(videoId, 'sd'),
    default: getYouTubeThumbnail(videoId, 'default'),
  };
}

/**
 * Check if a URL is a YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  return /(?:youtube\.com|youtu\.be)/.test(url);
}

/**
 * Convert any YouTube URL to embed format
 */
export function convertToEmbedUrl(url: string): string | null {
  const videoId = getYouTubeVideoId(url);
  if (!videoId) return null;
  
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Example usage and demonstrations
 */
export const exampleUsage = {
  // Example: Extract video ID from embed URL
  videoId: getYouTubeVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ'), // 'dQw4w9WgXcQ'
  
  // Example: Generate thumbnail URLs
  thumbnail: getYouTubeThumbnail('dQw4w9WgXcQ', 'maxres'), // High quality thumbnail
  thumbnails: getYouTubeThumbnails('dQw4w9WgXcQ'),         // All quality options
  
  // Example: Convert watch URL to embed
  embedUrl: convertToEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),
}; 