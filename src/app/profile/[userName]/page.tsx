"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import Details from "@/components/profile/postdetails";
import { notFound } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Posts from "@/components/profile/posts";

export default function CoursePage({
  params,
}: {
  params: Promise<{ userName: string }>;
}) {
  // const validIds = ["1", "2", "3"];

  // Unwrap the params promise using React.use
  const { userName } = React.use(params);

  const [profileData, setProfileData] = useState<any>("");

  console.log("userName", userName);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        // console.log("token", token);
        // if (!id) {
        //   notFound();
        //   return;
        // }
        // if (token) {

        const response = await axios.get(`/api/profile/posts?id=${userName}`);
        // const response = await axios.get(
        //   `/api/profile/posts/${id}`

        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
        // );

        setProfileData(response?.data);
        console.log("Response data:", response?.data);
        // }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userName]);
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Posts profileData={profileData} />
    </div>
  );
}
