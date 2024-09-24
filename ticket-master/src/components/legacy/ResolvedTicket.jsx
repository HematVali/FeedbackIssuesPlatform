import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ResolvedTicket = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");
  let x = 1;

  const handleResubmit = (ticketId) => {
    // Update ticket status to "Pending"
    const updatedTickets = tickets.map((ticket) =>
      ticket._id === ticketId ? { ...ticket, status: "Pending" } : ticket
    );
    setTickets(updatedTickets);
  };

  useEffect(() => {
    try {
      axios.get(`http://localhost:3000/api/ticket`).then((res) => {
        setTickets(res.data);
      });
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      //   console.log("user ", user);
      setLoggedUser(user);
      //   console.log(user);
    } catch (error) {}
  }, []);

  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

  return (
    <>
      <div>ResolvedTicket</div>
      {tickets
        .filter(
          (ticket) =>
            (ticket.status == "Resolved" || ticket.status == "Rejected") &&
            loggedUser._id === ticket.userId
        )
        .map((ticket) => (
          <>
            <div
              key={(x += 1)}
              className="mt-5 ms-5 me-5 text-center border border-primary"
            >
              <h1 className="mt-5">Title: {ticket.title}</h1>
              <h2 className="mt-5">Category: {ticket.category}</h2>
              <h2 className="mt-5">Desc: {ticket.desc}</h2>
              <h2 className="mt-5">Owner: {ticket.owner}</h2>
              <h2 className="mt-5">Status: {ticket.status}</h2>
            </div>
            <button
              onClick={() => handleResubmit(ticket._id)}
              className="m-2 btn btn-secondary"
            >
              Re-Submit
            </button>
          </>
        ))}

      <button onClick={() => navigate("/")} className="m-2 btn btn-secondary">
        Cancel
      </button>
    </>
  );
};

export default ResolvedTicket;
