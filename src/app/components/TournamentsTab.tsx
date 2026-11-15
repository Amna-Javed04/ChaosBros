"use client";

import React from "react";
import { motion } from "framer-motion";
import { Game, TournamentEntry } from "../lib/gamesData";
import { Calendar, Medal, DollarSign, Trophy, Clock, MapPin, TrendingUp } from "lucide-react";
import { cn } from "../lib/utils";

interface TournamentsTabProps {
  game: Game;
}

export const TournamentsTab: React.FC<TournamentsTabProps> = ({ game }) => {
  // Tournament status colors
  const getTournamentStatusColor = (status: TournamentEntry["status"]) => {
    switch (status) {
      case "won":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "runner-up":
        return "text-gray-300 bg-gray-300/10 border-gray-300/30";
      case "top-5":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
      case "qualified":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "participating":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  const getTournamentIcon = (status: TournamentEntry["status"]) => {
    switch (status) {
      case "won":
        return Trophy;
      case "runner-up":
        return Medal;
      case "top-5":
        return Medal;
      case "qualified":
        return Clock;
      case "participating":
        return MapPin;
      default:
        return Calendar;
    }
  };

  const getStatusLabel = (status: TournamentEntry["status"]) => {
    switch (status) {
      case "won":
        return "Champion";
      case "runner-up":
        return "Runner-up";
      case "top-5":
        return "Top 5";
      case "qualified":
        return "Qualified";
      case "participating":
        return "Participating";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <Calendar size={20} style={{ color: game.primaryColor }} />
          Tournament Timeline
        </h3>
        <div className="text-sm text-gray-400">
          {game.tournamentHistory?.length || 0} tournaments
        </div>
      </div>

      {/* Tournament Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div 
          className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b opacity-30"
          style={{ 
            background: `linear-gradient(to bottom, ${game.primaryColor}20, ${game.primaryColor}60, ${game.primaryColor}20)` 
          }}
        />
        
        <div className="space-y-6">
          {game.tournamentHistory?.map((tournament, idx) => {
            const StatusIcon = getTournamentIcon(tournament.status);
            const isWon = tournament.status === "won";
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative flex items-start gap-6"
              >
                {/* Timeline dot */}
                <div className="relative flex-shrink-0">
                  <div 
                    className={cn(
                      "w-16 h-16 rounded-full border-4 flex items-center justify-center backdrop-blur-sm",
                      isWon 
                        ? "bg-yellow-400/20 border-yellow-400/60" 
                        : "bg-gray-800/80 border-gray-600/60"
                    )}
                    style={{
                      borderColor: isWon ? '#fbbf24' : game.primaryColor + '60'
                    }}
                  >
                    <StatusIcon 
                      size={24} 
                      className={isWon ? "text-yellow-400" : "text-white"}
                    />
                  </div>
                  
                  {/* Connecting line to card */}
                  <div 
                    className="absolute top-8 right-0 w-6 h-0.5 opacity-40"
                    style={{ backgroundColor: game.primaryColor }}
                  />
                </div>

                {/* Tournament card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "flex-1 bg-gray-800/60 backdrop-blur-sm rounded-xl p-5 border-l-4 shadow-lg",
                    "hover:bg-gray-800/80 transition-all duration-300"
                  )}
                  style={{ borderLeftColor: game.primaryColor }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-lg mb-1 font-rajdhani">
                        {tournament.name}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400 flex-wrap">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          {new Date(tournament.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Medal size={14} />
                          {tournament.placement} Place
                        </span>
                        {tournament.prize && (
                          <span className="flex items-center gap-1.5 text-emerald-400">
                            <DollarSign size={14} />
                            {tournament.prize}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Status badge */}
                    <span
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-sm",
                        getTournamentStatusColor(tournament.status)
                      )}
                    >
                      {getStatusLabel(tournament.status)}
                    </span>
                  </div>

                  {/* Achievement highlight for wins */}
                  {isWon && (
                    <div className="mt-3 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                      <div className="flex items-center gap-2 text-yellow-400 font-medium text-sm">
                        <Trophy size={16} />
                        Tournament Victory - Major Achievement
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tournament Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Total Wins",
            value: game.tournamentHistory?.filter(t => t.status === "won").length || 0,
            icon: Trophy,
            color: "text-yellow-400"
          },
          {
            label: "Top 5 Finishes", 
            value: game.tournamentHistory?.filter(t => ["won", "runner-up", "top-5"].includes(t.status)).length || 0,
            icon: Medal,
            color: "text-emerald-400"
          },
          {
            label: "Total Events",
            value: game.tournamentHistory?.length || 0,
            icon: Calendar,
            color: "text-blue-400"
          },
          {
            label: "Win Rate",
            value: game.tournamentHistory ? 
              `${Math.round((game.tournamentHistory.filter(t => t.status === "won").length / game.tournamentHistory.length) * 100)}%` : 
              "0%",
            icon: TrendingUp,
            color: "text-purple-400"
          }
        ].map((stat) => (
          <div 
            key={stat.label}
            className="bg-gray-800/40 rounded-lg p-4 text-center border border-gray-700/50"
          >
            <stat.icon size={20} className={cn("mx-auto mb-2", stat.color)} />
            <div className={cn("text-2xl font-bold mb-1 font-orbitron", stat.color)}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-400 uppercase tracking-wider">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}; 