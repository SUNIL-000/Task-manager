import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { dbConnect } from "@/app/helper/db";
import { Users } from "@/app/models/Users";

dbConnect();

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        {
          message: "Please provide email and password.",
          success: false,
        },
        {
          status: 401,
        }
      );
    }
    
    const user = await Users.findOne({ email:email });

    if (!user) {
      return NextResponse.json({
        message: "Email is not registered.",
        success: false,
      });
    }

    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (isPasswordMatch) {
      console.log("Passwords matched");
      // Generate a JWT token
      const token = jwt.sign(
        { id: user._id, name: user.username },
        "demotokenkey" // Replace with your actual secret key
      );

      return NextResponse.json(
        
        { message: "Login successful.", success: true,user, token },
        { status: 200 }
      );
    } else {
      console.log("Passwords do not match");
      return NextResponse.json(
        {
          message: "Incorrect password.",
          success: false,
        },
        {
          status: 401, // Use 401 (Unauthorized) status for incorrect password
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to login.",
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}

