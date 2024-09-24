import React from 'react';
import { FaExclamationCircle, FaTimesCircle, FaClock, FaCheckCircle, FaChevronRight, FaArchive } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Ticket({id, title="No Title Provided", status = "Approved", type = "EC", feedback = "No Feedback" }) {



    return (
        <div className="card bg-base-100 shadow-xl h-40">
            <div className="flex justify-between items-start p-0 min-h-full">
                <div className="p-4 w-80 cursor-pointer flex flex-row justify-between items-center min-h-full gap-10 bg-primary rounded-[1rem_0_0_1rem]">
                    <h2 className='card-title text-xl font-bold text-wrap text-white self-center line-clamp-3'>{title}</h2>
                </div>
                <div className="card-body flex-row max-w-full justify-evenly py-8 self-center">
                    <div className='flex flex-col items-center '>
                        {status === "Resolved" ? <FaCheckCircle size={80} className='text-green-500' />
                         : status === "Pending" ? <FaClock  size={80} className='text-yellow-500' /> 
                         : status === "Review" ? <FaClock  size={80} className='text-blue-300' /> 
                         : status === "Archived" ? <FaArchive size={80} className='text-primary' />
                          : <FaTimesCircle size={80} className='text-red-500' />}
                    </div>
                    <div className='flex flex-col items-center'>
                        <h2 className="card-title font-light text-primary">
                            Status:
                        </h2>
                        <p>{status}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h2 className="card-title font-light text-primary">
                            Type:
                        </h2>
                        <p className='capitalize'>{type}</p>
                    </div>
                    <div className='flex flex-col items-center w-72'>
                        <h2 className="card-title font-light text-primary text-center">
                            Feedback:
                        </h2>
                        <p className='line-clamp-3 max-w-full' >{feedback}</p>
                    </div>
                </div>
                <div className="card-actions justify-end justify-self-end self-center pr-10">
                        <Link to={`/view-ticket/${id}`} className="btn btn-circle btn-outline btn-primary">
                            <FaChevronRight />
                        </Link>
                    </div>
            </div>
        </div>
    );
}

export default Ticket;

