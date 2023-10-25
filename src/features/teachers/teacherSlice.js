import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTeachers = createAsyncThunk(
  "teacher/fetchTeachers",
  async () => {
    const response = await axios.get(
      "https://school-management-t9dl.onrender.com/api/teacher"
    );
    console.log(response.data);
    return response.data;
  }
);

export const addTeacherAsync = createAsyncThunk(
  "teacher/addTeacherAsync",
  async (newTeacher) => {
    console.log({ newTeacher });
    const response = await axios.post(
      "https://school-management-t9dl.onrender.com/api/teacher",
      newTeacher
    );
    return response.data;
  }
);

export const updateTeacherAsync = createAsyncThunk(
  "teachers/updateTeacherAsync",
  async ( {id, updatedTeacher} ) => {
    console.log(id, updatedTeacher);
    const response = await axios.post(
      `https://school-management-t9dl.onrender.com/api/teacher/update/${id}`,
      updatedTeacher
    );
    return response.data;
  }
);

export const deleteTeacherAsync = createAsyncThunk(
  "teachers/deleteTeacherAsync",
  async (id) => {
    const response = await axios.delete(
      `https://school-management-t9dl.onrender.com/api/teacher/${id}`
    );
    return response.data;
  }
);

const initialState = {
  teachers: [],
  status: "idle",
  error: null,
};

export const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchTeachers.pending]: (state) => {
      state.status = "loading";
    },
    [fetchTeachers.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers = action.payload;
    },
    [fetchTeachers.rejected]: (state, action) => {
      state.status = "error";
      console.log(action.error.message);
      state.error = action.error.message;
    },
    [addTeacherAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addTeacherAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.teachers.push(action.payload);
    },
    [addTeacherAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updateTeacherAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateTeacherAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedTeacher = action.payload;
      const index = state.teachers.findIndex((s) => s._id === updatedTeacher._id);
      if (index !== -1) {
        state.teachers[index] = updatedTeacher;
      }
    },
    [updateTeacherAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteTeacherAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteTeacherAsync.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.status = "success";
      state.teachers = state.teachers.filter(
        (teacher) => teacher._id !== action.payload.Teacher._id
      );
    },
    [deleteTeacherAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    }
  }
});

