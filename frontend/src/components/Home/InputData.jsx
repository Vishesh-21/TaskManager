import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const InputData = ({ InputDiv, setInputDiv, Updated, setUpdated }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  useEffect(() => {
    setData({ title: Updated.title, desc: Updated.desc });
  }, [Updated]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const handleCreateTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required!");
    } else {
      const reponse = await axios.post(
        "http://localhost:3000/api/v2/create",
        Data,
        { headers }
      );
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  const handleUpdatedTask = async () => {
    if (Data.title === "" || Data.desc === "") {
      alert("All fields are required!");
    } else {
      const reponse = await axios.put(
        `http://localhost:3000/api/v2/update/${Updated.id}`,
        Data,
        { headers }
      );
      setUpdated({ id: "", title: "", desc: "" });
      setData({ title: "", desc: "" });
      setInputDiv("hidden");
    }
  };

  return (
    <>
      <div
        className={`w-full h-screen bg-gray-800 top-0 left-0 opacity-[70%] ${InputDiv} `}
      ></div>
      <div
        className={`w-full h-screen flex items-center justify-center top-0 left-0 ${InputDiv} `}
      >
        <div className="w-[35%] bg-gray-800 h-[90%] rounded border border-gray-500 py-8 px-10 flex justify-between flex-col relative">
          <button
            onClick={() => {
              setInputDiv("hidden");
              setData({ title: "", desc: "" });
              setUpdated({ id: "", title: "", desc: "" });
            }}
            className="absolute right-8 top-6 "
          >
            <RxCross2 className="text-2xl font-bold hover:scale-[1.2] duration-200 transition-all cursor-pointer" />
          </button>
          <h1 className="text-center text-gray-400 text-2xl font-bold">
            {Updated.id === "" ? "Add New Task" : "Update Task"}
          </h1>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded bg-transparent border border-gray-500 w-full focus:border-blue-500 transition-all duration-300 outline-none"
            value={Data.title}
            onChange={change}
            autoFocus
          />
          <textarea
            name="desc"
            placeholder="Description..."
            className="px-3 py-2 rounded bg-transparent border border-gray-500 w-full h-[60%] resize-none focus:border-blue-500 outline-none transition-all duration-300"
            value={Data.desc}
            onChange={change}
          ></textarea>
          {Updated.id === "" ? (
            <button
              className="px-3 py-2 bg-gray-500 text-xl font-semibold rounded hover:bg-green-600 duration-300 transition-all"
              onClick={handleCreateTask}
            >
              Create Task
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-gray-500 text-xl font-semibold rounded hover:bg-yellow-600 duration-300 transition-all"
              onClick={handleUpdatedTask}
            >
              Update Task
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
