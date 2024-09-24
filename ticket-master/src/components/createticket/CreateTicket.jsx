import React, { useState } from 'react';
import LabForm from './LabForm';
import ServiceForm from './ServiceForm';
import ECForm from './ECForm';

const CreateTicket = () => {
    const [selectedTab, setSelectedTab] = useState('lab');

    const handleTabChange = (tabName) => {
        setSelectedTab(tabName);
    };

    return (
        <>
            <div className="navbar bg-[#0a1324] text-white px-0 lg:px-28 py-4">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        </ul>
                    </div>
                    <h1 className="text-3xl font-bold">
                        Submit Ticket
                    </h1>

                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <div className="join">
                        <a className="join-item btn border-none"
                                role="tab"
                                style={{
                                    backgroundColor: selectedTab === 'lab' ? '#0D3273' : '#ffffff',
                                    color: selectedTab === 'lab' ? '#ffffff' : '#000000',
                                }}
                                onClick={() => handleTabChange('lab')}
                            >
                                Report Lab Issue
                            </a>

                            <a className="join-item btn border-none"
                                role="tab"
                                style={{
                                    backgroundColor: selectedTab === 'service' ? '#0D3273' : '#ffffff',
                                    color: selectedTab === 'service' ? '#ffffff' : '#000000',
                                }}
                                onClick={() => handleTabChange('service')}
                            >
                                Report Service Issue
                            </a>

                            <a className="join-item btn border-none"
                                role="tab"
                                style={{
                                    backgroundColor: selectedTab === 'ec' ? '#0D3273' : '#ffffff',
                                    color: selectedTab === 'ec' ? '#ffffff' : '#000000',
                                }}
                                onClick={() => handleTabChange('ec')}
                            >
                                Submit EC Claim
                            </a>

                        </div>
                    </ul>
                </div>
                <div className="navbar-end">
                </div>
            </div>
            <div className="submit-issue pt-4">
                <div role="tablist" className="tabs tabs-boxed" style={{ backgroundColor: '#FFFFFF' }}>
                </div>
                {/* Render the selected form based on the selectedTab state */}
                {selectedTab === 'lab' && <LabForm />}
                {selectedTab === 'service' && <ServiceForm />}
                {selectedTab === 'ec' && <ECForm />}
            </div>
        </>
    );
};

export default CreateTicket;