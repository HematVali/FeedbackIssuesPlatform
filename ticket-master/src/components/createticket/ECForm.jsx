import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  title: z.string().min(5, { message: "Title must be atleast 5 characters." }),
  desc: z
    .string()
    .min(15, { message: "Description must be atleast 15 characters." }),
  fileName: z.any().optional().default(""),
  category: z.string().optional(),
  department: z.string().optional(),
  module: z.string().optional(),
  priority: z.any().optional(),
  status: z.any().optional().default("Pending"),
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

  // Start Drop Down Code Changes
  const [departmentDropDownOptions, setDepartmentDropDownOptions] = useState([
    { label: "Computer Science", value: "computer_science" },
    { label: "Maths", value: "maths" },
  ]);
  const [moduleDropDownOptions, setModuleDropDownOptions] = useState([]);

  const handleDepartmentDropDownChange = (selectedValue) => {
    if (selectedValue === "computer_science") {
      setModuleDropDownOptions([
        { label: "Database", value: "database" },
        { label: "Probability", value: "probability" },
      ]);
    } else if (selectedValue === "maths") {
      setModuleDropDownOptions([
        { label: "Logic", value: "logic" },
        { label: "Matrices", value: "matrices" },
      ]);
    } else {
      setModuleDropDownOptions([]);
    }
  };

  // End Drop Down Code Changes

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
    <div className="flex justify-center items-center min-h-[70vh] bg-white">
      <div className="card shrink-0 w-full max-w-screen-lg shadow-2xl bg-base-100 p-10 flex flex-col gap-6">
        <h3 className="card-title text-center">Report EC</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            {/* TITLE */}
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              {...register("title")}
              type="text"
              className="form-control textarea textarea-bordered w-full"
            />
            {errors.title && (
              <p className="text-danger text-red-700 font-bold mt-3">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input
              id="desc"
              {...register("desc")}
              type="text"
              className="form-control textarea textarea-bordered w-full"
            />
            {errors.desc && (
              <p className="text-danger text-red-700 font-bold mt-3">
                {errors.desc.message}
              </p>
            )}
          </div>

          {/* DEPARTMENT */}
          <div>
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              id="department"
              {...register("department")}
              className="form-select select select-bordered w-full"
              onChange={(e) => handleDepartmentDropDownChange(e.target.value)}
            >
              <option value="">Select...</option>
              {departmentDropDownOptions.map((department) => (
                <option key={department.value} value={department.value}>
                  {department.label}
                </option>
              ))}
            </select>
          </div>

          {/* MODULE */}
          <div>
            <label htmlFor="module" className="form-label">
              Module
            </label>
            <select
              id="module"
              {...register("module")}
              className="form-select select select-bordered w-full"
            >
              <option value="">Select...</option>
              {moduleDropDownOptions.map((module) => (
                <option key={module.value} value={module.value}>
                  {module.label}
                </option>
              ))}
            </select>
          </div>

          {/* PRIORITY */}
          <div>
            <label htmlFor="priority" className="form-label">
              Ticket Priority
            </label>
            <select
              id="priority"
              {...register("priority")}
              className="form-select select select-bordered w-full"
            >
              <option value="default">Default</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* EVIDENCE */}
          <div className="form-control">
            <label htmlFor="fileName" className="label-text block pb-0.5 pl-1">
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

          {/* STATUS [HIDDEN] */}
          <input type="hidden" {...register("status", { value: "Pending" })} />
          <input type="hidden" {...register("category", { value: "ec" })} />

          {/* SUBMIT BUTTON */}
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputTicket;
