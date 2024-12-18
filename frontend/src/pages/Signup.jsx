import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupImage from "../assets/signUp.webp";
import axios from "axios";
import { useSelector } from "react-redux";

const Signup = () => {
  const history = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (isLoggedIn === true) {
    history("/");
  }

  const [Data, setData] = useState({ username: "", email: "", password: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    if (Data.username === "" || Data.email === "" || Data.password === "") {
      alert("All Fields are required!");
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/sign-in",
          Data
        );
        if (response.status === 200) {
          setData({ username: "", email: "", password: "" });
          console.log("Sign-in successful", response.data);
          history("/login");
        } else {
          console.log("Unexpected response", response);
        }
      } catch (error) {
        alert("Error during sign-in", error.response.data.message);
        alert("An error occurred during sign-in. Please try again.");
      }
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className="w-[80%] h-[75%] flex">
        <div className="w-1/2 ">
          <img src={SignupImage} className="object-cover w-[90%] h-[100%]" />
        </div>
        <div className="w-1/2 bg-slate-800 p-8 rounded flex flex-col justify-center items-start gap-10">
          <h1 className="text-2xl font-bold uppercase">Sign-Up</h1>
          <div>
            <input
              type="text"
              className="px-3 py-2 rounded bg-transparent border border-gray-500 w-full focus:border-blue-500 transition-all mb-6 duration-300 outline-none"
              placeholder="Enter username..."
              name="username"
              value={Data.username}
              onChange={change}
              autoFocus
            />
            <input
              type="email"
              className="px-3 py-2 rounded bg-transparent border border-gray-500 w-full focus:border-blue-500 transition-all duration-300 outline-none mb-6"
              placeholder="Enter e-mail..."
              name="email"
              value={Data.email}
              onChange={change}
            />
            <input
              type="text"
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
              Sign Up
            </button>
            <p className="text-sm text-gray-400">
              Already having account ?{" "}
              <Link
                to="/login"
                className="underline text-blue-400 hover:text-blue-500 duration-150 transition-all"
              >
                {" "}
                Login here...{" "}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
