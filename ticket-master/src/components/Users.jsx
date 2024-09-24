import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Users = () => {
    const [users,setUsers]=useState([]);
    const [filteredUsers,setFilteredUsers] = useState([]);
    const [filter,setFilter]=useState("");
    const [loggedUser, setLoggedUser] = useState("");

    useEffect(() => {
        try {
        const jwt = localStorage.getItem("token");
        const user = jwtDecode(jwt);
        setLoggedUser(user);
        // console.log(user);
        } catch (error) {}
    }, []);

    useEffect(() => {
        axios
          .get("http://localhost:3000/api/users")
          .then((res) => setUsers(res.data))
      }, []);

    const handleDelete = (item) => {
        //delete user
        const originalUsers = [...users];
        axios
            .delete(`http://localhost:3000/api/users/${item._id}`)
            .then(() => {
                setUsers(originalUsers.filter((user) => user._id !== item._id));
            })
            .catch((err) => {
                console.error("Error deleting user:", err);
                // Handle error appropriately, maybe show a message to the user
            });
        
        //delete tickets created by user
        var tickets=[];
        console.log("getting tickets");
        axios
            .get("http://localhost:3000/api/ticket")
            .then((res) => {
                tickets=res.data;
                const filteredTickets= tickets.filter(ticket => ticket.userId === item._id);
                for (var i=0; i<filteredTickets.length; i++)
                {
                    axios
                    .delete(`http://localhost:3000/api/ticket/${filteredTickets[i]._id}`)
                    .catch((err) => console.log(err))
                }
            } )
            .catch((err) => console.log("error getting ticket"))

        
    };

    const handleInputChange = (e) => {
        setFilter(e.target.value);
    }

    const usersToShow = filter.length !== 0
    ? users.filter(user => user.name.toLowerCase().includes(filter.toLowerCase()))
    : users;

    return (
        <div>
        <NavBar />
        <input className="search_bar"
            type="text"
            placeholder="Enter user name"
            value={filter}
            onChange={handleInputChange}
        />
        <table className="table">
            <thead>
            <tr>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">password</th>
                <th scope="col">isAdmin</th>          
            </tr>
            </thead>
            <tbody>
            {usersToShow.map((user) => (
                <tr key={user.name}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.isAdmin.toString()}</td>
                    <td>
                    <button
                        onClick={() => handleDelete(user)}
                        className="btn btn-danger btn-sm"
                    >
                        Delete
                    </button>
                    </td>
                </tr>
            ))}
            </tbody>    
        </table>
        </div>
    );
};


export default Users;