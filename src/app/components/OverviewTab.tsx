"use client";

import React, { useState } from "react";
import { Game } from "../lib/gamesData";
import { Gamepad2, Target, Zap, Award, Trophy, ChevronDown, ChevronUp } from "lucide-react";

interface OverviewTabProps {
  game: Game;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ game }) => {
  const [expandedDescription, setExpandedDescription] = useState(false);

  // Safe state changer that doesn't affect modal visibility
  const handleExpandDescription = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setExpandedDescription((prev) => !prev);
  };

  return (
    <>
      {/* Expandable Description */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
          <Gamepad2 size={20} style={{ color: game.primaryColor }} />
          About Our {game.name} Division
        </h3>
        <div className="space-y-3">
          <p className="text-gray-300 leading-relaxed">
            {expandedDescription ? game.expandedDescription : game.description}
          </p>
          <button
            onClick={handleExpandDescription}
            className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-white focus:outline-none"
            style={{ color: game.primaryColor }}
          >
            {expandedDescription ? (
              <>
                <ChevronUp size={16} />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                Read More
              </>
            )}
          </button>
        </div>
      </div>

      {/* Features Section */}
      {game.features && game.features.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
            <Zap size={20} style={{ color: game.primaryColor }} />
            Key Strengths
          </h3>
          <div className="grid md:grid-cols-3 gap-3">
            {game.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-3"
              >
                <Target
                  size={16}
                  style={{ color: game.primaryColor }}
                  className="flex-shrink-0"
                />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements Section */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
          <Award size={20} style={{ color: game.primaryColor }} />
          Major Achievements
        </h3>
        <div className="space-y-2">
          {game.achievements.map((achievement, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-gray-800/30 rounded-lg p-3"
            >
              <Trophy size={16} className="text-yellow-400 flex-shrink-0" />
              <span className="text-gray-300">{achievement}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}; 