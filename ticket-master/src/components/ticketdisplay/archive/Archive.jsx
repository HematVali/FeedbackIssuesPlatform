import Ticket from '../Ticket';
import DisplayHeader from '../DisplayHeader';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState, useContext } from 'react'
import { FilterContext } from '../FilterContextProvider';
import { SearchContext } from '../FilterContextProvider';
import Background from '../../../assets/Background.png';
import ReactPaginate from "react-paginate";

function Archive() {

    const { filter, setFilter } = useContext(FilterContext);
    const { search, setSearch } = useContext(SearchContext);
    const [tickets, setTickets] = useState([]);
    const [loggedUser, setLoggedUser] = useState("");

    // Pagination
    const [page, setPage] = useState(0);
    const [filterData, setFilterData] = useState();
    const n = 3;

    useEffect(() => {
        setFilterData(
            tickets.slice(page * n, (page + 1) * n)
          );
    }, [page, tickets]);

    async function getTickets() {
        const { data } = await axios.get("http://localhost:3000/api/ticket");
        switch (loggedUser.role) {
            case "admin":
                setTickets(data.filter((ticket) => ticket.status === "Archived" && ticket.title.toLowerCase().includes(search.toLowerCase())));
                if (filter === "View Issues") {
                    setTickets(data.filter((ticket) => ticket.status === "Archived" &&
                        (ticket.category === "service" || ticket.category === "Building Hazard" ||

                            ticket.category === "Power" || ticket.category === "Other" || ticket.category === "Hardware"
                            || ticket.category === "technical" || ticket.category === "functional" || ticket.category === "accessibility")
                        && ticket.title.toLowerCase().includes(search.toLowerCase())));
                } else if (filter === "View EC") {
                    setTickets(data.filter((ticket) => ticket.status === "Archived" && ticket.category === "ec" && ticket.title.toLowerCase().includes(search.toLowerCase())));
                }
                break;
                case "teaching-admin-staff":
                    setTickets(data.filter((ticket) => ticket.status === "Archived"  && ticket.category !== "ec" && ticket.title.toLowerCase().includes(search.toLowerCase())));
                    if (filter === "View Issues") {
                        setTickets(data.filter((ticket) => ticket.status === "Archived" &&
                            (ticket.category === "service" || ticket.category === "Building Hazard" ||
    
                                ticket.category === "Power" || ticket.category === "Other" || ticket.category === "Hardware"
                                || ticket.category === "technical" || ticket.category === "functional" || ticket.category === "accessibility")
                            && ticket.title.toLowerCase().includes(search.toLowerCase())));
                    } else if (filter === "View EC") {
                        setTickets(data.filter((ticket) => ticket.status === "Archived" && ticket.category === null && ticket.title.toLowerCase().includes(search.toLowerCase())));
                    }
                    break;
            case "student":
                setTickets(data.filter((ticket) => ticket.status === "Archived" && ticket.userId === loggedUser._id && ticket.title.toLowerCase().includes(search.toLowerCase())));
                if (filter === "View Issues") {
                    setTickets(data.filter((ticket) => ticket.status === "Archived" && 
                    (ticket.category === "service" || ticket.category === "Building Hazard" || 
                ticket.category === "Power" || ticket.category === "Other" || ticket.category === "Hardware"
                || ticket.category === "technical" || ticket.category === "functional" || ticket.category === "accessibility") 
                    && ticket.userId === loggedUser._id && ticket.title.toLowerCase().includes(search.toLowerCase())));
                } else if (filter === "View EC") {
                    setTickets(data.filter((ticket) => ticket.status === "Archived" && ticket.category === "ec" && ticket.userId === loggedUser._id && ticket.title.toLowerCase().includes(search.toLowerCase())));
                }
                break;
            case "teaching-admin-ec":
                setTickets(data.filter((ticket) => ticket.status === "Archived" && ticket.department === loggedUser.department && ticket.title.toLowerCase().includes(search.toLowerCase())));
                if (filter === "View Issues") {
                    setTickets(data.filter((ticket) => ticket.status === "Archived" && 
                    (ticket.category === "service" || ticket.category === "Building Hazard" ||
                    ticket.category === "Power" || ticket.category === "Other" || ticket.category === "Hardware"
                    || ticket.category === "technical" || ticket.category === "functional" || ticket.category === "accessibility")
                    && ticket.department === loggedUser.department && ticket.title.toLowerCase().includes(search.toLowerCase())));
                } else if (filter === "View EC") {
                    setTickets(data.filter((ticket) => ticket.status === "Archived" && ticket.category === "ec" && ticket.department === loggedUser.department && ticket.title.toLowerCase().includes(search.toLowerCase())));
                }
                break;
            default:
                break;
            }
    }

    //TODO: Ensure responsiveness
    useEffect(() => {
        if (loggedUser) {
            getTickets();
        }
    }, [loggedUser, filter, search]);

    useEffect(() => {
        try {
            const jwt = localStorage.getItem("token");
            const user = jwtDecode(jwt);
            setLoggedUser(user);
        } catch (error) { }
    }, []);

    return (
        <>
            <DisplayHeader isArchive={true} />
            <section className='min-h-[80vh] py-10 px-40 flex flex-col justify-between' style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {tickets.length <= 0 && <h1 className="text-center text-2xl text-white font-semibold ">No tickets found</h1>}
                <div className='flex flex-col gap-10'>
                    {filterData && filterData.map((ticket) => (
                    <Ticket
                        key={ticket._id}
                        id={ticket._id}
                        title={ticket.title}
                        status={ticket.status}
                        type={ticket.category}
                        feedback={ticket.adminComments}
                    />))}
                </div>
                <ReactPaginate
                    containerClassName={"join pagination self-center"}
                    activeClassName={"join-item btn-primary"}
                    pageClassName={"join-item btn btn-square page-item"}
                    pageLinkClassName={"w-full h-full content-center"}
                    onPageChange={(event) => setPage(event.selected)}
                    breakLabel="..."
                    pageCount={Math.ceil(tickets.length / n)}
                    previousLabel={
                        <button className="join-item btn">«</button>
                    }
                    nextLabel={
                        <button className="join-item btn">»</button>
                    }
                    renderOnZeroPageCount={null}
                />
            </section>
        </>
    );
}

export default Archive;