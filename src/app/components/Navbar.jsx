"use client"
import Link from "next/link";
import React from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router=useRouter();
  const [auth, setAuth] = useAuth();
  console.log(auth.user)
  const logout =  () => {
    try {
      setAuth({
        ...auth,
        user:null,
        token:""
      })
       localStorage.clear();
      router.push("/login");
    } catch (error) {
      console.log(error.message);
     
    }
  };
  return (
    <>
      <nav className="flex justify-around items-center py-3 shadow-md">
        <div>
          <span className=" text-xl px-2 py-2 rounded bg-yellow-700 text-gray-900 font-bold uppercase">
            Work
          </span>{" "}
          <span className=" text-lg text-yellow-700 font-bold uppercase">
            manager
          </span>
        </div>

        <div>
          <ul className="flex justify-around  items-center gap-3 uppercase font-bold text-lg font-sans">
            <li>
              <Link
                className="hover:bg-gray-300 transition-all py-1 px-1 rounded"
                href={"/"}
              >
                home
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-gray-300 transition-all py-1 px-1 rounded"
                href={"/add-task"}
              >
                add task
              </Link>
            </li>
            <li>
              <Link
                className="hover:bg-gray-300 transition-all py-1 px-1 rounded"
                href={"/show-task"}
              >
                show task
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <ul className="flex justify-around items-center gap-3">
            {!auth.user ? (
              <>
                {" "}
                <li className="bg-yellow-700 text-black py-2 px-2 rounded font-semibold hover:bg-yellow-600 transition-all">
                  <Link href={"/login"}>SignIn</Link>
                </li>
                <li className=" hover:bg-gray-300 font-bold py-2 px-2 rounded transition-all">
                  <Link href={"/signup"}>SignUp</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    className="bg-gray-700  px-7  py-3 uppercase font-semibold text-white shadow-xl rounded"
                    onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
