'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const navigationItems = [
  { name: 'Home', href: '#home' },
  { name: 'Team', href: '#team' },
  { name: 'Games', href: '#games' },
  { name: 'Media', href: '#media' },
  { name: 'Shop', href: '#shop' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll events for active section detection, navbar background, and visibility
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          
          // Update navbar background opacity based on scroll
          setScrolled(scrollPosition > 50);

          // Hide/show navbar based on scroll direction with some tolerance
          const scrollDifference = Math.abs(scrollPosition - lastScrollY);
          
          if (scrollDifference > 5) { // Only trigger if scroll difference is meaningful
            if (scrollPosition > lastScrollY && scrollPosition > 100) {
              // Scrolling down & past 100px - hide navbar
              setIsVisible(false);
            } else if (scrollPosition < lastScrollY || scrollPosition <= 100) {
              // Scrolling up or near top - show navbar
              setIsVisible(true);
            }
            
            setLastScrollY(scrollPosition);
          }

          // Find active section based on scroll position
          const sections = navigationItems.map(item => item.href.slice(1));
          let currentSection = 'home';

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              // Consider a section active if it's in the upper portion of the viewport
              if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section;
              }
            }
          }

          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Smooth scroll behavior for anchor links
  const handleNavClick = (href: string) => {
    const targetId = href.slice(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    
    // Close mobile menu after clicking
    setIsOpen(false);
  };

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <motion.header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        activeSection === 'home' 
          ? (scrolled ? 'border-b border-gray-800/20 bg-gray-950/95 backdrop-blur-md shadow-lg' : 'bg-transparent border-b border-transparent')
          : 'border-b border-gray-800/30 bg-gray-950/95 backdrop-blur-md shadow-lg'
      }`}
      animate={{ 
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center space-x-3 group"
            >
              <div className="relative h-25 w-25 mt-5">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="w-full h-full"
                >
                  <Image 
                    src="/chaosBro.jpg" 
                    alt="ChaosBro Logo" 
                    width={100} 
                    height={100}
                    className="w-full h-full object-cover rounded-lg shadow-lg group-hover:shadow-emerald-500/25 transition-shadow duration-300"
                  />
                </motion.div>
              </div>
              {/* <div className="hidden sm:block">
                <span className="font-bold text-xl text-emerald-500 font-orbitron tracking-wider">
                  ChaosBro
                </span>
                <div className="text-xs text-gray-400 font-rajdhani tracking-widest">
                  ESPORTS
                </div>
              </div> */}
            </a>
          </motion.div>
          
          {/* Desktop Navigation Menu */}
          <div className="hidden md:block">
            <motion.div 
              className="ml-10 flex items-baseline space-x-1"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {navigationItems.map((item, index) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className={`relative px-4 py-2 text-sm font-medium font-rajdhani tracking-wide transition-all duration-300 rounded-lg ${
                      isActive 
                        ? 'text-emerald-500 bg-emerald-500/10' 
                        : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50'
                    }`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500"
                        layoutId={isVisible ? "activeTab" : undefined}
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 500, 
                          damping: 30,
                          layout: { duration: 0.2 }
                        }}
                      />
                    )}
                  </motion.a>
                );
              })}
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-gray-400 hover:text-emerald-500 transition-colors duration-300"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                className="w-6 h-6 flex flex-col justify-center items-center"
                animate={isOpen ? "open" : "closed"}
              >
                <motion.span
                  className="w-6 h-0.5 bg-current block absolute"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-current block absolute"
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="w-6 h-0.5 bg-current block absolute"
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: 0 }
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu Slide-out */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
              />
              
              {/* Mobile Menu Panel */}
              <motion.div
                className="fixed top-16 right-0 bottom-0 w-64 bg-gray-900/95 backdrop-blur-md border-l border-gray-800 md:hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="flex flex-col p-6 space-y-4">
                  {navigationItems.map((item, index) => {
                    const isActive = activeSection === item.href.slice(1);
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                        className={`relative px-4 py-3 text-lg font-medium font-rajdhani tracking-wide transition-all duration-300 rounded-lg ${
                          isActive 
                            ? 'text-emerald-500 bg-emerald-500/10 border border-emerald-500/20' 
                            : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50'
                        }`}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="flex items-center justify-between">
                          {item.name}
                          {isActive && (
                            <motion.div
                              className="w-2 h-2 bg-emerald-500 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          )}
                        </div>
                      </motion.a>
                    );
                  })}
                  
                  {/* Mobile-only CTA */}
                  <motion.div
                    className="pt-6 mt-6 border-t border-gray-800"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <a
                      href="https://discord.gg/chaosbro"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-950 font-semibold font-rajdhani tracking-wide rounded-lg hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                    >
                      Join Discord
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
} 