import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStudents = createAsyncThunk(
  "student/fetchStudents",
  async () => {
    const response = await axios.get(
      "https://school-management-t9dl.onrender.com/api/student"
    );
    return response.data;
  }
);

export const addStudentAsync = createAsyncThunk(
  "student/addStudentAsync",
  async (newStudent) => {
    const response = await axios.post(
      "https://school-management-t9dl.onrender.com/api/student",
      newStudent
    );
    return response.data;
  }
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudentAsync",
  async ({ id, updatedStudent }) => {
    const response = await axios.post(
      `https://school-management-t9dl.onrender.com/api/student/update/${id}`,
      updatedStudent
    );
    return response.data;
  }
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudentAsync",
  async (id) => {
    const response = await axios.delete(
      `https://school-management-t9dl.onrender.com/api/student/${id}`
    );
    return response.data;
  }
);

const initialState = {
  students: [],
  status: "idle",
  error: null,
};

export const studentsSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchStudents.pending]: (state) => {
      state.status = "loading";
    },
    [fetchStudents.fulfilled]: (state, action) => {
      state.status = "success";
      state.students = action.payload;
    },
    [fetchStudents.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [addStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addStudentAsync.fulfilled]: (state, action) => {
      state.status = "idle";
      state.students.push(action.payload);
    },
    [addStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedStudent = action.payload;
      const index = state.students.findIndex((s) => s._id === updatedStudent._id);
      if (index !== -1) {
        state.students[index] = updatedStudent;
      }
    },
    [updateStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteStudentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteStudentAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.students = state.students.filter(
        (student) => student._id !== action.payload.student._id
      );
    },
    [deleteStudentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

