import { getUserFromToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import JoinPostsModel from "@/models/joinSchema";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Get the token from cookies
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }

    const tokenValue = token.value;
    console.log("Token Value:", tokenValue);

    // Decode the token to get user details
    const decoded = await getUserFromToken(tokenValue);
    const userId = decoded?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }
    console.log("Authenticated User ID:", userId);

    // Parse the request body
    const { postId } = await req.json();
    if (!postId) {
      return NextResponse.json(
        { error: "postId  is required" },
        { status: 400 }
      );
    }

    // Check if the user has already joined this card
    const existingEntry = await JoinPostsModel.findOne({ userId, postId });

    console.log("existingEntry", existingEntry);

    if (existingEntry) {
      // Toggle the isJoined status
      existingEntry.isJoined = !existingEntry.isJoined;
      await existingEntry.save();

      return NextResponse.json(
        {
          message: `Successfully ${
            existingEntry.isJoined ? "joined" : "left"
          } the card`,
          isJoined: existingEntry.isJoined,
        },
        { status: 200 }
      );
    } else {
      // Create a new entry with isJoined: true
      const newEntry = new JoinPostsModel({
        userId,
        postId,
        isJoined: true,
      });
      await newEntry.save();

      console.log("newEntry", newEntry);

      return NextResponse.json(
        {
          message: "Successfully joined the card",
          isJoined: true,
        },
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
