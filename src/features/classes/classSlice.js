import { createSlice } from '@reduxjs/toolkit'

import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchClasses = createAsyncThunk(
  'classes/fetchClasses',
  async () => {
    const response = await axios.get(
      'https://school-management-t9dl.onrender.com/api/class',
    )
    console.log(response.data)
    return response.data
  },
)

const initialState = {
  classesess: [],
  status: 'idle',
  error: null,
}

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchClasses.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchClasses.fulfilled]: (state, action) => {
      state.status = 'success'
      state.classes = action.payload
    },
    [fetchClasses.rejected]: (state, action) => {
      state.status = 'error'
      console.log(action.error.message)
      state.error = action.error.message
    },
  },
})