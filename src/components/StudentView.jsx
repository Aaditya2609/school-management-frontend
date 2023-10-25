import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '../features/students/studentSlice';
import Lists from './Lists';
import AddEditDetailsModal from './AddEditDetailsModal';

function StudentView() {
    const [showAddEditDetailsModal, setShowAddEditDetailModal] = useState(false);
    const [actionType, setActionType] = useState([])
    const dispatch = useDispatch();
    const students = useSelector((state) => state.students.students);
    const status = useSelector((state) => state.students.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchStudents());
        }
    }, [status, dispatch]);
   

    const handleAddStudent = () => {
        setActionType("add")
        setShowAddEditDetailModal(true)
    }
    return (
        <div>
            {status === "loading" ? (<div className='text-3xl my-4 font-bold fixed top-1/2 left-1/2' > Loading Data...</div>) : (
                <div className='flex flex-col w-full items-center h-[100vh] overflow-auto'>
                    <h1 className='text-3xl my-4 font-bold'>All Students</h1>
                    <button onClick={() => handleAddStudent()} className="m-1 flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-2 px-4 border-2 border-[#29b9f0ff] rounded whitespace-nowrap">Add Student</button>
                    <Lists data={students} dataType="students" />
                </div>)}
            {showAddEditDetailsModal && <AddEditDetailsModal setShowAddEditDetailModal={setShowAddEditDetailModal} data={[]} type="student" action={actionType}/>}
            </div>
    )
}

            export default StudentView