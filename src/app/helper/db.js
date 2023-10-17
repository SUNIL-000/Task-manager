import mongoose from "mongoose";
// import { User } from "../models/User";


export const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb+srv://sunilsahoosks2002:sunil000@cluster0.9afxkke.mongodb.net/works", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
   
    console.log("db connected successfully");
  } catch (error) {
    console.log("Failed to connect db");
    console.log(error)
  }
};
