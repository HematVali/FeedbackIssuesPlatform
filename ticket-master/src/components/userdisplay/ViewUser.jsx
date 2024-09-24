import React, {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { FaRegEdit, FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

const ViewUser = () => {
    const [loggedUser, setLoggedUser] = useState("");
    const [user, setUser] = useState({name: "", role: "", email: ""});
    const [isUpdating, setIsUpdating] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    const handleUpdate = () => {
        if (!isUpdating) {
            const originalUser = { ...user };
            const { password, _id, __v, ...updatedUser } = originalUser;
            console.log(updatedUser);
            axios
            .put(`http://localhost:3000/api/users/${params.id}`, updatedUser)
            .catch((err) => setUser(originalUser));
        }
    }

    const handleDelete = () => {
        const originalUser = {...user};

        //delete tickets created by user
        var tickets = [];
        console.log("getting tickets");
        axios.get("http://localhost:3000/api/ticket")
            .then((res) => {
                tickets = res.data;
                const filteredTickets = tickets.filter((ticket) => ticket.userId === params.id);
                for (var i = 0; i < filteredTickets.length; i++) {
                    axios.delete(`http://localhost:3000/api/ticket/${filteredTickets[i]._id}`)
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => {
                console.log("error getting ticket");
                console.log(err);
            });

        //delete user
        console.log("deleting user");
        axios.delete(`http://localhost:3000/api/users/${params.id}`)
            .catch((err) => {
                console.log(err);
                setUser(originalUser);
            });

        navigate("/users");
    }

    const handleSubmit =
    (...funcs) =>
    (event) => {
      event.preventDefault();
      funcs.forEach((func) => func(event));
    };

    useEffect(() => {
        try {
          const jwt = localStorage.getItem("token");
          const user = jwtDecode(jwt);
          setLoggedUser(user);
        } catch (error) {
          console.log(error.message);
        }
    }, []);
    
    useEffect(() => {
        axios.get(`http://localhost:3000/api/users/${params.id}`)
            .then(response => {
                console.log(response.data);
                setUser(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [loggedUser])

    return (
        <div>
            <div className="min-h-[80vh] hero bg-base-200 px-96">
                <div className="card bg-base-100 p-10 min-w-full flex flex-col gap-8">   
                    <h2 className="card-title text-primary"> User Details </h2>
                    <form onSubmit = {handleSubmit(handleUpdate)} className='flex flex-col gap-4'>
                        <div className="mb-3">
                            <label htmlFor="name" className="card-title font-light text-primary"> Name </label>
                            <input
                            id="name"
                            type="text"
                            className="form-control disabled:bg-[#EFEFEF] disabled:opacity-75 min-w-full"
                            value = {user.name}
                            onChange = {(e) => setUser({...user, name: e.target.value})}
                            disabled = {!isUpdating}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="card-title font-light text-primary"> Role </label>
                            <input
                            id="role"
                            type="text"
                            className="form-control disabled:bg-[#EFEFEF] disabled:opacity-75 min-w-full capitalize"
                            value = {user.role}
                            disabled = {true}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="card-title font-light text-primary"> Email </label>
                            <input
                            id="email"
                            type="text"
                            className="form-control disabled:bg-[#EFEFEF] disabled:opacity-75 min-w-full"
                            value = {user.email}
                            onChange = {(e) => {setUser({...user, email: e.target.value})}}
                            disabled = {!isUpdating}
                            />
                        </div>
                        <div className = "flex flex-row justify-between items-center">
                            <div className = "flex flex-row gap-3">
                                <button type = "submit" className="btn btn-primary text-white" onClick={() => setIsUpdating(update => !update)}> 
                                    {isUpdating ? <p className='flex gap-4 items-center'>Update <FaCheck size={18} /></p> : <p className='flex gap-10 items-center'>Edit <FaRegEdit size={18} /></p> }
                                </button>
                                <div className="btn btn-warning" onClick={() => document.getElementById('delete_modal').showModal()} disabled = {params.id === loggedUser._id /* User can't delete themselves */}>
                                    Delete
                                    <FaTrash />
                                </div>
                            </div>
                            <button className="btn btn-black btn-outline" onClick={() => navigate("/")}> Back </button>
                        </div>
                        <dialog id="delete_modal" className="modal">
                            <div className="modal-box">
                                <h3 className="font-bold text-lg">Delete User</h3>
                                <p className="py-4">This action cannot be undone! Are you sure you want to delete <span className="font-bold">{user.email}</span>?</p>
                                <div className="modal-action">
                                    <form method="dialog" className="flex gap-4">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn btn-warning" onClick={() => handleDelete()}>
                                            I'm Sure
                                            <FaTrash /></button>
                                        <button className="btn">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ViewUser;
