"use client";

import React from "react";
import { Game } from "../lib/gamesData";
import { BarChart3, TrendingUp } from "lucide-react";

interface StatsTabProps {
  game: Game;
}

export const StatsTab: React.FC<StatsTabProps> = ({ game }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <BarChart3 size={20} style={{ color: game.primaryColor }} />
        Performance Analytics
      </h3>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {game.stats?.ranking && (
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: game.primaryColor }}
            >
              {game.stats.ranking}
            </div>
            <div className="text-sm text-gray-400">Current Rank</div>
          </div>
        )}
        {game.stats?.winRate && (
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: game.primaryColor }}
            >
              {game.stats.winRate}
            </div>
            <div className="text-sm text-gray-400">Win Rate</div>
          </div>
        )}
        {game.stats?.tournaments && (
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: game.primaryColor }}
            >
              {game.stats.tournaments}
            </div>
            <div className="text-sm text-gray-400">Tournaments</div>
          </div>
        )}
        {game.stats?.totalEarnings && (
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: game.primaryColor }}
            >
              {game.stats.totalEarnings}
            </div>
            <div className="text-sm text-gray-400">Total Earnings</div>
          </div>
        )}
        {game.stats?.currentStreak && (
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: game.primaryColor }}
            >
              {game.stats.currentStreak}
            </div>
            <div className="text-sm text-gray-400">Current Streak</div>
          </div>
        )}
        {game.stats?.bestPlacement && (
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <div
              className="text-2xl font-bold mb-1"
              style={{ color: game.primaryColor }}
            >
              {game.stats.bestPlacement}
            </div>
            <div className="text-sm text-gray-400">Best Achievement</div>
          </div>
        )}
      </div>

      {/* Performance Trends */}
      <div className="bg-gray-800/30 rounded-lg p-4">
        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp size={16} style={{ color: game.primaryColor }} />
          Recent Performance
        </h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Tournament Consistency</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: game.primaryColor,
                    width: game.stats?.winRate
                      ? `${parseInt(game.stats.winRate)}%`
                      : "0%",
                  }}
                />
              </div>
              <span className="text-sm text-gray-300">
                {game.stats?.winRate || "N/A"}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Competitive Level</span>
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: game.secondaryColor,
                    width: "85%",
                  }}
                />
              </div>
              <span className="text-sm text-gray-300">85%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 