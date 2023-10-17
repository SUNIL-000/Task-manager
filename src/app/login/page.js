"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";// Use 'next/router' for navigation, not 'next/navigation'
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post("http://localhost:3000/api/login", loginData); // Use the correct API endpoint URL
      
      
      if (data.success) {
        alert(data.message);     
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token",JSON.stringify(data.token));
        router.push("/"); // Redirect to the desired page on successful login
      } else {
        console.error("Login failed:", data.message);
        alert("Failed to login");
      }
      
      // Clear the form fields
      setLoginData({
        password: "",
        email: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to login");
    }
  };

  return (
    <>
      <div className="flex w-[320px] mx-auto my-16 bg-white px-6 py-6 rounded-sm shadow-md">
        <form className="">
          <div className="">
            <input
              type="email"
              id="email"
              className="py-2 w-full font-semibold border-b-2 focus:outline-none my-2"
              placeholder="xyz@gmail.com"
              name="email"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  email: event.target.value,
                });
              }}
              value={loginData.email}
            />
          </div>
          <div className="">
            <input
              type="password"
              id="password"
              className="py-2 w-full font-semibold border-b-2 focus:outline-none my-2"
              placeholder="Password"
              name="password"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                });
              }}
              value={loginData.password}
            />
          </div>
          <div>
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href={"/signup"} className="text-black underline font-semibold">
                Create account
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-center my-5">
            <button
              type="submit"
              onClick={loginSubmit}
              className="bg-yellow-700 px-7 m-2 py-2 uppercase font-semibold text-white shadow-lg rounded-2xl"
            >
              Login
            </button>
            <button
              onClick={() => {
                setLoginData({
                  ...loginData,
                  password: "",
                  email: "",
                });
              }}
              className="bg-gray-500 px-7 mr-2 py-2 uppercase font-semibold text-white shadow-2xl rounded-2xl"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
