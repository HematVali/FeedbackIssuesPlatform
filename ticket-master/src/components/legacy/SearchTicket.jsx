import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SearchTicket = ({ userInput }) => {
  const [tickets, setTicket] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/ticket`).then((res) => {
      setTicket(res.data);
      console.log(tickets);
    });
  }, []);
  const foundTicket = tickets.find((ticket) => ticket.title === params.title);

  const filteredTickets = tickets.filter((ticket) =>
    ticket.title.toLowerCase().includes(params.title.toLowerCase())
  );

  return (
    <>
      <p>Search Ticket Page</p>

      {filteredTickets.map((ticket) => (
        <>
          <div className="mt-5 ms-5 text-center">
            <h1 className="mt-5">Title: {ticket.title}</h1>
            <h2 className="mt-5">Description: {ticket.desc}</h2>
            <h3 className="mt-5">Category: {ticket.category}</h3>
            <h3 className="mt-5">Priority: {ticket.priority}</h3>
            <h3 className="mt-5">Status: {ticket.status}</h3>
            <h3 className="mt-5">Comments: {ticket.comments}</h3>
          </div>
        </>
        // <li key={ticket.id}>{ticket.title}</li>
      ))}

      {/* {foundTicket ? (
        <>
          {" "}
          <div className="mt-5 ms-5 text-center">
            <h1 className="mt-5">Title: {foundTicket.title}</h1>
            <h2 className="mt-5">Description: {foundTicket.desc}</h2>
            <h3 className="mt-5">Category: {foundTicket.category}</h3>
            <h3 className="mt-5">Priority: {foundTicket.priority}</h3>
            <h3 className="mt-5">Status: {foundTicket.status}</h3>
            <h3 className="mt-5">Comments: {foundTicket.comments}</h3>
          </div>
          
        </>
      ) : (
        <div className="mt-5 ms-5 text-center">
          <h1>
            {" "}
            No Ticket was found. Make sure you entered the correct title.
          </h1>
        </div>
      )} */}
      <button
        onClick={() => navigate("/")}
        className="m-2 btn btn-secondary mt-5"
      >
        Cancel
      </button>
    </>
  );
};

export default SearchTicket;
