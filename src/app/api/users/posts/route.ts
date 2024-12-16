import { getUserFromToken } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken";
import PostFormModel from "@/models/formSchema";

await connect();

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token");
    console.log("token", token);
    if (!token) {
      return NextResponse.json(
        { error: "Authorization token is missing" },
        { status: 401 }
      );
    }
    const tokenVal = token?.value;

    console.log("tokenVal", tokenVal);

    const decoded = await getUserFromToken(tokenVal);

    const user = decoded?.id;

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    console.log("Authenticated User:", user);

    const requestBody = await req.json(); // Parse the request body
    console.log("re,requestBodyquestBody", requestBody);

    const newPost = new PostFormModel({ ...requestBody, userId: user });

    const savedUser = await newPost.save();

    return NextResponse.json({
      message: "Post created successfully",
      savedUser,
      status: 200,
    });
  } catch (err: any) {
    console.log("err", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
