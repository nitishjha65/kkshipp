"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Details from "@/components/profile/postdetails";
import { notFound } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import PostsDetails from "@/components/profile/postdetails";

export default function CoursePage({
  params,
}: {
  params: Promise<{ postDetails: string }>;
}) {
  // const validIds = ["1", "2", "3"];

  // Unwrap the params promise using React.use
  const { postDetails } = React.use(params);

  console.log("postDetails", postDetails);
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const token = Cookies.get("token");
  //         // console.log("token", token);
  //         // if (!id) {
  //         //   notFound();
  //         //   return;
  //         // }
  //         // if (token) {

  //         const response = await axios.get(`/api/profile/posts?id=${userName}`);
  //         // const response = await axios.get(
  //         //   `/api/profile/posts/${id}`

  //         // {
  //         //   headers: {
  //         //     Authorization: `Bearer ${token}`,
  //         //   },
  //         // }
  //         // );

  //         setProfileData(response?.data);
  //         console.log("Response data:", response?.data);
  //         // }
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     };

  //     fetchData();
  //   }, [userName]);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <PostsDetails />
    </div>
  );
}
