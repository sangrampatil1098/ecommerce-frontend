import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineLogin } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { authenticateSignInuser } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onTouched",
  });

  const loginHandler = async (payload) => {
    dispatch(authenticateSignInuser({ payload, setLoader, reset, navigate }));
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
      <form
        className="sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md"
        onSubmit={handleSubmit(loginHandler)}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <MdOutlineLogin className="text-slate-800 text-5xl" />
          <h2 className="text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold">
            Login Here
          </h2>
        </div>
        <hr className=" mt-2 mb-5 text-black" />
        <div className="flex flex-col gap-3">
          <InputField
            label="UserName"
            required={true}
            id="username"
            type="text"
            message="*UserName is required"
            placeholder="Enter your username"
            register={register}
            errors={errors}
          />
          <InputField
            label="Password"
            required={true}
            id="password"
            type="password"
            message="*Password is required"
            placeholder="Enter your password"
            register={register}
            errors={errors}
          />
        </div>
        <button
          disabled={loader}
          className="bg-button-gradient flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-150 rounded-sm my-3"
          type="submit"
        >
          {loader ? (
            <p className="flex items-center justify-center gap-2">
              <RotatingLines
                visible={true}
                height="20"
                width="20"
                color="white"
                // strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />{" "}
              Loading...
            </p>
          ) : (
            <p>Login</p>
          )}
        </button>
        <p className="text-center text-sm text-slate-700 mt-6">
          Don't have an account ?
          <Link
            to={"/register"}
            className="font-semibold underline hover:text-black"
          >
            <span> Sign up</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
