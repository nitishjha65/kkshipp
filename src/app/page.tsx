"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import SearchInput from "@/components/home/searchInput";
import Navbar from "@/components/home/Navbar";
import JobList from "@/components/home/JobList";
import { useEffect } from "react";

export default function Home() {
  return (
    // <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
    <div className="min-h-screen ">
      {/* Hero Section */}
      <div className="relative h-[65vh]  overflow-hidden">
        {/* <Image
          src="https://source.unsplash.com/random/1920x1080/?wave"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        /> */}
        <div
          // className="relative h-[450px] bg-hero-pattern bg-[51%_38%] bg-no-repeat bg-cover"
          className="relative h-[450px]"
          // style={{
          //   backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/assets/bgImageLoqQ.jpg')`,
          //   backgroundSize: "cover",
          //   backgroundPosition: "51% 38%",
          // }}
        >
          <Image
            src="/assets/bgImageLoqQ.jpg" // Path to your hero image
            alt="Hero background"
            layout="fill" // Covers the entire div
            objectFit="cover" // Ensures the image covers the container
            objectPosition="51% 38%" // Adjust the focal point of the image
            priority // Ensures the image is loaded quickly
            className="z-0"
          />

          {/* <link rel="preload" href="/assets.bgImage.jpg" as="image" /> */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>

          <Navbar />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-2xl md:text-5xl mt-5 user-select-none text-white">
            <Link href="/" className="cursor-pointer hover:opacity-80">
              <div className="drop-shadow-2xl">
                {/* Where Practice Makes Perfect Partners */}
                where{" "}
                <span className="font-bold">
                  {/* <span className="hidden sm:contents">Practice</span> makes */}
                  <span className="">Practice</span> makes
                </span>
              </div>
              {/* <div className="hidden sm:contents drop-shadow-2xl"> */}
              <div className=" drop-shadow-2xl">
                <span className="font-bold">Perfect Partners</span>
              </div>
            </Link>

            <SearchInput />
          </div>
        </div>

        <svg
          className="absolute -bottom-2 w-full"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 36.7C840 27 960 13 1080 16.3C1200 20 1320 40 1380 50L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
            fill="#fff"
          />
        </svg>
      </div>

      {/* Course Cards */}

      <section className="z-10 max-w-[1100px]   mx-auto sm:rounded-xl py-2 mb-2  bg-teal-300 overflow-hidden">
        <Link
          href="https://safetywing.com/nomad-health?referenceID=24730000"
          target="_blank"
          className="bg-teal-300 h-[88px] mt-1 sm:mx-2 sm:rounded-xl flex items-center cursor-pointer hover:opacity-80 transition-all ease-linear overflow-hidden"
        >
          <div className="p-4 md:pe-2">
            <Image
              src="/assets/safetywing.png"
              alt="safetyLogo"
              className="w-16 aspect-square object-cover bg-cyan-900 rounded-full"
              width={60}
              height={60}
            />
          </div>
          <div className="max-w-sm">
            <div className="text-[clamp(14px,6vw,17px)] font-extrabold">
              Nomad Health by SafetyWing
            </div>
            <div>Global health coverage for remote workers and nomads</div>
          </div>
          <div className="ms-auto p-4 hidden md:block">
            <button className="bg-white text-black rounded-xl py-3 px-7 font-extrabold">
              Sign up today
            </button>
          </div>
        </Link>
      </section>
      <section className="max-w-[1100px] mx-auto mb-10">
        <JobList />
      </section>
    </div>
  );
}
