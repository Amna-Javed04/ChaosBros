"use client";

import React from "react";
import { motion } from "framer-motion";
import { GameCard } from "../GameCard";
import { GAMES_DATA } from "../../lib/gamesData";
import { cn } from "../../lib/utils";

// Icons
import { Gamepad2, Trophy, Target, TrendingUp } from "lucide-react";

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

export const Games: React.FC = () => {
  return (
    <section
      id="games"
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
            <span className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
              Gaming
            </span>
            <br />
            <span className="text-white">Arsenal</span>
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            From tactical shooters to battle royales, ChaosBro dominates across 
            multiple gaming platforms. Each game represents our commitment to 
            excellence and competitive supremacy.
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

        {/* Games Grid */}
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
          {GAMES_DATA.map((game, index) => (
            <motion.div
              key={game.id}
              id={`games-${game.id}`}
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
              <GameCard game={game} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Gaming Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {/* Gaming Stats */}
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 font-orbitron flex items-center justify-center gap-2">
                <Gamepad2 size={32} className="text-emerald-400" />
                3
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Games Mastered
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 font-orbitron flex items-center justify-center gap-2">
                <Trophy size={32} className="text-yellow-400" />
                26+
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Total Tournaments
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 font-orbitron flex items-center justify-center gap-2">
                <Target size={32} className="text-red-400" />
                78%
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Average Win Rate
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 font-orbitron flex items-center justify-center gap-2">
                <TrendingUp size={32} className="text-blue-400" />
                #1
              </div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Regional Ranking
              </div>
            </div>
          </div>
        </motion.div>

        {/* Competitive Excellence Banner */}
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
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-orbitron">
                Multi-Game Dominance
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed max-w-2xl mx-auto">
                Our versatility across different gaming genres sets us apart. From tactical FPS to 
                battle royales, we adapt our strategies while maintaining our signature aggressive 
                playstyle that has earned us recognition in the competitive scene.
              </p>
              
              {/* Achievement highlights */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-orange-500">
                  <div className="font-semibold text-white">Call of Duty</div>
                  <div className="text-sm text-gray-400">Regional Champions</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-red-500">
                  <div className="font-semibold text-white">Valorant</div>
                  <div className="text-sm text-gray-400">VCT Qualifiers</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 border-l-4 border-yellow-500">
                  <div className="font-semibold text-white">Apex Legends</div>
                  <div className="text-sm text-gray-400">Top 10 Finishes</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-12"
        >
          <div className="inline-flex gap-4 flex-wrap justify-center">
            <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-900 font-semibold px-8 py-3 rounded-lg hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20">
              Watch Highlights
            </button>
            <button className="bg-transparent border-2 border-emerald-500 text-emerald-400 font-semibold px-8 py-3 rounded-lg hover:bg-emerald-500 hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
              View Schedule
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}; 