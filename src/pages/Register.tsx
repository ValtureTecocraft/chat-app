import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { BsImage } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider, storage } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import Loading from "../components/Loading";

export const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);

  const navigate = useNavigate();

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("user", auth?.currentUser?.uid || "");

      if (fileUpload) {
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, fileUpload);

        try {
          const snapshot = await uploadTask;
          const downloadURL = await getDownloadURL(snapshot.ref);

          // Update user's profile in Firebase Authentication
          await updateProfile(res.user, {
            displayName: name,
            photoURL: downloadURL,
          });

          // Store user information in Firestore
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            name,
            email,
            photoURL: downloadURL,
          });

          await setDoc(doc(db, "userChats", res.user.uid), {});

          console.log("File available at", downloadURL);
        } catch (error) {
          console.error("Error uploading file:", error);
        }

        navigate("/");

        setLoading(false);
      } else {
        // Handle case where no file is selected
        console.log("No file selected");

        setLoading(false);
      }
    } catch (error) {
      console.error(error);

      setLoading(false);
    }
  };

  const signinWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem("user", auth?.currentUser?.uid || "");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileUpload(file || null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(email, password);
    console.log(fileUpload);
  };

  return (
    <div className="bgImgRegister bg-no-repeat w-full h-screen flex justify-center items-center">
      <Loading status={loading} />
      <div className="fixed -z-50 flex justify-center items-center">
        <img
          className="min-w-[1440px] w-screen"
          src="https://source.unsplash.com/random/1440×1080/?ocean,water,light"
          alt="bg Image"
        />
      </div>
      <div className="w-[400px] py-5 px-8 gap-5 flex flex-col justify-center items-center rounded-lg border-2 border-black/10 shadow-lg backdrop-blur bg-black/5">
        <h1 className="uppercase text-3xl font-bold tracking-widest">
          Register
        </h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <TextField
            type="text"
            className="w-full rounded-md"
            label="Display Name"
            id="outlined-size-small-name"
            size="small"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
            label="Password"
            id="outlined-size-small-password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className="cursor-pointer tracking-tight flex gap-2 items-center text-gray-900 hover:text-black"
            htmlFor="file"
          >
            <BsImage className="" />
            <span className="text-sm">
              {fileUpload?.name ? fileUpload.name : "Upload Profile Picture"}
            </span>
          </label>
          <input
            hidden
            type="file"
            name="file"
            id="file"
            onChange={handleFileChange}
          />
          <button type="submit" className="btnBlack">
            Sign up
          </button>
          <button
            type="button"
            onClick={signinWithGoogle}
            className="btnBlack flex justify-center items-center gap-3 py-1"
          >
            <span>
              <FcGoogle />
            </span>
            <span>Signup with Google</span>
          </button>
        </form>
        <p className="text-sm">
          You do have an account?{" "}
          <Link to={"/login"} className="font-medium hover:text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
