"use client";
import React from "react";
import { useState } from "react";
import Details from "@/components/profile/postdetails";
import { notFound } from "next/navigation";

export default function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const validIds = ["1", "2", "3"];

  // Unwrap the params promise using React.use
  const { id } = React.use(params);

  // Check if the dynamic ID is valid, otherwise render a not-found page
  if (!validIds.includes(id)) {
    notFound(); // This will trigger the `not-found.tsx` page
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Details />
    </div>
  );
}
