import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

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
  const [departmentDropDownOptions, setDepartmentDropDownOptions] = useState(
    []
  );
  const [moduleDropDownOptions, setModuleDropDownOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("service");

  const categoryDropDownOptions = [
    { label: "Service", value: "service" },
    { label: "EC", value: "ec" },
  ];

  const handleCategoryDropDownChange = (selectedValue) => {
    if (selectedValue === "service") {
      setSelectedCategory("service");
      setDepartmentDropDownOptions([
        { label: "Online", value: "online" },
        { label: "LabRoom", value: "labroom" },
      ]);
    } else if (selectedValue === "ec") {
      setSelectedCategory("ec");
      setDepartmentDropDownOptions([
        { label: "Computer Science", value: "computer_science" },
        { label: "Maths", value: "maths" },
      ]);
    } else {
      setDepartmentDropDownOptions([]);
    }
  };

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
    };

    console.log("new ticket", newTicket);
    // setAllTickets([newTicket, ...allTickets])

    // axios
    //   .post("http://localhost:3000/api/ticket", newTicket)
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
      navigate("/");
    }, 100);
  };

  return (
    <>
      <div className="container justify-content-center align-items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              {...register("title")}
              type="text"
              className="form-control"
            />
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="form-label">
              Description
            </label>
            <input
              id="desc"
              {...register("desc")}
              type="text"
              className="form-control"
            />
            {errors.desc && (
              <p className="text-danger">{errors.desc.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              {...register("category")}
              className="form-select"
              onChange={(e) => handleCategoryDropDownChange(e.target.value)}
            >
              <option value="">Select...</option>
              {categoryDropDownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* <select
            id="category"
            {...register("category")}
            className="form-select"
          >
            <option value="ServiceIssue">Service Issue</option>
            <option value="LabIssue">Lab Issue</option>
            <option value="EC">EC</option>
          </select> */}
          </div>

          <div className="mb-3">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select
              id="department"
              {...register("department")}
              className="form-select"
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

          {selectedCategory !== "service" && (
            <div className="mb-3">
              <label htmlFor="module" className="form-label">
                Module
              </label>
              <select
                id="module"
                {...register("module")}
                className="form-select"
              >
                <option value="">Select...</option>
                {moduleDropDownOptions.map((module) => (
                  <option key={module.value} value={module.value}>
                    {module.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="priority" className="form-label">
              Ticket Priority
            </label>
            <select
              id="priority"
              {...register("priority")}
              className="form-select"
            >
              <option value="default">Default</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="fileName" className="form-label">
              Evidence
            </label>
          </div>
          <div className="mb-3">
            <input
              {...register("fileName")}
              type="file"
              className="form-control-file"
            />
          </div>
          <input type="hidden" {...register("status", { value: "Pending" })} />
          <button disabled={!isValid} className="btn btn-primary" type="submit">
            Submit
          </button>
          <button
            onClick={() => navigate("/")}
            className="m-2 btn btn-secondary"
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

export default InputTicket;
