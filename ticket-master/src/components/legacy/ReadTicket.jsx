import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { set } from "zod";

const ReadTicket = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [ticket, setTicket] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3000/api/ticket/${params.id}`).then((res) => {
      setTicket(res.data);
    });
  }, []);

  return (
    <>
      <div className="mt-5 ms-5 text-center">
        <h1 className="mt-5">Title: {ticket.title}</h1>
        <h2 className="mt-5">Descrption: {ticket.desc}</h2>
        <h3 className="mt-5">Category: {ticket.category}</h3>
        <h3 className="mt-5">Priority: {ticket.priority}</h3>
        <h3 className="mt-5">Status: {ticket.status}</h3>
        <h3 className="mt-5">Comments: {ticket.adminComments}</h3>
      </div>
      <button
        onClick={() => navigate("/")}
        className="m-2 btn btn-secondary mt-5"
      >
        Cancel
      </button>
    </>
  );
};

export default ReadTicket;
