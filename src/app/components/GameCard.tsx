"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { Game } from "../lib/gamesData";
import { cn } from "../lib/utils";
import { GameDetailModal } from "./GameDetailModal";

// Icons from Lucide React
import {
  ExternalLink,
} from "lucide-react";

interface GameCardProps {
  game: Game;
  index: number;
}

export const GameCard: React.FC<GameCardProps> = ({ game, index }) => {
  const [logoError, setLogoError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "stats" | "tournaments" | "strategy"
  >("overview");

  // Reset modal state when opening
  const handleOpenModal = useCallback(() => {
    setActiveTab("overview");
    setShowModal(true);
  }, []);

  // Staggered animation delay
  const animationDelay = index * 0.15;

  // Fallback logo
  const fallbackLogo = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    game.name
  )}&background=1f1f23&color=00FFAA&size=200&bold=true`;

  // Achievement badge colors
  const getBadgeColor = (index: number) => {
    const colors = [
      "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
      "text-blue-400 bg-blue-400/10 border-blue-400/20",
      "text-purple-400 bg-purple-400/10 border-purple-400/20",
      "text-pink-400 bg-pink-400/10 border-pink-400/20",
    ];
    return colors[index % colors.length];
  };

  return (
    <>
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
            "cursor-pointer transition-all duration-300",
            "hover:scale-105 hover:shadow-2xl",
            isHovered && "shadow-lg"
          )}
          style={{
            boxShadow: isHovered
              ? `0 0 30px ${game.primaryColor}20`
              : undefined,
          }}
          onClick={handleOpenModal}
        >
          {/* Background banner */}
          <div className="relative h-48 overflow-hidden">
            <Image
              src={game.banner}
              alt={`${game.name} banner`}
              fill
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent",
                "opacity-60"
              )}
            />

            {/* Top achievement badge */}
            <div className="absolute top-4 right-4">
              <span
                className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
                  getBadgeColor(0)
                )}
              >
                {game.achievements[0]?.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
          </div>

          {/* Card content */}
          <div className="relative p-6">
            {/* Game logo */}
            <div className="absolute -top-8 left-6">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                <Image
                  src={logoError ? fallbackLogo : game.logo}
                  alt={`${game.name} logo`}
                  fill
                  className="object-contain p-2"
                  onError={() => setLogoError(true)}
                />
              </div>
            </div>

            {/* Game info */}
            <div className="pt-10">
              <h3 className="text-xl font-bold text-white mb-2 font-orbitron">
                {game.name}
              </h3>
              <p
                className="text-sm font-medium mb-3 transition-colors duration-200"
                style={{ color: game.primaryColor }}
              >
                {game.tagline}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                {game.description}
              </p>
            </div>

            {/* Stats preview */}
            {game.stats && (
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                <div className="text-center">
                  <div
                    className="text-lg font-bold"
                    style={{ color: game.primaryColor }}
                  >
                    {game.stats.winRate || game.stats.ranking}
                  </div>
                  <div className="text-xs text-gray-500">
                    {game.stats.winRate ? "Win Rate" : "Ranking"}
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className="text-lg font-bold"
                    style={{ color: game.primaryColor }}
                  >
                    {game.stats.tournaments || game.achievements.length}
                  </div>
                  <div className="text-xs text-gray-500">
                    {game.stats.tournaments ? "Tournaments" : "Achievements"}
                  </div>
                </div>
                <div className="text-center">
                  <ExternalLink size={16} className="text-gray-400 mx-auto" />
                  <div className="text-xs text-gray-500 mt-1">View More</div>
                </div>
              </div>
            )}

            {/* Hover overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, ${game.primaryColor}10, transparent)`,
              }}
            />
          </div>
        </Card>
      </motion.div>

      {/* Modal */}
      <GameDetailModal
        game={game}
        showModal={showModal}
        setShowModal={setShowModal}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        logoError={logoError}
        fallbackLogo={fallbackLogo}
      />
    </>
  );
};
