import mongoose from "mongoose";

const TaskSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    addDate:{
        type: Date,
        default:Date.now()
    },
   
    status:{
        type:String,
     
    },
})
mongoose.models={};
export const Task=mongoose.model.Task || mongoose.model("Task",TaskSchema)