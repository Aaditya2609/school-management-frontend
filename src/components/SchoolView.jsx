import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setTopStudent,
    updateSchoolStats
} from "../features/school/schoolSlice";
import { fetchStudents } from "../features/students/studentSlice";

const SchoolView = () => {
    const schoolStats = useSelector((state) => state.school);
    const students = useSelector((state) => state.students.students);
    const dispatch = useDispatch();
    const status = useSelector((state) => state.students.status);
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchStudents());
        }
    }, [status, dispatch]);


    useEffect(() => {
        const totalStudents = students.length;
        const totalAttendance = students.reduce(
            (sum, student) => sum + student.attendance,
            0
        );
        const averageAttendance = totalAttendance / totalStudents;
        const totalMarks = students.reduce(
            (sum, student) => sum + student.marks,
            0
        );
        const averageMarks = totalMarks / totalStudents;

        const topStudent = students.reduce((prev, current) => {
            return current.marks > prev.marks
                ? current
                : prev;
        }, { marks: -999999 });

        dispatch(
            updateSchoolStats({
                totalStudents,
                averageAttendance,
                averageMarks,
                topStudent
            })
        );
        dispatch(setTopStudent(topStudent));
    }, [students, dispatch]);

    return (
        <div className="flex flex-col justify-center">
            <h1 className='text-3xl my-4 font-bold'>School View</h1>
            <div className="flex w-full justify-center">
                <div className="border-2 p-2 border-[#29b9f0ff] flex flex-col items-start justify-center rounded-xl w-80 text-xl font-semibold">
                    <p className='w-full flex justify-between'>
                        Total Students: <span>{schoolStats.totalStudents}</span>
                    </p>
                    <p className='w-full flex justify-between'>Average Attendance: <span>{schoolStats.averageAttendance.toFixed(2)}</span></p>
                    <p className='w-full flex justify-between'>Average Marks: <span>{schoolStats.averageMarks.toFixed(2)}</span></p>
                    <p className='w-full flex justify-between'>
                        Top Student:{" "}
                        <span>{schoolStats.topStudent ? schoolStats.topStudent.name : "-"}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SchoolView;
