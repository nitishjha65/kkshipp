"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "./JobCard"; // Assuming JobCard and CourseCard are the same component
import axios from "axios";

const JobList = () => {
  const [fetchedPosts, setFetchedPosts] = useState<any>([]); // Initialize as an array

  useEffect(() => {
    console.log("useEffect triggered");

    const fetchPosts = async () => {
      try {
        console.log("Fetching posts...");
        const response: any = await axios.get("/api/users/getposts");
        console.log("API Response:", response);

        if (response?.data?.status === 200) {
          console.log("Setting posts state");
          setFetchedPosts(response?.data?.allPosts || []); // Ensure it's always an array
        } else {
          console.log("Unexpected status code:", response.status);
        }
      } catch (err) {
        console.error("Error fetching posts:", err || err);
      }
    };

    fetchPosts();
  }, []);

  console.log("fetchedPosts", fetchedPosts);

  return (
    <div>
      {fetchedPosts?.map((item: any, i: any) => (
        <CourseCard details={item} key={i} />
      ))}
    </div>
  );
};

export default JobList;
