import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { all } from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";

const schema = z.object({
  title: z.string(),
  desc: z.string(),
  fileName: z.any().optional(),
  category: z.string().optional(),
  priority: z.any().optional(),
  status: z.any().optional(),
  adminComments: z.any().optional(),
});

const UpdateTicket = () => {
  const [loggedUser, setLoggedUser] = useState("");
  const [ticketUser, setTicketUser] = useState("");

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setLoggedUser(user);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const params = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({ title: "", desc: "" });

  useEffect(() => {
    axios.get(`http://localhost:3000/api/ticket/${params.id}`).then((res) => {
      setTicket(res.data);
      axios.get(`http://localhost:3000/api/users/${res.data.userId}`).then((res) => {
        setTicketUser(res.data);
        });
      });
  }, [loggedUser], [ticket]);

  const {
    register,
    formState: { errors, isValid },
  } = useForm({ resolver: zodResolver(schema) });

  const handleSubmit =
    (...funcs) =>
    (event) => {
      event.preventDefault();
      funcs.forEach((func) => func(event));
    };
  const archiveTicket = () => {
    const originalTicket = { ...ticket };
    const { fileName, date, _id, __v, ...updatedTicket } = originalTicket;
    updatedTicket.status = "Archived";
    axios
      .put(`http://localhost:3000/api/ticket/${params.id}`, updatedTicket)
      .catch((err) => setTicket(originalTicket));
    navigate("/dashboard");
    // window.location("/archive");
  };

  const openTicket = () => {
    const originalTicket = { ...ticket };
    const { fileName, date, _id, __v, ...updatedTicket } = originalTicket;
    updatedTicket.status = "Pending";
    updatedTicket.reopenCount = updatedTicket.reopenCount + 1;
    axios
      .put(`http://localhost:3000/api/ticket/${params.id}`, updatedTicket)
      .catch((err) => setTicket(originalTicket));
    navigate("/dashboard");
  };
  const deleteTicket = () => {
    axios
      .delete(`http://localhost:3000/api/ticket/${params.id}`)
      .then((res) => console.log(res.data));
    navigate("/archive");
  };
  const onUpdate = (data) => {
    const originalTicket = { ...ticket };
    const { fileName, date, _id, __v, ...updatedTicket } = originalTicket;
    axios
      .put(`http://localhost:3000/api/ticket/${params.id}`, updatedTicket)
      .catch((err) => setTicket(originalTicket));
  };

  const sendEmail = async (data) => {
    const originalTicket = { ...ticket };
    const { fileName, date, _id, __v, ...updatedTicket } = originalTicket;

    const serviceId = "service_sqqutnk";
    // const serviceId = 'service_kz8tavg';
    const templateId = "template_hshcf1a";
    const publicKey = "I15mYrE6RdaWyKyAb";

    const params = {
      ticket_type: updatedTicket.category,
      to_name: ticketUser.name,
      ticket_desc: updatedTicket.desc,
      user_email: ticketUser.email,
      ticket_result: updatedTicket.status,
    };

    await emailjs.send(serviceId, templateId, params, publicKey);
    console.log("Email sent successfully!");
    navigate("/tickets");
  };
  return (
    <>
      <div className="min-h-[88vh] bg-base-200 hero px-64">
        <div className="bg-white card p-10 relative min-w-full">
          <form
           // onSubmit={handleSubmit(onUpdate)}
            onSubmit={handleSubmit(onUpdate, sendEmail)}
            className="flex flex-col gap-10 max-w-full"
          >
            <div className="mb-3">
              <label
                htmlFor="title"
                className="card-title font-normal text-2xl text-primary"
              >
                Title
              </label>
              <input
                id="title"
                {...register("title")}
                type="text"
                className="form-control w-[100%]"
                value={ticket.title}
                onChange={(event) =>
                  setTicket({ ...ticket, title: event.target.value })
                }
              />
              {errors.title && (
                <p className="text-danger text-red-700">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label
                htmlFor="desc"
                className="card-title  font-normal text-2xl text-primary"
              >
                Description
              </label>
              <input
                id="desc"
                {...register("desc")}
                type="text"
                className="form-control w-[100%]"
                value={ticket.desc}
                onChange={(event) =>
                  setTicket({ ...ticket, desc: event.target.value })
                }
              />
              {errors.desc && (
                <p className="text-danger text-red-700">
                  {errors.desc.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="category"
                className="card-title  font-normal text-2xl text-primary"
              >
                Category
              </label>
              <input
                id="category"
                {...register("category")}
                type="text"
                disabled
                className="form-control"
                value={ticket.category}
                onChange={(event) =>
                  setTicket({ ...ticket, category: event.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="card-title  font-normal text-2xl text-primary"
              >
                Department
              </label>
              <input
                id="department"
                {...register("department")}
                type="text"
                disabled
                className="form-control"
                value={ticket.department}
                onChange={(event) =>
                  setTicket({ ...ticket, department: event.target.value })
                }
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="card-title  font-normal text-2xl text-primary"
              >
                Module
              </label>
              <input
                id="module"
                {...register("module")}
                type="text"
                disabled
                className="form-control"
                value={ticket.module}
                onChange={(event) =>
                  setTicket({ ...ticket, module: event.target.value })
                }
              />
            </div>

            <label
              htmlFor="fileName"
              className="card-title  font-normal text-2xl text-primary"
            >
              <td>
                {ticket.fileName && (
                  <a href={ticket.fileName} target="_blank">
                    Click here to see Evidence
                  </a>
                )}
              </td>
            </label>

            <div>
              <label
                htmlFor="priority"
                className="card-title  font-normal text-2xl text-primary"
              >
                Ticket Priority
              </label>
              <select
                id="priority"
                {...register("priority")}
                className="form-select"
                value={ticket.priority}
                onChange={(event) =>
                  setTicket({ ...ticket, priority: event.target.value })
                }
              >
                <option value="default">Default</option>
                <option value="high">High</option>
              </select>
            </div>

            {loggedUser.role !== "student" && (
              <>
                <div>
                  <label
                    htmlFor="status"
                    className="card-title  font-normal text-2xl text-primary"
                  >
                    Status
                  </label>
                  <select
                    id="status"
                    {...register("status")}
                    className="form-select"
                    value={ticket.status}
                    onChange={(event) =>
                      setTicket({ ...ticket, status: event.target.value })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Review">In Review</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="adminComments"
                    className="card-title font-normal text-2xl  text-primary"
                  >
                    Comments
                  </label>
                  <input
                    id="adminComments"
                    type="text"
                    className="form-control w-[100%]"
                    {...register("adminComments")}
                    value={ticket.adminComments}
                    onChange={(event) =>
                      setTicket({
                        ...ticket,
                        adminComments: event.target.value,
                      })
                    }
                  />
                </div>
              </>
            )}

            <div className="flex gap-2 w-[100%] justify-start items-center">
              <button
                disabled={!isValid}
                className="btn btn-primary"
                type="submit"
              >
                Update
                <FaCheck />
              </button>
              {((ticket.status === "Archived" || ticket.status === "Resolved" || ticket.status === "Rejected") && (loggedUser._id === ticketUser._id)) && (
                <>
                  {ticket.reopenCount < 2 ? (
                    <button
                      onClick={() => openTicket()}
                      className="btn btn-success"
                    >
                      Reopen {ticket.reopenCount + 1} of 2
                      <FiUpload />
                    </button>
                  ) : (
                    <button
                      onClick={() => openTicket()}
                      className="btn btn-success"
                      disabled
                    >
                      Reopened too many times
                      <FiUpload />
                    </button>
                  )}
                  <div
                    className="btn btn-warning"
                    onClick={() =>
                      document.getElementById("delete_modal").showModal()
                    }
                  >
                    Delete
                    <FaTrash />
                  </div>
                  <dialog id="delete_modal" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Delete Ticket</h3>
                      <p className="py-4">
                        This action cannot be undone! Are you sure you want to
                        delete <span className="font-bold">{ticket.title}</span>
                        ?
                      </p>
                      <div className="modal-action">
                        <form method="dialog" className="flex gap-4">
                          {/* if there is a button in form, it will close the modal */}
                          <button
                            className="btn btn-warning"
                             onClick={() => {
                                deleteTicket();
                               // navigate("/tickets");
                               window.location = "/archive";
                              }}
                          >
                            I'm Sure
                            <FaTrash />
                          </button>
                          <button className="btn">Cancel</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </>
              )}

              {ticket.status !== "Archived" && (
                <button
                  onClick={() => archiveTicket()}
                  className="btn btn-warning"
                >
                  Archive
                  <FaTrash />
                </button>
              )}
              <button
                onClick={() => navigate("/tickets")}
                className="btn btn-primary btn-outline"
              >
                Cancel
                <FaTimes />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateTicket;
