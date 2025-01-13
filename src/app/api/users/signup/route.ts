import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Connect to the database
    await connect();

    // Parse the request body
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;

    // Check if all required fields are provided
    if (!userName || !email || !password) {
      return NextResponse.json({
        error: "Please provide all required fields (userName, email, password)",
        status: 400,
      });
    }

    // Check if the user already exists by email
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        error: "User already exists",
        status: 400,
      });
    }

    // Check if the userName already exists
    const uniqueUsername = await UserModel.findOne({ userName });
    if (uniqueUsername) {
      return NextResponse.json({
        error: "User Name is already taken!",
        status: 400,
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      userName,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Return a response indicating successful signup
    return NextResponse.json({
      message: "Sign up successful",
      success: true,
      status: 200, // '201 Created' is more appropriate for user creation
    });
  } catch (error: any) {
    console.log("Error during signup:", error);
    return NextResponse.json({
      error: error.message || "Something went wrong",
      status: 500,
    });
  }
}
