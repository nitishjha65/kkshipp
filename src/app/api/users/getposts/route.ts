import { getUserFromToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import PostFormModel from "@/models/formSchema";
import { Mongoose, Types } from "mongoose";
import JoinModel from "@/models/joinSchema";
import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
import { queryObjects } from "v8";

export async function GET(req: NextRequest) {
  try {
    await connect();

    // Get user ID from the token if available
    const token = req.cookies.get("token")?.value;
    let userIdDecoded: string | null = null;

    if (token) {
      try {
        const decoded = await getUserFromToken(token);
        userIdDecoded = decoded?.id || null;
      } catch (error) {
        console.log("Invalid or expired token");
        return NextResponse.json(
          { error: "Invalid or expired token" },
          { status: 401 }
        );
      }
    }

    const query = req?.nextUrl?.searchParams;

    const page = query.get("page"); // Use .get() to access a specific query parameter
    const limit = query.get("limit");

    console.log("Query parameter 'page':", page, limit);

    const joinData = await JoinModel.findOne({ userId: userIdDecoded });
    const joinedPostIds = joinData
      ? joinData?.joinedPosts?.map((postId: any) => postId?.toString())
      : [];

    const today = new Date();
    const year = today.getUTCFullYear();
    const month = String(today.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(today.getUTCDate()).padStart(2, "0");
    const todayFormatted = `${year}-${month}-${day}`;

    const pipeline = [
      {
        $match: {
          startDate: { $gte: todayFormatted }, // Filter documents with startDate >= '2025-01-11'
        },
      },
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
              $project: { email: 1, name: 1, userName: 1 },
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
      {
        $skip: (Number(page) - 1) * Number(limit),
      },
      {
        $limit: Number(limit),
      },
    ];

    const postSessions = await PostFormModel.aggregate(pipeline);

    const allPosts = postSessions?.map((post: any) => ({
      ...post,
      joined: joinedPostIds.includes(post?._id?.toString()),
    }));

    return NextResponse.json({
      message: "Posts fetched successfully",
      allPosts,
      status: 200,
    });
  } catch (err: any) {
    console.log(err, "Sdfcs");
    return NextResponse.json(
      { error: "Something went wrong while fetching posts", details: err },
      { status: 500 }
    );
  }
}
