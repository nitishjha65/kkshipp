import { connect } from "@/dbConfig/dbConfig";

import UserModel from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const reqBody = await request.json();

    const { email, password } = reqBody;

    console.log("reqBody", reqBody);

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User does not exist", status: 400 });
    }

    console.log("user", user);
    //compare password

    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "User does not exist", status: 400 });
    }

    const tokenData = {
      id: user._id,
      email: user.email,
    };
    console.log("process.env.TOKEN_SECRET", process.env.TOKEN_SECRET);

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "5h",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      status: 200,
      id: user?._id,
    });
    response.cookies.set("token", token, {
      // httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.log("error");
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
