import React from 'react';

const ServiceCard = ({ name, available }) => {
    return (
        <div className="card w-96 bg-base-100 shadow-xl h-44">
                <div className="card-body">
                    <div className="card-actions justify-end self-end">
                    {available ? <p className='flex items-center gap-2'><div className="badge badge-success badge-xs"></div>Available</p>
                    :  <p className='flex items-center gap-2'><div className="badge badge-warning badge-xs"></div>Unavailable</p>}
                    </div>
                    <h1 className='card-title'>{name}</h1>
                    <p className='text-sm'>{available ? "This service is functioning as normal." : "We are currently experienceing some issues with this service, Please bear with us as we work to resolve the issue."}</p>
                </div>
            </div>
    );
};

export default ServiceCard;