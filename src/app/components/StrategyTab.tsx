"use client";

import React from "react";
import { motion } from "framer-motion";
import { Game, StrategyDocument } from "../lib/gamesData";
import { Download, FileText, Calendar, HardDrive, BookOpen, BarChart3, Target, Zap } from "lucide-react";
import { cn } from "../lib/utils";

interface StrategyTabProps {
  game: Game;
}

export const StrategyTab: React.FC<StrategyTabProps> = ({ game }) => {
  const getDocumentTypeIcon = (type: StrategyDocument["type"]) => {
    switch (type) {
      case "map-guide":
        return Target;
      case "team-strategy":
        return Zap;
      case "playbook":
        return BookOpen;
      case "analysis":
        return BarChart3;
      default:
        return FileText;
    }
  };

  const getDocumentTypeColor = (type: StrategyDocument["type"]) => {
    switch (type) {
      case "map-guide":
        return "text-blue-400 bg-blue-400/10 border-blue-400/30";
      case "team-strategy":
        return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
      case "playbook":
        return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "analysis":
        return "text-orange-400 bg-orange-400/10 border-orange-400/30";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    }
  };

  const getDocumentTypeLabel = (type: StrategyDocument["type"]) => {
    switch (type) {
      case "map-guide":
        return "Map Guide";
      case "team-strategy":
        return "Team Strategy";
      case "playbook":
        return "Playbook";
      case "analysis":
        return "Analysis";
      default:
        return type;
    }
  };

  const handleDownload = (doc: StrategyDocument) => {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = doc.downloadUrl;
    link.download = doc.name;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!game.strategyDocuments || game.strategyDocuments.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No Strategy Documents</h3>
        <p className="text-gray-500">Strategy documents for {game.name} are coming soon.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <BookOpen size={20} style={{ color: game.primaryColor }} />
          Strategy Documents
        </h3>
        <div className="text-sm text-gray-400">
          {game.strategyDocuments.length} documents available
        </div>
      </div>

      {/* Document Type Categories */}
      <div className="grid gap-6">
        {Object.entries(
          game.strategyDocuments.reduce((acc, doc) => {
            if (!acc[doc.type]) acc[doc.type] = [];
            acc[doc.type].push(doc);
            return acc;
          }, {} as Record<string, StrategyDocument[]>)
        ).map(([type, documents], categoryIndex) => {
          const TypeIcon = getDocumentTypeIcon(type as StrategyDocument["type"]);
          
          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 pb-2 border-b border-gray-700/50">
                <div 
                  className={cn(
                    "p-2 rounded-lg border",
                    getDocumentTypeColor(type as StrategyDocument["type"])
                  )}
                >
                  <TypeIcon size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-white font-rajdhani">
                    {getDocumentTypeLabel(type as StrategyDocument["type"])}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {documents.length} document{documents.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>

              {/* Documents in Category */}
              <div className="space-y-3">
                {documents.map((document, docIndex) => (
                  <motion.div
                    key={document.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (docIndex * 0.05) }}
                    className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h5 className="font-bold text-white text-lg mb-2 font-rajdhani group-hover:text-emerald-400 transition-colors">
                          {document.name}
                        </h5>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                          {document.description}
                        </p>
                        
                        {/* Document Metadata */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            Updated {new Date(document.lastUpdated).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          {document.size && (
                            <span className="flex items-center gap-1">
                              <HardDrive size={12} />
                              {document.size}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Download Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(document)}
                        className={cn(
                          "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 w-full sm:w-auto",
                          "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400",
                          "hover:bg-emerald-500/30 hover:border-emerald-500/60 hover:text-emerald-300",
                          "focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        )}
                      >
                        <Download size={16} />
                        Download
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Download All Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-gray-800/40 to-gray-700/40 rounded-xl border border-gray-600/30"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-2 font-rajdhani">
              Complete Strategy Package
            </h4>
            <p className="text-gray-400 text-sm">
              Download all {game.name} strategy documents in one convenient package
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 w-full sm:w-auto",
              "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white",
              "hover:from-emerald-400 hover:to-emerald-500 shadow-lg hover:shadow-emerald-500/25",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            )}
            onClick={() => {
              // This would trigger a download of all documents in a zip file
              alert(`Downloading complete ${game.name} strategy package...`);
            }}
          >
            <Download size={18} />
            Download All
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}; 