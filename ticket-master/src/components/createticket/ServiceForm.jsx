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

  // Start Drop Down Code Changes
  const [departmentDropDownOptions, setDepartmentDropDownOptions] = useState(
    []
  );
  const [moduleDropDownOptions, setModuleDropDownOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const categoryDropDownOptions = [
    { label: "Technical", value: "technical" },
    { label: "Functional", value: "functional" },
    { label: "Accessibility", value: "accessibility" },
    { label: "Other", value: "other" },
  ];

  const serviceDropDownOptions = [
    { label: "QM Plus", value: "qmplus" },
    { label: "MySIS", value: "mysis" },
    { label: "QM App", value: "qmapp" },
    { label: "Other", value: "other" },
  ];

  const handleCategoryDropDownChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
  };

  const handleSelectedService = (selectedValue) => {
    setSelectedService(selectedValue);
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
      navigate("/ticket-created");
    }, 100);
  };

  // handle category change
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  };

  // handle service change
  const handleServiceChange = (event) => {
    const selectedService = event.target.value;
    setService(selectedService);
  };

  // handle summary change
  const handleSummaryChange = (event) => {
    // summary input max 5000 characters
    if (event.target.value.length <= 5000) {
      setSummary(event.target.value);
    }
  };

  // handle file upload change
  const handleFileChange = (event) => {
    // only allow a single file to be uploaded
    setFile(event.target.files[0]);
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[70vh] bg-white">
        <div className="card shrink-0 w-full max-w-screen-lg shadow-2xl bg-base-100">
          <h3 className="card-title text-center pt-7 pl-10">
            Report Service Issue
          </h3>
          {/* when submitting form, call onSubmit function to process the form */}
          <form className="card-body p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              {/* enter title of lab issue */}
              <label htmlForm="title" className="label-text block pb-0.5 pl-1">
                Title
              </label>
              {/* <span className="label-text block pb-0.5 pl-1"> Title: </span> */}
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
                {" "}
                Description{" "}
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
            <div className="form-control">
              <label
                htmlFor="department"
                className="label-text block pb-0.5 pl-1"
              >
                {" "}
                Service{" "}
              </label>
              <select
                id="department"
                {...register("department")}
                className="select select-bordered w-full"
                onChange={(e) => handleSelectedService(e.target.value)}
              >
                <option value="">Select...</option>
                {serviceDropDownOptions.map((department) => (
                  <option key={department.value} value={department.value}>
                    {department.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control">
              <label
                htmlFor="category"
                className="label-text block pb-0.5 pl-1"
              >
                {" "}
                Category{" "}
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
            {/* set priority to Default */}
            <input
              type="hidden"
              id="priority"
              {...register("priority", { value: "default" })}
            />
            {/* set status to pending */}
            <input
              type="hidden"
              {...register("status", { value: "Pending" })}
            />
            <div className="form-control">
              {/* user can attach evidence if needed */}
              <label
                htmlFor="fileName"
                className="label-text block pb-0.5 pl-1"
              >
                {" "}
                Attach evidence (optional):{" "}
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
            {/* Submit button */}
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
