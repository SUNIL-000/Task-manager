"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
export const metadata = {
  title: "Signup",
};

const Signup = () => {
  const rout = useRouter();
  const [formData, setformData] = useState({
    username: "",
    email: "",
    password: "",
    about: "",
  });
  const SignUpForm = async (e) => {
    e.preventDefault();
    
    try {
      if (formData.username.trim() == " " || formData.username == "") {
        alert("Please enter your user name");
        return;
      } else if (formData.email.trim() == "" || formData.email == "") {
        alert("Please enter  email");
        return;
      } else {
        const {data} = await axios.post("http://localhost:3000/api/users",formData)
        console.log(data.message);
      }
      
      rout.push("/login");
    } catch (error) {
      console.log(error);
      console.log("failed to create user....");
    }
  };
  return (
    <>
      <div className="flex mx-auto my-16 bg-white px-6 py-6 rounded shadow-lg">
        <form className="" onSubmit={SignUpForm}>
          <div>
            <label
              htmlFor="username"
              className="text-yellow-900 uppercase font-bold"
            >
              Username
            </label>
            <input
              className="py-2 w-full font-semibold border-b-2 border-gray-300 focus: outline-none my-2"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              required=""
              onChange={(event) => {
                setformData({
                  ...formData,
                  username: event.target.value,
                });
              }}
              value={formData.username}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-yellow-900 uppercase font-bold"
            >
              email
            </label>

            <input
              className="py-2 w-full font-semibold border-b-2 border-gray-300 focus: outline-none my-2"
              type="email"
              name="email"
              id="email"
              placeholder="xyz@gmail.com"
              required=""
              onChange={(event) => {
                setformData({
                  ...formData,
                  email: event.target.value,
                });
              }}
              value={formData.email}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-yellow-900 uppercase font-bold"
            >
              password
            </label>
            <input
              className="py-2 w-full font-semibold border-b-2 border-gray-300 focus: outline-none my-2"
              autoComplete="off"
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required=""
              onChange={(event) => {
                setformData({
                  ...formData,
                  password: event.target.value,
                });
              }}
              value={formData.password}
            />
          </div>
          <div>
            <label
              htmlFor="about"
              className="text-yellow-900 uppercase font-bold"
            >
              About
            </label>
            <br />
            <textarea
              type="text"
              name="about"
              id="about"
              autoComplete="off"
              placeholder="About"
              rows={4}
              cols={5}
              className="w-full h- border-2 px-2 py-2 border-gray-300 rounded focus:outline-none"
              required=""
              onChange={(event) => {
                setformData({
                  ...formData,
                  about: event.target.value,
                });
              }}
              value={formData.about}
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-yellow-700 w-full py-2 uppercase font-semibold text-white shadow-lg rounded hover:bg-yellow-600 transition-all hover:text-gray-700 "
            >
              SignUp
            </button>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Already have an account?{" "}
            <Link href={"/login"} className="underline text-black font-semibold">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
