"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../lib/shopData";
import { cn } from "../lib/utils";

// Icons
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  // Bell, 
  ShoppingCart, 
  Clock,
  Package,
  Truck,
  Shield,
  Info
} from "lucide-react";

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onNotifyClick?: (productId: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  // onNotifyClick
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  // Get all images (main + alternates) - handle null product case
  const allImages = product ? [product.image, ...(product.alternateImages || [])] : [];
  
  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // const handleNotifyClick = useCallback(() => {
  //   if (product) {
  //     onNotifyClick(product.id);
  //     onClose();
  //   }
  // }, [product, onNotifyClick, onClose]);

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setSelectedSize('');
      setSelectedColor('');
    }
  }, [isOpen]);
  
  if (!product) return null;

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" as const }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gray-900 border border-gray-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white font-orbitron">{product.name}</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="grid md:grid-cols-2 gap-8 p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Image Gallery */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative aspect-square bg-gray-800 rounded-xl overflow-hidden group">
                  <Image
                    src={allImages[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Image Navigation */}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight size={20} />
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-200",
                              index === currentImageIndex 
                                ? "bg-emerald-400 w-8" 
                                : "bg-white/50 hover:bg-white/70"
                            )}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={cn(
                          "flex-shrink-0 w-16 h-16 bg-gray-800 rounded-lg overflow-hidden border-2 transition-all duration-200",
                          index === currentImageIndex 
                            ? "border-emerald-400" 
                            : "border-gray-600 hover:border-gray-500"
                        )}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-6">
                {/* Price & Status */}
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-emerald-400">
                    {product.price}
                  </div>
                  <div className="flex items-center gap-2">
                    {product.status === 'coming-soon' ? (
                      <span className="flex items-center gap-1 text-yellow-400 text-sm">
                        <Clock size={16} />
                        Coming Soon
                      </span>
                    ) : product.status === 'available' ? (
                      <span className="flex items-center gap-1 text-emerald-400 text-sm">
                        <ShoppingCart size={16} />
                        Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-400 text-sm">
                        <Package size={16} />
                        Sold Out
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <p className="text-gray-300 leading-relaxed">{product.description}</p>
                </div>

                {/* Size Selector (if applicable and disabled for coming soon) */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">
                      Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          disabled={product.status === 'coming-soon'}
                          className={cn(
                            "px-4 py-2 border rounded-lg font-medium transition-all duration-200",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            selectedSize === size 
                              ? "border-emerald-400 bg-emerald-400/10 text-emerald-400" 
                              : "border-gray-600 text-gray-300 hover:border-gray-500"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selector (if applicable and disabled for coming soon) */}
                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">
                      Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          disabled={product.status === 'coming-soon'}
                          className={cn(
                            "px-4 py-2 border rounded-lg font-medium transition-all duration-200",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            selectedColor === color 
                              ? "border-emerald-400 bg-emerald-400/10 text-emerald-400" 
                              : "border-gray-600 text-gray-300 hover:border-gray-500"
                          )}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300">Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300">Specifications</h4>
                    <div className="space-y-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between text-sm">
                          <span className="text-gray-400">{key}:</span>
                          <span className="text-gray-300">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                  {/* {product.status === 'coming-soon' ? (
                    <button
                      // onClick={handleNotifyClick}
                      className={cn(
                        "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
                        "bg-gradient-to-r from-emerald-600 to-emerald-500",
                        "hover:from-emerald-500 hover:to-emerald-400",
                        "text-white border border-emerald-500/20",
                        "flex items-center justify-center gap-2",
                        "hover:shadow-lg hover:shadow-emerald-500/25",
                        "active:scale-95"
                      )}
                    >
                      <Bell size={16} />
                      Notify Me When Available
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 px-4 rounded-lg font-medium bg-gray-700 text-gray-400 cursor-not-allowed"
                    >
                      Add to Cart
                    </button>
                    
                  )} */}

                  {/* Info Items */}
                  <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-400">
                    <div className="flex flex-col items-center gap-1">
                      <Truck size={16} />
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Shield size={16} />
                      <span>Quality Guarantee</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Info size={16} />
                      <span>24/7 Support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}; 