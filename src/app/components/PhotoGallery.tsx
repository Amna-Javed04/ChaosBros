"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download, MapPin, User, Calendar, Maximize2, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { PhotoData } from '../lib/mediaData';
import { cn } from '../lib/utils';
import Image from 'next/image';

interface PhotoGalleryProps {
  photos: PhotoData[];
  className?: string;
}

interface PhotoModalProps {
  photos: PhotoData[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

interface PhotoCardProps {
  photo: PhotoData;
  index: number;
  onClick: (index: number) => void;
}

// Individual photo card component
const PhotoCard: React.FC<PhotoCardProps> = ({ photo, index, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  return (
    <motion.div
      className="relative group cursor-pointer overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-emerald-500/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(index)}
    >
      {/* Photo Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        {!imageError ? (
          <Image
            src={photo.thumbnail}
            alt={photo.title}
            style={{objectFit: 'cover'}}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              "group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            fill
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-gray-600 text-center">
              <Maximize2 size={32} className="mx-auto mb-2" />
              <p className="text-sm">Image not available</p>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
        )}

        {/* Overlay with info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg mb-1 line-clamp-2">
              {photo.title}
            </h3>
            <p className="text-gray-300 text-sm line-clamp-2 mb-2">
              {photo.description}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>{formatDate(photo.uploadDate)}</span>
              {photo.location && (
                <div className="flex items-center gap-1">
                  <MapPin size={12} />
                  <span className="truncate max-w-20">{photo.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className={cn(
          "absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium capitalize",
          "bg-emerald-500/90 text-white backdrop-blur-sm"
        )}>
          {photo.category}
        </div>

        {/* Expand Icon */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
            <Maximize2 size={16} className="text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main photo gallery component
export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, className }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhotoIndex(null);
  };

  const handleNavigate = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  if (!photos || photos.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="text-gray-400 mb-4">
          <Maximize2 size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No photos available</p>
          <p className="text-sm">Check back later for amazing team content!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={cn("grid gap-6", className)}>
        {/* Consistent grid layout for better alignment */}
        <div className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
          "auto-rows-max"
        )}>
          {photos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              index={index}
              onClick={handlePhotoClick}
            />
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      {selectedPhotoIndex !== null && (
        <PhotoModal
          photos={photos}
          currentIndex={selectedPhotoIndex}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
};

// Full-screen photo modal with navigation
const PhotoModal: React.FC<PhotoModalProps> = ({ 
  photos, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNavigate 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const currentPhoto = photos[currentIndex];

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    // Reset zoom and position when changing photos
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  }, [currentIndex]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleArrowKeys = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex]);

  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1;
    onNavigate(newIndex);
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  }, [currentIndex, photos.length, onNavigate]);

  // Zoom and pan handlers
  const handleZoom = useCallback((direction: 'in' | 'out') => {
    setScale(prev => {
      const newScale = direction === 'in' 
        ? Math.min(prev * 1.2, 5) 
        : Math.max(prev / 1.2, 0.5);
      
      // Reset position if zooming out to 1x or less
      if (newScale <= 1) {
        setPosition({ x: 0, y: 0 });
      }
      
      return newScale;
    });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? 'out' : 'in';
    handleZoom(direction);
  }, [handleZoom]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, [scale]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      
      setPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, lastPanPoint, scale]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleReset = useCallback(() => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  }, []);

