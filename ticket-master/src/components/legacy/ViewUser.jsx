import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ViewUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchUrl = `/ticket/user/${encodeURIComponent(searchInput)}`;
    navigate(searchUrl); // Navigate to the search URL with user's input
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/users").then((res) => {
      setUsers(res.data);
      //   console.log(users);
    });
  }, []);

  return (
    <>
      <div>ViewUser</div>
      <form className="form-inline text-center" onSubmit={handleSubmit}>
        <input
          className=" my-5 mx-3 mr-sm-2 w-25 p-2"
          type="search"
          placeholder="Enter User Name"
          aria-label="Search"
          value={searchInput}
          onChange={handleChange}
        />
        <button className="btn btn-outline-success mx-2" type="submit">
          Search
        </button>
      </form>
      {users.map((user) => (
        <>
          <div className="mt-5 ms-5 me-5 text-center border border-primary">
            <h1 className="mt-5">
              <Link to={`/updateUser/${user._id}`}>Name: {user.name}</Link>
            </h1>
            <h2 className="mt-5">Email: {user.email}</h2>
          </div>
        </>
      ))}
      <button
        onClick={() => navigate("/")}
        className="m-2 btn btn-secondary mt-5"
      >
        Cancel
      </button>
    </>
  );
};

export default ViewUser;
