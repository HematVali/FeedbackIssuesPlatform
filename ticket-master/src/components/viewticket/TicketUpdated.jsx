import React from 'react';

const TicketCreated = () => {
    return (
<div className='hero min-h-[80vh]'>
            <div className="modal-box">
                <h3 className="font-bold text-lg">Success</h3>
                <p className="py-4">Your ticket has been successfully updated.</p>
                <p className="text-gray-700">An email confirmation will be sent to you shortly.</p>
                <p className="text-gray-700">You will receive updates via email regarding any changes made to your ticket.</p>
                <div className="modal-action">
                <a href='/tickets' className="btn">Continue</a>
                </div>
            </div>
        </div>
    );
};

export default TicketCreated;