'use client';

// import { useState } from 'react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../lib/constants';

// Footer data structure
const footerData = {
  gamesBreakdown: {
    title: "Games Breakdown",
    links: [
      { name: "Call of Duty", href: "#games-cod", description: "FPS Dominance" },
      { name: "Valorant", href: "#games-valorant", description: "Tactical Precision" },
      { name: "Apex Legends", href: "#games-apex", description: "Battle Royale Masters" },
      { name: "Halo", href: "#games-halo", description: "Arena Masters" },
    ]
  },
  community: {
    title: "Community",
    links: [
      { name: "Join Discord", href: "https://discord.gg/chaosbro", external: true, description: "Join our gaming community" },
      // { name: "Become a Volunteer", href: "#volunteer", description: "Help us grow" },
      // { name: "Watch Parties", href: "#events", description: "Live viewing events" },
      // { name: "Tournament Schedule", href: "#tournaments", description: "Upcoming matches" },
    ]
  },
  sponsors: {
    title: "Sponsors",
    links: [
      { name: "Current Sponsors", href: "#sponsors", description: "Our partners" },
      // { name: "Partnership Opportunities", href: "#partnership", description: "Sponsor us" },
      // { name: "Sponsor Deck", href: "/assets/downloads/chaosbro-sponsor-pack.pdf", description: "Download info", external: true },
    ]
  },
  // contact: {
  //   title: "Contact",
  //   links: [
  //     { name: "Contact Form", href: "#contact", description: "Get in touch" },
  //     { name: "Careers", href: "#careers", description: "Join our team" },
  //     { name: "Press Kit", href: "#press", description: "Media resources" },
  //     { name: "Business Inquiries", href: "mailto:business@chaosbro.gg", description: "business@chaosbro.gg", external: true },
  //   ]
  // }
};

const socialMediaLinks = [
  {
    name: "Discord",
    href: "https://discord.gg/chaosbro",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.369a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.608 1.249a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.249.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37.07.07 0 0 0 3.638 4.4c-3.109 4.648-3.956 9.178-3.538 13.634a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.029.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.010c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.029.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z"/>
      </svg>
    )
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/chaosbro_gg",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
      </svg>
    )
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@chaosbro_gg",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    name: "Instagram",
    href: "https://instagram.com/chaosbro_gg",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    )
  },
  {
    name: "Twitch",
    href: "https://twitch.tv/chaosbro_gg",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z"/>
      </svg>
    )
  }
];

export default function Footer() {
  // Get current year dynamically
  const currentYear = new Date().getFullYear();

  // const [email, setEmail] = useState('');
  // const [isSubscribed, setIsSubscribed] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const handleNewsletterSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!email.trim()) return;

  //   setIsSubmitting(true);
    
  //   // Simulate API call
  //   await new Promise(resolve => setTimeout(resolve, 1000));
    
  //   setIsSubscribed(true);
  //   setIsSubmitting(false);
  //   setEmail('');
    
  //   // Reset success message after 3 seconds
  //   setTimeout(() => setIsSubscribed(false), 3000);
  // };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {/* Games Breakdown Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg text-emerald-500 mb-6 font-orbitron tracking-wide">
              {footerData.gamesBreakdown.title}
            </h3>
            <ul className="space-y-3">
              {footerData.gamesBreakdown.links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="group flex flex-col hover:text-emerald-400 transition-colors duration-300"
                  >
                    <span className="text-gray-300 font-medium font-rajdhani group-hover:text-emerald-400 transition-colors">
                      {link.name}
                    </span>
                    <span className="text-xs text-gray-500 group-hover:text-emerald-300 transition-colors">
                      {link.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Community Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg text-emerald-500 mb-6 font-orbitron tracking-wide">
              {footerData.community.title}
            </h3>
            <ul className="space-y-3">
              {footerData.community.links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="group flex flex-col hover:text-emerald-400 transition-colors duration-300"
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <span className="text-gray-300 font-medium font-rajdhani group-hover:text-emerald-400 transition-colors">
                      {link.name}
                    </span>
                    <span className="text-xs text-gray-500 group-hover:text-emerald-300 transition-colors">
                      {link.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Sponsors Column */}
          <motion.div variants={itemVariants}>
            <h3 className="font-semibold text-lg text-emerald-500 mb-6 font-orbitron tracking-wide">
              {footerData.sponsors.title}
            </h3>
            <ul className="space-y-3">
              {footerData.sponsors.links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="group flex flex-col hover:text-emerald-400 transition-colors duration-300"
                    {...(link.href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <span className="text-gray-300 font-medium font-rajdhani group-hover:text-emerald-400 transition-colors">
                      {link.name}
                    </span>
                    <span className="text-xs text-gray-500 group-hover:text-emerald-300 transition-colors">
                      {link.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter Column */}
          <motion.div variants={itemVariants}>
            {/* <h3 className="font-semibold text-lg text-emerald-500 mb-6 font-orbitron tracking-wide">
              {footerData.contact.title}
            </h3>
            <ul className="space-y-3 mb-6">
              {footerData.contact.links.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="group flex flex-col hover:text-emerald-400 transition-colors duration-300"
                    {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <span className="text-gray-300 font-medium font-rajdhani group-hover:text-emerald-400 transition-colors">
                      {link.name}
                    </span>
                    <span className="text-xs text-gray-500 group-hover:text-emerald-300 transition-colors">
                      {link.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul> */}

            {/* Newsletter Signup */}
            {/* <div className="border-t border-gray-800 pt-6">
              <h4 className="font-medium text-emerald-500 mb-3 font-rajdhani tracking-wide">
                Stay Updated
              </h4>
              <p className="text-xs text-gray-400 mb-4">
                Get notified about tournaments, merch drops, and team updates.
              </p>
              
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-2 text-emerald-500"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-rajdhani">Thanks for subscribing!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-rajdhani"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim()}
                    className="w-full px-3 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-950 font-semibold rounded-md hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-rajdhani tracking-wide"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </form>
              )}
            </div> */}
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <p className="text-gray-400 text-sm font-rajdhani">
                  © {currentYear} ChaosBro ESports. All rights reserved.
                </p>
                <span className="hidden sm:inline text-gray-600">•</span>
                <p className="text-gray-500 text-sm font-rajdhani">
                  {COMPANY_INFO.location}
                </p>
              </div>
              <div className="flex space-x-4 text-xs">
                <a href="#privacy" className="text-gray-500 hover:text-emerald-500 transition-colors">Privacy Policy</a>
                <a href="#terms" className="text-gray-500 hover:text-emerald-500 transition-colors">Terms of Service</a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              {socialMediaLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-all duration-300 hover:scale-110 group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                >
                  <div className="p-2 rounded-lg bg-gray-800/30 group-hover:bg-emerald-500/10 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/25">
                    <span className="sr-only">{social.name}</span>
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 