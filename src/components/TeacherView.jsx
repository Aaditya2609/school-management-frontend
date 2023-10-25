import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeachers } from '../features/teachers/teacherSlice';
import Lists from './Lists';
import AddEditDetailsModal from './AddEditDetailsModal';

function TeacherView() {
    const [showAddEditDetailsModal, setShowAddEditDetailModal] = useState(false);
    const [actionType, setActionType] = useState([])
    const dispatch = useDispatch();
    const teachers = useSelector((state) => state.teachers.teachers);
    const status = useSelector((state) => state.teachers.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTeachers());
        }
    }, [status, dispatch]);

    const handleAddTeacher = () => {
        setActionType("add")
        setShowAddEditDetailModal(true)
    }

    return (
        <div>
            {status === "loading" ? (<div className='text-3xl my-4 font-bold fixed top-1/2 left-1/2' > Loading Data...</div>) : (
                <div className='flex flex-col w-full items-center h-[100vh] overflow-auto'>
                    <h1 className='text-3xl my-4 font-bold'>All Teachers</h1>
                    <button className="m-1 flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-2 px-4 border-2 border-[#29b9f0ff] rounded whitespace-nowrap" onClick={(e)=>handleAddTeacher()}>Add Teacher</button>
                    <Lists data={teachers} dataType="teachers" />
                </div>)}
                {showAddEditDetailsModal && <AddEditDetailsModal setShowAddEditDetailModal={setShowAddEditDetailModal} data={[]} type="teacher" action={actionType}/>}
        </div>
    )
}

export default TeacherView