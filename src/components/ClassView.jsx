import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses } from '../features/classes/classSlice';
import { fetchStudents } from '../features/students/studentSlice';


function ClassView() {

  const dispatch = useDispatch();
  const classes = useSelector((state) => state.classes.classes);
  const students = useSelector((state) => state.students.students);
  const status = useSelector((state) => state.classes.status);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [sortedStudents, setSortedStudents] = useState([]);
  const [sortKey, setSortKey] = useState('name');

  useEffect(() => {
    dispatch(fetchClasses());
  }, [status, dispatch]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [status, dispatch]);

  useEffect(() => {
    let filteredStudents = students;

    if (selectedClass) {
      filteredStudents = filteredStudents.filter(
        (student) => student.classId._id === selectedClass
      );
    }

    if (selectedGender) {
      filteredStudents = filteredStudents.filter(
        (student) => student.gender === selectedGender
      );
    }

    filteredStudents = sortStudents(filteredStudents, sortKey);

    setSortedStudents(filteredStudents);
  }, [selectedClass, selectedGender, students, sortKey]);

  const sortStudents = (students, sortKey) => {
    return [...students].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1;
      if (a[sortKey] > b[sortKey]) return 1;
      return 0;
    });
  };

  return (
    <div>
      <div className='flex flex-col'>
        <div>
          <h1 className='text-3xl my-4 font-bold'>Class View</h1>
          <h1 className='text-3xl my-4 font-bold'>Filters</h1>
        </div>
        <div className='flex items-center justify-center w-full'>
          <div className='flex w-full items-center justify-center'>
            <label className="flex gap-4 m-2 justify-between">
              Class:
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option className="border-2 border-black rounded-md px-2 py-1" value="" >None</option>
                {classes?.map((item) => (
                  <option className="border-2 border-black rounded-md px-2 py-1" key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className='flex w-full items-center justify-center'>
            <label className="flex gap-4 m-2 justify-between">
              Gender:
              <select
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.target.value)}
              >
                <option value="" className="border-2 border-black rounded-md px-2 py-1">All</option>
                <option value="Male" className="border-2 border-black rounded-md px-2 py-1">Male</option>
                <option value="Female" className="border-2 border-black rounded-md px-2 py-1">Female</option>
              </select>
            </label>
          </div>
          <div className='flex w-full items-center justify-center'>
            <label className="flex gap-4 m-2 justify-between">
              Sort By:
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
              >
                <option value="name" className="border-2 border-black rounded-md px-2 py-1">Name</option>
                <option value="age" className="border-2 border-black rounded-md px-2 py-1">Age</option>
                <option value="attendance" className="border-2 border-black rounded-md px-2 py-1">Attendance</option>
                <option value="marks" className="border-2 border-black rounded-md px-2 py-1">Marks</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        {sortedStudents.map((student) => (
          <div key={student._id} className='border-2 p-2 border-[#29b9f0ff] flex flex-col items-start rounded-xl w-80 text-lg'>
            <div className='flex w-full flex-col justify-between'>
              <p className='flex justify-between'>
                Name: <span>{student.name}</span>
              </p>
              <p className='flex justify-between'>
                Age: <span>{student.age}</span>
              </p>
              <p className='flex justify-between'>
                Grade: <span>{student.grade}</span>
              </p>
              
              <p className='flex justify-between'>
                Gender: <span>{student.gender}</span>
              </p>
              <p className='flex justify-between'>
                Marks: <span>{student.marks}</span>
              </p>
              <p className='flex justify-between'>
                Attendance: <span>{student.attendance}/365</span>
              </p>
              <p className='flex justify-between'>
                Class: <span>{student.classId.name}</span>
              </p>
            </div>    
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClassView;
