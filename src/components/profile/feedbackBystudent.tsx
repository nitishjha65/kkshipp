import React, { useState, useMemo, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import axios from "axios";
interface FeedbackEntry {
  studentId: number;
  rating: number;
  feedback: string;
  topic: string;
  isUserIdCreator?: boolean;
}
const SyllabusItemModalForstudents: React.FC<any> = ({
  item,
  details,
  onClose,
  onFeedbackSubmit,
}) => {
  console.log("item", item);

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmitFeedback = () => {
    const feedbackEntry: FeedbackEntry = {
      studentId: details?.userId, // this is instructor id
      topic: item?.topic,
      rating,
      feedback,
    };

    console.log("feedbackEntry", feedbackEntry);
    onFeedbackSubmit(feedbackEntry);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{item.topic || "Feedback for Instructor"}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">
            Date: {new Date(item.date).toLocaleDateString()}
          </h4>
          <h4 className="font-semibold mb-2">Instructor: {details?.name}</h4>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Provide Feedback</h4>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 cursor-pointer ${
                  star <= rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 fill-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SyllabusItemModalForstudents;
