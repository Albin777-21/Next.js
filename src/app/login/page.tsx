"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const onLogin = async() => {
    try {
      setLoading(true);
     const response= await axios.post('/api/users/login',user)
     console.log("login success",response.data);
     toast.success("login success")
     router.push('/profile')
     
      
    } catch (error:any) {
      console.log("Login failed",error.message);
      toast.error(error.message);
      
      
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  return (
    <div className=" bg-hero bg-cover bg-center h-screen flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1 className="text-center text-white text-2xl justify-center">Login</h1>
      <hr />

      <label htmlFor="username" className="">
        email
      </label>
      <input
        className="p-2 border bg-gray-400 border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 border  bg-gray-400 border-gray-300 rounded-lg  mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium  text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        Login
      </button>
      <Link href="/signup">Visit Signup page</Link>
    </div>
  );
}
