import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import FeedbackModel from "@/models/feedbackSchema";
import mongoose, { Types } from "mongoose";
import { getUserFromToken } from "@/lib/utils";
import { object } from "zod";

export async function POST(req: NextRequest) {
  try {
    await connect();

    const token = req.cookies.get("token");

    // console.log("tokentoken", token);
    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is missing", status: 401 },
        { status: 401 }
      );
    }

    const tokenValue = token.value;

    // console.log("tokenValuetokenValue", tokenValue);

    // Decode the token to get user details
    const decoded = await getUserFromToken(tokenValue);
    const accountUserId = decoded?.id;

    // Parse the request body
    const body = await req.json();

    const { feedbackList } = body;

    console.log("feedbackList", feedbackList);
    const query = req?.nextUrl?.searchParams;

    console.log("query", query);

    const postId: any = query.get("id");
    // const isJoiner: any = query.get("canFeedbackJoiner");
    const parseBoolean = (value: any) => value === "true";

    const isJoiner = parseBoolean(query.get("canFeedbackJoiner"));

    console.log("isJoiner", isJoiner);
    // Validate postId
    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json(
        { error: "Invalid or missing postId" },
        { status: 400 }
      );
    }

    const alreadyPresent: any = [];
    const newFeedbacks = [];
    let isJoinerProvidingFeedback;

    if (isJoiner) {
      console.log("mmm", {
        postId,
        userId: new mongoose.Types.ObjectId(feedbackList?.studentId), // Convert to ObjectId
        topic: feedbackList?.topic,
        feedbackProviderId: accountUserId,
      });

      const existingFeedback = await FeedbackModel.findOne({
        postId,
        userId: new mongoose.Types.ObjectId(feedbackList?.studentId), // Convert to ObjectId
        topic: feedbackList?.topic,
        feedbackProviderId: accountUserId,
      });

      console.log("existingFeedback", existingFeedback);

      if (existingFeedback) {
        alreadyPresent.push({ postId, ...feedbackList, accountUserId });
      } else {
        const feed = {
          postId,
          rating: feedbackList?.rating,
          userId: feedbackList?.studentId,
          topic: feedbackList?.topic,
          feedbackProviderId: accountUserId,
          isUserIdCreator: isJoiner, //always true
          feedback: feedbackList?.feedback,
        };

        isJoinerProvidingFeedback = await FeedbackModel.create(feed);
      }

      return NextResponse.json({
        message: "Feedback processed successfully",
        alreadyPresent,
        newFeedbacksInserted: isJoinerProvidingFeedback,
        status: 200,
      });
    } else {
      // Validate feedbackList
      if (!Array.isArray(feedbackList) || feedbackList?.length === 0) {
        return NextResponse.json(
          { error: "Feedback list is required and must be an array" },
          { status: 400 }
        );
      }

      for (const { studentId, rating, feedback, topic } of feedbackList) {
        if (!studentId || !rating || !feedback) {
          return NextResponse.json(
            {
              error:
                "studentId, rating,topic and feedback are required in each entry",
            },
            { status: 400 }
          );
        }

        // Check if the combination of postId and studentId already exists
        const existingFeedback = await FeedbackModel.findOne({
          postId,
          userId: new mongoose.Types.ObjectId(studentId), // Convert to ObjectId
          topic,
          feedbackProviderId: accountUserId,

          // isUserIdCreator: isJoiner, //always false
        });

        if (existingFeedback) {
          alreadyPresent.push({ postId, studentId, accountUserId });
        } else {
          // Add the new feedback to the array for bulk insertion
          newFeedbacks.push({
            postId,
            userId: studentId,
            rating,
            feedback,
            topic,
            feedbackProviderId: accountUserId,
            isUserIdCreator: isJoiner, //always false
          });
        }
      }

      // Insert new feedbacks into the database
      if (newFeedbacks?.length > 0) {
        await FeedbackModel.insertMany(newFeedbacks);
      }

      return NextResponse.json({
        message: "Feedback processed successfully",
        alreadyPresent,
        newFeedbacksInserted: newFeedbacks?.length,
        status: 200,
      });
    }
  } catch (err: any) {
    console.error("Error processing feedback:", err);
    return NextResponse.json(
      { error: "Failed to process feedback", details: err },
      { status: 500 }
    );
  }
}
