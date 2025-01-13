import { getUserFromToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import PostFormModel from "@/models/formSchema";
import UserModel from "@/models/userSchema";
import mongoose, { Mongoose, Types } from "mongoose";
import JoinModel from "@/models/joinSchema";

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

    const pathname = req.nextUrl.pathname;

    console.log("pathname", pathname);

    const query = req?.nextUrl?.searchParams;

    console.log("query", query);

    const postId: any = query.get("id");

    console.log("postId", postId);

    // const postId = "675d2428a892ac55bbf1351b"; // Target postId

    const res = await JoinModel.aggregate([
      {
        $match: {
          joinedPosts: new mongoose.Types.ObjectId(postId), // Match posts the user has joined
        },
      },
      {
        $addFields: {
          userId: { $toObjectId: "$userId" }, // Convert 'userId' string to ObjectId
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          postId: postId,
          "userDetails.userName": 1,
          "userDetails._id": 1,
          // Only include userName from userDetails
        },
      },

      {
        $group: {
          _id: "$postId", // Group by postId
          users: {
            $push: {
              userName: "$userDetails.userName", // Accumulate userName
              userId: "$userDetails._id", // Accumulate _id of the user
            },
          },
        },
      },
      {
        $project: {
          postId: "$_id", // Show postId as '_id'
          users: 1, // Include the users array with userName and userId
          _id: 0, // Exclude the default _id field
        },
      },
    ]);

    console.log("res", res);

    if (res?.length > 0) {
      return NextResponse.json({
        message: "Users joined fetched successfully",
        res,
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "No users found",
        res,
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
