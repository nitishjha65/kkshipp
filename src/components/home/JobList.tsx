"use client";
import React, { useEffect, useRef, useState } from "react";
import CourseCard from "./JobCard";
import axios from "axios";
import { throttle } from "lodash";
import { useLogin } from "@/lib/loginContext";

const JobList = () => {
  const [fetchedPosts, setFetchedPosts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);
  // const [isFirstTimeRan, setisFirstTimeRan] = useState(false);
  const { user, login, logout, isPostsAdded, checkPostAdded } = useLogin(); // Access login and user from context
  const isFirstTimeRan = useRef(true);

  const fetchPosts = async () => {
    console.log("loading", loading, "!hasMore", !hasMore);
    if (loading || !hasMore) return;

    setLoading(true);
    const limit = 15;

    try {
      const response = await axios.get(
        `/api/users/getposts?page=${page}&limit=${limit}`
      );

      if (response?.data?.status === 200) {
        const newItems = response?.data?.allPosts || [];

        // If no new items or less than limit, set hasMore to false
        if (!newItems.length || newItems.length < limit) {
          setHasMore(false);
        }

        setFetchedPosts((prevItems: any) => [...prevItems, ...newItems]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };
  console.log(">>>>>>>>>uuuuuuuuuuuuuuuuu");
  // Initial fetch effect
  useEffect(() => {
    if (isInitialMount.current) {
      console.log("first time");
      fetchPosts();
      isInitialMount.current = false;
    }
  }, []);

  // Scroll handler with proper checks
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleScroll = useRef(
    throttle(() => {
      if (!loaderRef.current || !hasMore || loading) return;

      const rect = loaderRef.current.getBoundingClientRect();
      const isNearBottom = rect.top <= window.innerHeight + 100;

      if (isNearBottom && !isFirstTimeRan.current) {
        console.log("at btm");
        fetchPosts();
      }
      isFirstTimeRan.current = false;
    }, 500)
  ).current;
  // Scroll listener effect
  useEffect(() => {
    if (!hasMore) {
      window.removeEventListener("scroll", handleScroll);
      return;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [hasMore, loading]); // Added loading to dependencies
  return (
    <div>
      {fetchedPosts?.map((item: any, i: number) => (
        <CourseCard details={item} key={`${item.id || i}`} />
      ))}
      {loading && (
        <div className="text-gray-200 text-center py-4">Loading...</div>
      )}
      {!hasMore && fetchedPosts.length > 0 && (
        <div className="text-gray-200 text-center py-4">
          No more items to load
        </div>
      )}
      <div ref={loaderRef} className="h-10" />{" "}
      {/* Added height to make detection easier */}
    </div>
  );
};

export default JobList;
