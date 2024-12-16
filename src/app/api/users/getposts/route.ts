import { getUserFromToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import PostFormModel from "@/models/formSchema";
import { Mongoose, Types } from "mongoose";

await connect();

export async function GET(req: NextRequest) {
  try {
    // const token = req.cookies.get("token");
    // console.log("token", token);
    // if (!token) {
    //   return NextResponse.json(
    //     { error: "Authorization token is missing" },
    //     { status: 401 }
    //   );
    // }
    // const tokenVal = token?.value;

    // console.log("tokenVal", tokenVal);

    // const decoded = await getUserFromToken(tokenVal);

    // const user = decoded?.id;

    // if (!user) {
    //   return NextResponse.json(
    //     { error: "Invalid or expired token" },
    //     { status: 401 }
    //   );
    // }

    // console.log("Authenticated User:", user);

    // const allPosts = await PostFormModel.find().sort({ createdAt: -1 });

    const allPosts = await PostFormModel.aggregate([
      {
        $lookup: {
          from: "users", // The name of the 'users' collection in MongoDB
          let: { userIdStr: "$userId" }, // Pass userId as a variable
          pipeline: [
            {
              $addFields: {
                _idAsString: { $toString: "$_id" }, // Convert ObjectId to string
              },
            },
            {
              $match: {
                $expr: { $eq: ["$_idAsString", "$$userIdStr"] }, // Compare converted _id with userId
              },
            },
          ],
          as: "userDetails",
        },
      },

      {
        // Second stage: Lookup to join 'joiners' collection
        $lookup: {
          from: "joiners", // The joiners collection
          localField: "userId", // Match with userId field in PostForm
          foreignField: "userId", // Match with userId field in Joiners
          as: "joinerDetails", // Store the joined joiner data in 'joinerDetails'
        },
      },

      {
        $unwind: "$userDetails", // Flatten the userDetails array
      },
      {
        $unwind: "$joinerDetails", // Flatten the joinerDetails array
      },
      {
        $sort: {
          createdAt: -1, // Sort by createdAt in descending order
        },
      },
    ]);

    return NextResponse.json({
      message: "Post fetched successfully",
      allPosts,
      status: 200,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Something went wrong while fetching posts" },
      { status: 500 }
    );
  }
}
