import React, { useState } from "react";
import NavBar from "./NavBar";
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

const Register = () => {
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
    <>
      <div className="container justify-content-center align-items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              {...register("name")}
              id="name"
              type="text"
              className="form-control"
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="form-control"
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
              className="form-control"
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="form-select"
              defaultValue=""
              {...register("role")}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
              <option value="lecturer">Lecturer</option>
            </select>
          </div>
          {role === "lecturer" && (
            <div className="mb-3">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <select
                name="department"
                id="department"
                className="form-select"
                defaultValue=""
                {...register("department")}
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="computer_science">Computer Science</option>
                <option value="maths">Maths</option>
              </select>
            </div>
          )}

          <button disabled={!isValid} type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
