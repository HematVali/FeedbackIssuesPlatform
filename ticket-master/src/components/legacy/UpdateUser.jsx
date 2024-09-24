import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { all } from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";

const schema = z.object({
  name: z.string(),
  email: z.string(),
  isAdmin: z.string().optional(),
});

const UpdateUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:3000/api/users/${params.id}`).then((res) => {
      setUser(res.data);
      console.log(user);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  const onUpdate = (data) => {
    console.log("inside onUpdate method");
    const originalUser = { ...user };

    const { password, date, _id, __v, ...updatedUser } = originalUser;
    console.log("updatedUser " + updatedUser);
    axios
      .put(`http://localhost:3000/api/users/${params.id}`, updatedUser)
      .catch((err) => setUser(originalUser));
    window.location = "/";
  };

  console.log("isValid ", isValid);

  return (
    <>
      <h1>EDITING USER PERSONAL INFORMATION</h1>
      <form onSubmit={handleSubmit(onUpdate)}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            type="text"
            className="form-control"
            value={user.name}
            onChange={(event) => setUser({ ...user, name: event.target.value })}
          />
          {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            type="text"
            className="form-control"
            value={user.email}
            onChange={(event) =>
              setUser({ ...user, email: event.target.value })
            }
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="isAdmin" className="form-label">
            isAdmin
          </label>
          <input
            id="isAdmin"
            {...register("isAdmin")}
            type="text"
            className="form-control"
            value={user.isAdmin}
            onChange={(event) =>
              setUser({ ...user, isAdmin: event.target.value })
            }
          />
          {errors.isAdmin && (
            <p className="text-danger">{errors.isAdmin.message}</p>
          )}
        </div>
        <button disabled={!isValid} className="btn btn-primary" type="submit">
          Update
        </button>
        <button onClick={() => navigate("/")} className="m-2 btn btn-secondary">
          Cancel
        </button>
      </form>
    </>
  );
};

export default UpdateUser;
