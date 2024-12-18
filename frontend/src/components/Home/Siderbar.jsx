import { CgNotes } from "react-icons/cg";
import { MdLabelImportantOutline } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotesOff } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";
import { useEffect, useState } from "react";
import axios from "axios";
import ProfileImage from "../../assets/profile.avif";

const Siderbar = () => {
  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important tasks",
      icon: <MdLabelImportantOutline />,
      link: "/importanttasks",
    },
    {
      title: "Completed tasks",
      icon: <FaCheckDouble />,
      link: "/completedtasks",
    },
    {
      title: "Incomplete tasks",
      icon: <TbNotesOff />,
      link: "/incompletetasks",
    },
  ];

  const dispatch = useDispatch();
  const history = useNavigate();
  const logout = () => {
    dispatch(authAction.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/login");
  };

  const [Data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v2/alltasks",
        { headers }
      );
      setData(response.data.data);
    };

    fetch();
  }, []);

  return (
    <>
      {Data && (
        <div className="flex flex-col items-center border-b-[2px] border-gray-500">
          <div className="w-[7rem] h-[7rem] rounded-full mb-4 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={ProfileImage}
              alt="img"
            />
          </div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div>
        {data.map((item, i) => (
          <NavLink
            key={i}
            to={item.link}
            className={({ isActive }) =>
              `my-2 cursor-pointer flex items-center gap-2 p-2 rounded transition-all duration-300 ${
                isActive
                  ? "bg-gray-700 pl-4 text-yellow-400 font-bold"
                  : "hover:bg-gray-700 hover:pl-4"
              }`
            }
          >
            {item.icon}
            {item.title}
          </NavLink>
        ))}
      </div>
      <div>
        <button
          className="p-2 bg-gray-600 w-full rounded hover:bg-blue-500 duration-200 transition-all font-semibold"
          onClick={logout}
        >
          Log Out
        </button>
      </div>
    </>
  );
};

export default Siderbar;
