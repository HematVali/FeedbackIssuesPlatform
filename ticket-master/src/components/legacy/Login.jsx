import React from "react";
import NavBar from "./NavBar";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const schema = z.object({
  email: z.string().min(5),
  password: z.string().min(5),
});

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const user = { ...data };

    const { data: jwt } = await axios
      .post("http://localhost:3000/api/auth", user)
      .catch((err) => {
        console.log(err.response.data);
      });

    localStorage.setItem("token", jwt);
    // navigate("/");
    window.location = "/";
  };

  return (
    <>
      <div className="container justify-content-center align-items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="form-control "
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              className="form-control "
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <button disabled={!isValid} type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
