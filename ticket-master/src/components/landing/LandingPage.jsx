import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Link } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .min(5, { message: "Email must be at least 5 characters long" }),
  password: z
    .string()
    .min(5, { message: "Password must be at least 5 characters long" }),
});

function LandingPage() {
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const user = { ...data };
    console.log("***** ++++  " + user);

    const { data: jwt } = await axios
      .post("http://localhost:3000/api/auth", user)
      .catch((err) => {
        console.log(err.response.data);
        setFormError("Invalid Username or Password.");
      });

    localStorage.setItem("token", jwt);
    // navigate("/");
    window.location = "/";
  };

  return (
    <div className="hero h-[80vh] bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse gap-12">
        <div className="text-center lg:text-left flex flex-col">
          <h1 className="text-5xl font-bold">You aren't signed in.</h1>
          <p className="py-6">
            Please login to your University Account to continue to the Issues
            and Feedback System.
          </p>
          <div className="divider"></div>
          <p className="py-6 ">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-accent link-hover">
              Sign Up.
            </Link>
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="input input-bordered"
                required
                {...register("email")}
              />
              {errors.email && (
                <p className="text-blue-600/100">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="input input-bordered"
                required
                {...register("password")}
              />
              {errors.password && (
                <p className="text-danger">{errors.password.message}</p>
              )}
              {formError && <p className="text-red-600/100">{formError}</p>}
            </div>
            <div className="form-control mt-6">
              <button
                disabled={!isValid}
                className="btn btn-primary text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
