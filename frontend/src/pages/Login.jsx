import React, { useContext, useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { shopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
  let [currentState, setCurrentState] = useState("Login");
  let { token, setToken, backendUrl } = useContext(shopContext);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();

  let onSubmitHandler = async (Event) => {
    Event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        let signUpResponse = await axios.post(
          backendUrl + "/api/user/register",
          { name, email, password }
        );

        if (signUpResponse.data.success) {
          setToken(signUpResponse.data.token);
          localStorage.setItem("token", signUpResponse.data.token);
          setName("");
          setEmail("");
          setPassword("");
          setCurrentState("Login");
          toast.success(signUpResponse.data.message);
        } else {
          toast.error(signUpResponse.data.message);
        }
      } else {      // login 
        let loginResponse = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });


        if (loginResponse.data.success) {
          setToken(loginResponse.data.token);
          localStorage.setItem("token", loginResponse.data.token);
        } else {
          toast.error(loginResponse.data.message);
        }

      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(token){
      navigate('/');
    }

  },[token])



  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center  w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-hray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className=" border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Sign Up" ? (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="border w-full px-3 py-2 border-gray-800"
          type="text"
          required
          placeholder="Name"
        />
      ) : null}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="border w-full px-3 py-2 border-gray-800"
        type="email"
        required
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="border w-full px-3 py-2 border-gray-800"
        type="password"
        required
        placeholder="Password"
      />

      <div className=" text-sm flex justify-between w-full mt-[-8px]">
        <p className="cursor-pointer">Forget your Password</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here
          </p>
        )}
      </div>
      {currentState === "Sign Up" ? (
        <button className="border bg-black cursor-pointer text-white font-light px-8 py-2 mt-4">
          Sign Up
        </button>
      ) : (
        <button className="border bg-black cursor-pointer text-white font-light px-8 py-2 mt-4">
          Sign In
        </button>
      )}
    </form>
  );
};

export default Login;
