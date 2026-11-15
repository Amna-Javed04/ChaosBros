"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { Product, formatPrice } from "../lib/shopData";
import { cn } from "../lib/utils";

// Icons from Lucide React
import {
  // Bell,
  Package,
  ShoppingCart,
  Clock,
  // Eye,
  ZoomIn,
} from "lucide-react";

interface ProductCardProps {
  product: Product;
  index: number;
  onNotifyClick: (productId: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  index, 
  // onNotifyClick,
  onQuickView 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Staggered animation delay
  const animationDelay = index * 0.15;

  // Get all images for hover effects
  const allImages = [product.image, ...(product.alternateImages || [])];

  // Fallback image
  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    product.name
  )}&background=1f1f23&color=00FFAA&size=400&bold=true`;

  // Status badge configuration
  const getStatusConfig = () => {
    switch (product.status) {
      case 'coming-soon':
        return {
          text: 'Coming Soon',
          className: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
          icon: Clock
        };
      case 'available':
        return {
          text: 'Available',
          className: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
          icon: ShoppingCart
        };
      case 'sold-out':
        return {
          text: 'Sold Out',
          className: 'text-red-400 bg-red-400/10 border-red-400/20',
          icon: Package
        };
      default:
        return {
          text: 'Unknown',
          className: 'text-gray-400 bg-gray-400/10 border-gray-400/20',
          icon: Package
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  // const handleNotifyClick = useCallback((e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   onNotifyClick(product.id);
  // }, [product.id, onNotifyClick]);

  const handleQuickView = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  }, [product, onQuickView]);

  // Cycle through images on hover
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isHovered && allImages.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
      }, 1500); // Change image every 1.5 seconds on hover
    } else {
      setCurrentImageIndex(0); // Reset to first image when not hovered
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, allImages.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: animationDelay }}
      className="w-full max-w-sm mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700",
          "transition-all duration-300",
          "hover:scale-105 hover:shadow-2xl",
          isHovered && "shadow-lg shadow-emerald-500/20"
        )}
        onClick={handleQuickView}
      >
        {/* Product Image */}
        <div className="relative h-64 overflow-hidden bg-gray-800 group/image">
          <Image
            src={imageError ? fallbackImage : allImages[currentImageIndex]}
            alt={`${product.name} - ${currentImageIndex > 0 ? `View ${currentImageIndex + 1}` : 'Main'}`}
            fill
            className={cn(
              "object-cover transition-all duration-700",
              isHovered ? "scale-110" : "scale-100"
            )}
            onError={() => setImageError(true)}
          />
          
          {/* Zoom overlay on hover */}
          <div className={cn(
            "absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
              <ZoomIn size={24} className="text-white" />
            </div>
          </div>
          
          {/* Coming Soon Overlay */}
          {product.status === 'coming-soon' && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center">
                <Clock size={48} className="text-emerald-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2 font-orbitron">
                  COMING SOON
                </div>
                <div className="text-sm text-gray-300">
                  Get notified when available
                </div>
              </div>
            </div>
          )}

          {/* Quick View Button */}
          {/* {onQuickView && (
            <div className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}>
              <button
                onClick={handleQuickView}
                className={cn(
                  "bg-emerald-500/90 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg",
                  "flex items-center gap-2 font-medium text-sm",
                  "backdrop-blur-sm border border-emerald-400/20",
                  "transition-all duration-200 hover:scale-105",
                  "shadow-lg shadow-emerald-500/25"
                )}
              >
                <Eye size={16} />
                Quick View
              </button>
            </div>
          )} */}

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
                "flex items-center gap-1",
                statusConfig.className
              )}
            >
              <StatusIcon size={12} />
              {statusConfig.text}
            </span>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm text-gray-300 bg-gray-900/50 border-gray-600">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </span>
          </div>

          {/* Image Counter (if multiple images) */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 right-4">
              <span className="px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm text-gray-300 bg-black/50 border border-gray-600">
                {currentImageIndex + 1}/{allImages.length}
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-6">
          {/* Product Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
              {product.name}
            </h3>
            <div className="flex items-center justify-between mb-3">
              <p className="text-2xl font-bold text-emerald-400">
                {product.price}
              </p>
              {/* Show formatted price if available */}
              {product.priceNumber && (
                <p className="text-sm text-gray-400">
                  {formatPrice(product.priceNumber)}
                </p>
              )}
            </div>
            <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
              {product.description}
            </p>
          </div>

          {/* Variants Info (if available) */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-2">
                {product.variants.length} variant{product.variants.length > 1 ? 's' : ''} available
              </div>
            </div>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {product.features.slice(0, 3).map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700"
                  >
                    {feature}
                  </span>
                ))}
                {product.features.length > 3 && (
                  <div className="relative group">
                    <span className="px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded-full border border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors">
                      +{product.features.length - 3} more
                    </span>
                    {/* Tooltip with additional features */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none min-w-max">
                      <div className="text-xs text-gray-300 space-y-1">
                        {product.features.slice(3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-emerald-400 rounded-full"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                      {/* Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6">
            {product.status === 'coming-soon' ? (
              // <button
              //   // onClick={handleNotifyClick}
              //   className={cn(
              //     "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
              //     "bg-gradient-to-r from-emerald-600 to-emerald-500",
              //     "hover:from-emerald-500 hover:to-emerald-400",
              //     "text-white border border-emerald-500/20",
              //     "flex items-center justify-center gap-2",
              //     "hover:shadow-lg hover:shadow-emerald-500/25",
              //     "active:scale-95"
              //   )}
              // >
              //   <Bell size={16} />
              //   Notify Me When Available
              // </button>
              null
            ) : product.status === 'available' ? (
              // <button
              //   className={cn(
              //     "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
              //     "bg-gradient-to-r from-blue-600 to-blue-500",
              //     "hover:from-blue-500 hover:to-blue-400",
              //     "text-white border border-blue-500/20",
              //     "flex items-center justify-center gap-2",
              //     "hover:shadow-lg hover:shadow-blue-500/25",
              //     "active:scale-95"
              //   )}
              // >
              //   <ShoppingCart size={16} />
              //   Add to Cart
              // </button>
              null
            ) : (
              <button
                disabled
                className={cn(
                  "w-full py-3 px-4 rounded-lg font-medium",
                  "bg-gray-700 text-gray-400 cursor-not-allowed",
                  "border border-gray-600",
                  "flex items-center justify-center gap-2"
                )}
              >
                <Package size={16} />
                Sold Out
              </button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}; 