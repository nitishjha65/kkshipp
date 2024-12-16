"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, X } from "lucide-react";
import axios from "axios";
import { formatDate } from "@/lib/utils";

interface CourseDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  details: any;
}

export default function CourseDetails({
  isOpen,
  onClose,
  details,
}: CourseDetailsProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [isJoined, setIsJoined] = useState(
    details?.joinerDetails?.isJoined ?? false
  );

  // Close modal when clicking outside
  useEffect(() => {
    if (!isOpen) return; // Do nothing if modal is not open

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleJoin = async () => {
    console.log("handleJoin triggered");

    try {
      const response = await axios.post(
        "/api/users/joinPosts",
        { postId: details?._id },
        { withCredentials: true } // Include cookies for authentication
      );

      console.log("response", response);

      if (response.status === 200) {
        setIsJoined(response.data.isJoined); // Update the button state
      }
    } catch (error) {
      console.error("Error toggling join status:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        ref={modalRef} // Ref added here
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8 mt-2">
          {/* Course Title and Join Button */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {details?.title}
            </h1>
          </div>

          {/* Instructor Section */}
          <div className="flex items-center gap-4 mb-12">
            <Image
              src={
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
              }
              alt="userName"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {details?.userDetails?.email?.split("@")[0] ??
                  details?.userDetails?.email}{" "}
              </h2>
              <p className="text-gray-600">{details?.category}</p>
            </div>

            <button
              className={`${
                isJoined ? "bg-green-600" : "bg-blue-600"
              } text-white px-4 py-2 rounded-md   ${
                isJoined ? "hover:bg-green-700" : "bg-blue-700"
              } transition-colors ml-auto`}
              onClick={handleJoin}
            >
              {isJoined ? "Joined" : "Join"}
            </button>
          </div>

          {/* Learning Plan Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Learning Plan</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{`Start: ${formatDate(details?.startDate)}`}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{`End: ${formatDate(details?.endDate)}`}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>{`Duration: ${details?.duration} day(s)`}</span>
              </div>
            </div>
          </div>

          {/* Syllabus Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Syllabus</h2>
            <div className="space-y-4">
              {
                // [
                //   { title: "Higher-Order Components", date: "March 15, 2024" },
                //   { title: "Render Props Pattern", date: "March 22, 2024" },
                //   { title: "Custom Hooks", date: "March 29, 2024" },
                // ]

                details?.syllabus?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {item?.topic}
                      </h3>
                      <p className="text-gray-500">{formatDate(item?.date)}</p>
                    </div>
                    <div className="h-5 w-5 border-2 border-gray-300 rounded"></div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
