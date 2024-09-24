import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import SmallCard from "./SmallCard";
import { PiWarning } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
import { IoTimerOutline } from "react-icons/io5";
import { FiArchive } from "react-icons/fi";
import ProgressCard from "./ProgressCard";
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import Background from "../../assets/Background.png";

const Dashboard = () => {

    const [tickets, setTickets] = useState([]);
    const [issues, setIssues] = useState([]);
    const [ec, setEc] = useState([]);
    const [urgentEc, setUrgentEc] = useState([]);
    const [archived, setArchived] = useState([]);
    const [loggedUser, setLoggedUser] = useState("");


    async function getTickets() {
        const { data } = await axios.get("http://localhost:3000/api/ticket");
        setTickets(data.filter((ticket) => ticket.status !== "Archived" && ticket.userId === loggedUser._id));
        setIssues(data.filter((ticket) => ticket.status !== "Archived" &&
         (ticket.category === "service" || ticket.category === "Building Hazard" || 
         ticket.category === "Power" || ticket.category === "Other" || ticket.category === "Hardware"
         || ticket.category === "technical" || ticket.category === "functional" || ticket.category === "accessibility") 
         && ticket.userId === loggedUser._id));
        setEc(data.filter((ticket) => ticket.status !== "Archived" && ticket.category === "ec" && ticket.priority !== "high" && ticket.userId === loggedUser._id));
        setUrgentEc(data.filter((ticket) => ticket.status !== "Archived" && ticket.category === "ec" && ticket.priority === "high" && ticket.userId === loggedUser._id));
        setArchived(data.filter((ticket) => ticket.status === "Archived" && ticket.userId === loggedUser._id));
    }

    //TODO: Ensure responsiveness
    useEffect(() => {
        if (loggedUser) {
            getTickets();
        }
    }, [loggedUser]);

    useEffect(() => {
        try {
            const jwt = localStorage.getItem("token");
            const user = jwtDecode(jwt);
            setLoggedUser(user);
        } catch (error) { }
    }, []);

    return (
        <section className='flex items-center px-32 py-12 bg-base-200 min-w-[80%]'  style={{backgroundImage: `url(${Background})`,backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="card bg-base-100 shadow-xl p-8 min-w-full">
                <div className="card-body grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-8">
                    
                    <div className="flex flex-col justify-between items-start row-span-2">
                        <div className="flex flex-col gap-6">
                        <h1 className="card-title text-primary text-2xl font-medium">Dashboard</h1>
                        <h2 className="text-gray-600">Welcome back, {loggedUser.name}</h2>
                        </div>
                        <a href="/create-ticket" className="btn btn-primary text-white"><FaPlus/>Create Ticket</a>
                    </div>

                    <div className='bg-base-200 rounded-xl flex flex-col gap-8 items-center p-4  shadow-inner'>
                        <h2 className="card-title text-primary text-xl font-medium text-right self-end hidden lg:flex">OVERVIEW</h2>
                        <div className="flex flex-col xl:flex-row justify-between self-center min-w-full">
                            <SmallCard title="Issues" value={issues.length} icon={<PiWarning size={40} color='#0d3273' />} />
                            <div className='hidden xl:flex divider divider-horizontal max-h-[80%] justify-self-center'></div>
                            <SmallCard title="EC" value={ec.length} icon={<CgNotes size={40} color='#0d3273' />} />
                            <div className='hidden xl:flex divider divider-horizontal max-h-[80%] justify-self-center'></div>
                            <SmallCard title="Urgent EC" value={urgentEc.length} icon={<IoTimerOutline size={40} color='#0d3273' />} />
                            <div className='hidden xl:flex divider divider-horizontal max-h-[80%] justify-self-center'></div>
                            <SmallCard title="Archived" value={archived.length} icon={<FiArchive size={40} color='#0d3273' />} />
                        </div>
                    </div>
                    
                    <div className='bg-base-200 rounded-xl flex flex-col gap-8 items-center p-4  shadow-inner'>
                        <h2 className="card-title text-primary text-xl font-medium text-right self-end hidden lg:flex">PROGRESS</h2>
                        <div className="flex flex-col xl:flex-row justify-between self-center min-w-full">
                        {tickets != null && tickets.length > 0 && tickets[0] != null && tickets[0].status != null ? <ProgressCard
                                stage={tickets[0].status}
                                title={tickets[0].title}
                                type={tickets[0].category === "service" ? "EC" : "Service"} /> : <div className='card bg-base-100 shadow-xl flex justify-between items-center'>
                                <div className='card-body cursor-pointer flex flex-row justify-between items-center gap-10 max-w-full'>
                                    <h2 className='card-title text-xl font-bold text-primary self-center line-clamp-4 '>Nothing to show here.</h2>
                                    <p>More information will be displayed when you create more tickets.</p>
                                    </div></div>
                            }

                            {tickets != null && tickets.length > 1 && tickets[1] != null && tickets[1].status != null && <ProgressCard
                                stage={tickets[1].status}
                                title={tickets[1].title}
                                type={tickets[1].category === "service" ? "EC" : "Service"}
                            />}
                        </div>
                    </div>

                </div>
            </div>


        </section>
    );
};

export default Dashboard;