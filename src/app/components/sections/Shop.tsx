"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "../ProductCard";
import { ProductQuickViewModal } from "../ProductQuickViewModal";
import { SHOP_DATA, Product } from "../../lib/shopData";
import { cn } from "../../lib/utils";

// Icons
import { ShoppingBag, Package, Bell, Truck, Shield } from "lucide-react";

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
      staggerChildren: 0.15,
    },
  },
};

// Email notification modal component
const EmailNotificationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  productName: string;
}> = ({ isOpen, onClose, productName }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Auto-close after success
    setTimeout(() => {
      onClose();
      setIsSuccess(false);
      setEmail('');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>

        {isSuccess ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="text-emerald-400" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">You&apos;re all set!</h3>
            <p className="text-gray-400">We&apos;ll notify you when {productName} becomes available.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="text-emerald-400" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Get Notified</h3>
              <p className="text-gray-400">Enter your email to be notified when {productName} becomes available.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200",
                  "bg-gradient-to-r from-emerald-600 to-emerald-500",
                  "hover:from-emerald-500 hover:to-emerald-400",
                  "text-white border border-emerald-500/20",
                  "flex items-center justify-center gap-2",
                  "hover:shadow-lg hover:shadow-emerald-500/25",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  "active:scale-95"
                )}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Bell size={16} />
                    Notify Me
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
};

export const Shop: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const handleNotifyClick = useCallback((productId: string) => {
    const product = SHOP_DATA.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product.name);
      setModalOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setSelectedProduct('');
  }, []);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewOpen(false);
    setQuickViewProduct(null);
  }, []);

  return (
    <>
      <section
        id="shop"
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
                Chaos isn&apos;t just a game.
              </span>
              <br />
              <span className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-6 font-orbitron">It&apos;s a lifestyle. Merchandise</span>
              <br />
            </motion.h2>

            <motion.p
              variants={subtitleVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Rep your favorite esports team with premium ChaosBro merchandise. 
              From gaming gear to apparel, show your support in style.
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

          {/* Products Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className={cn(
              "grid gap-8",
              // Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop
              "grid-cols-1",
              "md:grid-cols-2", 
              "lg:grid-cols-3",
              // Ensure proper spacing and alignment
              "place-items-center",
              "auto-rows-fr"
            )}
          >
            {SHOP_DATA.map((product, index) => (
              <motion.div
                key={product.id}
                className="w-full max-w-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
              >
                <ProductCard 
                  product={product} 
                  index={index} 
                  onNotifyClick={handleNotifyClick}
                  onQuickView={handleQuickView}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Shop Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {/* Shop Features */}
              <div className="space-y-4">
                <div className="text-2xl font-bold text-emerald-400 font-orbitron flex items-center justify-center gap-2">
                  <Truck size={28} className="text-emerald-400" />
                </div>
                <div className="text-lg font-semibold text-white">Fast Shipping</div>
                <div className="text-sm text-gray-400">
                  Quick delivery across Pakistan with tracking
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-2xl font-bold text-emerald-400 font-orbitron flex items-center justify-center gap-2">
                  <Shield size={28} className="text-emerald-400" />
                </div>
                <div className="text-lg font-semibold text-white">Quality Guarantee</div>
                <div className="text-sm text-gray-400">
                  Premium materials and construction guaranteed
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-2xl font-bold text-emerald-400 font-orbitron flex items-center justify-center gap-2">
                  <Package size={28} className="text-emerald-400" />
                </div>
                <div className="text-lg font-semibold text-white">Limited Edition</div>
                <div className="text-sm text-gray-400">
                  Exclusive designs for true ChaosBro fans
                </div>
              </div>
            </div>
          </motion.div>

          {/* Coming Soon Banner */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-8 max-w-4xl mx-auto relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500" />
              
              <div className="relative">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <ShoppingBag size={32} className="text-emerald-400" />
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-orbitron">
                    Store Launching Soon
                  </h3>
                </div>
                <p className="text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Our merchandise store is in final preparations. Sign up for notifications 
                  to be the first to know when our exclusive ChaosBro gear becomes available!
                </p>
                
                <div className="text-sm text-gray-500">
                  Expected Launch: Q2 2024
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Email Notification Modal */}
      <EmailNotificationModal
        isOpen={modalOpen}
        onClose={closeModal}
        productName={selectedProduct}
      />

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        isOpen={quickViewOpen}
        onClose={closeQuickView}
        onNotifyClick={handleNotifyClick}
      />
    </>
  );
}; 