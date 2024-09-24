import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import SearchTicket from "./SearchTicket";

const NavBar = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setLoggedUser(user);
      //console.log(user);
    } catch (error) {}
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand">Navbar</NavLink>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {loggedUser && (
                <>
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </NavLink>
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/ticket/resolved"
                  >
                    Resolved-Tickets
                  </NavLink>
                  {/* <NavLink className="nav-link" to="/newTicket">
                    Create Ticket
                  </NavLink> */}
                </>
              )}
            </ul>
            <ul className="navbar-nav">
              {!loggedUser && (
                <>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </>
              )}
              {loggedUser && (
                <>
                  <button type="button" className="btn btn-primary">
                    {loggedUser.name}
                  </button>
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </>
              )}

              {loggedUser.role === "admin" && (
                <NavLink className="nav-link" to="/users">
                  Users
                </NavLink>
              )}

              {/* {loggedUser.role === "admin" && (
                <NavLink className="nav-link" to="/viewuser">
                  View Users
                </NavLink>
              )} */}
            </ul>
          </div>
        </div>
        {/* </div> */}
      </nav>
    </>
  );
};

export default NavBar;
