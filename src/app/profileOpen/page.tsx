"use client";
import React from "react";
import { useState } from "react";
import Details from "@/components/profile/postdetails";
import { notFound } from "next/navigation";

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Details />
    </div>
  );
}
