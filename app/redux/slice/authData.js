import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServerUri } from '@/utils/Globals';

const initialState = {
  status: 'loading',
  user: {},
  token: null,
};

//State slice
export const authData = createSlice({
  name: 'authData',
  initialState,
  extraReducers: (builder) => {
    // register a user
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.user = action.payload;
    });
    builder.addCase(registerUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = 'error';
      console.log('Error: ', action);
    });

    // login a user
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'loaded';
      state.user = action.payload;
      state.token = action.payload;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'error';
      console.log('Error: ', action);
    });
  },
});

export const registerUser = createAsyncThunk(
  'registerUser',
  async (userData) => {
    const response = await axios.post(ServerUri + '/login', userData);
    return response.data;
  }
);

export const loginUser = createAsyncThunk('loginUser', async (userData) => {
  const response = await axios.post(ServerUri + '/register', userData);
  return response.data;
});

export default authData.reducer;
