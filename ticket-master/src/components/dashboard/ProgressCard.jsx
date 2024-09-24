import React from 'react';

const ProgressCard = ({stage="Pending", type="EC", title="Loading..."}) => {

    let color = "text-blue-300";
    if(type === "EC") {
        color = "text-green-400";
    }

    let percentage = "100";
    switch(stage) {
        case "Pending":
            percentage = "25";
            break;
        case "Resolved":
            percentage = "100";
            break;
        case "Review":
            percentage = "75";
            break;
        case "Rejected":
            color = "text-red-500";
            percentage = "100";
            break;

    }

    return (
        <div className='card bg-base-100 xl:max-w-[48%] shadow-lg'>
            <div className='card-body flex flex-col xl:flex-row justify-between items-center min-w-full'>
                <div className={`radial-progress ${color}`} style={{ "--value": percentage, "--size": "6rem", "--thickness": "6px" }} role="progressbar">
                    <h3 className="text-md font-bold text-primary text-center">Status:</h3>
                    <p className="text-sm font-semibold text-center text-gray-500">{stage}</p>
                </div>
                <h2 className='card-title text-lg font-bold text-primary line-clamp-3 max-w-[50%]'>{title}</h2>
            </div>
        </div>
    );
};

export default ProgressCard;