"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TeamCard } from "../TeamCard";
import { JoinBrotherhoodModal } from "../JoinBrotherhoodModal";
import { TEAM_DATA } from "../../lib/teamData";
import { cn } from "../../lib/utils";

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
      staggerChildren: 0.1,
    },
  },
};

export const Team: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFromChaosBro, setIsFromChaosBro] = useState(false);
  const handleJoinClick = () => {
    setIsFromChaosBro(true);
    setIsModalOpen(true);
  };
  const handleJoinClickDoll = () => {
    setIsFromChaosBro(false);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsFromChaosBro(false);
    setIsModalOpen(false);
  };

  return (
    <section
      id="team"
      className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8"
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
              Rooted in Chaos.
            </span>
            <br />
            <span className="text-white">Forged in DFW.</span>
          </motion.h2>

          <motion.p
            variants={subtitleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            ChaosBros began in LAN cafés and local arcades, rising from
            controller-clashing brawls to dominating the digital battlefield.
            We&apos;re not just players—we&apos;re tacticians, engineers of win
            conditions, and protectors of gamer code.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-8 rounded-full"
          />
        </div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className={cn(
            "grid gap-8",
            // Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop, 4 on large screens
            "grid-cols-1",
            "sm:grid-cols-2",
            "lg:grid-cols-3",
            "xl:grid-cols-4",
            // Ensure proper spacing and alignment
            "place-items-center",
            "auto-rows-fr"
          )}
        >
          {TEAM_DATA.map((member, index) => (
            <motion.div
              key={member.id}
              className="w-full max-w-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
            >
              <TeamCard member={member} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Team Stats Section - Updated with new motto */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          {/* Team Motto */}
          <div className="mb-12">
            <span className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-orbitron bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
              Our Motto
            </span>
            <p className="text-xl md:text-2xl text-white font-semibold">
              Precision. Power. Brotherhood.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {/* Team Stats */}
            <div className="space-y-2">
              <span className="text-3xl md:text-4xl font-bold font-orbitron bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                4
              </span>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Elite Members
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-3xl md:text-4xl font-bold font-orbitron bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                2023
              </span>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Founded
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-3xl md:text-4xl font-bold font-orbitron bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                4
              </span>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Core Titles
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-3xl md:text-4xl font-bold text-blue-400 font-orbitron bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent">
                DFW
              </span>
              <div className="text-sm text-gray-400 uppercase tracking-wider">
                Headquarters
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action - Updated with new messaging */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-orbitron">
              You don&apos;t find Chaos. Chaos finds you.
            </h3>
            <p className="text-gray-400 mb-6">
              Think you have what it takes to join the Brotherhood? We&apos;re
              always looking for exceptional talent.
            </p>
            <button
              onClick={handleJoinClick}
              className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 text-white font-semibold px-8 py-3 rounded-lg hover:from-red-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
            >
              Join the Brotherhood
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-orbitron">
              Join as Chaos Dolls
            </h3>
            <p className="text-gray-400 mb-6">
            Want to Join us as Chaos dolls, click the button below
            </p>
            <button
              onClick={handleJoinClickDoll}
              className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-cyan-400 text-white font-semibold px-8 py-3 rounded-lg hover:from-red-400 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
            >
              Join
            </button>
          </div>
        </motion.div>
      </div>

      {/* Join Brotherhood Modal */}
      <JoinBrotherhoodModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        isFromChaosBro={isFromChaosBro}
      />
    </section>
  );
};
