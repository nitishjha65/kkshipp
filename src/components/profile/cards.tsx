"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Important: use next/navigation for App Router

interface CourseData {
  id: number;
  title: string;
  author: string;
  authorLevel: string;
  duration: string;
  category: string;
  votes: number;
  votedBy: string[];
  avatar: string;
  difficulty: string;
  description: string;
  startDate: string;
  endDate: string;
  rating: number;
  syllabus: Array<{
    id: number;
    topic: string;
    date: string;
    completed: boolean;
  }>;
}

export default function CourseCard({ details }: { details: CourseData }) {
  const router = useRouter(); // Use from next/navigation in App Router

  const startDate = new Date(details.startDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleCardClick = () => {
    if (details?.id) {
      router.push(`/profile/${details.id}`);
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 mb-1 rounded-lg shadow-sm p-4 sm:p-6 transform transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-md hover:bg-slate-50 hover:translate-y-[-1px] cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col space-y-4">
        {/* Rest of your existing component remains the same */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded inline-block">
              {details.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>Starts {startDate}</span>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden">
              <Image
                src={details.avatar}
                alt={details.author}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg sm:text-xl leading-tight mb-1 truncate hover:underline">
                {details.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-600 text-sm truncate">
                  {details.author}
                </span>
                <span className="text-xs border border-gray-300 rounded px-2 py-0.5 whitespace-nowrap">
                  {details.authorLevel}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 text-sm line-clamp-2">
            {details.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 text-sm">
            <div className="flex items-center space-x-4 text-gray-500">
              <span>{details.duration}</span>
              <span className="hidden sm:inline">•</span>
              <span>{details.difficulty}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">{details.votes}</span>
              <span className="text-gray-500">upvotes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
