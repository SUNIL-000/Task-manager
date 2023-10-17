import { dbConnect } from "@/app/helper/db"; // Import your database connection utility if needed
 // Import the Users model once
import { NextResponse } from "next/server"; // Import the NextResponse object once
import bcrypt from "bcryptjs"; // Import bcrypt once
import { Users } from "@/app/models/Users";

// Remove any additional import statements for these modules that might be duplicated later in your code file.


dbConnect();
export const GET = async () => {
  let userdata = [];
  try {
    userdata = await Users.find({});
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: error,
      success: false,
    });
  }
  return NextResponse.json(userdata, {
    message: "user details fetched..",
  });
};


export const POST = async (request) => {
  try {
    const { username, email, password, about } = await request.json();

    // Hash the password before creating the user
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the hashed password
    const user = new Users({
      username,
      email,
      password: hashPassword, // Use the hashed password
      about,
    });

    // Save the user to the database
    await user.save();

    console.log(user);

    return NextResponse.json({
      message: "User created successfully.",
      status: 200,
      user, // Send the created user object in the response
    });
  } catch (error) {
    console.error("Failed to create User...");
    console.error(error);

    return NextResponse.json({
      message: "Failed to create user",
      status: 500,
    });
  }
};

