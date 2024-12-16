import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import CourseDetails from "@/components/course-details";
import { useRouter } from "next/navigation"; // Important: use next/navigation for App Router

interface CourseData {
  id: number;
  title: string;
  userId: any;
  // userName: string;
  userLevel: string;
  duration: string;
  category: string;
  // upvotesCount: number;
  // upvotedBy: string[];
  joinedCount: number;
  joinedUsers: string[];
  avatar: string;
  difficulty: string;
  description: string;
  startDate: string;
  endDate: string;
  // rating: number;
  userDetails: any;
  joinerDetails: any;
  syllabus: Array<{
    id: number;
    topic: string;
    date: string;
    completed: boolean;
  }>;
}

export default function CourseCard({ details }: { details: CourseData }) {
  const startDate = new Date(details.startDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { push } = useRouter();
  return (
    <>
      <div className="bg-white border border-gray-200 mb-1 rounded-lg shadow-sm p-4 sm:p-6 transform transition-all duration-300 ease-in-out hover:scale-101 hover:shadow-md hover:bg-slate-50   hover:translate-y-[-1px] ">
        <div className="flex flex-col space-y-4 group">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-2 md:py-0.5 md:px-0.5   rounded inline-block">
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

          <div className="flex items-start space-x-4 group">
            <div
              className="relative w-12 h-12 flex-shrink-0 rounded-full overflow-hidden cursor-pointer"
              onClick={() => push("/profile")}
            >
              <Image
                src={
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
                }
                alt={"user image"}
                layout="fill"
                objectFit="cover"
              />
            </div>

            <div className="flex-1  relative">
              <h3
                className="max-w-sm font-semibold text-lg sm:text-xl leading-tight mb-1 truncate hover:underline cursor-pointer"
                onClick={() => setIsDetailsOpen(true)}
              >
                {details.title}
              </h3>

              {/* Author and Level Below Title */}
              <div className="flex items-center gap-2  mt-1">
                <span
                  className="text-gray-600 text-sm truncate inline-block cursor-pointer"
                  onClick={() => push("/profile")}
                >
                  {/* {details?.userId?.userName ?? "userName"} */}
                  {details?.userDetails?.email?.split("@")[0] ??
                    details?.userDetails?.email}{" "}
                </span>
                <span
                  className="text-xs border border-gray-300 rounded px-2 py-0.5 whitespace-nowrap cursor-pointer"
                  onClick={() => push("/profile")}
                >
                  {details?.userLevel}
                </span>
              </div>

              {/* Sign Up Button */}
              <button
                className={`invisible md:visible absolute top-1/2 right-0 transform -translate-y-1/2 ${
                  details?.joinerDetails?.isJoined
                    ? "bg-green-500"
                    : "bg-red-500"
                }   text-white  rounded-xl py-2 px-5 font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-100 cursor-pointer`}
                onClick={() => setIsDetailsOpen(true)}
              >
                {details?.joinerDetails?.isJoined ? "Joined" : "Join Practice"}
              </button>
            </div>
          </div>

          <p
            className="text-gray-600 text-sm line-clamp-2 cursor-pointer"
            onClick={() => setIsDetailsOpen(true)}
          >
            {details?.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 text-sm">
            <div className="flex items-center space-x-4 text-gray-500">
              <span>{`${details?.duration} days`}</span>
              <span className="hidden sm:inline">•</span>
              <span>{details?.difficulty}</span>
            </div>
            <div className="flex items-center space-x-1">
              {/* <span className="font-medium text-gray-500">
                {details?.upvotesCount ?? 0}
              </span>
              <span className="text-gray-500">upvotes</span> */}
            </div>
          </div>
        </div>
      </div>

      <CourseDetails
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        details={details}
      />
    </>
  );
}
