"use client";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { useRouter } from "next/navigation";
export const metadata = {
  title: "add-task",
};

const addtask = () => {
  const router = useRouter();
  const [auth, setAuth] = useAuth();
  const id = auth.user?._id;
  // console.log(id);
  // document.title = metadata.title;
  const [task, setTask] = useState({
    title: "",
    content: "",
    userid: id,
    status: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3000/api/task", task);
      if (data.success) {
        alert(data.message);
        router.push("/show-task");
      }
    } catch (error) {
      console.log(error);
      alert("error in adding task");
      // toast.error("error in creating task...");
    }
  };
  const AllClear = (event) => {
    document.getElementById("formtag").reset();
  };

  return (
    <>
      {/* {JSON.stringify(task)} */}
      <div className="flex mx-auto my-16 bg-white px-6 py-6 rounded shadow-lg">
        <form id="formtag" action="#!" onSubmit={handleSubmit} className="">
          <div className="">
            <div>
              <label
                className="text-lg uppercase font-semibold"
                htmlFor="title"
              >
                Title:
              </label>
              <br />
              <input
                className="w-full bg-gray-100 capitalize rounded py-2 px-2 text-lg font-semibold focus:outline-none"
                type="text"
                id="title"
                name="task_title"
                autoComplete="off"
                required
                onChange={(e) => {
                  setTask({
                    ...task,
                    title: e.target.value,
                  });
                }}
                // value={task.title}
              />
            </div>

            <div>
              <label
                className="text-lg uppercase font-semibold"
                htmlFor="description"
              >
                Content:
              </label>
              <br />

              <textarea
                className="w-full bg-gray-100 capitalize rounded py-2 px-2 text-lg font-semibold focus:outline-none"
                id="description"
                name="task_content"
                rows="4"
                required
                onChange={(e) => {
                  setTask({
                    ...task,
                    content: e.target.value,
                  });
                }}
                value={task.content}
              ></textarea>
            </div>

            <div>
              <label
                className="text-lg uppercase font-semibold"
                htmlFor="selectOption"
              >
                Select Option:
              </label>
              <br />
              <select
                id="selectOption"
                className="w-full bg-gray-100 rounded py-2 px-2 text-lg font-semibold focus:outline-none"
                name="status"
                required
                onChange={(e) => {
                  setTask({
                    ...task,
                    status: e.target.value,
                  });
                }}
                value={task.status}
              >
                <option value="" disabled>
                  --select--
                </option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex items-center justify-center mt-3 gap-1">
              <button
                type="submit"
                className="bg-yellow-700 w-full px-7   py-2 uppercase font-semibold text-white shadow-xl rounded"
              >
                Add
              </button>
              <button
                onClick={AllClear}
                className="bg-gray-700 w-full px-7  py-2 uppercase font-semibold text-white shadow-xl rounded"
              >
                Clear
              </button>
            </div>
            {/* {
              JSON.stringify(task)
            } */}
          </div>
        </form>
      </div>
    </>
  );
};

export default addtask;
