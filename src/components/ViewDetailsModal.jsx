import React from 'react'

function ViewDetailsModal({ setShowDetailsModal, data, type }) {
    return (
        <div>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70 z-100">
                <div className="bg-[rgba(255,255,255,1)] p-4 rounded-xl w-[35%]">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl self-start px-4 my-4 font-bold text-black">
                            {data.name}'s Details
                        </h1>
                        <button
                            className="m-1 flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-1 px-2 border-2 border-[#29b9f0ff] rounded-sm whitespace-nowrap"
                            onClick={() => setShowDetailsModal(false)}
                        >
                            X
                        </button>
                    </div>
                    <div className='flex items-center justify-center'>
                        {type === "students" ? (<div className='flex w-56 font-semibold text-xl flex-col justify-between my-8'>
                            <p className='flex justify-between'>
                                Name: <span>{data.name}</span>
                            </p>
                            <p className='flex justify-between'>
                                Age: <span>{data.age}</span>
                            </p>
                            <p className='flex justify-between'>
                                Grade: <span>{data.grade}</span>
                            </p>
                            <p className='flex justify-between'>
                                Class: <span>{data.classId.name}</span>
                            </p>
                            <p className='flex justify-between'>
                                Gender: <span>{data.gender}</span>
                            </p>
                            <p className='flex justify-between'>
                                Attendance: <span>{data.attendance}/365</span>
                            </p>
                            <p className='flex justify-between'>
                                Marks: <span>{data.marks}</span>
                            </p>
                        </div>) : <div className='flex w-96 font-semibold text-xl flex-col justify-between my-8'>
                            <p className='flex justify-between'>
                                Name: <span>{data.name}</span>
                            </p>
                            <p className='flex justify-between'>
                                Subject: <span>{data.subject}</span>
                            </p>
                            <p className='flex justify-between'>
                                Email: <span>{data.contact.email}</span>
                            </p>
                            <p className='flex justify-between'>
                                Phone: <span>{data.contact.phone}</span>
                            </p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetailsModal