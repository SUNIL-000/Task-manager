import { Task } from "@/app/models/Task";
import { NextResponse } from "next/server";

const { dbConnect } = require("@/app/helper/db");

dbConnect();

export const GET = async (req) => {
  let task = [];

  try {
    task = await Task.find({});
    return NextResponse.json(task, {
      message: "Task fetched successfully...",
      success: true,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    // Handle the error and provide an appropriate response
    return NextResponse.json({
      message: "Error fetching tasks",
      success: false,
    });
  }
};

export const POST = async (request) => {
  const { title, content, userid, status } = await request.json();
  try {
    const newTask = await new Task({
      title,
      content,
      userid,
      status,
    });

    const updateTask = await newTask.save();
    return NextResponse.json({
      message: "task Added successfully...",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      message: "Failed to add Task...",
      success: false,
    });
  }
};
