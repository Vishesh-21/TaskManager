import { CiHeart } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const Card = ({ home, setInputDiv, data, setUpdated }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:3000/api/v2/update-complete/${id}`,
        {},
        {
          headers,
        }
      );
    } catch (error) {}
  };

  const handleImpTask = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v2/update-imp/${id}`,
        {},
        {
          headers,
        }
      );
      if (response) console.log("Added to important");
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v2/delete/${id}`,
        {
          headers,
        }
      );
      if (response) console.log("Delete Task");
    } catch (error) {}
  };

  const handleUpdateTask = async (id, title, desc) => {
    try {
      setInputDiv("fixed");
      setUpdated({ id: id, title: title, desc: desc });
      // const response = await axios.put(
      //   `http://localhost:3000/api/v2/update/${id}`,
      //   {},
      //   {
      //     headers,
      //   }
      // );
      // if (response) console.log("Update Task successfully !");
    } catch (error) {}
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 overflow">
      {data &&
        data.map((item, key) => (
          <div
            key={key}
            className="border-[1.5px] border-gray-900 bg-gray-800  rounded p-3 hover:bg-gray-700 duration-300 transition-all hover:scale-105 hover:border-gray-500 flex flex-col justify-between"
          >
            <div>
              <h1 className="text-xl font-semibold">{item.title}</h1>
              <p className="text-gray-400 text-sm my-2">{item.desc}</p>
            </div>
            <div className="flex items-center mt-2">
              <button
                className={`px-4 py-1 rounded w-3/6 ${
                  item.complete === false ? "bg-red-400" : "bg-green-600"
                }`}
                onClick={() => handleCompleteTask(item._id)}
              >
                {item.complete === true ? "Completed" : "In-Complete"}
              </button>
              <div className="w-3/6 text-xl flex justify-around text-gray-500">
                <button
                  className="hover:text-gray-200 duration-200 transition-all text-[1.6rem]"
                  onClick={() => handleImpTask(item._id)}
                >
                  {item.important === false ? (
                    <CiHeart />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>
                {home !== "false" && (
                  <button
                    className="hover:text-gray-200 duration-200 transition-all"
                    onClick={() => {
                      handleUpdateTask(item._id, item.title, item.desc);
                    }}
                  >
                    <FaRegEdit />
                  </button>
                )}
                <button
                  className="hover:text-gray-200 duration-200 transition-all text-[1.6rem]"
                  onClick={() => handleDelete(item._id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          </div>
        ))}

      {home === "true" && (
        <button
          onClick={() => {
            setInputDiv("fixed");
          }}
          className="border-[1.5px] border-gray-900 bg-gray-800  rounded p-3 hover:bg-gray-700 duration-300 transition-all hover:scale-105 hover:border-gray-500 flex flex-col justify-center items-center text-gray-500 cursor-pointer hover:text-white"
        >
          <IoAddCircle className="text-5xl" />
          <h2 className="text-xl font-semibold uppercase">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Card;
