"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2, BarChart3, Trophy, BookOpen } from "lucide-react";
import { Game } from "../lib/gamesData";
import { cn } from "../lib/utils";
import { OverviewTab } from "./OverviewTab";
import { StatsTab } from "./StatsTab";
import { TournamentsTab } from "./TournamentsTab";
import { StrategyTab } from "./StrategyTab";

interface GameDetailModalProps {
  game: Game;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  activeTab: "overview" | "stats" | "tournaments" | "strategy";
  setActiveTab: (tab: "overview" | "stats" | "tournaments" | "strategy") => void;
  logoError: boolean;
  fallbackLogo: string;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  showModal,
  setShowModal,
  activeTab,
  setActiveTab,
  logoError,
  fallbackLogo,
}) => {
  // Prevent modal close when clicking inside
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Safe tab changer that doesn't affect modal visibility
  const handleTabChange = (e: React.MouseEvent, tabId: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setActiveTab(tabId as "overview" | "stats" | "tournaments" | "strategy");
  };

  return (
    <AnimatePresence>
      {showModal && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-xl sm:rounded-2xl max-w-5xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
              onClick={handleModalContentClick}
            >
              {/* Modal Header with Banner */}
              <div className="relative h-40 sm:h-48 md:h-64 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                <Image
                  src={game.banner}
                  alt={`${game.name} banner`}
                  fill
                  className="object-cover"
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-r opacity-80",
                    game.gradient
                  )}
                />

                {/* Close button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-gray-300 transition-colors bg-black/20 backdrop-blur-sm rounded-full p-2"
                >
                  <X size={20} className="sm:w-6 sm:h-6" />
                </button>

                {/* Game info overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-end gap-3 sm:gap-4">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm p-1 sm:p-2">
                      <Image
                        src={logoError ? fallbackLogo : game.logo}
                        alt={`${game.name} logo`}
                        fill
                        className="object-contain p-1 sm:p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 font-orbitron truncate">
                        {game.name}
                      </h2>
                      <p className="text-gray-200 text-sm sm:text-lg line-clamp-2">{game.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="flex border-b border-gray-700 bg-gray-800/50 overflow-x-auto">
                {[
                  { id: "overview", label: "Overview", icon: Gamepad2 },
                  { id: "stats", label: "Statistics", icon: BarChart3 },
                  { id: "tournaments", label: "Tournaments", icon: Trophy },
                  { id: "strategy", label: "Strategy", icon: BookOpen },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={(e) => handleTabChange(e, tab.id)}
                    className={cn(
                      "flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors focus:outline-none whitespace-nowrap flex-shrink-0",
                      activeTab === tab.id
                        ? "text-white border-b-2"
                        : "text-gray-400 hover:text-gray-300"
                    )}
                    style={{
                      borderBottomColor:
                        activeTab === tab.id
                          ? game.primaryColor
                          : "transparent",
                    }}
                  >
                    <tab.icon size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Modal Body */}
              <div className="p-3 sm:p-6 space-y-4 sm:space-y-6" onClick={handleModalContentClick}>
                {activeTab === "overview" && <OverviewTab game={game} />}
                {activeTab === "stats" && <StatsTab game={game} />}
                {activeTab === "tournaments" && <TournamentsTab game={game} />}
                {activeTab === "strategy" && <StrategyTab game={game} />}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}; 