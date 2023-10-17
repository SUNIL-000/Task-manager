"use client";
import React  from "react";
import Showtaskcompo from "../components/Showtaskcompo";


const showtask = (request) => {
  
  return (
    <>
      <div className="text-center block mt-2 ">
        <h1 className=" font-bold text-2xl">Your Task</h1>

        <Showtaskcompo  />
       
      </div>
    </>
  );
};

export default showtask;
