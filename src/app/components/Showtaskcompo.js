import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { MdDelete } from "react-icons/md";
import { MdIncompleteCircle } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";
const Showtaskcompo = () => {
  const [taskData, setTaskData] = useState([]);
  const [auth, setAuth] = useAuth();
  const [load, setLoad] = useState(false);
  const taskId = auth.user?._id;
  // console.log(taskId);

  useEffect(() => {
    getuser();
    setLoad(false);
  }, [load]);

  const getuser = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/task`);

      setTaskData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatus = (status) => {
    if (status === "pending") {
      return true; // Red for pending
    } else {
      return false; // Green for others
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/task/${id}`);
      setLoad(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col my-3">
      {taskData.length >= 0 ? (
        taskData.map((item, index) => (
          <div
            key={index}
            // style={{ backgroundColor: getStatusColor(item.status) }}
            className="min-w-[400px] rounded-md shadow-xl gap-2 flex justify-between items-center p-4"
          >
           
            <div className="flex flex-col items-start">
              <h1 className="text-2xl text-[#5D6D7E] uppercase font-bold ">
                {item.title}
              </h1>
              <p className="text-lg capitalize text-[#85929E] font-semibold">
                {item.content}
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div>
                {getStatus(item.status) ? (
                  <MdIncompleteCircle
                    style={{ color: "#EB984E ", fontSize: "28px" }}
                  />
                ) : (
                  <MdVerifiedUser
                    style={{ color: "#1ABC9C", fontSize: "27px" }}
                  />
                )}
              </div>
              <div
                className="cursor-pointer  rounded-sm p-1 font-semibold text-black uppercase text-sm"
                onClick={() => deleteTask(item._id)}
              >
                <MdDelete style={{ color: "#C0392B ", fontSize: "30px" }} />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No tasks found.</p>
      )}
    </div>
  );
};

export default Showtaskcompo;
