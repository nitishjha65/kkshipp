"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, User, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Feedback {
  _id: string;
  userId: string;
  rating: number;
  feedback: string;
  postId: string;
  createdAt: string;
}

interface FeedbackCardProps {
  feedback: Feedback;
}

const FeedbackCard: React.FC<any> = ({ feedback }) => {
  const gradients = [
    "from-pink-500 to-purple-500",
    "from-blue-500 to-teal-500",
    "from-green-500 to-yellow-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500",
  ];

  const randomGradient =
    gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="h-full"
    >
      <Card
        className={`overflow-hidden h-full bg-gradient-to-br ${randomGradient} shadow-lg`}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-6 h-6 ${
                    star <= feedback.rating
                      ? "text-yellow-300 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <motion.div
              className="bg-white bg-opacity-20 rounded-full p-2"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Calendar className="w-4 h-4 text-white" />
            </motion.div>
          </div>
          <p className="text-white text-lg font-medium mb-4 flex-grow">
            {feedback.feedback}
          </p>
          <div className="flex justify-between items-center text-sm text-white text-opacity-80">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>{feedback.userId}</span>
            </div>
            <span>{new Date(feedback.createdAt).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FeedbackCard;
