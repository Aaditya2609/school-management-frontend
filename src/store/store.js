import { configureStore } from '@reduxjs/toolkit'
import { studentsSlice } from '../features/students/studentSlice'
import { teachersSlice } from '../features/teachers/teacherSlice'
import { classesSlice } from '../features/classes/classSlice'

export default configureStore({
  reducer: {
    students: studentsSlice.reducer,
    teachers: teachersSlice.reducer,
    classes: classesSlice.reducer,
  },
})