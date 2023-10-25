import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses } from '../features/classes/classSlice';
import { addStudentAsync, fetchStudents, updateStudentAsync } from '../features/students/studentSlice';
import { addTeacherAsync } from '../features/teachers/teacherSlice';

function AddEditDetailsModal({ setShowAddEditDetailModal, type, data, action }) {
    const [tempStudent, setTempStudent] = useState({
        name: "",
        age: 0,
        grade: "",
        gender: "",
        attendance: 0,
        marks: 0,
        classId: ""
    });

    const [tempTeacher,setTempTeacher]=useState({
        name:"",
        subject:"",
        contact:{
            email:"",
            phone:""
        }
    })

    const dispatch = useDispatch();
    const classes = useSelector((state) => state.classes.classes);
    const status = useSelector((state) => state.classes.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchClasses());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (action === "edit" && data) {
            const { _id, ...tempStudentWithoutId } = data;
            setTempStudent(tempStudentWithoutId);
        }
    }, [action, data]);
    

    const handleAddEdit = () => {
        if(type==="student"){
        if (
            tempStudent.name !== "" &&
            tempStudent.age !== 0 &&
            tempStudent.grade !== "" &&
            tempStudent.gender !== "" &&
            tempStudent.attendance !== 0 &&
            tempStudent.marks !== 0 &&
            tempStudent.classId !== ""
        ) 
        {
            if (action === "add") {
                dispatch(addStudentAsync(tempStudent));
            } else if (action === "edit") {
                dispatch(updateStudentAsync({ id: data._id, updatedStudent: tempStudent }));
            }

            dispatch(fetchStudents());
            setShowAddEditDetailModal(false);
        } else {
            alert("Please fill all the fields");
        }
    }
    else if(type==="teacher")
    {
        if (
            tempTeacher.name !== "" &&
            tempTeacher.subject !== 0 &&
            tempTeacher.contact.email !== "" &&
            tempTeacher.contact.phone !== ""
        ) 
        {
            if (action === "add") {
                dispatch(addTeacherAsync(tempTeacher));
            }
            dispatch(fetchStudents());
            setShowAddEditDetailModal(false);
        }
        else {
            alert("Please fill all the fields");
        }
    }
    };

    return (
        <div>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70 z-100">
                <div className="bg-[rgba(255,255,255,1)] p-4 rounded-xl w-[35%]">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl self-start px-4 my-4 font-bold text-black">
                            {type === "student" ? (
                                action === "add" ? <div>Add Student</div> : <div>Edit Student</div>
                            ) : (
                                action === "add" ? <div>Add Teacher</div> : <div>Edit Teacher</div>
                            )}
                        </h1>
                        <button
                            className="m-1 flex items-center bg-[white] hover-bg-[#29b9f0ff] hover-text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-1 px-2 border-2 border-[#29b9f0ff] rounded-sm whitespace-nowrap"
                            onClick={() => setShowAddEditDetailModal(false)}
                        >
                            X
                        </button>
                    </div>
                    {type==="student"?<div className="flex flex-col items-center">
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Name
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempStudent({ ...tempStudent, name: e.target.value })}
                                value={tempStudent.name}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Age
                            <input
                                type='number'
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempStudent({ ...tempStudent, age: e.target.value })}
                                value={tempStudent.age}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Grade
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempStudent({ ...tempStudent, grade: e.target.value })}
                                value={tempStudent.grade}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Gender
                            <div>
                                <input type="radio" name='gender'
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempStudent({ ...tempStudent, gender: "Male" })}
                                    checked={tempStudent.gender === "Male"}
                                ></input>Male
                            </div>
                            <div>
                                <input type="radio" name='gender'
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempStudent({ ...tempStudent, gender: "Female" })}
                                    checked={tempStudent.gender === "Female"}
                                ></input>Female
                            </div>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Attendance
                            <input type='number'
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempStudent({ ...tempStudent, attendance: e.target.value })}
                                value={tempStudent.attendance}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Marks
                            <input type='number'
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempStudent({ ...tempStudent, marks: e.target.value })}
                                value={tempStudent.marks}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Class
                            <select onChange={(e) => setTempStudent({ ...tempStudent, classId: e.target.value })} value={tempStudent.classId}>
                                <option className="border-2 border-black rounded-md px-2 py-1" value="">None</option>
                                {classes?.map(item => (
                                    <option key={item._id} value={item._id} className="border-2 border-black rounded-md px-2 py-1">
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>:
                    <div className="flex flex-col items-center">
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Name
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempTeacher({ ...tempTeacher, name: e.target.value })}
                                value={tempTeacher.name}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Subject
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempTeacher({ ...tempTeacher, subject: e.target.value })}
                                value={tempTeacher.subject}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Email
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempTeacher({ ...tempTeacher, contact:{...tempTeacher.contact,email: e.target.value}})}
                                value={tempTeacher.contact.email}
                            ></input>
                        </label>
                        <label className="flex gap-4 m-2 w-8/12 justify-between">
                            Phone
                            <input
                                className="border-2 border-black rounded-md px-2 py-1"
                                onChange={(e) => setTempTeacher({ ...tempTeacher, contact:{...tempTeacher.contact,phone: e.target.value}})}
                                value={tempTeacher.contact.phone}
                            ></input>
                        </label>
                        </div>}
                    <div className='w-full flex items-center justify-center'>
                        <button
                            onClick={handleAddEdit}
                            className="m-1 flex items-center bg-[white] hover-bg-[#29b9f0ff] hover-text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-2 px-4 border-2 border-[#29b9f0ff] rounded whitespace-nowrap"
                        >
                            {type==="student"?action === "add" ? "Add Student" : "Edit Student":action === "add" ? "Add Teacher" : "Edit Teacher"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEditDetailsModal;
