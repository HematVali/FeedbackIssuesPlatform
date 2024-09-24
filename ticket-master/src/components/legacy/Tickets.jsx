import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
// import ViewTicketInfo from "./ViewTicketInfo";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Pagination from "./Pagination";
import { paginate } from "./paginate";
import ListGroup from "./ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

const Tickets = () => {
  const [loggedUser, setLoggedUser] = useState("");
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const [categories, setCategories] = useState([
    { _id: 1, name: "All Tickets" },
    { _id: 2, category: "ec", name: "EC's" },
    { _id: 3, category: "service", name: "Services" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState();

  const handleCategoryChange = (category) => {
    console.log("category ", category, " currentPage ", currentPage);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // pagination function

  const handlePageChange = (page) => {
    console.log(page);
    setCurrentPage(page);
  };

  // sort functionality

  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const handleSort = (path) => {
    console.log("sort column ", path);
    const cloneSortColumn = { ...sortColumn };
    if (sortColumn.path === path) {
      cloneSortColumn.order = cloneSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      cloneSortColumn.path = path;
      cloneSortColumn.order = "asc";
    }
    setSortColumn(cloneSortColumn);
  };

  const renderSortIcon = (path) => {
    if (path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <FontAwesomeIcon icon={faSortUp} />;
    return <FontAwesomeIcon icon={faSortDown} />;
  };

  // search functionality
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchUrl = `/ticket/search/${encodeURIComponent(searchInput)}`;
    navigate(searchUrl); // Navigate to the search URL with user's input
  };

  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  // search functionality

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      setLoggedUser(user);
      console.log(user);
    } catch (error) {}
  }, []);

  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");

  useEffect(() => {
    // console.log("Getting User");
    // console.log("logged user ", loggedUser);
    if (loggedUser) {
      let url = "http://localhost:3000/api/ticket/" + loggedUser._id;
      if (loggedUser.role) {
        url += "/" + loggedUser.role;
      }
      if (loggedUser.department) {
        url += "/" + loggedUser.department;
      }
      axios.get(url).then((res) => {
        console.log("I am in axios");
        console.log(res.data);
        setTickets(res.data);
      });
    }
  }, [loggedUser]);

  const handleDelete = (item) => {
    const originalTicket = [...tickets];
    setTickets(tickets.filter((ticket) => ticket._id !== item._id));
    console.log("original ticket " + tickets);

    axios
      .delete(`http://localhost:3000/api/ticket/${item._id}`)
      .catch((err) => setTickets(...originalTicket));
  };

  let filtered = tickets;
  filtered =
    selectedCategory && selectedCategory.category
      ? tickets.filter((t) => t.category === selectedCategory.category)
      : tickets;

  const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  const paginatedTickets = paginate(sorted, currentPage, pageSize);

  console.log("logged user ", loggedUser);
  if (loggedUser === "") {
    return navigate("/login");
  }

  return (
    <div className="row">
      <div className="col-2">
        <ListGroup
          categories={categories}
          onCategoryChange={handleCategoryChange}
          selectedCategory={selectedCategory}
        />
      </div>

      <div className="col">
        {/* SEARCH BAR */}
        <div className="mt-2 mx-3">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/newTicket")}
          >
            New Ticket
          </button>
        </div>
        {loggedUser && (
          <form className="form-inline" onSubmit={handleSubmit}>
            <input
              className=" my-4 mx-3 mr-sm-2 w-25 p-2"
              type="search"
              placeholder="Enter Ticket Title"
              aria-label="Search"
              value={searchInput}
              onChange={handleChange}
            />
            <button className="btn btn-outline-success mx-2" type="submit">
              Search
            </button>
          </form>
        )}
        <p>Showing {filtered.length} tickets from the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th onClick={() => handleSort("category")}>
                Category {renderSortIcon("category")}
              </th>
              <th onClick={() => handleSort("title")}>
                Title {renderSortIcon("title")}
              </th>
              <th onClick={() => handleSort("desc")}>
                Desc {renderSortIcon("desc")}
              </th>
              <th onClick={() => handleSort("userName")}>
                Owner {renderSortIcon("userName")}
              </th>
              <th>Evidence</th>
              <th onClick={() => handleSort("status")}>
                Status {renderSortIcon("status")}
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedTickets
              // .filter(
              //   (ticket) =>
              //     ticket.status !== "Rejected" && ticket.status !== "Resolved"
              // )
              .map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.category}</td>
                  <td>
                    <Link to={`/ticket/read/${ticket._id}`}>
                      {" "}
                      {ticket.title}
                    </Link>
                  </td>
                  <td>{ticket.desc}</td>
                  <td>{ticket.userName}</td>
                  <td>
                    {ticket.fileName && (
                      <a href={ticket.fileName} target="_blank">
                        Evidence Here
                      </a>
                    )}
                  </td>
                  <td>{ticket.status}</td>

                  {ticket.status === "Pending" ||
                  loggedUser.role !== "Student" ? (
                    <td>
                      <button
                        onClick={() => navigate(`/ticket/${ticket._id}`)}
                        className="btn btn-success btn-sm"
                      >
                        Update
                      </button>
                    </td>
                  ) : (
                    <td></td>
                  )}

                  {loggedUser.role === "admin" && (
                    <td>
                      <button
                        onClick={() => handleDelete(ticket)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={filtered.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Tickets;