  const handleRotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  const formatDate = (dateString: string): string => {
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
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = currentPhoto.imageUrl;
    link.download = `${currentPhoto.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!currentPhoto) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Navigation Controls */}
          <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="pointer-events-auto p-2 sm:p-3 bg-black/60 hover:bg-black/80 rounded-full text-white hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="pointer-events-auto p-2 sm:p-3 bg-black/60 hover:bg-black/80 rounded-full text-white hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm"
              aria-label="Next photo"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Top Controls */}
          <div className="absolute top-0 left-0 right-0 p-2 sm:p-6 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 sm:gap-4 text-white pointer-events-auto">
              <span className="text-xs sm:text-sm bg-black/60 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                {currentIndex + 1} of {photos.length}
              </span>
              {scale !== 1 && (
                <span className="text-xs sm:text-sm bg-emerald-500/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-400">
                  {Math.round(scale * 100)}%
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {/* Zoom Controls - Hide some on mobile */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom('in');
                }}
                className="pointer-events-auto p-1.5 sm:p-2 bg-black/60 hover:bg-black/80 rounded-full text-white hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm"
                aria-label="Zoom in"
                disabled={scale >= 5}
              >
                <ZoomIn size={16} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoom('out');
                }}
                className="pointer-events-auto p-1.5 sm:p-2 bg-black/60 hover:bg-black/80 rounded-full text-white hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm disabled:opacity-50"
                aria-label="Zoom out"
                disabled={scale <= 0.5}
              >
                <ZoomOut size={16} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRotate();
                }}
                className="hidden sm:flex pointer-events-auto p-1.5 sm:p-2 bg-black/60 hover:bg-black/80 rounded-full text-white hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm items-center justify-center"
                aria-label="Rotate photo"
              >
                <RotateCw size={16} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReset();
                }}
                className="hidden sm:flex pointer-events-auto p-1.5 sm:p-2 bg-black/60 hover:bg-black/80 rounded-full text-white hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm items-center justify-center"
                aria-label="Reset view"
                disabled={scale === 1 && position.x === 0 && position.y === 0 && rotation === 0}
              >
                <Maximize2 size={16} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                className="hidden sm:flex pointer-events-auto p-1.5 sm:p-2 bg-black/60 hover:bg-black/80 rounded-full text-white hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm items-center justify-center"
                aria-label="Download photo"
              >
                <Download size={16} className="sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={onClose}
                className="pointer-events-auto p-1.5 sm:p-2 bg-black/60 hover:bg-black/80 rounded-full text-white hover:text-emerald-400 transition-all duration-200 backdrop-blur-sm"
                aria-label="Close photo"
              >
                <X size={16} className="sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Main Photo */}
          <motion.div
            className="relative max-w-7xl max-h-[70vh] sm:max-h-[80vh] mx-auto overflow-hidden px-2 sm:px-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              ref={imageContainerRef}
              className={cn(
                "relative select-none",
                scale > 1 ? "cursor-grab" : "cursor-default",
                isDragging ? "cursor-grabbing" : ""
              )}
              onWheel={handleWheel}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {/* Loading indicator */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg min-h-[300px] sm:min-h-[400px] w-full">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-emerald-500"></div>
                </div>
              )}

              {!imageError ? (
                <Image
                  src={currentPhoto.imageUrl}
                  alt={currentPhoto.title}
                  className={cn(
                    "max-w-full max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg shadow-2xl transition-transform duration-200",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  style={{
                    transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px) rotate(${rotation}deg)`,
                    transformOrigin: 'center center'
                  }}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageError(true);
                    setImageLoaded(true);
                  }}
                  height={1000}
                  width={1000}
                />
              ) : (
                <div className="bg-gray-900 rounded-lg p-6 sm:p-12 text-center min-h-[300px] sm:min-h-[400px] w-full flex items-center justify-center">
                  <div className="text-gray-400">
                    <Maximize2 size={32} className="sm:w-12 sm:h-12 mx-auto mb-4" />
                    <p className="text-base sm:text-lg mb-2">Image not available</p>
                    <p className="text-xs sm:text-sm">Unable to load the full resolution image</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Bottom Info Panel */}
          <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-6 pointer-events-none">
            <motion.div
              className="bg-black/80 backdrop-blur-sm rounded-xl p-3 sm:p-6 max-w-4xl mx-auto pointer-events-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium capitalize",
                      "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    )}>
                      {currentPhoto.category}
                    </span>
                  </div>

                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 font-orbitron line-clamp-2">
                    {currentPhoto.title}
                  </h2>
                  
                  <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
                    {currentPhoto.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="sm:w-4 sm:h-4" />
                      <span>{formatDate(currentPhoto.uploadDate)}</span>
                    </div>
                    
                    {currentPhoto.location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="sm:w-4 sm:h-4" />
                        <span className="truncate">{currentPhoto.location}</span>
                      </div>
                    )}
                    
                    {currentPhoto.photographer && (
                      <div className="flex items-center gap-2">
                        <User size={14} className="sm:w-4 sm:h-4" />
                        <span className="truncate">{currentPhoto.photographer}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center border-t border-gray-700 pt-2 sm:pt-3">
                    <p className="hidden sm:block">💡 Use mouse wheel to zoom • Click and drag to pan when zoomed • Use controls above to rotate</p>
                    <p className="sm:hidden">💡 Pinch to zoom • Drag to pan</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 