import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email Required!!"],
  },
  password: {
    type: String,
    required: [true, "Password Required!!"],
  },
  about: String,
});

mongoose.models={};
export const Users =mongoose.model.User|| mongoose.model('User', Userschema);
// export const Task=mongoose.model.Task || mongoose.model("Task",TaskSchema)