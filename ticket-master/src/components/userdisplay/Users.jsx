import React, {useState, useEffect, useContext, useTransition} from 'react';
import User from './User';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { FilterContext } from './UserContextFilterProvider';
import { SearchContext } from './UserContextFilterProvider';
import { IoPersonAddOutline } from "react-icons/io5";
import Background from '../../assets/Background.png';

function Users() {
    const { filter, setFilter } = useContext(FilterContext);
    const { search, setSearch } = useContext(SearchContext);
    const [loggedUser, setLoggedUser] = useState();
    const [users, setUsers] = useState([]);
    
    async function getUsers() {
        if (loggedUser.role === "admin") {
            const {data} = await axios.get(`http://localhost:3000/api/users`);
            setUsers(data.filter(user => (user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))));
            switch (filter) {
                case "Admin":
                    setUsers(data.filter(user => user.role === "admin" && (user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))));
                    break;
                case "Teaching Admin":
                    setUsers(data.filter(user => (user.role === "teaching-admin-staff" ||  user.role === "teaching-admin-ec") && (user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))));
                    break;
                case "Student":
                    setUsers(data.filter(user => user.role === "student" && (user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()))));
                    break;
            }
        }
        
    }

    useEffect(() => {
        if (loggedUser) {
            getUsers();
        }
    }, [loggedUser, filter, search]);

    useEffect(() => {
        try {
            const jwt = localStorage.getItem("token");
            const user = jwtDecode(jwt);
            setLoggedUser(user);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <div id = "users" className = "navbar bg-[#0a1324] text-white px-0 lg:px-28 py-4">
                <div className = "navbar-start">
                    <div className = "dropdown">
                        <h1 className = "text-3xl font-bold"> Users </h1>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li> All Users </li>
                            <li> Admin </li>
                            <li> Teaching Admin </li>
                            <li> Student </li>
                        </ul>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <div className="join">
                            <form>
                                {["All Users", "Admin", "Teaching Admin", "Student"].map(userType => {
                                        return filter === userType ? <input className="join-item btn" type="radio" name="options" aria-label={userType} onChange={() => setFilter(userType)} defaultChecked/>
                                        : <input className="join-item btn" type="radio" name="options" aria-label={userType} onChange={() => setFilter(userType)} />
                                    })
                                }
                            </form>
                        </div>
                    </ul>
                </div>
                <div className="navbar-end gap-4">
                    <input type="text" placeholder="Search users" className="input input-bordered w-full max-w-xs text-gray-700" onChange = {(e) => setSearch(e.target.value)}/>
                </div>
            </div>
            <div className = "grid grid-cols-1 lg:grid-cols-2 p-12 gap-10 min-h-[80vh]" style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {users.map(user => {
                    return <User id = {user._id} name = {user.name} role = {user.role} email = {user.email}></User>
                })}
            </div>
        </>
    );
}

export default Users;