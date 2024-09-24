import React from 'react';
import { FaChevronRight } from "react-icons/fa";
import { IoPersonOutline } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

function User({id, name, role, email}) {
    return (
        <div className="card bg-base-100 shadow-xl h-40">
            <div className="flex justify-between items-start p-0 min-h-full">
                <div className="w-16 cursor-pointer flex flex-row justify-between items-center min-h-full gap-10 bg-primary rounded-[1rem_0_0_1rem]">
                </div>
                <div className="card-body flex-row max-w-full justify-evenly py-8 self-center">
                    <div className='flex flex-col items-center'>
                        <h2 className="card-title font-light text-primary">
                            Name:
                        </h2>
                        <p>{name}</p>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h2 className="card-title font-light text-primary">
                            Role:
                        </h2>
                        <p className='capitalize'>{role}</p>
                    </div>
                    <div className='flex flex-col items-center w-72'>
                        <h2 className="card-title font-light text-primary text-center">
                            Email:
                        </h2>
                        <p className='line-clamp-3 max-w-full' >{email}</p>
                    </div>
                </div>
                <div className="card-actions justify-end justify-self-end self-center pr-10">
                    <NavLink to = {`/view-user/${id}`}>
                        <button className="btn btn-circle btn-outline btn-primary">
                            <FaChevronRight />
                        </button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default User;