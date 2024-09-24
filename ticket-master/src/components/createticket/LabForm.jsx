import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  desc: z
    .string()
    .min(15, { message: "Description must be at least 15 characters." }),
  fileName: z.any().optional().default(""),
  category: z.string().optional(),
  department: z.string().optional(),
  module: z.string().optional(),
  priority: z.any().optional(),
  status: z.any().optional().default("Pending"),
  reopenCount: z.number().optional().default(0),
});

const InputTicket = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setLoggedUser(user);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const [allTickets, setAllTickets] = useState([]);

  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/ticket")
      .then((res) => setAllTickets(res.data));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  const categoryDropDownOptions = [
    { label: "Building Hazard", value: "Building Hazard" },
    { label: "Hardware", value: "Hardware" },
    { label: "Power", value: "Power" },
    { label: "Other", value: "Other" },
  ];

  const handleCategoryDropDownChange = (selectedValue) => {
    // handle category drop down change
  };

  const onSubmit = (data) => {
    const originalTickets = [...allTickets];
    const newTicket = {
      title: data.title,
      desc: data.desc,
      category: data.category,
      department: data.department,
      module: data?.module,
      priority: data.priority,
      userId: loggedUser._id,
      userName: loggedUser.name,
      fileName: data?.fileName[0],
      status: data.status,
      reopenCount: 0,
    };

    console.log("new ticket", newTicket);

    axios
      .post("http://localhost:3000/api/ticket", newTicket, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(({ data: savedTicket }) =>
        setAllTickets([savedTicket, ...allTickets])
      )
      .catch((err) => {
        console.log("error caused posting ", err);
        setAllTickets(...originalTickets);
      });
    setTimeout(() => {
      navigate("/ticket-created");
    }, 100);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[70vh] bg-white">
        <div className="card shrink-0 w-full max-w-screen-lg shadow-2xl bg-base-100">
          <h3 className="card-title text-center pt-7 pl-10">
            Report Lab Issue
          </h3>
          <form className="card-body p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label htmlFor="title" className="label-text block pb-0.5 pl-1">
                Title
              </label>
              <input
                id="title"
                {...register("title")}
                type="text"
                className="textarea textarea-bordered w-full"
              />
              {errors.title && (
                <p className="text-danger  text-red-700 font-bold mt-3">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label htmlFor="desc" className="label-text block pb-0.5 pl-1">
                Description
              </label>
              <textarea
                id="desc"
                {...register("desc")}
                className="textarea textarea-bordered w-full"
                placeholder="Description..."
                maxLength={5000}
                required
              ></textarea>
              {errors.desc && (
                <p className="text-danger  text-red-700 font-bold mt-3">
                  {errors.desc.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="category"
                className="label-text block pb-0.5 pl-1"
              >
                Category
              </label>
              <select
                id="category"
                {...register("category")}
                className="select select-bordered w-full"
                onChange={(e) => handleCategoryDropDownChange(e.target.value)}
              >
                <option value="" disabled>
                  Select...
                </option>
                {categoryDropDownOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="hidden"
              id="department"
              {...register("department", { value: "Lab Room" })}
            />
            <input
              type="hidden"
              id="priority"
              {...register("priority", { value: "Default" })}
            />
            <input
              type="hidden"
              {...register("status", { value: "Pending" })}
            />
            <div className="form-control">
              <label
                htmlFor="fileName"
                className="label-text block pb-0.5 pl-1"
              >
                Attach evidence (optional)
              </label>
              <input
                {...register("fileName")}
                type="file"
                className="file-input file-input-bordered file-input-md w-full max-w-xs"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <small className="text-gray-600">
                Accepted file types: PDF, Word, JPEG, PNG.
              </small>
            </div>
            <button type="submit" className="btn btn-primary mt-4 text-white">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default InputTicket;
