'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Button } from '../ui/Button';
import Image from 'next/image';

const Hero = () => {
  const [text, setText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Parallax scroll setup
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  // Updated tagline from content.md
  const fullText = "From the arcade to the arena – Chaos never dies.";
  const subText = "DFW's elite esports strike squad.";

  // Enhanced typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 50); // Faster typing for longer text

    return () => clearInterval(timer);
  }, []);

  // Enhanced logo animation with page entrance
  const logoVariants = {
    hidden: { 
      scale: 0, 
      rotate: -180, 
      opacity: 0,
      y: -100
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        duration: 1.5
      }
    }
  };

  // Enhanced main title animation with page entrance
  const titleVariants = {
    hidden: { 
      y: 100, 
      opacity: 0,
      scale: 0.8,
      rotateX: -15
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: 0.3,
        duration: 1,
        ease: "easeOut" as const,
        type: "spring" as const,
        stiffness: 100
      }
    }
  };

  // Enhanced subtitle animation with typewriter
  const subtitleVariants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  // Enhanced CTA buttons animation with stagger
  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 2,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      y: 40, 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 20
      }
    }
  };

  // Enhanced glitch effect variants
  const glitchVariants = {
    initial: { x: 0, opacity: 0 },
    animate: {
      x: [0, -2, 2, -1, 1, 0],
      opacity: [0, 0.3, 0.7, 0.4, 0.8, 0],
      transition: {
        duration: 0.15,
        repeat: Infinity,
        repeatDelay: 4 + Math.random() * 3,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    }
  };

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950"
      style={{ opacity, scale }}
    >
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'brightness(0.355) contrast(1.1) saturate(1.2)' }}
        >
          <source src="/assets/media/hero-bg.mp4" type="video/mp4" />
        </video>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/50 z-1"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Enhanced Logo with Animation and Glitch Effect */}
        <motion.div
          className="mb-8 md:mb-12"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative inline-block">
            <Image
              src="/assets/logo-chaosbro.svg"
              alt="ChaosBro Logo"
              width={120}
              height={120}
              className="mx-auto md:w-32 md:h-32 lg:w-36 lg:h-36 drop-shadow-2xl relative z-10"
              priority
            />
            {/* Enhanced glowing ring around logo */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {/* Glitch effect overlay for logo */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-blue-500/20 mix-blend-screen"
              variants={glitchVariants}
              initial="initial"
              animate="animate"
            />
          </div>
        </motion.div>

        {/* Enhanced Main Title with Glitch Effects */}
        <motion.div className="relative mb-4 md:mb-6">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-cyan-500 font-dm-sans tracking-tight relative z-10"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            ChaosBros
          </motion.h1>
          {/* Glitch effect layers for title */}
          <motion.h1
            className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-red-500/30 font-dm-sans tracking-tight"
            variants={glitchVariants}
            initial="initial"
            animate="animate"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)' }}
          >
            ChaosBros
          </motion.h1>
          <motion.h1
            className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-blue-500/30 font-dm-sans tracking-tight"
            variants={glitchVariants}
            initial="initial"
            animate="animate"
            style={{ clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)' }}
          >
            ChaosBros
          </motion.h1>
        </motion.div>

        {/* Enhanced Subtitle with Typewriter Effect and Glitch */}
        <motion.div
          className="mb-2 md:mb-4 relative"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-xl sm:text-1xl md:text-2xl lg:text-3xl text-gray-300 font-orbitron font-medium relative z-10">
            {text}
            <motion.span
              className="inline-block w-1 h-6 md:h-8 bg-emerald-500 ml-1"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          </p>
          {/* Glitch effect for subtitle */}
          <motion.p
            className="absolute inset-0 text-xl sm:text-xl md:text-2xl lg:text-3xl text-red-400/20 font-orbitron font-medium"
            variants={glitchVariants}
            initial="initial"
            animate="animate"
          >
            {text}
          </motion.p>
        </motion.div>

        {/* Enhanced Tagline */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 md:mb-12 font-rajdhani tracking-wide font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          {subText}
        </motion.p>

        {/* Enhanced CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16 md:mb-20"
          variants={buttonContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={buttonVariants}>
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-sm md:text-base font-semibold px-6 md:px-8 py-3 md:py-4 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25"
              onClick={() => window.open('https://discord.gg/chaosbro', '_blank')}
            >
              Join Our Discord
            </Button>
          </motion.div>

          <motion.div variants={buttonVariants}>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-sm md:text-base font-semibold px-6 md:px-8 py-3 md:py-4 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
              onClick={() => scrollToSection('team')}
            >
              Meet the Team
            </Button>
          </motion.div>

          <motion.div variants={buttonVariants}>
            <Button
              variant="neon"
              size="lg"
              className="w-full sm:w-auto text-sm md:text-base font-semibold px-6 md:px-8 py-3 md:py-4 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/30"
              onClick={() => scrollToSection('media')}
            >
              Watch Highlights
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator with Parallax - Hidden on Mobile */}
      <motion.div
        className="hidden md:block absolute bottom-8 md:bottom-12 lg:bottom-16 xl:bottom-20 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.5, duration: 1.2, ease: "easeOut" }}
        style={{ y: useTransform(scrollY, [0, 200], [0, -50]) }}
      >
        <motion.div
          className="flex flex-col items-center text-gray-300 cursor-pointer group"
          onClick={() => scrollToSection('team')}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-sm md:text-base lg:text-lg font-rajdhani mb-3 md:mb-4 group-hover:text-emerald-400 transition-colors duration-300 font-medium">
            Scroll Down
          </span>
          <motion.div
            className="w-7 h-12 md:w-8 md:h-14 lg:w-9 lg:h-16 border-2 md:border-3 border-gray-300 rounded-full flex justify-center group-hover:border-emerald-400 transition-colors duration-300"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-1.5 h-3 md:w-2 md:h-4 lg:w-2.5 lg:h-5 bg-gray-300 rounded-full mt-2 md:mt-3 lg:mt-4 group-hover:bg-emerald-400 transition-colors duration-300"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Enhanced Multi-layer Glitch Effect Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-5"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.03, 0, 0.05, 0],
          x: [0, -2, 2, -1, 0],
          skewX: [0, 0.5, -0.5, 0]
        }}
        transition={{ 
          duration: 0.2, 
          repeat: Infinity, 
          repeatDelay: 5 + Math.random() * 3,
          times: [0, 0.25, 0.5, 0.75, 1]
        }}
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 0, 0, 0.1) 25%, transparent 50%, rgba(0, 255, 255, 0.1) 75%, transparent 100%)',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Secondary glitch layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-6"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.02, 0, 0.04, 0],
          x: [0, 3, -2, 1, 0],
        }}
        transition={{ 
          duration: 0.15, 
          repeat: Infinity, 
          repeatDelay: 7 + Math.random() * 4,
          times: [0, 0.2, 0.4, 0.8, 1]
        }}
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(0, 255, 0, 0.05) 50%, transparent 100%)',
          mixBlendMode: 'overlay'
        }}
      />
    </motion.section>
  );
};

export default Hero; 