import { getUserFromToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import PostFormModel from "@/models/formSchema";
import UserModel from "@/models/userSchema";
import { Mongoose, Types } from "mongoose";
import JoinModel from "@/models/joinSchema";
import FeedbackModel from "@/models/feedbackSchema";
// const { ObjectId } = require("mongodb");
import { ObjectId } from "mongodb";

export async function GET(req: NextRequest) {
  try {
    await connect();

    //  // Get user ID from the token if available
    // const token = req.cookies.get("token")?.value;
    // let userIdDecoded: string | null = null;

    // if (token) {
    //   try {
    //     const decoded = await getUserFromToken(token);
    //     userIdDecoded = decoded?.id || null;
    //   } catch (error) {
    //     console.log("Invalid or expired token");
    //     return NextResponse.json(
    //       { error: "Invalid or expired token" },
    //       { status: 401 }
    //     );
    //   }
    // }

    const pathname = req.nextUrl.pathname;

    console.log("pathname", pathname);

    const query = req?.nextUrl?.searchParams;

    const PostAuthoruserName = query.get("id");

    console.log("PostAuthoruserName", PostAuthoruserName);

    // const user = await UserModel.findOne({ userName: PostAuthoruserName });
    const user = await UserModel.findOne({
      userName: PostAuthoruserName,
    }).select("_id"); // Selecting only the _id field (userId)

    const autheorUserid = user?._id?.toString();

    console.log("user", user?._id?.toString());

    // const limit = query.get("limit");

    // console.log("Query parameter 'page':", page, limit);
    const pipeline = [
      {
        $lookup: {
          from: "users", // Join with the users collection
          let: { userIdStr: { $toString: "$userId" } },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", { $toObjectId: "$$userIdStr" }],
                },
              },
            },
            {
              $project: { email: 1, name: 1 }, // Include email and name fields
            },
          ],
          as: "userDetails",
        },
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      // {
      //   $skip: (Number(page) - 1) * Number(limit),
      // },
      // {
      //   $limit: Number(limit),
      // },
    ];
    const postSessionsOfAuthor = await PostFormModel.aggregate([
      {
        $match: { userId: autheorUserid },
      },
      ...pipeline,
    ]);
    const joinedPosts = await JoinModel.aggregate([
      {
        $match: { userId: autheorUserid?.toString() }, // Match the author by userId
      },
      {
        $lookup: {
          from: "postforms", // Collection name for PostFormModel
          let: { joinedPosts: "$joinedPosts" }, // Pass the `joinedPosts` array
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    "$_id",
                    {
                      $map: {
                        input: "$$joinedPosts",
                        as: "id",
                        in: { $toObjectId: "$$id" },
                      },
                    },
                  ],
                },
              },
            },
            // {
            //   $project: {
            //     title: 1, // Add fields to include from PostFormModel
            //     content: 1,
            //     createdAt: 1,
            //   },
            // },
          ],
          as: "joinedPostsDetails", // Name of the resulting array
        },
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          joinedPostsDetails: 1, // Include only the necessary fields
        },
      },
    ]);

    //account holder is joinee here //diff topic  //each feedback will be counted
    //also make where he is posting by checking if there is any feedback for hat topic wheere he is author //same topic //only one feedback reqd

    const autheorUseridd = new ObjectId(autheorUserid); //account holder
    // const feedbacks = await FeedbackModel.aggregate([
    //   {
    //     $match: {
    //       userId: autheorUseridd,
    //       isUserIdCreator: false,
    //     },
    //   },

    //   {
    //     $addFields: {
    //       feedbackProviderIdObject: { $toObjectId: "$feedbackProviderId" }, // Convert string to ObjectId
    //     },
    //   },

    //   {
    //     $lookup: {
    //       from: "users", // The collection to join with
    //       localField: "feedbackProviderIdObject", // Use converted ObjectId field
    //       foreignField: "_id", // Match against ObjectId in the users collection
    //       as: "feedbackProviderDetails",
    //     },
    //   },
    //   // {
    //   //   $project: {
    //   //     _id: 1,
    //   //     userId: 1,
    //   //     rating: 1,
    //   //     feedback: 1,
    //   //     topic: 1,
    //   //     postId: 1,
    //   //     isUserIdCreator: 1,
    //   //     feedbackProviderId: 1,
    //   //     createdAt: 1,
    //   //     feedbackProviderDetails: {
    //   //       _id: 1,
    //   //       name: 1, // Assuming `name` is a field in the users collection
    //   //       email: 1, // Include other relevant fields as needed
    //   //     },
    //   //   },
    //   // },
    // ]);
    // .toArray((err, results) => {
    //   if (err) {
    //     console.error('Error:', err);
    //   } else {
    //     console.log('Results:', results);
    //   }
    // });

    const today = new Date();
    const year = today.getUTCFullYear();
    const month = String(today.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getUTCDate()).padStart(2, "0");
    const todayFormatted = `${year}-${month}-${day}`;
    const posttopicsWithFeedback = await PostFormModel.aggregate([
      {
        $match: { userId: autheorUserid },
      },
      // Step 1: Unwind the syllabus array to process each topic separately
      {
        $unwind: "$syllabus",
      },
      // Step 2: Match syllabus items with dates prior to today
      {
        $match: {
          "syllabus.date": { $lt: todayFormatted }, // Filter topics with dates before today
        },
      },
      // // Step 3: Lookup feedback for the matched syllabus topics
      {
        $lookup: {
          from: "feedbacks", // Feedback collection
          let: { topic: "$syllabus.topic" }, // Pass topic from syllabus to the lookup pipeline
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: [{ $toString: "$topic" }, { $toString: "$$topic" }],
                    }, // Convert both topics to strings for matching
                    { $eq: ["$isUserIdCreator", true] }, // Filter where isUserIdCreator is true
                  ],
                },
              },
            },
          ],
          as: "feedbackDetails", // The alias for feedback details
        },
      },

      // // Step 4: Project the required fields (topics with feedbacks)
      // {
      //   $project: {
      //     _id: 0, // Exclude default _id field
      //     id: "$syllabus.id", // Include syllabus id
      //     topic: "$syllabus.topic", // Include topic name
      //     date: "$syllabus.date", // Include topic date
      //     completed: "$syllabus.completed", // Include completion status
      //     feedback: "$feedbackDetails", // Include feedback details
      //   },
      // },
    ]);

    const joinedPostswithFeedback = await JoinModel.aggregate([
      {
        $match: { userId: autheorUserid?.toString() }, // Match the author by userId
      },
      {
        $lookup: {
          from: "postforms", // Collection name for PostFormModel
          let: { joinedPosts: "$joinedPosts" }, // Pass the `joinedPosts` array
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    "$_id",
                    {
                      $map: {
                        input: "$$joinedPosts",
                        as: "id",
                        in: { $toObjectId: "$$id" },
                      },
                    },
                  ],
                },
              },
            },
            {
              $unwind: "$syllabus", // Unwind the syllabus array to handle each topic individually
            },
            {
              $match: {
                "syllabus.date": { $lt: today }, // Filter syllabus with dates before today
              },
            },
            {
              $lookup: {
                from: "feedbacks", // Feedback collection
                let: { topic: "$syllabus.topic" }, // Pass topic from syllabus
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $and: [
                          { $eq: ["$topic", "$$topic"] }, // Match by topic
                          { $eq: ["$isUserIdCreator", true] }, // Only include feedback where isUserIdCreator is true
                        ],
                      },
                    },
                  },
                ],
                as: "feedbackDetails", // Alias for feedback details
              },
            },
            {
              $project: {
                _id: 0, // Exclude _id of the post
                "syllabus.id": 1,
                "syllabus.topic": 1,
                "syllabus.date": 1,
                "syllabus.completed": 1,
                feedbackDetails: { $ifNull: ["$feedbackDetails", []] }, // Ensure feedback is an empty array if not found
              },
            },
          ],
          as: "syllabusDetails", // Resulting array of syllabus with feedback
        },
      },
      {
        $project: {
          syllabusDetails: 1, // Include the resulting syllabusDetails with feedback
        },
      },
    ]);

    // console.log(joinedPostswithFeedback);

    // console.log(postSessionsOfAuthor);

    if (postSessionsOfAuthor?.length > 0 || joinedPosts?.length > 0) {
      return NextResponse.json({
        message: "Posts fetched successfully",
        postSessionsOfAuthor,
        joinedPosts: joinedPosts?.[0],
        posttopicsWithFeedback,
        joinedPostswithFeedback,
        accountUserId: autheorUserid,
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "No posts found",
        postSessionsOfAuthor,
        posttopicsWithFeedback,
        joinedPostswithFeedback,
        accountUserId: autheorUserid,
        status: 200,
      });
    }
  } catch (err: any) {
    console.log(err, "Sdfcs");
    return NextResponse.json(
      { error: "Something went wrong while fetching posts", details: err },
      { status: 500 }
    );
  }
}
