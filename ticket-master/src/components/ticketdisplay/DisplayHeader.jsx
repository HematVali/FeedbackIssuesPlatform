import { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { FilterContext } from "./FilterContextProvider";
import { SearchContext } from "./FilterContextProvider";

const DisplayHeader = ({ isArchive }) => {

    const { filter, setFilter } = useContext(FilterContext);
    const { search, setSearch } = useContext(SearchContext);

    function handleSearchChange(e) {
        setSearch(e.target.value);
    }

    return (
        <div className="navbar bg-[#0a1324] text-white px-0 lg:px-28 py-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a>All Tickets</a></li>
                        <li><a>View Issues</a></li>
                        <li><a>View EC</a></li>
                    </ul>
                </div>
                <h1 className="text-3xl font-bold">
                    {isArchive ? "Archive" : "Tickets"}
                </h1>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <div className="join">
                        <form>
                            {filter === "All Tickets" ? <input className="join-item btn" type="radio" name="options" aria-label="All Tickets" onChange={() => setFilter("All Tickets")} defaultChecked/>
                             : <input className="join-item btn" type="radio" name="options" aria-label="All Tickets" onChange={() => setFilter("All Tickets")} />}
                            {filter === "View Issues" ? <input className="join-item btn" type="radio" name="options" aria-label="View Issues" onChange={() => setFilter("View Issues")} defaultChecked />
                             : <input className="join-item btn" type="radio" name="options" aria-label="View Issues" onChange={() => setFilter("View Issues")} />}
                            {filter === "View EC" ? <input className="join-item btn" type="radio" name="options" aria-label="View EC" onChange={() => setFilter("View EC")} defaultChecked/>
                             : <input className="join-item btn" type="radio" name="options" aria-label="View EC" onChange={() => setFilter("View EC")} />}
                        </form>
                    </div>
                </ul>
            </div>
            <div className="navbar-end gap-4">
            <input type="text" placeholder="Search Tickets" className="input input-bordered w-full max-w-xs text-gray-700" onChange={handleSearchChange} />
                {!isArchive && <a href='/create-ticket' className="btn hover:bg-primary btn-outline text-white"> <FaPlus />New Ticket</a>}
            </div>
        </div>
    );
};

export default DisplayHeader;