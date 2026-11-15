"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "./ui/Card";
import { TeamMember } from "../lib/teamData";
import { cn } from "../lib/utils";

// Social media icons (using Lucide React icons)
import { ExternalLink, Trophy, Target, X, User, Award } from "lucide-react";

interface TeamCardProps {
  member: TeamMember;
  index: number;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member, index }) => {
  const [imageError, setImageError] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Staggered animation delay
  const animationDelay = index * 0.1;

  // Role color mapping
  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "in-game leader":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "sniper":
        return "text-red-400 bg-red-400/10 border-red-400/20";
      case "support":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "coach":
        return "text-purple-400 bg-purple-400/10 border-purple-400/20";
      default:
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    }
  };

  // Fallback avatar (placeholder)
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    member.gamerTag
  )}&background=1f1f23&color=00FFAA&size=400&bold=true`;

  // Modal component
  const TeamMemberModal = () => (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="relative p-6 border-b border-gray-700">
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>

                <div className="flex items-start gap-6">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                    <Image
                      src={imageError ? fallbackAvatar : member.avatar}
                      alt={`${member.gamerTag} avatar`}
                      fill
                      className="object-cover"
                      onError={() => setImageError(true)}
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-2 font-orbitron">
                      {member.gamerTag}
                    </h2>
                    <p className="text-gray-300 text-lg mb-2">
                      {member.realName}
                    </p>
                    <span
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium border",
                        getRoleColor(member.role)
                      )}
                    >
                      {member.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                {/* Bio Section */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                    <User size={20} className="text-emerald-400" />
                    About
                  </h3>
                  <p className="text-gray-300 leading-relaxed">{member.bio}</p>
                </div>

                {/* Stats Section */}
                {member.stats && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <Target size={20} className="text-emerald-400" />
                      Performance Stats
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {member.stats.kd && (
                        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-emerald-400 mb-1">
                            {member.stats.kd}
                          </div>
                          <div className="text-sm text-gray-400">K/D Ratio</div>
                        </div>
                      )}
                      {member.stats.winRate && (
                        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-emerald-400 mb-1">
                            {member.stats.winRate}
                          </div>
                          <div className="text-sm text-gray-400">Win Rate</div>
                        </div>
                      )}
                      {member.stats.favoriteGame && (
                        <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                          <div className="text-lg font-semibold text-white mb-1">
                            {member.stats.favoriteGame}
                          </div>
                          <div className="text-sm text-gray-400">Main Game</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Achievements Section */}
                {member.achievements && member.achievements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <Award size={20} className="text-emerald-400" />
                      Achievements
                    </h3>
                    <div className="space-y-2">
                      {member.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-3"
                        >
                          <Trophy
                            size={16}
                            className="text-yellow-400 flex-shrink-0"
                          />
                          <span className="text-gray-300">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links Section */}
                {(member.socials.twitch || member.socials.twitter || member.socials.instagram) && (
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <ExternalLink size={20} className="text-emerald-400" />
                      Connect
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {member.socials.twitch && (
                        <a
                          href={member.socials.twitch}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-white text-purple-400 hover:bg-white hover:#fff px-4 py-2 rounded-lg transition-all duration-200"
                        >
                          <Image src="/twitch.svg" alt="Twitch" width={16} height={16}/>
                          {/* <span>Twitch</span> */}
                        </a>
                      )}
                      {member.socials.twitter && (
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-black text-emerald-400 hover:bg-black hover:text-black px-4 py-2 rounded-lg transition-all duration-200"
                        >
                          <Image src="/twitter.svg" alt="X (Twitter)" width={16} height={16} />
                          {/* <span>X</span> */}
                        </a>
                      )}
                      {member.socials.instagram && (
                        <a
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-pink-500 text-pink-400 px-4 py-2 rounded-lg transition-all duration-200"
                        >
                          <Image src="/instagram.svg" alt="Instagram" width={16} height={16} />
                          {/* <span>Instagram</span> */}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: animationDelay,
          ease: "easeOut",
        }}
        className="group"
        style={{ perspective: "1000px" }}
      >
        {/* Card Container with 3D flip effect */}
        <div
          className="relative h-[420px] w-full cursor-pointer transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front Face */}
          <Card
            variant="team"
            hover="none"
            padding="none"
            className="absolute inset-0 h-full w-full overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Avatar Section */}
            <div className="relative h-64 overflow-hidden bg-gradient-to-b from-gray-800 to-gray-900">
              <Image
                src={imageError ? fallbackAvatar : member.avatar}
                alt={`${member.gamerTag} avatar`}
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

              {/* Role badge */}
              <div className="absolute top-4 right-4">
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
                    getRoleColor(member.role)
                  )}
                >
                  {member.role}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Name and Gamer Tag */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-1 font-orbitron">
                  {member.gamerTag}
                </h3>
                <p className="text-gray-400 text-sm">{member.realName}</p>
              </div>

              {/* Stats Preview */}
              {member.stats && (
                <div className="flex justify-center space-x-4 pt-2">
                  {member.stats.kd && (
                    <div className="text-center">
                      <div className="text-emerald-400 font-bold text-lg">
                        {member.stats.kd}
                      </div>
                      <div className="text-xs text-gray-500">K/D</div>
                    </div>
                  )}
                  {member.stats.winRate && (
                    <div className="text-center">
                      <div className="text-emerald-400 font-bold text-lg">
                        {member.stats.winRate}
                      </div>
                      <div className="text-xs text-gray-500">Win Rate</div>
                    </div>
                  )}
                </div>
              )}

              {/* Flip indicator */}
              <div className="text-center pt-2">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <ExternalLink size={12} />
                  Click to learn more
                </p>
              </div>
            </div>
          </Card>

          {/* Back Face */}
          <Card
            variant="team"
            hover="none"
            padding="lg"
            className="absolute inset-0 h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="h-full flex flex-col justify-between">
              {/* Header */}
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-1 font-orbitron">
                  {member.gamerTag}
                </h3>
                <span
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium border",
                    getRoleColor(member.role)
                  )}
                >
                  {member.role}
                </span>
              </div>

              {/* Bio */}
              <div className="flex-1 mb-4">
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-4">
                  {member.bio}
                </p>
              </div>

              {/* Achievements */}
              {member.achievements && member.achievements.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-emerald-400 font-semibold text-sm mb-2 flex items-center gap-1">
                    <Trophy size={14} />
                    Achievements
                  </h4>
                  <div className="space-y-1">
                    {member.achievements.slice(0, 3).map((achievement, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-gray-400 flex items-center gap-1"
                      >
                        <Target size={10} className="text-emerald-400" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View Details Button */}
              <div className="mb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModal(true);
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:from-emerald-400 hover:to-cyan-400 transition-all duration-300 transform hover:scale-105 text-sm"
                >
                  View Full Profile
                </button>
              </div>

              {/* Social Links */}
              {(member.socials.twitch || member.socials.twitter || member.socials.instagram) && (
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-center space-x-4">
                    {member.socials.twitch && (
                      <a
                        href={member.socials.twitch}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200 hover:scale-110 transform"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-white transition-colors">
                          <Image src="/twitch.svg" alt="Twitch" width={16} height={16} />
                        </div>
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-black transition-colors duration-200 hover:scale-110 transform"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-black transition-colors">
                          <Image src="/twitter.svg" alt="X (Twitter)" width={16} height={16} />
                        </div>
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-pink-300 transition-colors duration-200 hover:scale-110 transform"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                          <Image src="/instagram.svg" alt="Instagram" width={16} height={16} />
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Modal Component */}
      <TeamMemberModal />
    </>
  );
};
