import React, { useState,useEffect } from "react";
import LoginImage from "../assets/Login.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authAction } from "../store/auth";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const history = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      history("/");
    }
  }, [isLoggedIn, history]);

  const [Data, setData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    if (Data.username === "" || Data.password === "") {
      alert("Invalid creadientials!");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/log-in",
          Data
        );
        if (response.status === 200) {
          setData({ username: "", password: "" });
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("token", response.data.token);
          dispatch(authAction.login());
          history("/");
        } else {
          console.log("Unexpected response", response);
        }
      } catch (error) {
        alert(`Error during sign-in: ${error.response?.data?.message || "Unknown error"}`);
        alert("An error occurred during sign-in. Please try again.");
      }
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="w-[80%] h-[75%] flex">
        <div className="w-1/2 ">
          <img src={LoginImage} className="object-cover w-[90%] h-[100%]" />
        </div>
        <div className="w-1/2 bg-slate-800 p-8 rounded flex flex-col justify-center items-start gap-10">
          <h1 className="text-2xl font-bold uppercase">Log-in</h1>
          <div>
            <input
              type="text"
              className="px-3 py-2 rounded bg-transparent border border-gray-500 w-full focus:border-blue-500 transition-all duration-300 outline-none mb-6"
              placeholder="Enter username..."
              name="username"
              value={Data.username}
              onChange={change}
              autoFocus
            />
            <input
              type="password"
              className="px-3 py-2 rounded bg-transparent border border-gray-500 w-full focus:border-blue-500 transition-all duration-300 outline-none"
              placeholder="Enter password"
              name="password"
              value={Data.password}
              onChange={change}
            />
          </div>
          <div className="flex flex-col gap-6">
            <button
              className="px-4 py-2 bg-slate-500 rounded w-52 text-lg font-semibold hover:bg-blue-500 duration-300 transition-all"
              onClick={submit}
            >
              Login
            </button>
            <p className="text-sm text-gray-400">
              Not having an account ?{" "}
              <Link
                to="/signup"
                className="text-blue-400 underline hover:text-blue-500 duration-150 transition-all"
              >
                Signup here...{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
