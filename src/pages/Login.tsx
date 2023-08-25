import React from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  return (
    <div className="bgImgRegister bg-no-repeat w-full h-screen flex justify-center items-center">
      <div className="fixed -z-50 flex justify-center items-center">
        <img
          className="min-w-[1440px] w-screen"
          src="https://source.unsplash.com/random/1440×1080/?ocean,water,light"
          alt="bg Image"
        />
      </div>
      <div className="w-[400px] py-5 px-8 gap-5 flex flex-col justify-center items-center rounded-lg border-2 border-black/10 shadow-lg backdrop-blur bg-black/5">
        <h1 className="uppercase text-3xl font-bold tracking-widest">Login</h1>
        <form className="w-full flex flex-col gap-4">
          <TextField
            type="email"
            className="w-full rounded-md"
            label="Email"
            id="outlined-size-small"
            size="small"
          />
          <TextField
            type="password"
            className="w-full rounded-md"
            label="password"
            id="outlined-size-small"
            size="small"
          />
          <button className="btnBlack">Sign in</button>
        </form>
        <p className="text-sm">
          You don't have an account?{" "}
          <Link to={"/register"} className="font-medium hover:text-blue-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};
