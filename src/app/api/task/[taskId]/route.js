import { Task } from "@/app/models/Task";
import { NextResponse } from "next/server";

export const DELETE = async (req, { params }) => {
  const {taskId}  = params;

  try {
    // Assuming you have deleted the task here
    // const deletedTask = await Task.findByIdAndRemove(id);
    const deletedTask=await Task.findByIdAndRemove({_id:taskId})

    // Check if the task was not found and return a 404 response if needed
    if (!deletedTask) {
      return NextResponse.json({
        message: "Task not found",
        success: false,
        status: 404,
      });
    }
    console.log(taskId)
    // Task deleted successfully
    return NextResponse.json({
      message: "Task deleted successfully",
      success: true,
      status: 200,
      // deletedTask, // Include the deleted task in the response if needed
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to delete task",
      success: false,
      status: 500,
    });
  }
};
