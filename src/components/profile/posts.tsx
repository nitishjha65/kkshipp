"use client";
import React, { useEffect, useState } from "react";
import PostsCards from "@/components/profile/cards"; // Assuming the previous component is named CourseCard
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Award, BookOpen } from "lucide-react";
import UserAvatar from "@/lib/avatar";
import { useRouter } from "next/navigation";
import PostDetails from "./postdetails";
import Cookies from "js-cookie";
import { getUserFromToken } from "@/lib/utils";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useLogin } from "@/lib/loginContext";
import { AnimatePresence } from "framer-motion";
import FeedbackCard from "./feedbackDisplay";
import { Heatmap } from "./heatmap";
import { profile } from "console";
import { subDays } from "date-fns";

// const generateSampleData = (count: number) => {
//   const today = new Date();
//   const topics = [
//     "User Experience",
//     "Performance",
//     "Security",
//     "Accessibility",
//     "Design System",
//     "Documentation",
//     "Testing",
//     "CI/CD",
//     "Analytics",
//     "Optimization",
//   ];

//   const feedbacks = [
//     "Significant improvements observed in this area",
//     "Needs immediate attention and optimization",
//     "Showing positive trends in recent updates",
//     "Critical issues identified and resolved",
//     "Maintaining stable performance metrics",
//   ];

//   return Array.from({ length: count }, (_, i) => ({
//     id: `item-${i}`,
//     date: subDays(today, count - i - 1),
//     topic: topics[i % topics.length],
//     stars: Math.floor(Math.random() * 5) + 1,
//     feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)],
//     intensity: Math.random(),
//   }));
// };

