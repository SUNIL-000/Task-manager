import { Users } from "@/app/models/User";
import { NextResponse } from "next/server"

export const DELETE= async (request,{params})=>{
    const {userId} = params;
    try {
        await Users.deleteOne({
            _id: userId,
        })
    } catch (error) {
        return NextResponse.json({
            message:"Failed to delete user",
            success:false
        })
    }

    return NextResponse.json({
        message:"Deleted successfully",
        success:true
    })
}

export const GET = async (request,{params})=>{

    let {userId}= params;
    const user= await Users.findById(userId);

    return NextResponse.json(user,{
        message:"user get successfully"
    })



}

export const PUT =async (request,{params})=>{

    let {userId}= params;
    const {username,password,about,profileUrl}= await request.json();

    try {
        const user=await Users.findById(userId);
        user.username=username;
        user.password=password;
        user.about=about;
        user.profileUrl=profileUrl

        const updateuser=await user.save();
        return NextResponse.json(updateuser,{
            message:"updated successfully...."
        })
    } catch (error) {
        console.log(error)
         return NextResponse.json({
            message:"error in updating user value"
         })
    }

}