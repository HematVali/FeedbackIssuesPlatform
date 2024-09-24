import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = z.object({
  name: z.string().min(5),
  email: z.string().min(5),
  password: z.string().min(5),
  role: z.string(),
  department: z.string().optional(),
});

const SignUp = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const newUser = { ...data };

    const response = await axios
      .post("http://localhost:3000/api/users", newUser)
      .catch((err) => {
        console.log(err.response.data);
      });

    localStorage.setItem("token", response.headers["x-auth-token"]);
    navigate("/");
  };

  return (
    <div className="hero h-[80vh] bg-base-100">
      <div className="hero-content flex-col lg:flex-row gap-12">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up.</h1>
          <p className="py-6">
            Don't have an account? No worries. Sign up here to access the QMUL
            Issues and Feedback System.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            <h3 className="card-title text-center">Create an account</h3>
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  id="email"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </label>
            </div>
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Full Name"
                  id="name"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </label>
            </div>
            <div className="form-control">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  {...register("password")}
                  id="password"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </label>
            </div>
            <div className="form-control">
              <select
                className="select select-bordered w-full max-w-xs"
                name="role"
                id="role"
                defaultValue=""
                {...register("role")}
                onChange={(e) => setRole(e.target.value)}
              >
                <option disabled>Role</option>
                <option value="student">Student</option>
                <option value="teaching-admin-ec">Teaching Admin EC</option>
                <option value="teaching-admin-staff">
                  Teaching Admin Staff
                </option>
                <option value="admin">Admin</option>
              </select>
            </div>
            {role === "teaching-admin-ec" && (
              <div className="form-control">
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="department"
                  id="department"
                  defaultValue=""
                  {...register("department")}
                >
                  <option disabled>Department</option>
                  <option value="computer_science">Computer Science</option>
                  <option value="maths">Maths</option>
                </select>
              </div>
            )}
            <div className="form-control mt-6">
              <button disabled={!isValid} className="btn btn-primary">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
