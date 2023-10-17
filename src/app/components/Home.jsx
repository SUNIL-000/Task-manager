"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";
// import { GetDataFromToken } from "../helper/Getdata";
const Home = () => {
  const router = useRouter();
  const [auth,setAuth]=useAuth();
 
  console.log(auth.token)
  
  
  // GetDataFromToken();
  
  return (
    <>
      <div className=" flex flex-col justify-center items-center mx-auto">
   
          <Image
            className="w-2/4 h-2/4"
            src={"home.svg"}
            alt="image"
            width={40}
            height={40}
          /> 
          <div className="flex flex-col gap-2 mt-7">
            <Link className="bg-yellow-700 px-7  py-3 uppercase font-semibold text-white shadow-xl rounded" href={"/add-task"}>
             add Your Task
            </Link>
            
          </div>
       
      </div>
    </>
  );
};

export default Home;
