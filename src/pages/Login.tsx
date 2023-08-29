import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../config/firebase";
import { FcGoogle } from "react-icons/fc";
import { doc, setDoc } from "firebase/firestore";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", auth?.currentUser?.uid || "");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const signinWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("user", auth?.currentUser?.uid || "");
      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) {
      signIn(email, password);
    }
  };

  return (
    <div className="bgImgRegister bg-no-repeat w-full h-screen flex justify-center items-center">
      <div className="fixed -z-50 flex justify-center items-center">
        <img
          className="min-w-[1440px] w-screen"
          src="https://images.unsplash.com/photo-1495546992359-94a48035efca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8b2NlYW4sd2F0ZXIsbGlnaHR8fHx8fHwxNjkzMjIwODky&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
          alt="bg Image"
        />
      </div>
      <div className="w-[400px] py-5 px-8 gap-5 flex flex-col justify-center items-center rounded-lg border-2 border-black/10 shadow-lg backdrop-blur-sm hover:backdrop-blur-md duration-300 transition-all bg-black/5">
        <h1 className="uppercase text-3xl font-bold tracking-widest">Login</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <TextField
            type="email"
            className="w-full rounded-md"
            label="Email"
            id="outlined-size-small-email"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            className="w-full rounded-md"
            label="password"
            id="outlined-size-small-password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btnBlack">
            Sign in
          </button>
          <button
            type="button"
            onClick={signinWithGoogle}
            className="btnBlack flex justify-center items-center gap-3 py-1"
          >
            <span>
              <FcGoogle />
            </span>
            <span>Sign in with Google</span>
          </button>
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
