import { getUserFromToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import JoinPostsModel from "@/models/joinSchema";
import UserModel from "@/models/userSchema";
import JoinModel from "@/models/joinSchema";
import PostFormModel from "@/models/formSchema";
import { object } from "zod";
import { Types } from "mongoose";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Get the token from cookies
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
    const userId = decoded?.id;

    if (!userId) {
      return NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Parse the request body
    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json(
        { message: "postId is required" },
        { status: 400 }
      );
    }

    const postDetails = await PostFormModel.findById({
      _id: new Types.ObjectId(postId),
    });

    // console.log("postDetails", postDetails);

    // console.log("postId", postId);

    if (postDetails?.userId == userId) {
      return NextResponse.json(
        { message: "self join not possible" },
        { status: 400 }
      );
    }

    const user = await JoinModel.findOne({ userId });

    if (user && user.joinedPosts.includes(postId)) {
      // Unjoin the post
      await JoinModel.updateOne({ userId }, { $pull: { joinedPosts: postId } });

      return NextResponse.json(
        { message: "Successfully left the session", status: 200 },
        { status: 200 }
      );
    } else {
      // Join the post
      await JoinModel.updateOne(
        { userId },
        { $addToSet: { joinedPosts: postId } },
        { upsert: true } // Create a new document if it doesn't exist
      );

      return NextResponse.json(
        { message: "Successfully joined the session", status: 200 },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
