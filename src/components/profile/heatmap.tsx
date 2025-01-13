"use client";

import React, { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";

import { motion, AnimatePresence } from "framer-motion";
import { Star, TrendingUp, MessageCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

const getColorForIntensity = (intensity: number) => {
  if (intensity === 0) return "rgb(255,0,0)"; // gray-100
  const greenIntensity = Math.abs(intensity);
  if (greenIntensity <= 0.2) return "rgb(134, 239, 172)"; // green-200
  if (greenIntensity <= 0.4) return "rgb(134, 239, 172)"; // green-300
  if (greenIntensity <= 0.6) return "rgb(74, 222, 128)"; // green-400
  if (greenIntensity <= 0.8) return "rgb(34, 197, 94)"; // green-500
  return "rgb(22, 163, 74)"; // green-600
};
type FeedbackItem = {
  feedback: string;
  rating: number;
  createdAt: string;
};

type HeatmapItem = {
  topic: string;
  date: string;
  feedback: FeedbackItem[] | string;
};

type HeatmapProps = {
  data: HeatmapItem[];
};

export const Heatmap: React.FC<HeatmapProps> = ({ data }) => {
  const [hoveredItem, setHoveredItem] = useState<HeatmapItem | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent, item: HeatmapItem) => {
      setHoveredItem(item);
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredItem(null);
  }, []);

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const dateRange = sortedData?.map((item) => formatDate(new Date(item?.date)));

  // Calculate total and average rating
  const totalRating = data.reduce((sum, item) => {
    if (Array.isArray(item.feedback)) {
      return sum + item.feedback[0]?.rating || 0;
    }
    return sum;
  }, 0);
  const feedbackCount = data.filter((item) =>
    Array.isArray(item.feedback)
  ).length;
  const averageRating = totalRating / feedbackCount || 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Activity Commitments
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowInfo(!showInfo)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Info className="h-5 w-5" />
        </Button>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-6 text-sm"
          >
            <p className="text-gray-600 dark:text-gray-300">
              This heatmap shows activity and engagement over time. Green colors
              indicate commitment fulfilled, Red color displays absence. Gray
              displays no commitment yet. Hover over cells to see detailed
              information.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        {/* 5x10 grid */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: "repeat(10, minmax(0, 1fr))",
            gridTemplateRows: "repeat(5, minmax(0, 1fr))",
          }}
        >
          {/* Generate 50 cells */}
          {Array.from({ length: 50 }, (_, index) => {
            const item = sortedData[index]; // Get the corresponding sortedData item if available
            return (
              <Cell
                key={index}
                item={item} // Pass the item if available
                disabled={!item} // Disable if no item exists
                onMouseEnter={(e: any) => item && handleMouseEnter(e, item)}
                onMouseLeave={item ? handleMouseLeave : () => {}}
              />
            );
          })}
        </div>

        {/* Hover card */}
        {hoveredItem && <HoverCard item={hoveredItem} />}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-4 h-4 bg-red-500 rounded-sm" />
            <div className="w-4 h-4 bg-green-200 rounded-sm" />
            <div className="w-4 h-4 bg-green-300 rounded-sm" />
            <div className="w-4 h-4 bg-green-400 rounded-sm" />
            <div className="w-4 h-4 bg-green-500 rounded-sm" />
            <div className="w-4 h-4 bg-green-600 rounded-sm" />
          </div>
          <span>More</span>
        </div>

        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <span className="mr-2">Average Rating:</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= Math.round(averageRating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Cell: React.FC<{
  item: HeatmapItem;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  disabled?: boolean; // New disabled prop
}> = ({ item, onMouseEnter, onMouseLeave, disabled = false }) => {
  console.log("item.feedback[0]?.rating", item);
  const intensity = Array.isArray(item?.feedback)
    ? item.feedback[0]?.rating / 5 || 5
    : typeof item?.feedback === "string"
    ? 3 / 5
    : 0;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={
        disabled
          ? undefined // No hover effects if disabled
          : {
              scale: 1.2,
              zIndex: 10,
              backgroundColor: getColorForIntensity(intensity),
              transition: { duration: 0.2 },
            }
      }
      className={`w-6 h-6 rounded-sm cursor-pointer transition-colors duration-200 ${
        disabled ? " bg-gray-300" : ""
      }`}
      style={{
        backgroundColor: disabled ? "gray" : getColorForIntensity(intensity),
      }}
      onMouseEnter={disabled ? undefined : onMouseEnter}
      onMouseLeave={disabled ? undefined : onMouseLeave}
      aria-label={
        disabled
          ? "Disabled"
          : `${item.topic}: ${
              Array.isArray(item.feedback)
                ? `${item.feedback[0]?.rating} stars`
                : "No feedback"
            } on ${formatDate(new Date(item.date))}`
      }
    />
  );
};

const HoverCard: React.FC<{ item: HeatmapItem }> = ({ item }) => {
  const feedback = Array.isArray(item.feedback) ? item.feedback[0] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="z-50 absolute top-12 left-1/2 transform -translate-x-1/2" // Added positioning
    >
      <Card className="p-4 shadow-lg bg-gray-100 dark:bg-gray-800 w-64 rounded-md overflow-hidden">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {item.topic}
        </h3>
        <p className="text-xs text-gray-500 mb-2">
          {formatDate(new Date(item.date))}
        </p>
        {feedback ? (
          <>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {feedback?.feedback}
            </p>
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400 mr-2">
                Rating:
              </span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= feedback.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            No feedback available
          </p>
        )}
      </Card>
    </motion.div>
  );
};
