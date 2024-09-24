import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SearchUser = () => {
  const [users, setUser] = useState([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/users`).then((res) => {
      setUser(res.data);
      console.log(users);
    });
  }, []);

  const foundUser = users.find((user) => user.name === params.name);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(params.name.toLowerCase())
  );
  return (
    <>
      <div>SearchUser</div>
      {filteredUsers.map((user) => (
        <>
          <div className="mt-5 ms-5 text-center">
            <h1 className="mt-5">Name: {user.name}</h1>
            <h2 className="mt-5">Email: {user.email}</h2>
          </div>
        </>
        // <li key={ticket.id}>{ticket.title}</li>
      ))}
      {/* {foundUser ? (
        <>
          {" "}
          <div className="mt-5 ms-5 text-center">
            <h1 className="mt-5">Name: {foundUser.name}</h1>
            <h2 className="mt-5">Email: {foundUser.email}</h2>
            <h3 className="mt-5">isAdmin: {foundUser.isAdmin}</h3>
          </div>
        </>
      ) : (
        <div className="mt-5 ms-5 text-center">
          <h1> No User was found. Make sure you entered the correct name.</h1>
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

export default SearchUser;