export default function ProfilePage({ profileData }: any) {
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const { user, login, logout } = useLogin(); // Access login and user from context
  const [isSelectedPostIsAuthors, setSelectedPostIsAuthors] =
    useState<any>(null);
  const [joinerUserid, setJoinerUserid] = useState<any>("");
  const [accountUser, setAccountuser] = useState<any>("");
  const feedbackData = [
    {
      _id: "1",
      userId: "john_doe",
      rating: 5,
      feedback: "Great experience! The platform was very user-friendly.",
      postId: "post_123",
      createdAt: "2024-12-01T10:15:30Z",
    },
    {
      _id: "2",
      userId: "jane_smith",
      rating: 4,
      feedback: "I enjoyed the service but there's room for improvement.",
      postId: "post_456",
      createdAt: "2024-12-02T14:20:15Z",
    },
    {
      _id: "3",
      userId: "alexander",
      rating: 3,
      feedback: "The experience was average, nothing exceptional.",
      postId: "post_789",
      createdAt: "2024-12-03T16:45:00Z",
    },
  ];

  console.log("profileData", profileData);

  const [commitments, setCommitments] = useState<any>([]);

  // setOpenDetails
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [canFeedback, setCanFeedback] = useState<boolean>(false);
  const [canFeedbackJoiner, setCanFeedbackJoiner] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(
    Cookies.get("token") || null
  );

  const [userId, setuserId] = useState<any>("");
  // logout();

  // console.log(Cookies.get("token")); // Check if the token is available
  // const sampleData = generateSampleData(50);

  const provideFeedback = async (currentToken?: string) => {
    const effectiveToken = currentToken || token; // Use the passed token or fall back to state
    console.log("effectiveToken", effectiveToken);
    console.log("token", token);
    console.log("user", user);
    console.log(
      "isSelectedPostIsAuthors, selectedPost",
      isSelectedPostIsAuthors,
      selectedPost
    );

    if (effectiveToken) {
      try {
        setuserId(user?.id);

        //selected post is author's

        console.log(
          "isSelectedPostIsAuthors>>>>>>>>>>>>>>>>>, ",
          isSelectedPostIsAuthors
        );
        console.log("user, ", user?.id);

        console.log("profileData?.accountUserId", profileData?.accountUserId);

        if (user?.id == profileData?.accountUserId) {
          console.log("profile user account??????????????????????????????/");

          if (isSelectedPostIsAuthors) {
            setCanFeedback(true);
            setCanFeedbackJoiner(false);
          } else {
            console.log("joiner modal");

            setCanFeedbackJoiner(true);
            setCanFeedback(false);
          }
        } else {
          setCanFeedback(false);
          setCanFeedbackJoiner(false);
          setIsNotLoggedIn(true);
          setJoinerUserid("");
        }

        // if (user?.id == profileData?.autheorUserid) {
        //   //author provides feedback
        //   setCanFeedback(true);
        //   setCanFeedbackJoiner(false);
        // }
        // //selected post is joiner's, feedback will be by whose account it is and is logged in
        // else if (user?.id == profileData?.accountUserId) {
        //   setJoinerUserid(profileData?.joinedPosts?.userId);
        //   setCanFeedbackJoiner(true);
        //   setCanFeedback(false);
        // } else {
        //   setCanFeedback(false);
        //   setCanFeedbackJoiner(false);
        //   setIsNotLoggedIn(true);
        //   setJoinerUserid("");
        // }
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsNotLoggedIn(true);
      }
    }
  };

  console.log("openDetailsddddddddd", openDetails);
  useEffect(() => {
    console.log("openDetails", openDetails);

    if (Cookies.get("token")) {
      const tokenFromCookies: any = Cookies.get("token");
      setToken(tokenFromCookies);
      provideFeedback(tokenFromCookies);
      setAccountuser(profileData?.accountUserId);
    }
  }, [Cookies.get("token"), openDetails, user, selectedPost]);

  useEffect(() => {
    if (profileData) {
      console.log(
        "profileData?.posttopicsWithFeedback",
        profileData?.posttopicsWithFeedback
      );
      const noOfCommitmentsFromPosts = profileData?.posttopicsWithFeedback?.map(
        (post: any) => {
          return {
            topic: post?.syllabus?.topic,
            date: post?.syllabus?.date,
            feedback:
              post?.feedbackDetails?.length == 1
                ? post?.feedbackDetails?.map((feedback: any) => ({
                    feedback: feedback?.feedback,
                    rating: feedback?.rating,
                    createdAt: feedback?.createdAt,
                  }))
                : post?.feedbackDetails?.length > 1
                ? post?.feedbackDetails?.map((feedback: any) => ({
                    feedback: feedback?.feedback,
                    rating:
                      post?.feedbackDetails.reduce(
                        (sum: any, feedback: any) =>
                          sum + (feedback?.rating || 0),
                        0
                      ) / post?.feedbackDetails.length,

                    createdAt: feedback?.createdAt,
                  }))
                : "No feedback available",
          };
        }
      );

      console.log(
        "profileData?.joinedPostswithFeedback?.syllabusDetails",
        profileData?.joinedPostswithFeedback?.[0]?.syllabusDetails
      );
      const noOfCommitmentsFromJoined =
        profileData?.joinedPostswithFeedback?.[0]?.syllabusDetails?.map(
          (item: any) => ({
            topic: item?.syllabus?.topic,
            date: item?.syllabus?.date,
            feedback:
              item?.feedbackDetails?.length > 0
                ? item?.feedbackDetails?.map((feedback: any) => ({
                    feedback: feedback?.feedback,
                    rating: feedback?.rating,
                    createdAt: feedback?.createdAt,
                  }))
                : "No feedback available",
          })
        );

      console.log([...noOfCommitmentsFromPosts, ...noOfCommitmentsFromJoined]);
      const noOfCommitments = [
        ...noOfCommitmentsFromPosts,
        ...noOfCommitmentsFromJoined,
      ];

      setCommitments(noOfCommitments);
    }
  }, [profileData]);
  return (
    <>
      {openDetails ? (
        <PostDetails
          details={selectedPost}
          setOpenDetails={setOpenDetails}
          canFeedback={canFeedback}
          canFeedbackJoiner={canFeedbackJoiner}
        />
      ) : (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center mb-12 space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-primary">
                <AvatarImage src="/user-avatar.jpg" alt="User Profile" />
                <AvatarFallback>
                  {profileData?.postSessionsOfAuthor?.[0]?.userDetails?.email
                    .charAt(0)
                    .toUpperCase() ?? "Profile"}
                </AvatarFallback>
              </Avatar>

              {/* <UserAvatar
            firstName={
              profileData?.postSessionsOfAuthor[0]?.userDetails?.email?.split(
                "@"
              )[0] ?? profileData?.postSessionsOfAuthor[0]?.userDetails?.email
            }
            // onClick={() => push(`profile/${details?.userId}`)}
          /> */}

              <div className="absolute bottom-0 right-0 bg-green-500 w-8 h-8 rounded-full flex items-center justify-center text-white">
                <Star className="w-5 h-5" />
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">
                {profileData?.postSessionsOfAuthor?.[0]?.userDetails?.email?.split(
                  "@"
                )[0] ?? "Name"}
              </h1>
              <p className="text-gray-600 mb-4">
                {/* Full Stack Developer | Tech Enthusiast */}
              </p>

              <div className="flex justify-center md:justify-start space-x-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span className="text-sm">
                    {`${profileData?.postSessionsOfAuthor?.length} Practices`}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm">
                    {" "}
                    {`${profileData?.postSessionsOfAuthor?.length} `}
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Courses Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">My Courses</h2>
            <div className="space-y-4">
              {profileData?.postSessionsOfAuthor?.map((post: any) => (
                <PostsCards
                  key={post?._id}
                  details={post}
                  // isSelectedPostIsAuthors={true}
                  onClick={() => {
                    setSelectedPost(post);
                    setOpenDetails(true);
                    setSelectedPostIsAuthors(true);
                  }}
                />
              ))}
            </div>
          </div>

          {/* joined posts

*/}

          <div>
            <h2 className="text-2xl font-semibold mb-6">Joined Posts</h2>
            <div className="space-y-4">
              {profileData?.joinedPosts?.joinedPostsDetails?.map(
                (post: any) => (
                  <PostsCards
                    key={post?._id}
                    details={post}
                    // isSelectedPostIsAuthors={false}
                    onClick={() => {
                      setSelectedPost(post);
                      setOpenDetails(true);
                      setSelectedPostIsAuthors(false);
                    }}
                  />
                )
              )}
            </div>
          </div>

          <div className="min-h-72 bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <Heatmap data={commitments} />
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {feedbackData?.map((feedback) => (
                <FeedbackCard key={feedback._id} feedback={feedback} />
              ))}
            </AnimatePresence>
          </div> */}

          {/* Achievements Section */}
          {/* <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <Star className="w-8 h-8 text-yellow-500" />,
                  title: "Budding Star",
                  description: "Latent Barrier Crossed",
                },
                // {
                //   icon: <Award className="w-8 h-8 text-yellow-500" />,
                //   title: "React Pro",
                //   description: "Mastered React Advanced Patterns",
                // },
                // {
                //   icon: <BookOpen className="w-8 h-8 text-blue-500" />,
                //   title: "Backend Ninja",
                //   description: "Completed Node.js Mastery",
                // },
                // {
                //   icon: <Star className="w-8 h-8 text-green-500" />,
                //   title: "ML Beginner",
                //   description: "Started Machine Learning Journey",
                // },
                // {
                //   icon: <Star className="w-8 h-8 text-purple-500" />,
                //   title: "Continuous Learner",
                //   description: "3 Courses in 2 Months",
                // },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-all"
                >
                  <div className="flex justify-center mb-3">
                    {achievement.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{achievement.title}</h3>
                  <p className="text-sm text-gray-600">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      )}
    </>
  );
}
